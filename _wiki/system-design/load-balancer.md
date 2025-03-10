---
layout  : wiki
title   : Load Balancer
summary : 로드밸런서
date    : 2025-03-10 10:16:00 +0900
updated : 2025-03-10 10:16:00 +0900
tag     : load-balancer system-design
toc     : true
comment : true
public  : true
parent  : [[/system-design]]
latex   : true
---
* TOC
{:toc}

**트래픽 분산 및 시스템 안정성** 확보

- 클라이언트 요청을 여러 서버에 고르게 분산
- 서버 과부하 방지 및 성능 최적화

| 기능 | Load Balancer | Gateway |
| --- | --- | --- |
| 주요역할 | **트래픽 분산** 및 서버 부하 관리 | 클라이언트와 서버 간의 **통신 관문** 역할 |
| 계층 | L4(TCP/UDP), L7(HTTP/HTTPS) | Application Layer |
| 주요 기능 | 요청 부하 분산, 헬스 체크 | API 관리, 인증, 데이터 변환, 트래픽 라우팅 |
| 사용 목적 | 서버 과부하 방지, 시스템 가용성 향상 | API 중심의 통합 관리 및 클라이언트 요청 처리 |

### Load Balancer 사용시

- 서버 스케일링 전략과 연동(Auto Scaling)
- 트래픽 패턴에 따른 적절한 알고리즘 선택(Round Robin, Least Connections, IP Hash)
    - **트래픽 패턴**, 상태관리, 서버 성능 차이
    - RR(Round Robin): Simple
        - O(1)
    - Least Connections: 서버가 가진 세션 부하를 확인해서 부하 분산 → 불균형 문제 완화
        - n개의 서버를 Scan → O(n)
    - IP Hash: 클라이언트 IP 해싱 → 매핑 → 클라이언트는 항상 동일한 서버로 접속
        - O(1)
    - [Weighted Round Robin](https://en.wikipedia.org/wiki/Weighted_round_robin): 서버간 성능차이가 클 때(서버별로 가중치 부여)

### Gateway 사용시

- 보안 정책 설정(OAuth, JWT 등)
- 데이터 변환 및 요청 속도 제한(Rate Limiting)

### LB & API Gateway

- User → AWS Managed GW, LB for Auth, RateLimiting, Security, Rountng → Micro Architecture, Monolith Architecture
    - RR, Least Connection(시간 복잡도 고려)
- GW, LB 사용시 추가적인 **Network Hop** 발생
    - 간단한 요청이라면 사용안하는것이 유리 & 비용고려