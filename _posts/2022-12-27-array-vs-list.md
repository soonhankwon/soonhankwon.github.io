---
layout : single
title : "배열(Array)과 리스트(List)"
categories : til
tags : [til, datastructure, java] 
---

**Mention** : 배열 vs 리스트 Case By Case!

## 배열(Array)

- 배열은 메모리의 **연속 공간**에 값이 채워져 있는 형태의 자료구조
- 배열의 값은 **인덱스**를 통해 참조할 수 있다.
- 배열의 특징
    - 인덱스를 사용하여 값에 **바로 접근** 가능
    - 새로운 값을 삽입하거나 특정 인덱스에 있는 값을 삭제하기 어렵다.
        - 값을 삽입하거나 삭제하려면 해당 인덱스 주변에 있는 값을 이동시키는 과정이 필요
    - 배열의 크기는 선언할 때 지정 가능, **한 번 선언하면 크기를 늘리거나 줄일 수 없다**.

![https://media.geeksforgeeks.org/wp-content/uploads/20220721080308/array.png](https://media.geeksforgeeks.org/wp-content/uploads/20220721080308/array.png)

## 리스트(List)

- 리스트는 값과 포인터를 묶은 노드라는 것을 포인터로 연결한 자료구조
    - 노드 : 값, 포인터를 쌍으로 갖는 기초 단위

[https://t1.daumcdn.net/cfile/tistory/99CEE2425CB7F7CB10](https://t1.daumcdn.net/cfile/tistory/99CEE2425CB7F7CB10)

- 리스트의 특징
    - 인덱스가 없으므로 값에 접근하려면 **Head 포인터부터 순서대로** 접근
        - 값에 접근하는 속도가 느리다
    - 포인터로 연결되어 있으므로 데이터를 **삽입하거나 삭제하는 연산 속도**가 빠르다
    - 선언할 때 크기를 별도로 지정하지 않아도 된다.
        - 크기는 정해져 있지 않으면, **크기가 변하기 쉬운 데이터**를 다룰 때 적절
    - **포인터**를 저장할 공간이 필요하므로 배열보다 구조가 복잡

## Summary

- 알고리즘 테스트 시
- 검색 속도가 중요하다면 배열, 삽입 및 삭제하는 속도가 중요하다면 리스트
- 크기가 변하지 않는 데이터를 다룬다면 배열, 크기가 변하는 데이터를 다룬다면 리스트

Reference 📚

[https://www.geeksforgeeks.org/array-data-structure/](https://www.geeksforgeeks.org/array-data-structure/)

Do it! 알고리즘 코딩 테스트 참조