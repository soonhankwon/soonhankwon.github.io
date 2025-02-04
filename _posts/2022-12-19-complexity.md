---
layout : single
title : "시간복잡도와 공간복잡도"
categories : algorithm
tags : [til, algorithm, datastructure] 
---

**Mention** : 시간복잡도?⏰ 공간복잡도?👩‍👩‍👧‍👦

## 알고리즘 성능 평가

- 어떤 알고리즘이 있을 때, 그 알고리즘의 성능 평가는 어떻게 할까?
- 바로 ‘복잡도(Complexity)’의 척도를 사용한다.
- 그 중 **시간복잡도**와 **공간복잡도**의 개념이 나오며, 동일한 기능을 수행하는 알고리즘이 있을 때, 복잡도가 낮을수록 좋은 알고리즘이라고 말한다.
    - 시간복잡도 : 특정한 크기의 입력에 대해서 알고리즘의 **수행 시간** 분석
    - 공간복잡도 : 특정한 크기의 입력에 대해서 알고리즘의 **메모리 사용량** 분석

## 시간복잡도

- 시간복잡도는 **특정 알고리즘이 어떤 문제를 해결하는데 걸리는 시간(연산횟수)** 을 의미한다.
    - 연산횟수 : 1억번 → 1초
    - 빅-오메가 : 최선일 때 (best case) 연산횟수
    - 빅-세타 : 보통일 때 (average case) 연산횟수
    - 빅-오 : 최악일 때(worst case) 연산횟수

### 빅-오 표기법

- 시간복잡도에는 빅-오 표기법이라는 개념이 나온다.
- 예를 들어, 동전을 튕겨 앞면이 나올 확률을 이야기 할 때, 운이 좋으면 1번에 앞면이 나오지만 운이 안좋다면 n번 만큼 동전을 튕겨야 하는 경우가 발생
- 이 최악의 경우를 계산하는 방식을 **빅-오(Big-O)** 표기법이라 부른다.
    
    ![big-o](https://user-images.githubusercontent.com/113872320/208460580-a88738ab-10b1-44d1-ae82-7333f44a7a35.png)
    
- 시간복잡도 그래프
    - n이란 입력되는 데이터를 의미한다.
    - O(1) (Constant)
        - 입력 데이터의 크기에 상관없이 언제나 일정한 시간이 걸리는 알고리즘. 데이터가 얼마나 증가하든 성능에 영향을 거의 미치지 않음.
    - O(log n) (Logarithmic)
        - 입력 데이터의 크기가 커질수록 처리 시간이 로그(log: 지수 함수의 역함수) 만큼 짧아지는 알고리즘. 예를 들어 데이터가 10배가 되면, 처리 시간은 2배가 됩니다. **이진 탐색**이 대표적이며, 재귀가 순기능으로 이루어지는 경우도 해당된다.
    - O(n) (Linear)
        - 입력 데이터의 크기에 비례해 처리 시간이 증가하는 알고리즘. 예를 들어 데이터가 10배가 되면, 처리 시간도 10개가 된다. 1차원 for문이 있다.
    - O(n log n) (Linear-Logarithmic)
        - 데이터가 많아질수록 처리시간이 로그(log) 배만큼 더 늘어나는 알고리즘. 예를 들어 데이터가 10배가 되면, 처리시간은 약 20배가 된다. 정렬 알고리즘 중 **병합 정렬**, **퀵 정렬**이 대표적
    - O(n²) (quadratic)
        - 데이터가 많아질수록 처리시간이 급수적으로 늘어나는 알고리즘. 예를 들어 데이터가 10배가 되면, 처리 시간은 최대 100배가 된다. 이중 루프(n² matrix)가 대표적이며 단, m이 n보다 작을 때는 반드시 O(nm)로 표시하는 것이 바람직
    - O(2ⁿ) (Exponential)
        - 데이터량이 많아질수록 처리시간이 기하급수적으로 늘어나는 알고리즘. 대표적으로 **피보나치 수열**이 있으며, **재귀가 역기능**을 할 경우 해당
    - n! (factorial)
        - 1부터 n까지의 자연수를 모두 곱하는 것 (팩토리얼)
- 시간복잡도에 따른 성능 비교
    - 시간복잡도가 높을수록 효율성이 떨어진다.
    - faster O(1) < O(log n) < O(n log n) < O(n²) < O(2ⁿ) < n! slower

## 공간복잡도

- 공간복잡도(Space Complexity) 란 작성한 프로그램이 얼마나 많은 공간(메모리)를 차지하느냐를 분석하는 방법
- 예전에 비해 컴퓨터 성능의 발달로 중요도가 떨어짐
- 시간과 공간은 반비례적 경향이 있음
- 공간복잡도의 계산
    - 총 공간요구 = 고정 공간 요구 + 가변 공간 요구
    - S(P) = c + Sp(n)
    - 고정 공간은 입력과 출력의 횟수나 크기와 관계없는 공간의 요구 (코드 저장 공간, 단순 변수, 고정 크기의 구조 변수, 상수)
    - 가변 공간은 해결하려는 문제의 특정 인스턴스에 의존하는 크기를 가진 구조화 변수들을 위해서 필요로 하는 공간, 함수가 순환 호출을 할 경우 요구되는 추가 공간, 그러니까 **동적으로 필요한 공간**을 말합니다.
- 일반적으로 공간이 하나 생성되는 것을 1이라고 표현. 이를 O(1)로 표기
    
    ```java
    int factorial(int n)
    {
    	if(n > 1) return n * factorial(n - 1);
    	else return 1;
    }
    ```
    
    - 위 코드의 공간 복잡도는 n이 1이하일 때까지 함수가 재귀적으로 호출되므로 스택에는 n부터 1까지 모두 쌓이게 된다. 즉 공간복잡도는 O(n)
    - 재귀란? [https://ko.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/recursion](https://ko.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/recursion)
    
    ```java
    int factorial(int n)
    {
    	int i = 0;
    	int fac = 1;
    	for(i = 1; i <= n; i++) {
    		fac = fac * 1;
    	}
    	return fac;
    }
    ```
    
    - 위 코드의 공간복잡도는 n의 값과 상관없이 스택에는 n, i, fac변수만 저장된다. 즉, 공간복잡도는 O(1)
- Summary
    - 어떠한 알고리즘의 성능 평가가 필요할 때 **복잡도**의 척도를 사용하는데 그 복잡도가 낮을수록 좋은 알고리즘입니다. **시간 복잡도**는 특정 알고리즘이 어떤 문제를 해결하는데 걸리는 **시간**을 의미하고 **공간 복잡도**는 특정 알고리즘이 어떤 문제를 해결하는데 차지하는 **공간(메모리)** 을 의미합니다.

Reference 📚

[https://velog.io/@cha-suyeon/Algorithm-시간-복잡도-공간-복잡도](https://velog.io/@cha-suyeon/Algorithm-%EC%8B%9C%EA%B0%84-%EB%B3%B5%EC%9E%A1%EB%8F%84-%EA%B3%B5%EA%B0%84-%EB%B3%B5%EC%9E%A1%EB%8F%84)

[https://madplay.github.io/post/time-complexity-space-complexity](https://madplay.github.io/post/time-complexity-space-complexity)