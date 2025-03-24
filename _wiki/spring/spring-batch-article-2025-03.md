---
layout  : wiki
title   : 120만 건의 TMDb 영화 데이터 변환 및 삽입, 6시간에서 9초로 최적화 여정
summary : 23,887초에서 9초로 대용량 데이터 삽입 최적화
date    : 2025-03-24 15:05:00 +0900
updated : 2025-03-24 15:05:00 +0900
tag     : batch spring jpa jdbc
toc     : true
comment : true
public  : true
parent  : [[/spring]]
latex   : true
---
* TOC
{:toc}

### 23,887초에서 9초로: 120만건 데이터 삽입 최적화

항해 스킬업 코스를 코칭하면서, 수강생 분들이 괜찮은 데이터셋을 가지고 프로젝트를 진행하면 좋겠다고 생각이 들었습니다. 그 결과 Kaggle의 [Full TMDB Movies Dataset](https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies) 2024를 선택했습니다.

- 이 데이터셋을 선택한 이유
    - 대용량 데이터(100만건 이상) → Index와 Caching의 효과를 실험하기 적합
    - **코스 프로젝트와 유사한 구조** → 장르, 개봉일 등 주요 컬럼이 포함됨

이 데이터를 변환하고 **DB에 삽입**하는 과정에서 가장 느린 배치(Batch) 로직부터 최적화하면, **과연 얼마나 빨라질까?** 하는 궁금증에서 시작된 과정을 공유하고자 합니다.

### Pre-Condition(테스트 가정 및 검증할 포인트)

- **가정 및 검증할 포인트**
    - Spring Batch 라이브러리는 사용하지 않는다.
    - CSV 변환은 org.apache.commons:commons-csv:1.10.0 사용
    - **JPA save()**가 가장 느릴 것이다. → 트랜잭션 오버헤드 때문
    - **JPA saveAll()**을 활용하여 트랜잭션 오버헤드를 줄인다. → 여러 개의 INSERT를 한 번에 수행
    - 데이터를 **Sub-List**로 나누어 **비동기(aync) 병렬(parallel)처리**를 적용한다.
    - **버퍼(buffer)**를 도입하여 스트리밍 기반 배치 처리를 구현한다.
    - **JDBC**를 활용하여 JPA(ORM) 오버헤드를 제거하고 성능을 최적화한다.
- **테스트 데이터셋**
    - Kaggle Full TMDB Movies Dataset 2024
    - **약 120만건**
- **테스트 환경 (하드웨어 스펙)**
    - Apple M3 Pro(core 11, Memory 36G)
- 프레임워크 및 기술스택
    - SpringBoot 3.4.3, Spring Data JPA, Java 21

### Test Result

|  | 데이터 변환 및 INSERT 소요시간 | 비고 |
| --- | --- | --- |
| 1차 | 23,887,860ms | CSV 한 줄마다 parse 후 INSERT |
| 2차 | 134,701ms | List에 엔티티 저장 후 → saveAll |
| 3차 | 38,444ms | List를 배치사이즈(500)로 나눈 후 → CompletableFuture 병렬처리 |
| 4차 | 26,983ms | 병렬 + 버퍼활용 스트리밍 기반 배치(BatchSize=500) |
| 5차 | 9,104ms | 병렬 + 버퍼 + JDBC Template 활용 및 bulkInsert |

### 1차: JPA save() 사용 – 가장 느린 방식

첫 번째 접근 방식은 **CSV 파일의 각 행을 개별적으로 파싱**하고, **JPA save()를 사용**하여 INSERT하는 것이었습니다.

- 이 방법은 직관적이고 구현이 간단하지만, 약 120만 건의 데이터를 처리하는데 **약 23,887초**(약 6.6시간)가 소요되었습니다.
- CODE: JPA save()를 이용한 개별 저장
    
    ```java
    @Slf4j
    @Service
    @RequiredArgsConstructor
    public class MovieBatchService {
        private final MovieRepository movieRepository;
        
        public void batchMovies() {
            int failCount = 0;
            long start = System.currentTimeMillis();
            
            try {
                Reader file = new FileReader("/Users/soonhankwon/Downloads/TMDB_movie_dataset_v11.csv");
                Iterable<CSVRecord> records = CSVFormat.EXCEL.builder()
                                              .setHeader()
                                              .build()
                                              .parse(file);
                
                for (CSVRecord record : records) {
                    // 레코드 파싱 및 Movie 객체 생성 코드
                    String title = StringUtils.truncate(!Objects.isNull(record.get("title")) ? record.get("title").strip() : "", 200);
                    String releaseDateStr = record.get("release_date");
                    LocalDate releaseDate = Objects.isNull(releaseDateStr) || releaseDateStr.isEmpty() ? 
                                            LocalDate.now() : LocalDate.parse(releaseDateStr);
                    int runtimeMin = Integer.parseInt(record.get("runtime"));
                    MovieRating rating = record.get("adult").equals("False") ? 
                                        MovieRating.UNDER_19 : MovieRating.ADULT;
                    String backdropPath = StringUtils.truncate(!Objects.isNull(record.get("backdrop_path")) ? 
                                          record.get("backdrop_path").strip() : "", 200);
                    String genreStr = record.get("genres").split(",")[0].strip();
                    MovieGenre movieGenre = Arrays.stream(MovieGenre.values())
                                            .filter(genre -> genre.getDescription().equals(genreStr))
                                            .findFirst()
                                            .orElse(null);
                                            
                    Movie movie = Movie.builder()
                                .title(title)
                                .releaseDate(releaseDate)
                                .durationMin(runtimeMin)
                                .rating(rating)
                                .genre(movieGenre)
                                .thumbnail(backdropPath)
                                .build();
                                
                    movieRepository.save(movie); // 각 레코드마다 개별 저장
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            } catch (NoSuchElementException e) {
                failCount++;
            }
            
            long end = System.currentTimeMillis();
            log.info("fail={}", failCount);
            log.info("time={}", end - start);
        }
    }
    ```
    

주요 문제점:

- **매번 save() 호출** → 각 INSERT마다 **트랜잭션 오버헤드** 발생
- **DB Connection 리소스 낭비** → 매 요청마다 새로운 트랜잭션 생성
- **네트워크 지연 시간 누적** → 대량의 SQL 실행으로 속도 저하

### 2차: JPA saveAll() 메서드 활용

첫 번째 최적화로 **개별 INSERT 대신, Entity 리스트를 한 번에 저장**하도록 변경했습니다.

- 134,701ms - List에 엔티티 저장 후 → saveAll()
- CODE: JPA saveAll()을 활용한 일괄저장
    
    ```java
    @Slf4j
    @Service
    @RequiredArgsConstructor
    public class MovieBatchService {
        private final MovieRepository movieRepository;
        
        public void batchMovies() {
            int failCount = 0;
            long start = System.currentTimeMillis();
            
            try {
                Reader file = new FileReader("/Users/soonhankwon/Downloads/TMDB_movie_dataset_v11.csv");
                Iterable<CSVRecord> records = CSVFormat.EXCEL.builder()
                                              .setHeader()
                                              .build()
                                              .parse(file);
                
                List<Movie> movies = new ArrayList<>();
                
                for (CSVRecord record : records) {
                    // 레코드 파싱 및 Movie 객체 생성 코드 (동일)
                    String title = StringUtils.truncate(!Objects.isNull(record.get("title")) ? record.get("title").strip() : "", 200);
                    String releaseDateStr = record.get("release_date");
                    LocalDate releaseDate = Objects.isNull(releaseDateStr) || releaseDateStr.isEmpty() ? 
                                            LocalDate.now() : LocalDate.parse(releaseDateStr);
                    int runtimeMin = Integer.parseInt(record.get("runtime"));
                    MovieRating rating = record.get("adult").equals("False") ? 
                                        MovieRating.UNDER_19 : MovieRating.ADULT;
                    String backdropPath = StringUtils.truncate(!Objects.isNull(record.get("backdrop_path")) ? 
                                          record.get("backdrop_path").strip() : "", 200);
                    String genreStr = record.get("genres").split(",")[0].strip();
                    MovieGenre movieGenre = Arrays.stream(MovieGenre.values())
                                            .filter(genre -> genre.getDescription().equals(genreStr))
                                            .findFirst()
                                            .orElse(null);
                                            
                    Movie movie = Movie.builder()
                                .title(title)
                                .releaseDate(releaseDate)
                                .durationMin(runtimeMin)
                                .rating(rating)
                                .genre(movieGenre)
                                .thumbnail(backdropPath)
                                .build();
                                
                    movies.add(movie); // 리스트에 추가
                }
                
                movieRepository.saveAll(movies); // 한 번에 모든 엔티티 저장
                
            } catch (IOException e) {
                throw new RuntimeException(e);
            } catch (NoSuchElementException e) {
                failCount++;
            }
            
            long end = System.currentTimeMillis();
            log.info("fail={}", failCount);
            log.info("time={}", end - start);
        }
    }
    ```
    

이 방법으로 처리 시간을 **약 134초**로 크게 단축했지만, 여전히 개선의 여지가 있었습니다.

### 3차: 분할 배치 처리 + 병렬화 적용

배치 크기를 **500개로 분할**하고 CompletableFuture를 사용하여 **병렬 저장**을 적용했습니다.

- 3차: **38,444ms** - List를 배치사이즈(500)로 나눈 후 → CompletableFuture 병렬처리
- CODE
    
    ```java
    @Slf4j
    @Service
    @RequiredArgsConstructor
    public class MovieBatchService {
        private final MovieRepository movieRepository;
        private final int BATCH_SIZE = 500;
        private final int PARALLELISM = Runtime.getRuntime().availableProcessors();
        private final Executor executor = Executors.newFixedThreadPool(PARALLELISM);
        
        public void batchMovies() {
            long start = System.currentTimeMillis();
            
            try {
                Reader file = new FileReader("/Users/soonhankwon/Downloads/TMDB_movie_dataset_v11.csv");
                Iterable<CSVRecord> records = CSVFormat.EXCEL.builder()
                                              .setHeader()
                                              .build()
                                              .parse(file);
                
                List<Movie> movies = new ArrayList<>();
                
                for (CSVRecord record : records) {
                    // 레코드 파싱 및 Movie 객체 생성 코드 (동일)
                    // ...
                    movies.add(movie);
                }
                
                // 배치로 나누기
                List<List<Movie>> batches = new ArrayList<>();
                int size = movies.size();
                for (int i = 0; i < size; i += BATCH_SIZE) {
                    batches.add(new ArrayList<>(
                        movies.subList(i, Math.min(i + BATCH_SIZE, size))
                    ));
                }
                
                // CompletableFuture를 사용한 병렬 처리
                List<CompletableFuture<Integer>> futures = batches.stream()
                    .map(batch -> CompletableFuture.supplyAsync(() -> {
                        try {
                            movieRepository.saveAll(batch);
                            log.info("Saved batch of {} movies", batch.size());
                            return batch.size();
                        } catch (Exception e) {
                            log.error("Error saving batch: {}", e.getMessage(), e);
                            return 0;
                        }
                    }, executor))
                    .toList();
                
                CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
                
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            
            long end = System.currentTimeMillis();
            log.info("time={}ms", end - start);
        }
    }
    ```
    
- **적용한 최적화**
    - **JPA saveAll()의 배치 단위 저장**
        - **500개 단위로 데이터를 분할**하여 **Insert**하도록 유도
    - **CompletableFuture를 활용한 병렬 처리**
        - CPU 코어 개수(Runtime.getRuntime().availableProcessors())만큼 **Thread Pool을 생성**
        - saveAll() 호출을 **비동기 실행하여 병렬 처리**
    - **고정된 스레드 풀 사용 (FixedThreadPool)**
        - Executors.newFixedThreadPool(PARALLELISM)을 사용해 **너무 많은 스레드 생성 방지**

배치와 멀티 코어를 활용한 병렬 처리를 통해 **약 38초**로 성능을 더욱 향상시켰습니다.

### 4차: 스트리밍 기반 분할 배치 처리

CompletableFuture를 활용한 병렬 처리 방식(3차, 38초)에서 한 단계 더 발전하여,

**스트리밍 기반의 배치 처리**를 적용한 결과 **약 27초**까지 성능을 개선했습니다.

- 4차: 26,983ms - 스트리밍 기반 배치(BatchSize=500)
- CODE
    
    ```java
    @Slf4j
    @Service
    @RequiredArgsConstructor
    public class MovieBatchService {
        private final MovieRepository movieRepository;
        private final int BATCH_SIZE = 500; // 500 Buffer
        private final int PARALLELISM = Runtime.getRuntime().availableProcessors();
        private final Executor executor = Executors.newFixedThreadPool(PARALLELISM);
        
        public void batchMovies() {
            long start = System.currentTimeMillis();
            
            try {
                Reader file = new FileReader("/Users/soonhankwon/Downloads/TMDB_movie_dataset_v11.csv");
                Iterable<CSVRecord> records = CSVFormat.EXCEL.builder()
                                              .setHeader()
                                              .build()
                                              .parse(file);
                
                List<Movie> movies = new ArrayList<>();
                
                for (CSVRecord record : records) {
                    // 레코드 파싱 및 Movie 객체 생성 코드 (동일)
                    // ...
                    movies.add(movie);
                    
                    // 스트리밍 방식
                    if (movies.size() >= BATCH_SIZE) {
                        List<Movie> batch = new ArrayList<>(movies);
                        movies = new ArrayList<>(BATCH_SIZE); // 기존 리스트 초기화
                        CompletableFuture.runAsync(() -> 
                            movieRepository.saveAllAndFlush(batch), executor);
                    }
                }
                
                // 남아있는 데이터 저장
                if (!movies.isEmpty()) {
                    movieRepository.saveAllAndFlush(movies);
                }
                
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            
            long end = System.currentTimeMillis();
            log.info("time={}ms", end - start);
        }
    }
    ```
    
- **스트리밍 방식의 핵심 개선점**
    - **메모리 사용량 감소**
    - 이전 방식(3차)에서는 모든 데이터를 List<Movie>에 저장한 후, 이를 배치 크기로 분할 후 병렬 처리
        - 4차에서는 즉시 배치 크기만큼 쌓일 때마다 저장 & 초기화 → **Buffer** 개념
        - **불필요한 리스트 유지 방지 & GC 부담 감소**
- **배치 크기(BATCH_SIZE=500) 단위 비동기 실행**
    - CompletableFuture.runAsync()를 사용해 **병렬 처리**

이 접근 방식은 처리 시간을 **약 27초**로 단축시켰습니다.

### 5차: JDBC Template과 Bulk Insert

마지막으로, 4차방식에서 JPA 대신 **JDBC Template**을 사용하여 벌크 삽입(bulk insert)으로 변경했습니다.

- 5차: 9,104ms - JDBC Template 활용 및 bulkInsert
- CODE
    
    ```java
    @Slf4j
    @Service
    @RequiredArgsConstructor
    public class MovieBatchService {
        private final JdbcTemplate jdbcTemplate;
        private final int BATCH_SIZE = 500; // 500 Buffer
        
        public void batchMovies() {
            long start = System.currentTimeMillis();
            
            try {
                Reader file = new FileReader("/Users/soonhankwon/Downloads/TMDB_movie_dataset_v11.csv");
                Iterable<CSVRecord> records = CSVFormat.EXCEL.builder()
                                              .setHeader()
                                              .build()
                                              .parse(file);
                
                List<Movie> movies = new ArrayList<>();
                
                for (CSVRecord record : records) {
                    // 레코드 파싱 및 Movie 객체 생성 코드 (동일)
                    // ...
                    movies.add(movie);
                    
                    // 스트리밍 방식
                    if (movies.size() >= BATCH_SIZE) {
                        List<Movie> batch = new ArrayList<>(movies);
                        movies = new ArrayList<>(BATCH_SIZE); // 기존 리스트 초기화
                        CompletableFuture.runAsync(() -> {
                            this.bulkInsert(batch);
                        });
                    }
                }
                
                // 남아있는 데이터 저장
                if (!movies.isEmpty()) {
                    this.bulkInsert(movies);
                }
                
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            
            long end = System.currentTimeMillis();
            log.info("time={}ms", end - start);
        }
        
        private void bulkInsert(List<Movie> movies) {
            String sql = "INSERT INTO movie " +
                "(duration_min, release_date, created_at, updated_at, created_by, genre, rating, thumbnail, title) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                
            jdbcTemplate.batchUpdate(sql, movies, BATCH_SIZE, (ps, movie) -> {
                ps.setInt(1, movie.getDurationMin());
                ps.setDate(2, Date.valueOf(movie.getReleaseDate()));
                ps.setTimestamp(3, Timestamp.valueOf(LocalDateTime.now())); // created_at
                ps.setTimestamp(4, Timestamp.valueOf(LocalDateTime.now())); // updated_at
                ps.setString(5, "SYSTEM"); // created_by
                ps.setString(6, movie.getGenre().name());
                ps.setString(7, movie.getRating().name());
                ps.setString(8, movie.getThumbnail());
                ps.setString(9, movie.getTitle());
            });
        }
    }
    ```
    

이 최종 최적화를 통해 처리 시간을 **약 9초**로 줄일 수 있었으며, 초기 접근 방식에 비해 **약 2,600배의 성능 향상**을 달성했습니다.

### Conclusion

대량의 데이터를 처리할 때는 개별 작업보다 **배치(Batch) 처리**가 훨씬 효율적입니다. 이 최적화 과정에서 얻은 주요 인사이트는 다음과 같습니다:

1. **단일 트랜잭션의 효율성**: 첫 번째 접근 방식(save)과 두 번째 접근 방식(saveAll)의 성능 차이는 트랜잭션 오버헤드의 중요성을 보여줍니다. 여러 개의 작은 트랜잭션보다 하나의 큰 트랜잭션이 더 효율적입니다.
2. **병렬 처리의 효과**: 세 번째 접근 방식에서는 `CompletableFuture`를 사용한 **병렬 처리**를 통해 멀티코어 CPU를 활용하여 성능을 크게 향상시켰습니다. 분할된 데이터들 사이에 연관이 없는 경우 유용하며, 대량 데이터 처리에서 병렬화의 중요성을 보여줍니다.
3. **메모리 효율성**: 네 번째 접근 방식에서는 전체 데이터를 메모리에 로드하지 않고 스트리밍 방식으로 처리하여 메모리 사용량을 줄이면서도 성능을 향상시켰습니다.
4. **ORM vs 저수준 API**: 다섯 번째 접근 방식에서는 JPA 대신 JDBC Template을 사용함으로써 **ORM의 오버헤드를 제거**하고 성능을 최대화했습니다. 대량 데이터 처리에서는 추상화 수준이 낮은 API가 더 효율적일 수 있습니다.
5. **적절한 배치 크기 선택**: 모든 접근 방식에서 배치 크기는 500으로 설정했습니다. 이 값은 현재 환경에서 최적이었지만, 다른 환경에서는 실험을 통해 최적의 값을 찾아야 합니다.