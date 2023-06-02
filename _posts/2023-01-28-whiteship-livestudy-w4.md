---
layout : single
title : "제어문"
categories : java
tags : [java, til, lang] 
---

# 4주차과제 : 제어문

# 목표

자바가 제공하는 제어문을 학습하세요.

# 학습할 것

선택문, 반복문

## 제어문

---

- 코드의 실행 흐름(순서)를 제어하는 구문

## 조건문

---

### if문

```java
if (condition1) {
    // code to be executed if condition1 is true
} else if (condition2) {
    // code to be executed if condition1 is false and condition2 is true
} else {
    // code to be executed if condition1 and condition2 are false
}
```

## 선택문

---

### Swith, Case 문

```java
switch (expression) {
    case value1:
        // code to be executed if expression == value1
        break;
    case value2:
        // code to be executed if expression == value2
        break;
    ...
    default:
        // code to be executed if expression does not match any of the case values
}
```

## 반복문

---

### for, while, do-while 문

```java
for (initialization; condition; increment/decrement) {
    // code to be executed
}

while (condition) {
    // code to be executed
}

do {
    // code to be executed
} while (condition);
```

### for each 문

```java
for (type variable : array or collection) {
    // code to be executed
}

int[] numbers = {1, 2, 3, 4, 5};
for (int number : numbers) {
    System.out.println(number);
}
```

### break, continue

```java
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break;
    }
    System.out.println(i);
}
//In this example, the loop will iterate from 0 to 4 and will terminate when i reaches 5.

for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue;
    }
    System.out.println(i);
}
//In this example, the loop will iterate from 0 to 9, but will only print odd numbers, because continue statement skips the current iteration if i is even.
//output : 1,3,5,7,9

outer:
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (j == 3) {
            break outer;
        }
        System.out.print(j + " ");
    }
    System.out.println();
//In this example, the outer loop will be broken when j reaches 3.
```

# 과제

## 과제 0. JUnit 5 학습하세요.

- 인텔리J, 이클립스, VS Code에서 JUnit 5로 테스트 코드 작성하는 방법에 익숙해 질 것.
- 이미 JUnit 알고 계신분들은 다른 것 아무거나!
- [더 자바, 테스트](https://www.inflearn.com/course/the-java-application-test?inst=86d1fbb8) 강의도 있으니 참고하세요~

## 과제 1. live-study 대시 보드를 만드는 코드를 작성하세요.

- 깃헙 이슈 1번부터 18번까지 댓글을 순회하며 댓글을 남긴 사용자를 체크 할 것.
- 참여율을 계산하세요. 총 18회에 중에 몇 %를 참여했는지 소숫점 두자리가지 보여줄 것.
- [Github 자바 라이브러리](https://github-api.kohsuke.org/)를 사용하면 편리합니다.
- 깃헙 API를 익명으로 호출하는데 제한이 있기 때문에 본인의 깃헙 프로젝트에 이슈를 만들고 테스트를 하시면 더 자주 테스트할 수 있습니다.

## 과제 2. LinkedList를 구현하세요.

- LinkedList에 대해 공부하세요.
- 정수를 저장하는 ListNode 클래스를 구현하세요.
- ListNode add(ListNode head, ListNode nodeToAdd, int position)를 구현하세요.
- ListNode remove(ListNode head, int positionToRemove)를 구현하세요.
- boolean contains(ListNode head, ListNode nodeTocheck)를 구현하세요.

## 과제 3. Stack을 구현하세요.

- int 배열을 사용해서 정수를 저장하는 Stack을 구현하세요.
- void push(int data)를 구현하세요.
- int pop()을 구현하세요.

## 과제 4. 앞서 만든 ListNode를 사용해서 Stack을 구현하세요.

- ListNode head를 가지고 있는 ListNodeStack 클래스를 구현하세요.
- void push(int data)를 구현하세요.
- int pop()을 구현하세요.

## 과제 5. Queue를 구현하세요.

- 배열을 사용해서 한번
- ListNode를 사용해서 한번.