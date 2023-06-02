---
layout : single
title : "Synchronous(동기) vs Asynchronous(비동기) & Blocking vs Non-Blocking"
categories : cs
tags : [til, web, cs] 
---

**Mention** : 동기는 작업이 차례대로❗️ 비동기는 독립적 작업이 가능함으로 동시 작업가능❗️

## 개요

---

- 프로세스의 **수행 순서 보장**에 대한 매커니즘
    - 동기, 비동기
- 프로세스의 **유휴 상태**에 대한 개념
    - 블로킹, 논블로킹
- **제어권**
    - 자신(함수)의 코드를 실행할 권리. 제어권을 가진 함수는 자신의 **코드를 끝까지 실행**한 후, 자신을 호출한 함수에게 돌려준다.
- **결과값을 기다린다는 것**
    - A함수에서 B함수를 호출했을 때, A함수가 B함수의 **결과값을 기다리느냐**의 여부

## Async & Sync

---

처리해야 할 작업들을 **어떠한 흐름**으로 처리 할 것인가에 대한 관점

즉, 호출되는 함수의 **작업 완료 여부**를 신경쓰냐? & Blocking vs Non-Blocking

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fol0Ra%2Fbtq2Jy17oEy%2Fn4NdXDY3dGcNGI3eFxvr81%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fol0Ra%2Fbtq2Jy17oEy%2Fn4NdXDY3dGcNGI3eFxvr81%2Fimg.png)

### Synchronous

---

호출하는 함수 A가 호출되는 함수 B의 **작업 완료 후 리턴**을 기다리거나, 바로 리턴 받더라도 미완료 상태라면 **작업 완료 여부를 스스로 계속 확인**하며 신경쓰면 Sync

- **호출한 함수가 호출된 함수의 종료까지 신경을 쓰는 경우 (synchronous)** 한 작업이 종료되어야 다음 작업이 가능하다.

### Synchronous programming

---

- 여러 작업(task)들을 **순차적으로** 실행하도록 개발

### Asynchronous

---

함수 A가 함수 B를 호출할 때 **콜백 함수를 함께 전달**해서, 함수 B의 작업이 완료되면 함께 보낸 콜백 함수를 실행한다.

- 함수 A는 함수 B를 호출한 후로 함수 B의 작업 완료 여부는 **신경쓰지 않는다.**
- 비동기적 경우 호출된 함수의 결과 및 종료를 **호출된** 함수가 **직접 신경쓰고 처리함**으로 동시 작업(task)이 가능해진다.
    - **콜백 함수 & 멀티 쓰레드**

### Asynchronous programming

---

- 여러 작업들을 **독립적으로** 실행하도록 개발
- ≠ multithreading
    - asynchronous programming의 한 종류
- multi-threads, non-block I/O
- 백엔드 프로그래밍의 추세는 스레드를 적게 쓰면서도 non-block I/O를 통해 전체 처리량을 늘리는 방향으로 발전 중

## Blocking & Non-Blocking

---

- 처리되어야 하는 작업이, **전체적인 흐름을 막느냐 안막느냐**에 대한 관점
- 즉, **제어권**이 누구한테 있느냐가 관심사
- **호출된 함수**가 자신이 할 일을 모두 마칠 때까지 제어권을 계속 가지고서 호출한 함수에게 바로 돌려주지 않으면 **Blocking**
    - 호출한 함수가 **제어권**을 가지고 있지 않으면 블로킹 (자신의 코드흐름이 막힌다.)
- **호출된 함수**가 자신이 할 일을 마치지 않았더라도 바로 **제어권을 건네주어** 호출한 함수가 **다른일을 진행할 수 있도록** 해주면 **Non-blocking**
    - 호출한 함수가 제어권을 가지고 있으면 **논블로킹** (자신의 코드 흐름은 그대로)

### Blocking

---

- 전체적인 **흐름을 막는다**.
- A 함수가 B 함수를 호출하면, **제어권을 A가 호출한 B 함수에 넘겨준다.**
- A 함수가  B 함수를 호출하면 B에게 제어권을 넘긴다.
- 제어권을 넘겨받은 B는 열심히 함수를 실행한다. A는 B에게 제어권을 넘겨주었기 때문에 함수 실행을 잠시 멈춘다.
- B 함수는 실행이 끝나면 자신을 호출한 A에게 제어권을 돌려준다.

### Non-Blocking

---

- 전체적인 **흐름을 안막는다**.
- A 함수가 B 함수를 호출해도 **제어권은 그대로 자신이 가지고 있는다**.
- A 함수가 B 함수를 호출하면, B 함수는 실행되지만, **제어권은 A 함수가 그대로 가지고 있는다**.
- A 함수는 계속 제어권을 가지고 있기 때문에 B 함수를 호출한 이후에도 자신의 코드를 계속 실행한다.
- 다른 주체의 작업에 관련없이 자신의 작업을 하는것

## Sync & Async + Blocking & Non-Blocking

---

### Sync + Blocking

함수 A는 함수 B의 **리턴값을 필요**로 한다. (동기)

그래서 **제어권**을 함수 B에게 넘겨주고, 함수 B가 실행을 완료하여 리턴값과 제어권을 돌려줄때까지 **기다린다**. (블로킹)

ex) 자바 코드 실행 후 커맨드에서 입력받기

```
손님 : 치킨 한마리 부탁해요~!
치킨집 사장 : 넵, 잠시 기다려주세요
손님 : (아무것도 안하고 기다림)
치킨집 사장 : (치킨을 만든다.)
손님 : (지켜보는중)
치킨집 사장 : 치킨 나왔습니다.
손님 : 감사합니다.
```

### Sync + Non-Blocking

A 함수는 B 함수를 호출한다.

이 때 A 함수는 B 함수에게 **제어권**을 주지않고, **자신의 코드를 계속 실행한다**. **(논블로킹)**

그런데 A함수는 B 함수의 리턴값이 필요하기 때문에, **중간중간 B 함수에게 함수 실행을 완료했는지 물어본다. (동기)**

ex) 게임에서 데이터 로드율 표시

```
손님 : 치킨 한마리 부탁해요~!
치킨집 사장 : 넵, 잠시 기다려주세요
손님 : 치킨 다 나왔나요?
치킨집 사장 : 아직이요.
손님: 다 하셨나요?
치킨집 사장 : 여기요~!
손님 : 감사합니다.
```

### Async + Non-Blocking

A 함수는 B 함수를 호출한다.

이 때 **제어권**을 B 함수에게 주지 않고, **자신이 계속 가지고 있는다**. 따라서 B 함수를 호출한 이후에도 멈추지 않고 **자신의 코드를 계속 실행한다. (논블로킹)**

그리고 B 함수를 호출할 때 **콜백함수**를 같이 준다. **B 함수는 자신의 작업이 끝나면 A 함수가 준 콜백 함수를 실행한다. (비동기)**

ex) WebFlux

```
손님 : 치킨 한마리 부탁해요~!
치킨집 사장 : 넵 다하고 말씀드릴께요
손님 : (편의점에 맥주를 사러간다.)
치킨집 사장 : 치킨 나왔습니다.
```

### Async + Blocking

A 함수는 B 함수의 리턴값에 신경쓰지 않고, 콜백 함수를 보낸다. (비동기)

그런데, B 함수의 작업에 관심 없음에도 불구하고, A 함수는 B 함수에게 제어권을 넘긴다. (블로킹)

따라서, A 함수는 자신과 관련 없는 B 함수의 작업이 끝날 때 까지 기다려야한다.

- Async-blocking 의 경우 sync-blocking과 성능의 차이가 비슷하기 때문에 사용하는 경우는 거의 없다.
- Non-blocking으로 하다가 실수하려는 경우 발생하거나, 의도치 않게 사용되는 경우가 많다.

### I/O 관점에서

---

- synchronous I/O = block I/O
    - asynchronous I/O = non-block I/O
- synchronous I/O : **요청자**가 **I/O 완료까지 챙겨야 할 때**
    - asynchronous I/O : **완료를 noti** 주거나 **callback**으로 처리

### 백엔드 아키텍처

---

- 하나의 서비스는 기능과 역할에 따라 여러 개의 마이크로 서비스로 구성되고 이들 사이에는 **빈번하게 커뮤니케이션**이 발생한다.
- synchronous communication
    - 하나가 응답 불능에 빠지면 다른 것 까지 불능에 빠질 수 있다
- asynchronous communication
    - Q를 사용 (Message Q)
    - 장애가 일부에 머물러있기 떄문에 전체에 영향을 미치지는 않는다.


### Reference.

[https://musma.github.io/2019/04/17/blocking-and-synchronous.html](https://musma.github.io/2019/04/17/blocking-and-synchronous.html)

[https://www.youtube.com/watch?v=EJNBLD3X2yg](https://www.youtube.com/watch?v=EJNBLD3X2yg)

[https://inpa.tistory.com/entry/👩‍💻-동기비동기-블로킹논블로킹-개념-정리](https://inpa.tistory.com/entry/%F0%9F%91%A9%E2%80%8D%F0%9F%92%BB-%EB%8F%99%EA%B8%B0%EB%B9%84%EB%8F%99%EA%B8%B0-%EB%B8%94%EB%A1%9C%ED%82%B9%EB%85%BC%EB%B8%94%EB%A1%9C%ED%82%B9-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC)