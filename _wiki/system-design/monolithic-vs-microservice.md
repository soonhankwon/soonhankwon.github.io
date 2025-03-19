---
layout  : wiki
title   : Monolithic vs MicroService Architecture
summary : 모놀리스와 마이크로서비스 아키텍처
date    : 2025-03-19 15:24:00 +0900
updated : 2025-03-19 15:24:00 +0900
tag     : monolithic msa system-design
toc     : true
comment : true
public  : true
parent  : [[/system-design]]
latex   : true
---
* TOC
{:toc}

## Monolith Architecture

- Concept
    - 하나의 큰 코드베이스로 모든 기능이 통합된 구조
    - 모든 컴포넌트가 **단일 프로세스** 내에서 실행

- Characteristic
    - **단일 배포**: 모든 기능을 한 번에 Build and Deploy
    - 일관된 코드베이스: **하나의 프로젝트**로 관리
    - 간단한 개발 초기 단계: 작은 팀에서 효율적일 가능성이 매우 큼

- Advantages
    - 간단한 설정: 초기 개발과 배포가 빠름
    - 성능: **단일 프로세스**에서 실행되어 호출 오버헤드가 적음
    - 디버깅 용이: 하나의 코드베이스로 문제를 추적하기 쉬움

- Disadvantages
    - 확장성 제한: **Scale-out**시 비효율적인 문제 발생
    - 유지보수 어려움: 코드베이스가 커질수록 복잡성 증가
    - 배포위험: 작은 변경 사항도 **전체 시스템 재배포**가 필요

- Use cases
    - 초기 스타트업, 소규모 애플리케이션
    - 하지만 꼭 그런것은 아님 → e.g) StackOverFlow

## Microservice Architecture

- Concept
    - 개별 기능을 **독립적**으로 설계하고 **배포 가능한 작은 서비스**들의 집합
    - 각 서비스는 **자체 데이터베이스**와 **비즈니스 로직**을 포함

- Characteristic
    - **독립 배포**: 각 서비스가 **독립적**으로 배포 및 스케일링 가능
    - **모듈화**: 서비스 간 명확한 경계
    - 기술 다양성: 서비스마다 다른 기술 스택 사용 가능(polyglot)

- Advantages
    - 확장성: 서비스별로 독립적으로 확장 가능(**Scale-out**이 효율적임)
    - 유지보수 용이: 작은 코드베이스로 독립 개발 가능
    - 탄력성: 한 서비스 장애가 전체 시스템에 영향을 덜 줌

- Disadvantages
    - 복잡성 증가: **서비스 간 통신** 및 배포 관리 필요
    - **운영 비용** 증가: 각 서비스에 대한 인프라 관리
    - 데이터 Consistency: 분산 트랜잭션 관리 어려움

- Use cases
    - 대규모, 복잡한 애플리케이션
        - e.g) 현재 Facebook, Netfilix, Amazon
        - e.g) Read, Write Service 분리(CQRS)