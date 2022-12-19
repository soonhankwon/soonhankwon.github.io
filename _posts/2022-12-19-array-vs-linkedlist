---
layout : single
title : "자료구조, ArrayList vs LinkedList"
categories : til
tags : [til, java, datastructure] 
---

**Mention** : ArrayList vs LinkedList 또는 배열 vs 링크드리스트

## List

- 어떤 순서가 있는 데이터의 집합 (자료구조)
- ArrayList, LinkedList

### ArrayList

- 특정 크기만큼 연속된 메모리 공간에 순서대로 데이터를 저장하는 자료구조
    
    ![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbz9HKd%2Fbtq5tpgTRu2%2FZAOwumHnuwYfBRf5VSgC8K%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbz9HKd%2Fbtq5tpgTRu2%2FZAOwumHnuwYfBRf5VSgC8K%2Fimg.png)
    
- 연속된 공간에 데이터들이 나열 → indexing 가능 장점
    - 특정 데이터를 O(1)로 조회
- 단점 : 추가와 삭제가 오래 걸린다
    - 추가하고자하는 자리를 비우고 뒤에 있는 데이터를 한 칸씩 뒤로 밀어내야 하기때문
    - 배열의 처음 또는 중간에 삽입 및 삭제 : O(n)
    - 배열의 끝에 삽입 및 삭제 : O(1)
- 컴파일 과정에서 메모리가 할당되는 정적 메모리 할당
- Stack 영역에 메모리 할당

### LinkedList

- 비연속적인 공간에 논리적 순서대로 데이터를 저장
    
    ![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbxz3Yq%2Fbtq5tySrhie%2FDB7P81PkM50BwjNHSZFZi0%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbxz3Yq%2Fbtq5tySrhie%2FDB7P81PkM50BwjNHSZFZi0%2Fimg.png)
    
    - 각각의 데이터가 메모리 공간 상에 고유한 노드로 존재한다.
    - 첫번째 노드를 헤드(Head), 마지막 노드를 테일(Tail)이라고 한다.
    - 이 노드는 자신의 앞에 있는 데이터와 뒤에 있는 데이터에 대한 주소를 기억한다.
    - 각 노드는 데이터와 다음 노드를 가리키는 포인터로 이루어져 있는 트리(tree)구조의 근간이 되는 자료구조
- 장점 : 추가 혹은 삭제가 쉽다.
    - 데이터를 추가 또는 삭제할 때 O(1)로 가능
- 단점 : 위치 탐색에 오래 걸린다 (ArrayList에 비해서)
    - 처음부터 순차적으로 탐색해야 한다.
    - 노드는 모두가 떨어져 있기 때문이다.
    - 특정 데이터를 O(N)으로 조회
- 런타임 환경에서 메모리가 할당되는 동적 메모리 할당
- Heap 영역에 메모리 할당

- **따라서 배열은 빠른 접근이 요구되고, 데이터의 삽입과 삭제가 적을 때 사용하고 링크드리스트는 삽입과 삭제 연산이 잦고, 검색 빈도가 적을 때 사용**
    
    

Reference📚

[https://hongcoding.tistory.com/74](https://hongcoding.tistory.com/74)