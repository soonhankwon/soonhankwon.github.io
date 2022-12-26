---
layout : single
title : "Protocol & OSI 7 Layer"
categories : til
tags : [til, web, network] 
---

**Mention** : 컴퓨터들도 통신하기 위해서는 언어체계가 필요합니다🗣, 브라우저에서 전기신호로 가는 과정

## Protocol

- 컴퓨터 통신의 과정에서 대화할 때 특정 언어 체계가 필요함
- **네트워크 아키텍처**를 이용하여 대화한다.
    - 네트워크 아키텍처라는 큰 틀 속에서 세부적으로 데이터 형식, 통신 절차 등의 규칙이 필요
    - 이 규칙을 **프로토콜** 이라고 한다.
    
    ![osimodel](https://user-images.githubusercontent.com/113872320/209508117-1c70e453-1b7f-4d94-8725-9cbf91a0b45f.jpeg)
    
- 네트워크는 각 계층마다 주요 프로토콜이 존재

## OSI Model

- OSI Model (Open Systems Interconnection Reference Model)
    - 개방형 시스템 상호 연결 모델
    - 다양한 통신 시스템이 표준 프로토콜을 사용하여 통신할 수 있도록 국제 표준화 기구가 만든 개념모델
    - 컴퓨터 네트워킹을 위한 보편적인 언어
    - 최근의 인터넷은 OSI 모델을 엄격하게 따르지 않지만 OSI 모델은 여전히 네트워크 문제 해결에 유용하다.
    - 문제를 모델의 특정 계층으로 좁혀서, 불필요한 작업을 많이 피할 수 있다.

## OSI 7 layer

- OSI 모델의 7가지 추상 계층은 탑 다운 방식이다.

### 7. 응용 프로그램 계층

![https://cf-assets.www.cloudflare.com/slt3lc6tev37/koKt5UKczRq47xJsexfBV/c1e1b2ab237063354915d16072157bac/7-application-layer.svg](https://cf-assets.www.cloudflare.com/slt3lc6tev37/koKt5UKczRq47xJsexfBV/c1e1b2ab237063354915d16072157bac/7-application-layer.svg)

- 이 계층은 사용자의 **데이터와 직접 상호 작용**하는 유일한 계층
    - 애플리케이션 계층은 소프트웨어가 사용자에게 의미 있는 데이터를 제공하기 위해 의존하는 프로토콜과 데이터를 조작하는 역할
    - HTTP, SMTP(e-mail)

### 6. 프레젠테이션 계층

![https://cf-assets.www.cloudflare.com/slt3lc6tev37/60dPoRIz0Es5TjDDncEp2M/7ad742131addcbe5dc6baa16a93bf189/6-presentation-layer.svg](https://cf-assets.www.cloudflare.com/slt3lc6tev37/60dPoRIz0Es5TjDDncEp2M/7ad742131addcbe5dc6baa16a93bf189/6-presentation-layer.svg)

- 이 계층은 주로 **데이터를 준비**하는 역할
- 애플리케이션 계층이 이를 사용할 수 있게 한다.
    - 즉, 애플리케이션이 소비할 수 있도록 데이터를 프레젠테이션한다.
- 데이터의 변환, 암호화, 압축을 담당
    - 서로 통신하는 두 개의 통신 장치는 서로 다른 인코딩 방법을 사용하고 있을 수 있다.
        - 수신 장치의 애플리케이션 계층이 이해할 수 있는 구문으로 수신 데이터를 변환
    - 장치가 암호화된 연결을 통해 통신하는 경우
        - 최종 송신자에게 암호화를 추가
        - 최종 수신자에게 암호화를 디코딩하여 애플리케이션 계층에 제시
    - 애플리케이션 계층에서 수신한 데이터를 계층5로 전송하기 전에 압축
        - 전송할 데이터의 양을 최소화, 통신의 속도와 효율을 높임

### 5. 세션 계층

![https://cf-assets.www.cloudflare.com/slt3lc6tev37/6jFRnaZSuIMoUzSotZXYbG/cc7a47d2b3f8d3e77b9ffbdb8b8d5280/5-session-layer.svg](https://cf-assets.www.cloudflare.com/slt3lc6tev37/6jFRnaZSuIMoUzSotZXYbG/cc7a47d2b3f8d3e77b9ffbdb8b8d5280/5-session-layer.svg)

- 두 기기 사이의 **통신을 시작하고 종료**하는 일을 담당
- 통신이 시작될 때부터 종료될 때까지의 시간을 세션이라고 한다.
    - 교환되고 있는 모든 데이터를 전송할 수 있도록 충분히 오랫동안 세션을 개방한 다음 리소스를 낭비하지 않기 위해 세션을 즉시 닫을수 있도록 보장
    - 데이터 전송을 체크포인트와 동기화
        - 연결이 끊어지거나 충돌이 발생하면 마지막 체크 포인트에서 세션을 재개

### 4. 전송 계층

![https://cf-assets.www.cloudflare.com/slt3lc6tev37/1MGbIKcfXgTjXgW0KE93xK/64b5aa0b8ebfb14d5f5124867be92f94/4-transport-layer.svg](https://cf-assets.www.cloudflare.com/slt3lc6tev37/1MGbIKcfXgTjXgW0KE93xK/64b5aa0b8ebfb14d5f5124867be92f94/4-transport-layer.svg)

- 두 기기 간의 종단 간 통신을 담당
- 세션 계층에서 데이터를 가져와서 계층 3으로 보내기 전에 **세그먼트**라고 하는 조각으로 분할하는 일이 포함
- 수신 기기의 전송 계층은 세그먼트를 세션 계층이 이용할 수 있는 데이터로 재조립
- 흐름 제어 및 오류 제어 담당
    - 흐름 제어는 최적의 전송 속도 결정
    - 수신된 데이터가 완전한지 확인, 완전하지 않은 경우 재전송 요청 → 오류 제어

### 3. 네트워크 계층

![https://cf-assets.www.cloudflare.com/slt3lc6tev37/3MR4mPOwaos80t1annw7BG/8ea1c59ccfa1baf6e9738773daa30450/2-data-link-layer.svg](https://cf-assets.www.cloudflare.com/slt3lc6tev37/3MR4mPOwaos80t1annw7BG/8ea1c59ccfa1baf6e9738773daa30450/2-data-link-layer.svg)

- 네트워크 계층은 두 개의 상이한 **네트워크 간**의 데이터 전송을 촉진하는 일을 담당
    - 발신자의 기기에서 전송 계층의 세그먼트를 **패킷**이라고 하는 더 작은 단위로 분리
    - 수신 장치에서는 이러한 패킷을 재조립
- 데이터가 대상에 도달할 수 있는 최상의 물리적 경로를 찾음
    - 라우팅

### 2. 데이터 연결 계층

![https://cf-assets.www.cloudflare.com/slt3lc6tev37/3MR4mPOwaos80t1annw7BG/8ea1c59ccfa1baf6e9738773daa30450/2-data-link-layer.svg](https://cf-assets.www.cloudflare.com/slt3lc6tev37/3MR4mPOwaos80t1annw7BG/8ea1c59ccfa1baf6e9738773daa30450/2-data-link-layer.svg)

- 데이터 연결 계층은 네트워크 계층과 매우 유사하지만, 동일한 네트워크에 있는 두 기기 간의 전송을 촉진
    - **네트워크 내** 통신 흐름 제어 및 오류제어 담당
- 네트워크 계층에서 패킷을 가져와 **프레임**이라고 하는 더 작은 조각으로 나눔

### 1. 물리적 계층

![https://cf-assets.www.cloudflare.com/slt3lc6tev37/3m1ZkcaaBYHoodrEO3brv2/2819c4db294631b5753cd55de0c01bd9/1-physical-layer.svg](https://cf-assets.www.cloudflare.com/slt3lc6tev37/3m1ZkcaaBYHoodrEO3brv2/2819c4db294631b5753cd55de0c01bd9/1-physical-layer.svg)

- 케이블, 스위치 등 데이터 전송과 관련된 물리적 장치 포함
- 데이터가 1과 0으로 구성된 문자열인 **비트 스트림**으로 변환
    - 두 기기에서 1과 0을 구별할 수 있도록 두 기기의 물리적 계층이 신호 규칙에 합의하여야 한다.

## OSI모델을 통해 데이터가 전송되는 방법

- ex) soonhan은 kyuri에게 이메일을 보내려고한다. soonhan은 자신의 노트북에 있는 이메일 어플리케이션에서 메세지를 작성하고 send를 누른다.
- soonhan의 이메일 어플리케이션은 이메일 메세지를 애플리케이션 계층으로 넘긴다.
    - 캡슐화 시작
- 7. **애플리케이션 레이어**는 프로토콜(SMTP)를 선택해 데이터를 프레젠테이션 계층으로 전달
- 6. **프레젠테이션 계층**이 **압축**한 데이터는 세션 계층으로 전달 (암호화, 변환)
- 5. **세션 계층**은 **세션**을 시작
- 4. 데이터는 **전송 계층**에서 **세그먼트**로 나누어짐
- 3. 세그먼트는 **네트워크 계층**에서 **패킷**으로 다시 나누어짐
- 2. 패킷은 **데이터 연결 계층**에서 **프레임**으로  다시 나누어짐
- 1. 데이터를 1과 0의 **비트 스트림**으로 변환해서 물리적 매체를 통해 전송
- kyuri의 컴퓨터가 물리적 매체를 통해 비트 스트림을 수신하면 반대 순서로 계층을 지나게됨
    - 역캡슐화 시작

### Encapsulation & Decapsulation 💊

- 데이터를 상위 혹은 하위 계층으로 보내는 과정에서 **캡슐화, 역캡슐화** 라는 과정을 거친다.
    - 헤더(Header)
        - 데이터를 캡슐화할 때 데이터 앞에 덧붙여지는 부가정보
    - 캡슐화 (Encapsulaton)
        - 헤더를 붙여나가는 것
    - 역캡슐화 (Decapsulation)
        - 헤더를 제거하는 것

### PDU (Protocol Data Unit)

- PDU (Protocol Data Unit)
    - 층 1(물리 계층) PDU – 비트(스트림)
    - 층 2(데이터 링크 계층) PDU – 전달정보(프레임)
    - 층 3(네트워크 계층) PDU – 패킷 혹은 UDP의 데이터그램
    - 층 4(전송 계층) PDU – TCP 세그먼트
    - 층 5-6-7 (응용 계층) PDU – 메시지, 데이터

Reference 📚

[https://www.cloudflare.com/ko-kr/learning/ddos/glossary/open-systems-interconnection-model-osi/](https://www.cloudflare.com/ko-kr/learning/ddos/glossary/open-systems-interconnection-model-osi/)