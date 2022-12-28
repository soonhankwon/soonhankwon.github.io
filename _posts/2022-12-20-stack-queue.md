---
layout : single
title : "스택(Stack) 그리고 큐(Queue)"
categories : til
tags : [til, datastructure] 
---

**Mention** : 쌓는가🏗, 줄을 서는가🎢?
- 배열에서 발전된 형태의 자료구조
- 스택과 큐는 일종의 규칙이다.
- 추상적 자료구조 (ADT)
    - 자료구조의 방법이 코드로 정의 된 것이 아니다.
    - 구조의 행동 양식만 정의된 것을 뜻함
    
## 스택 (Stack)

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fby1qnT%2FbtqBE1v1UlX%2FzbnXdYnGAXhMYbcDCca6WK%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fby1qnT%2FbtqBE1v1UlX%2FzbnXdYnGAXhMYbcDCca6WK%2Fimg.png)

- 스택(Stack) 이란 쌓아 올린다는 것을 의미한다. 따라서 스택 자료구조라는 것은 차곡차곡 쌓아 올린 형태의 자료구조를 말한다.

### 스택의 특징

- 스택은 위의 사진 처럼 **같은 구조와 크기의 자료를 정해진 방향으로만** 쌓을수 있고, top으로 정한 곳을 통해서만 접근할 수 있다.
    - top의 가장 위에 있는 자료는 가장 최근에 들어온 자료를 가리키고 있다.
    - 삽입되는 새 자료는 top이 가리키는 자료의 위에 쌓이게 된다.
    - 스택에서 자료를 삭제할 때도 top을 통해서만 가능하다.
    - top을 통해 삽입하는 연산을 **‘push’** 삭제하는 연산을 **‘pop’** 이라고 한다.
    - **peek** 은 top 위치에 현재 있는 데이터를 단순 확인하는 연산
- 따라서 스택은 시간 순서에 따라 자료가 쌓여서 **가장 마지막에 삽입된 자료가 가장 먼저 삭제**된다는 구조적 특징을 지님
- 이러한 스택의 구조를 **후입선출(LIFO, Last-In-First-Out) 구조**이라고 한다.
- 비어있는 스택에서 원소를 추출하려고 할 때 **stack underflow**라고 하며, 스택이 넘치는 경우 **stack overflow**라고 한다.
- 깊이 우선 탐색 (DFS),  백트래킹 종류의 코딩 테스트에 효과적

### 스택의 활용 예시

- 스택의 특징인 LIFO 을 활용하여 여러 분야에서 활용 가능
    - 웹 브라우저 방문기록 (뒤로 가기) : 가장 나중에 열린 페이지부터 다시 보여준다.
    - 역순 문자열 만들기 : 가장 나중에 입력된 문자부터 출력한다.
    - 실행 취소 (undo) : 가장 나중에 실행된 것부터 실행을 취소한다.
    - 후위 표기법 계산
    - 수식의 괄호 검사 (연산자 우선순위 표현을 위한 괄호 검사)

## 큐(Queue)

![https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221213113312/Queue-Data-Structures.png](https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221213113312/Queue-Data-Structures.png)

- Queue 란 게임에서 흔히 볼 수 있는데, ‘큐를 돌린다’ 즉 대기한다, 줄을 서서 기다리는 것을 의미한다.
    - 따라서, **선입선출 (FIFO, First in first out) 방식의 자료구조**를 말한다.

### 큐의 특징

- 정해진 한 곳(top)을 통해서 삽입, 삭제가 이루어지는 스택과는 달리 큐는 한쪽 끝에서 삽입 작업이, 다른 쪽 끝에서 삭제 작업이 양쪽으로 이루어 진다.
- **삭제 연산**만 수행되는 곳을 **프론트(front)**, **삽입 연산**만 수행되는 곳을 **리어(rear)** 로 정하여 각각의 연산작업만 수행된다.
- 이때, 큐의 프론트에서 이루어지는 삭제연산을 **디큐(dnQueue)**, 큐의 리어에서 이루어지는 삽입연산을 **인큐(enQueue)** 라고 부른다.
    - 큐의 가장 첫 원소를 front / 가장 끝 원소를 rear
    - 큐는 들어올 때 rear로 들어오지만 나올때는 front부터 빠지는 특성
    - 접근방법은 가장 첫 원소와 끝 원소로만 가능
    - 가장 먼저 들어온 프론트 원소가 가장 먼저 삭제
- 즉, 큐에서 프론트 원소는 가장 먼저 큐에 들어왔던 첫 번째 원소가 되는 것이며, 리어 원소는 가장 늦게 큐에 들어온 마지막 원소가 되는 것이다.

### 큐의 활용 예시

- 큐는 주로 데이터가 입력된 **시간 순서대로 처리**해야 할 필요가 있는 상황에 이용한다.
    - 우선순위가 같은 작업 예약 (프린터의 인쇄 대기열)
    - 은행 업무
    - 콜센터 고객 대기시간
    - 프로세스 관리
    - 너비 우선 탐색(BFS, Breadth-First Search) 구현
    - 캐시(Cache) 구현

### 우선순위 큐 (priority queue)

- 값이 들어간 순서와 상관없이 **우선순위가 높은 데이터가 먼저 나오는 자료구조**
- 큐 설정에 따라 front에 항상 최댓값 또는 최솟값이 위치한다.
- 우선순위 큐는 일반적으로 힙을 이용해 구현
    - 힙은 트리 종류 중 하나

### Summary
- **스택**이란 쌓다라는 의미로, 데이터를 차곡차곡 **쌓아 올린 자료구조**를 말합니다. 데이터가 순서대로 쌓이고 가장 마지막에 쌓인 자료가 가장 먼저 삭제되는 구조로 **LIFO(Last In First Out)** 입니다. 스택에서 삽입 연산은 push(), 삭제 연산은 pop()입니다. **큐**는 **대기하는것**(줄서기)를 의미하며, 스택과 다르게 먼저 들어온 것이 먼저 나가는 선입선출 구조를 가지고 있습니다. 이를 **FIFO(First In First Out)** 라고 합니다.

Reference 📚

[https://devuna.tistory.com/22](https://devuna.tistory.com/22)