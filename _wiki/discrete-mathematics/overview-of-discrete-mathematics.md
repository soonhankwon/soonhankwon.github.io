---
layout  : wiki
title   : Overview of Discrete Mathematics
summary : 
date    : 2025-02-17 14:05:00 +0900
updated : 2025-02-19 10:13:00 +0900
tag     : discrete mathematics
toc     : true
comment : true
public  : true
parent  : [[/discrete-mathematics]]
latex   : true
---
* TOC
{:toc}

## Discrete Mathematics?

수학
- 대수학: eg) 방정식, 선형대수
- 해석학: eg) 미적분
- 기하학: eg) 해석기하학

연속수학
- eg) 연속적인 집합의 그래프
- (연속함수)을 미분하라 &rarr; 타동사

이산수학
- eg) 이산적인 집합의 그래프

---

## 도구, 기법, 방법론

축구의 도구, 기법, 방법론
- 도구: 축구장, 축구공, 축구화, 골대 등
- 기법: 킥, 헤딩, 트래핑 등
- 방법론: 4-2-4, 토털사커 등
    - 누가, 언제, 어디서, 왜, 어떠한 도구와 기법을 사용해야 하는가에 관한 내용

수학의 도구, 기법, 방법론
- 도구: 정의, 정리
- 기법: 가우스 소거법, 근의 공식 등
- 방법론: 상황에 따라 가장 효과적이고 효율적인 도구와 기법을 선택하는 것

### 문제해결

CS
- 문제 &rarr; 정보 &rarr; 처리 &rarr; 문제의 해결책
    - **정보 모델링**을 이용한 문제해결
    - **정보 모델링**이란 실생활의 문제를 컴퓨터에서 해결할 수 있는 형태로 추상화 하는 과정

수학
- 문제 &rarr; 추상모델 &rarr; 변형된 모델 &rarr; 문제의 해결책
    - **수학적 모델링**을 이용한 문제해결
    - **수학적 모델링**이란 수학적 도구로 실생활의 문제를 해결할 수 있도록 **추상화** 하는 과정

### 추상화(abstraction)

추상화란 **문제와 관련된 핵심 내용**을 남기기 위해 **관련 없는 내용을 제거 혹은 단순화** 시키는 과정

- abstract: eg) 논문에서는 **요약**(논문 맨앞에 위치)
- 일정한 인식 목표를 추구하기 위하여 여러 가지 표상이나 개념에서 **특정한 특성이나 속성**을 빼냄
- eg) apple, computer
    - 산지: 프랑스, 독일, 대구 &rarr; but 모두 apple
    - labtop, tablet, personal computer &rarr; but 모두 computer
- eg) 과일가게 아저씨가 사과 1개를 600원 주고 사서 800원에 팔고, 배 1개를 1200원에 주고 사서 1500원에 팔았다고 할 때, 사과와 배를 합하여 총 10개를 팔고 이익이 2400원 생겼다고 하면 사과는 몇 개를 팔았습니까?
    - 추상화 &rarr; let x: 사과, y: 배
    - (800 - 600)x + (1500 - 1200)y = 2400, x + y = 10;
    - 2x + 3y = 24, 2x + 2y = 20 &rarr; y = 4, x = 6 &rarr; 사과는 6개 판매
- 디지털 논리 회로의 간소화
    - eg) 분배법칙

---

## 알고리즘 언어

### 알고리즘과 표현

- 알고리즘([algorithm](https://ko.wikipedia.org/wiki/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98))
    - 어떤 **문제를 해결**하기 위한 여러 동작들의 **유한**한 모임
        - 문제를 풀 수 있나?
    - a set of instructions, sometimes called a procedure or a function, that is used to perform a certain task.
    - an explict step-by-step procedure for solving the problem.
- 알고리즘의 표현방법
    - **컴퓨터 프로그래밍 언어(computer programming language)**
        - 컴퓨터 작동을 위한 동작을 세밀하게 지시
        - 알고리즘의 핵심요소가 잘 드러나지 않음
        - 중요하지 않은 부차적인 표현에 신경써야 함
        - 통일된 언어가 존재하지 않음
    - **순서도(flow chart)**
        - 장점: 알고리즘의 작동방식을 도식화함
        - 단점: 내용이 복잡하거나 프로그램의 크기가 클 경우에 표현하기 어려움
    - **의사코드(pseudo code)**
        - **모호한 부분은 프로그래밍 언어의 문법**을 채용하여 명확하게 기술
        - **구체적으로 표현할 필요가 없는 부분은 자연어**를 통해 설명식 기술
        - **알고리즘의 작동방식을 설명하는 용도**로만 사용
        - C언어를 기반으로 하는 의사코드 사용
- **순차, 선택, 반복**
    - 모든 알고리즘을 풀 수 있다(수학적으로 증명)
    - 프로그래밍 언어의 필수 요소
- 할당문
- 제어문
    - **순차문, 조건문, 반복문**
    - 3가지 제어구조(control structure)
        - A → B → C (Sequence)
        - A → Y or N → B or C (Selection)
        - A → B → Y or N(조건을 만족해야 C 아니면 처음으로) → A or C (Iteration)

### 기본 제어구조

- 순차구조
- 선택구조
    - if문
    - switch문
- 반복구조
    - for문
    - while문
    - foreach문
---

## 이산수학의 응용분야

- 논리: 전문가 시스템(Expert System)
- 증명: 컴퓨터 프로그램의 효과성 및 효율성 입증
- 집합론: 계산, 이론, 데이터베이스 등
- 행렬: 2차원 그래픽, 3차원 그래픽, 기계학습
- 관계: 관계형 데이터베이스
- 함수: 컴퓨터 언어
- 부울대수: 계산, 이론, 디지털 논리회로
- 그래프: 자연어 처리, 컴퓨터 네트워크
- 트리: 자료탐색, 텀퓨터 네트워크, 데이터베이스, 회로망 설계
- 조합이론: 계산 이론
- 정수론: 정보 보안(Data Encryption)
- 오토마타 및 형식 언어: 계산 이론, 문제 해결 가능성