---
layout : single
title : "프로그래머스 JAVA LV2 : k진수에서 소수 개수 구하기"
categories : til
tags : [algorithm, 프로그래머스] 
---

## 2022 KAKAO BLIND RECRUITMENT

[문제 상세보기](https://school.programmers.co.kr/learn/courses/30/lessons/92335)

### 문제 설명

양의 정수 `n`이 주어집니다. 이 숫자를 `k`진수로 바꿨을 때, 변환된 수 안에 아래 조건에 맞는 **소수(Prime number)가 몇 개**인지 알아보려 합니다.

- `0P0`처럼 소수 양쪽에 0이 있는 경우
- `P0`처럼 소수 오른쪽에만 0이 있고 왼쪽에는 아무것도 없는 경우
- `0P`처럼 소수 왼쪽에만 0이 있고 오른쪽에는 아무것도 없는 경우
- `P`처럼 소수 양쪽에 아무것도 없는 경우
- 단, `P`는 각 자릿수에 0을 포함하지 않는 소수입니다.
    - 예를 들어, 101은 `P`가 될 수 없습니다.

예를 들어, 437674을 3진수로 바꾸면 `211`0`2`01010`11`입니다. 여기서 찾을 수 있는 조건에 맞는 소수는 왼쪽부터 순서대로 211, 2, 11이 있으며, 총 3개입니다. (211, 2, 11을 `k`진법으로 보았을 때가 아닌, 10진법으로 보았을 때 소수여야 한다는 점에 주의합니다.) 211은 `P0` 형태에서 찾을 수 있으며, 2는 `0P0`에서, 11은 `0P`에서 찾을 수 있습니다.

정수 `n`과 `k`가 매개변수로 주어집니다. `n`을 `k`진수로 바꿨을 때, 변환된 수 안에서 찾을 수 있는 **위 조건에 맞는 소수**의 개수를 return 하도록 solution 함수를 완성해 주세요.

## Flow.

- 처음 문제를 읽었을때 크게 3단계로 구분했다.
    1. n → k진수로 바꾸기
    2. “0”을 구분자로 나누어 소수 인지 아닌지 검증할 수로 분리
    3. 소수인지 아닌지 확인하는 함수 구현
- 소수 확인 알고리즘으로는 에라토스테네스의 채 사용
    - 이 부분을 최적화하지 못하면 일부 테스트 케이스에 런타임 오류가 뜬다.
    - 또는 int 범위를 넘어가는 부분의 에러
- “0”을 구분자로 나누어 검증할 수로 분리하는 부분은 더 나은 구현방법이 있을 것같다 🙂
    - ex) splite으로 “00”같은 경우 깔끔하게 분리가 안되서 ArrayList 사용

## Code.

```java
package kakaoBlind2022;

import java.util.ArrayList;

public class P2_k진수에서소수개수구하기 {

	public static void main(String[] args) {
		int n = 437674;
		int k = 3;

//		int n = 110011;
//		int k = 10;
		System.out.println(solution(n, k));
	}

	public static int solution(int n, int k) {

		String k_number = Integer.toString(n, k);
		String[] arr = k_number.split("0");
		ArrayList<Long> A = new ArrayList<>();
		for (String str : arr) {
			if (str.isEmpty()) {
				continue;
			}
			A.add(Long.parseLong(str));
		}
		int cnt = 0;
		for (int i = 0; i < A.size(); i++) {
			if (isPrimeNumber(A.get(i))) {
				cnt++;
				continue;
			}
		}
		int answer = cnt;
		return answer;
	}

	private static boolean isPrimeNumber(long n) {
		if (n <= 1) {
			return false;
		} else if (n == 2) {
			return true;
		}

		for (int i = 2; i <= Math.sqrt(n); i++)
			if (n % i == 0) {
				return false;
			}
		return true;
	}
}
```