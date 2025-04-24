---
layout  : wiki
title   : Using Redis as a Message Broker
summary : 레디스를 메시지 브로커로 사용하기
date    : 2025-03-27 16:05:00 +0900
updated : 2025-04-24 16:05:00 +0900
tag     : redis message-broker pub-sub
toc     : true
comment : true
public  : true
parent  : [[/redis]]
latex   : true
---
* TOC
{:toc}

## Using Redis as a Message Broker

최근의 서비스 아키텍처 → 여러 모듈들의 **Loose Coupling** 선호 → 모듈간 탄탄한 **상호 작용** 필요 → 효율적인 **메시징 솔루션(메시지 브로커)** 필요성

- 예기치 못한 장애 → 통신이 안되는 상황 고려 필요
    - **비동기(async) 통신** 사용 권장
    - 동기(sync) 통신 횟수를 줄이는 것이 바람직
- 서비스 간 통신이 불가능한 상황이 바로 장애로 이어지지 않도록, 보낸 메시지를 쌓아 둔 뒤 나중에 처리할 수 있는 채널이 필요함
    - 메시지 브로커의 역할

## Message Queue and Event Stream

- [Message Queue](https://en.wikipedia.org/wiki/Message_queue)
    - 생산자(producer): 데이터를 생성하는 쪽
    - 소비자(consumer): 데이터를 수신하는 쪽
- **이벤트 스트림(Event Stream)**
    - 발행자(publisher): 데이터를 생성하는 쪽
    - 구독자(subscriber): 데이터를 조회하는 쪽
- 주요 차이점
    - **방향성**
        - 메시지 큐의 생산자는 소비자의 큐로 데이터를 직접 **Push**
            - e.g) 2개의 서비스에 같은 메시지를 보내야할 때 메시징 큐에서는 각각 다른 메시징 큐에 **각각 데이터를 Push**
        - 이벤트 스트림의 생산자는 스트림의 특정 저장소에 하나의 메시지를 보낼 수 있고, 메시지를 읽어가고자 하는 소비자들은 스트림에서 같은 **메시지를 Pull**해 갈 수 있다.
    - 데이터의 **영속성**
        - 메시지 큐에서는 소비자가 데이터를 읽어가면 큐에서 **데이터를 삭제**
            - e.g) 메시지를 보내는 도중, 새로운 소비자가 추가된다면 소비자는 새롭게 추가된 이후의 이벤트만 확인 가능
        - 이벤트 스트림에서는 바로 삭제되지 않고, 설정에 따라 **특정 기간 동안 저장될 수 있음**
            - e.g) 스트림에 쌓인 데이터는 일정 기간 동안 지워지지 않기 때문에 새로 추가된 서비스도 스트림에 남아있는 이전 데이터의 히스토리를 볼 수 있음
- 메시지 큐는 **일대일(1:1)** 상황에서 유용하게 사용
- 스트림은 **다대다(n:n)** 상황에서 유리함

### Redis pub/sub

레디스는 아주 가벼운 **pub/sub** 기능 제공

- publisher →(pub)→ 메시지 → [ 특정 Channel ] →(sub)→ 메시지 → subscriber
- **매우 가벼움** → **최소한의 메시지 전달 기능**만 제공
    - 발행자: 메시지를 채널로 보낼 수만 있다.
    - 구독자: 메시지를 받을 수 만 있다.
    - e.g) 모든 구독자에게 메시지가 전달됐는지와 같은 기능 제공하지 않음
- 한 번 전파된 메시지는 레디스에 저장되지 않음
- 단순한 메시지 통로 역할
- 장애가 발생해 메시지를 받지 못하더라도, 사실을 알 수 없다.
    - 정합성이 중요한 데이터 전달에는 적합하지 않을 수 있음
- 메시지 **publish**하기
    
    ```bash
    PUBLISH hello world
    (integer) 0
    ```
    
- 메시지 **구독(subscribe)**하기
    - e.g) event1, event2 채널을 동시 구독
    
    ```bash
    SUBSCRIBE event1 event2
    1) "subscribe"
    2) "event1"
    3) (integer) 1
    1) "subscribe"
    2) "event2"
    3) (integer) 2
    ```
    
    - **PSUBSCRIBE** 일치하는 패턴에 해당하는 채널을 한 번에 구독(glob-style pattern)
        - 메시지는 pmessage 타입으로 전달
        - SUBSCRIBE 커맨드를 이용해 구독하는 방식과 구분됨
    
    ```bash
    PSUBSCRIBE mail-*
    1) "psubscribe"
    2) "mail-*"
    3) (integer) 1
    ```
### 클러스터 구조에서의 pub/sub

Redis Cluster: 레디스가 자체적으로 제공하는 **데이터 분산** 형태의 구조

- 클러스터: 대규모 서비스에서 **데이터를 분산, 저장하고 처리**하기 위해 도입
    - Redis 클러스터 내에서 기본 pub/sub 사용 시, 메시지가 클러스터의 모든 노드에서 구독자를 찾는 방식으로 동작 → 클러스터 환경에서 네트워크 부하 발생 가능성
    - 불필요한 리소스 사용과 네트워크 부하를 줄이기 위한 개선 필요

### sharded pub/sub

비효율을 해결하기 위해 레디스 7.0에서 도입

- 각 **channel**은 **slot**에 매핑
    - 같은 슬롯을 가지고 있는 노드 간에만 pub/sub 메시지를 전파
    
    ```bash
    SPUBLISH apple a
    (integer) 0
    SSUBSCRIBE apple
    1) "ssubscribe"
    2) "apple"
    3) (integer) 1
    ```
    
- SPUBLISH 커맨드로 발행된 메시지는 모든 노드에 전파되지 않으며, 해당 슬롯을 담당하는 노드와 그 **노드의 복제본(replica)**에만 전달
- Sharded pub/sub을 이용 → 클러스터 구조에서 pub/sub 되는 메시지가 모든 노드로 전파되지 않기 때문에 불필요한 복제를 줄여 자원을 절약할 수 있다.