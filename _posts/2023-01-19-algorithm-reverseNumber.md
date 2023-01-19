---
layout : single
title : "프로그래머스 LV1 : 자연수 뒤집어 배열로 만들기"
categories : til
tags : [algorithm, 프로그래머스, stack] 
---

## 자연수 뒤집어 배열로 만들기

### **문제 설명**

자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 예를들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.

### 제한 조건

- n은 10,000,000,000이하인 자연수입니다.

### 입출력 예

| n | return |
| --- | --- |
| 12345 | [5,4,3,2,1] |

## Flow.

- 여러 가지 풀이가 있겠지만, LIFO(Last In First Out)의 스택 자료구조로 구현하고자 했다.
- 제한조건으로 데이터 타입 long 사용
- long → String 으로 형변환 후 toCharArray()를 사용하여 char[] 배열에 넣어준다.
    - 자릿수가 각각 분리된 배열이 만들어진다.
- 이를 스택에 push 해주고 다 넣어주면 poll로 마지막에 들어온 데이터부터 꺼내준다.

### Code.

```java
public static long[] solution(long n) {
		String str = String.valueOf(n);
		char[] A = str.toCharArray();
		
		Stack<Long> stack = new Stack<>();
		for (int i = 0; i < A.length; i++) {
			stack.push((long) A[i]);
		}

		long[] answer = new long[A.length];
		int i = 0;
		while (!stack.isEmpty()) {
			answer[i] = stack.pop() - 48;
			i++;
		}

		return answer;
	}
```