---
layout  : wiki
title   : CAP theory concepts and application scenarios
summary : CAP 이론 개념 및 적용 시나리오
date    : 2025-02-28 11:38:00 +0900
updated : 2025-02-28 11:38:00 +0900
tag     : cap system-design
toc     : true
comment : true
public  : true
parent  : [[/system-design]]
latex   : true
---
* TOC
{:toc}

### [CAP](https://www.ibm.com/kr-ko/topics/cap-theorem) 이론

분산 시스템에서 세 가지를 모두 동시에 만족할 수 없다.

- 두 가지를 선택하면 한 가지를 희생해야 한다.
- **일관성(Consistency)**
    - 모든 클라이언트는 항상 동일한 데이터를 읽을 수 있다.
    - eg) 데이터 업데이트 후, 모든 노드가 동일한 최신 데이터를 반환
- **가용성(Availability)**
    - 모든 요청에 대해 항상 응답이 가능하다.
    - eg) 네트워크 장애 발생 시에도 노드가 요청에 응답
- **파티션 허용성(Partition Tolerance)**
    - 네트워크 장애(파티션)가 발생해도 시스템이 동작을 유지한다.
    - eg) 노드 간 통신이 단절되더라도 데이터는 손실되지 않고 동작.

### CAP 이론 - 시스템 디자인 적용

- **서비스 특성**에 맞는 선택
    - 일관성 우선(CP): 금융, 주문 시스템 등 **정확성**이 중요한 경우.
    - e.g) RDB, transaction
    - 가용성 우선(AP): 소셜 미디어, 캐시 등 **빠른 응답**이 중요한 경우.
    - e.g) Dynamo DB, Twitter Time Line
- CAP 이론을 뛰어넘는 접근법
    - BASE 모델: AP 시스템에서 [Eventually Consistency](https://ko.wikipedia.org/wiki/%EA%B6%81%EA%B7%B9%EC%A0%81_%EC%9D%BC%EA%B4%80%EC%84%B1)(최종 일관성)을 보장
    - Hybrids: 일부 시스템은 특정 요구사항에 따라 CAP 요소를 조정