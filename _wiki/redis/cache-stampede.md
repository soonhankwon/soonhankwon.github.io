---
layout  : wiki
title   : Cache stampede
summary : 
date    : 2025-03-13 16:12:00 +0900
updated : 2025-03-13 16:12:00 +0900
tag     : redis cache
toc     : true
comment : true
public  : true
parent  : [[/redis]]
latex   : true
---
* TOC
{:toc}

## Cache stampede

모든 키에 대해 **TTL**을 설정하는 것은 권장됨

- 대규모 트래픽 환경에서 만료 시간을 어떻게 설정하냐에 따라 [캐시 스탬피드(cache stampede)]((https://en.wikipedia.org/wiki/Cache_stampede))와 같은 예상치 못한 문제 상황 발생
- look aside 방식 → **특정 키가 만료**되는 시점 → 만약 여러 개의 애플리케이션에서 바라보던 키가 레디스에서 만료되 삭제된다면?
    - 한꺼번에 데이터베이스에서 데이터를 읽어옴 → **중복 읽기(duplicate read)**와 **중복 쓰기(duplicate write)** 발생 → 데이터베이스 부하 → 서비스 이슈 가능성
- 더 많은 데이터가 이 현상에 영향을 받음 → 더 큰 문제 → **계단적 실패(cascadeing failure)**

### 적절한 만료시간 설정

캐시 스탬피드를 줄이기 위한 가장 간단한 방법

- 만료 시간을 너무 짧지 않게 설정하는 것
- 여러 애플리케이션에서 **한꺼번에 접근**해야 하는 데이터이며, **반복적으로 사용**돼야 하는 데이터라면 만료 시간을 충분히 길게 설정하는 것이 좋음

### 선 계산

캐시 스탬피드의 문제 → 데이터가 만료되는 시점에 여러 애플리케이션에서 동시다발적으로 이를 인지하고 작업을 **동시진행**하기 때문

- 키가 실제로 만료되기 전에 이 값을 **미리 갱신**해준다면 불필요한 프로세스를 감소시킬 수 있다.
    - e.g) random, expiry_gap 사용 캐시갱신 스케줄링

### PER 알고리즘

**확률적 조기 재계산 알고리즘(Probabilistic Early Recomputation)**

- 캐시 값이 만료되기 전에 언제 데이터베이스에 접근해서 값을 읽어오면 되는지 최적으로 계산 가능

```
currentTime - ( timeToCompute * beta * log(rand()) ) > expiry
```

- currentTime: 현재 남은 만료 시간
- timeToCompute: 캐시된 값을 다시 계산하는 데 걸리는 시간
- beta: 기본적으로 1.0보다 큰 값으로 설정 가능
- rand(): 0 ~ 1 사이의 랜덤 값을 반환하는 함수
- expiry: 키를 재설정할 때 새로 넣어줄 만료 시간
- timeToCompute * beta * log(rand()) → 무작위성 값
- currentTime - ( timeToCompute * beta * log(rand()) ) > expire == 거짓
- **만료 시간이 가까워질수록 참이될 확률이 높아진다.**
    - 만료 시간이 점점 다가올 때 더 자주 만료된 캐시 항목을 확인하게 됨
    - 불필요한 재계산을 효과적으로 방지하는 효율적인 방식