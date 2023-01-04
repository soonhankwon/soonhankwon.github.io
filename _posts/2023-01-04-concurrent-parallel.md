---
layout : single
title : "동시성(Concurrency) vs 병렬성(Parallelism)"
categories : til
tags : [til, cs] 
---

**Mention** : 싱글 코어🙋‍♂️와 멀티 코어👨‍👩‍👦‍👦의 차이에서 오는 차이

## 동시성(Concurrency) vs 병렬성(Parallelism)

| 동시성 | 병렬성 |
| --- | --- |
| 동시에 실행되는 것 같이 보이는 것 | 실제로 동시에 여러 작업이 처리되는 것 |
| 싱글 코어에서 멀티 스레드를 동작 시키는 방식 | 멀티 코어에서 멀티 스레드를 동작시키는 방식 |
| 한번에 많은 것을 처리 | 한번에 많은 일을 처리 |
| 논리적인 개념 | 물리적인 개념 |

![https://t1.daumcdn.net/cfile/tistory/99AD02405FBBB94910](https://t1.daumcdn.net/cfile/tistory/99AD02405FBBB94910)

- Context Switching을 통해 동시에 실행되는 것 같이 한다 → 동시성 (싱글 코어)

![https://t1.daumcdn.net/cfile/tistory/995359405FBBB9591C](https://t1.daumcdn.net/cfile/tistory/995359405FBBB9591C)

### Summary.

동시성은 싱글 코어에서 컨텍스트 스위칭을 통해 동시에 실행시키는 것 같이 보이게 하는 논리적인 개념이다.

반면 병렬성은 듀얼 코어에서 실제로 동시에 여러 작업이 실행되고 있는 것을 뜻하는 물리적인 개념이다.

둘다 멀티 스레드 사용을 전제로 한다.

Reference 📚

[https://seamless.tistory.com/42](https://seamless.tistory.com/42)