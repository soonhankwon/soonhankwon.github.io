---
layout : single
title : "그래프(Graph)와 트리(Tree)"
categories : til
tags : [til, datastructure] 
---

**Mention** : 트리🎄 ⊂ 그래프🕸

### Tree **⊂** Graph

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1ISus%2FbtreYnzVOxO%2FmHzM52qq2OKumuFfmHvYT1%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1ISus%2FbtreYnzVOxO%2FmHzM52qq2OKumuFfmHvYT1%2Fimg.png)

## 그래프 (Graph)

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbAlVNh%2FbtreKxkxoN3%2FH47hLGhJOVKlQs8cBD7DM1%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbAlVNh%2FbtreKxkxoN3%2FH47hLGhJOVKlQs8cBD7DM1%2Fimg.png)

- 그래프는 노드(하나의 점) 와 노드 간을 연결하는 간선으로 구성된 자료구조이다.
    - 이를 통해 연결된 노드 간의 관계를 표현할 수 있는 자료구조이다.
- 그래프의 특징
    - 그래프는 순환 혹은 비순환 구조를 이룬다
    - 그래프는 방향이 있는 그래프와 방향이 없는 그래프가 있다.
        - 무방향 그래프 (Undirected Graph)
            
            ![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fkxy5t%2Fbtrci9kqkou%2FHG9LzKTPGkXGikePUJUGHK%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fkxy5t%2Fbtrci9kqkou%2FHG9LzKTPGkXGikePUJUGHK%2Fimg.png)
            
        - 방향 그래프
            
            ![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbriTOi%2Fbtrb66v4bsS%2Flwr7VVHvUKpjjkdiz8nwD0%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbriTOi%2Fbtrb66v4bsS%2Flwr7VVHvUKpjjkdiz8nwD0%2Fimg.png)
            
        - 사이클이 존재하지 않는 방향 그래프는 DAG(Directed Acyclic Graphs)
    - 루트 노드의 개념이 없다, 부모-자식 관계라는 개념이 없다.
    - **2개 이상의 경로**가 가능하다 (무방향, 방향, 양방향 가능)
    - 그래프는 **네트워크 모델**이다.
- 예시
    - 지하철 노선도
        
        ![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fda6X6U%2Fbtrb827ZDZa%2FBhz4ppZol0hkmtKRAlQiC0%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fda6X6U%2Fbtrb827ZDZa%2FBhz4ppZol0hkmtKRAlQiC0%2Fimg.png)
        
    - 기흥이라는 점이 개체, 기흥과 강남대를 이어주는 선이 관계
        - 기흥(노드) → 간선(Edge)→ 강남대(노드)

## 트리(Tree)

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FctR6nR%2FbtreYck5Goo%2FHkF6az4JGqLFTtmYVKWF4k%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FctR6nR%2FbtreYck5Goo%2FHkF6az4JGqLFTtmYVKWF4k%2Fimg.png)

- 트리는 그래프와 같이 노드와 노드간을 연결하는 간선으로 구성된 자료구조이다.
    - 하지만, 트리는 그래프 중에서도 특수한 케이스에 해당하는 자료구조이다.
    - 트리는 두개의 노드 사이에 반드시 1개의 경로만을 가지며, 사이클이 존재하지 않는 방향 그래프이다.
    - 최소 연결 트리라고 부르기도 한다.
    - 부모-자식 관계가 성립하기 때문에 **계층형 모델**이라고도 한다.
- 트리의 특징
    - **부모-자식 관계**가 존재해 레벨이 존재한다. (최상의 노드=루트)
    - 노드가 N개이면 **간선은 N-1개**, 각 레벨 k에 존재하는 노드는 2^k개
    - **방향성이 존재하고 사이클은 존재하지 않는다.** (비순환)
    - 트리의 순회는 전위순회, 중위순회, 후위순회 3가지가 존재한다.

### **트리와 그래프 비교**

### Summary

- 그래프는 **노드와 노드 간을 연결하는 간선**으로 구성된 자료구조입니다. 이를 통해 연결된 노드 간의 관계를 표현할 수 있습니다.
트리는 **그래프의 부분집합** 입니다. 그래프 중에서도 **특수한 케이스**에 해당하는 자료구조입니다.
- 방향성에서 그래프는 방향, 무방향의 방향성을 가지며, 트리는 방향만 가집니다.
사이클에서는 그래프는 순환, 비순환, 자기순환의 사이클을 가지며, 트리는 비순환 사이클입니다.
- 그래프는 루트의 개념이 없어 부모-자식 개념이 없습니다. 반면 트리는 **한 개의 루트**가 존재하며 **1개의 부모노드**를 가집니다.
간선의 수는 그래프는 자유, **트리는 N-1개**를 가집니다.
그래프의 모델은 **네트워크 모델**이며, 트리는 **계층 모델**입니다.

Reference 📚

[https://kangworld.tistory.com/37](https://kangworld.tistory.com/37)

[https://bigsong.tistory.com/33](https://bigsong.tistory.com/33)