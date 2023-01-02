---
layout : single
title : "Synchronous(동기) vs Asynchronous(비동기)"
categories : til
tags : [til, web, cs] 
---

**Mention** : 동기는 작업이 차례대로❗️ 비동기는 독립적 작업이 가능함으로 동시 작업가능❗️

## Block vs Non-Block

---

- Block
    - 행위자가 취한 행위 자체가 또는 그 행위로 인해 다른 무엇이 **막혀버린, 제한된, 대기하는** 상태
- 호출된 함수가 자신이 할 일을 모두 마칠 때까지 제어권을 계속 가지고서 호출된 함수에게 바로 돌려주지 않으면 **Block**
- 호출된 함수가 자신이 할 일을 마치지 않았더라도 바로 **제어권을 건네주어(return)** 호출된 함수가 **다른일을 진행할 수 있도록** 해주면 **Non-block**

## Synchronous (동기) vs Asynchronous(비동기)

---

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fol0Ra%2Fbtq2Jy17oEy%2Fn4NdXDY3dGcNGI3eFxvr81%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fol0Ra%2Fbtq2Jy17oEy%2Fn4NdXDY3dGcNGI3eFxvr81%2Fimg.png)

- Syn + Chrono (always plural, can never be singular)
    - **동시(같이, 함께) 에 발생**하는 것들
- 위의 그림을 보면 혼동할 수 있겠지만,  위의 그림의 박스는 작업(task) 단위이다. **호출한 함수가 호출된 함수의 종료까지 신경을 쓰는 경우 (synchronous)** 한 작업이 종료되어야 다음 작업이 가능하다.
- 비동기적 경우 호출된 함수의 결과 및 종료를 **호출된 함수가 직접 신경쓰고 처리**함(asynchoronous)으로 동시 작업(task)가 가능해진다.
    - **호출된 함수**의 수행 결과 및 종료를 **호출한 함수**가 신경쓰면 synchronous
        - 차례차례 작업을 진행하는 것
    - **호출된 함수**의 수행 결과 및 종료를 **호출된 함수** 혼자 직접 신경 쓰고 처리한다면  asynchoronous

### Synchronous programming

---

- 여러 작업(task)들을 **순차적으로** 실행하도록 개발

### Asynchronous programming

---

- 여러 작업들을 **독립적으로** 실행하도록 개발
- ≠ multithreading
    - asynchronous programming의 한 종류
- multi-threads, non-block I/O
- 백엔드 프로그래밍의 추세는 스레드를 적게 쓰면서도 non-block I/O를 통해 전체 처리량을 늘리는 방향으로 발전 중

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

### Summary.

---

- 동기는 데이터의 요청과 결과가 동시에 일어나는것을 말합니다. 사용자가 데이터를 서버에게 요청한다면 그 서버가 데이터 요청에 따른 응답을 사용자에게 다시 리턴해주기 전까지 사용자는 다른 활동을 할 수 없으며 기다려야 합니다.
- 비동기는 동시에 일어나지 않는다는 의미입니다. 서버에게 데이터를 요청한 후 요청에 따른 응답을 계속 기다리지 않아도되며, 다른 외부 활동을 수행하여도되고 서버에게 다른 요청사항을 보내도 상관 없습니다.

Reference 📚

[https://musma.github.io/2019/04/17/blocking-and-synchronous.html](https://musma.github.io/2019/04/17/blocking-and-synchronous.html)

[https://www.youtube.com/watch?v=EJNBLD3X2yg](https://www.youtube.com/watch?v=EJNBLD3X2yg)