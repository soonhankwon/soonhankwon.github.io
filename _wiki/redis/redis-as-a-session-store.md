---
layout  : wiki
title   : Redis as a session store
summary : 
date    : 2025-03-14 09:12:00 +0900
updated : 2025-03-14 09:12:00 +0900
tag     : redis cache session
toc     : true
comment : true
public  : true
parent  : [[/redis]]
latex   : true
---
* TOC
{:toc}

## Redis as a session store

### Session?

서비스를 사용하는 **클라이언트의 상태 정보**

- 많은 서비스에서 레디스를 세션 스토어로 사용
    - 끊임없이 읽고 쓰게됨 → 응답 속도는 필수적

### 세션 스토어가 필요한 이유

서비스 초창기에는 굳이 세션 스토어가 필요가 없음 → 웹 서버에 세션 스토어를 두고 자체적으로 세션 관리가 가능함

- 서비스 확장 → **웹 서버가 여러 대** → 세션이 서버에 종속된다면 → **sticky session** 문제발생(트래픽을 분산시킬 수 없음)
    - all to all → 모든 세션 정보를 모든 웹서버에 복제 저장 → 불필요 리소스 차지
    - 데이터베이스를 세션 스토어로 사용 → 유저가 많아질수록 → 서비스 전반적인 응답 속도를 저하시키는 요인이 될 수 있음
- **글로벌 세션 스토어** 필요성
    - 어떤 웹 서버에 연결되더라도 **동일한 세션 데이터 조회** 가능
    - **트래픽을 효율적 분산**
    - 데이터 일관성 보장
    - e.g) 레디스 hash 자료 구조 → 세션 데이터를 저장하기 알맞은 형태
        - key: usersession:1, value: name → ABC, IP → 10:20:104:30
    
    ```bash
    HMSET usersession:1 Name Soon IP 12:34:567:89 Hits 1
    OK
    HINCRBY usersession:1 Hits 1
    (integer) 2
    ```
    

### 캐시와 세션의 차이

데이터를 읽고 쓰는 Pattern에 있어 약간의 차이점을 가짐

- Cache: 데이터베이스의 완벽한 **Subset**으로 동작
    - e.g) look aside 전략, 캐시 내부의 데이터가 유실되더라도 데이터베이스에서 찾을 수 있음
- Session: 여러 사용자간 공유되지 않음, 특정 사용자 ID에 한해 유효함 → 따라서 세션이 활성화된 동안은 유저의 데이터를 데이터베이스가 아닌 **세션 스토어에만 저장**
    - 세션이 종료되면 데이터의 종류에 따라 데이터베이스에 저장할 지, 삭제할 지 결정
    - e.g) 최근 봤던 상품 → 삭제, 장바구니 → 저장
- 세션 스토어에 장애가 발생하면 내부 데이터 손실 가능성 → 신중한 운영 필요