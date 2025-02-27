---
layout  : wiki
title   : Using Redis as a cache
summary : 
date    : 2025-02-19 16:07:00 +0900
updated : 2025-02-27 15:03:00 +0900
tag     : redis cache
toc     : true
comment : true
public  : true
parent  : [[/redis]]
latex   : true
---
* TOC
{:toc}

## Redis and Cache

### Cache?

데이터의 원본보다 더 빠르고 효율적으로 액세스할 수 있는 임시 데이터 저장소

- 사용자가 동일한 정보를 반복적 엑세스 → 원본이 아닌 [Cache](https://ko.wikipedia.org/wiki/%EC%BA%90%EC%8B%9C) 에서 데이터 조회 → 리소스 절약
- 캐시 도입의 적합한 조건들
    - 원본 데이터 저장소에서 원하는 데이터를 찾기 위해 검색시간이 오래걸리거나, 매번 연산을 통해 데이터를 조회해야 함
    - 캐시에서 데이터를 가져오는 것이 원본 저장소 데이터를 조회하는 것보다 빨라야 함
    - 캐시에 저장된 데이터는 잘 변하지 않는 데이터
    - 캐시에 저장된 데이터는 자주 검색되는 데이터
- 장점
    - 애플리케이션 응답 속도 감소 → 대기시간 단축
    - 원본 데이터를 읽는 Connection 감소 → 원본 데이터 저장소 부하 감소
    - 원본 데이터 조회시 CPU, 메모리 리소스 크게 사용하는 경우 → 캐시사용으로 애플리케이션 자체의 리소스 절약 가능
    - 원본 데이터 저장소 장애 → 캐시에서 데이터 조회 사용 → 장애시간 감소

### Redis as a cache

Very simple to use.

- Key-Value 형태로 저장 → 데이터를 저장하고 반환하는 것이 심플함
- 자체적으로 다양한 자료 구조(Datastructures) 제공
- 인메모리(In-memory) 데이터 저장소 → 데이터 검색 및 리턴이 상당히 빠르다.
- 자체적인 고가용성 기능(Sentinel 또는 Cluster) → 마스터 노드의 장애를 자동으로 감지 → [failover](https://ko.wikipedia.org/wiki/%EC%9E%A5%EC%95%A0_%EA%B7%B9%EB%B3%B5_%EA%B8%B0%EB%8A%A5) → 캐시정상 유지 
- 레디스 클러스터 → 캐시의 Scale-out 또한 쉽게 처리 가능

### Caching Strategy

데이터의 유형과 데이터에 대한 Access Pattern에 따라 적절한 캐싱 전략을 선택해야 함

- 읽기 전략 - look aside
    - 찾고자 하는 데이터가 캐시에 있는지를 확인 → 있으면 캐시에서 데이터를 읽어온다(Cache Hit)
    - 찾고자 하는 데이터가 없을 때 → Cache Miss → 데이터베이스에 접근해 찾고자하는 데이터를 가져온다 → 다시 캐시에 저장한다.
    - 장점: 레디스에 문제가 생겨 접근을 할 수 없는 상황이 발생 → 데이터베이스에서 데이터를 가져옴 → 서비스 장애로 이어지지 않음
    - 단점: 기존 레디스를 통해 데이터를 가져오는 연결이 많았다면 → 모든 커넥션이 한번에 데이터베이스로 몰려서 부하 발생 → 응답 및 리소스 문제로 성능 저하 가능성
    - Lazy loading
        - 기존 서비스에 갑자기 Redis를 도입한다면?
        - 매번 Redis에 접근 → Cache Miss → 데이터베이스 재접근 → 성능 지연
    - Cache warming 필요
        - 미리 데이터베이스에서 캐시로 데이터를 밀어넣어주는 방법
- 쓰기 전략과 캐시의 일관성
    - 캐시와 원본 데이터가 동일한 값을 유지하는 것은 필수적
    - 어느 한 쪽만 수정된다면? 데이터간 불일치 → 캐시 불일치(Cache inconsistency)