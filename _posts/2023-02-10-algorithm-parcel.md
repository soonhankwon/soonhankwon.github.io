---
layout : single
title : "프로그래머스 JAVA LV2 : 택배 배달과 수거하기"
categories : til
tags : [algorithm, 프로그래머스] 
---

## 2023 KAKAO BLIND RECRUITMENT

[문제 상세보기](https://school.programmers.co.kr/learn/courses/30/lessons/150369)

### **문제 설명**

![https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/7ce63a07-3abd-40a1-87cc-c1f664393aa0/%E1%84%8C%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%20%E1%84%90%E1%85%A2%E1%86%A8%E1%84%87%E1%85%A2%20%E1%84%89%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%A1.png](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/7ce63a07-3abd-40a1-87cc-c1f664393aa0/%E1%84%8C%E1%85%A2%E1%84%92%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%20%E1%84%90%E1%85%A2%E1%86%A8%E1%84%87%E1%85%A2%20%E1%84%89%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%A1.png)

당신은 일렬로 나열된 `n`개의 집에 택배를 배달하려 합니다. 배달할 물건은 모두 크기가 같은 재활용 택배 상자에 담아 배달하며, 배달을 다니면서 빈 재활용 택배 상자들을 수거하려 합니다.배달할 택배들은 모두 재활용 택배 상자에 담겨서 물류창고에 보관되어 있고, `i`번째 집은 물류창고에서 거리 `i`만큼 떨어져 있습니다. 또한 `i`번째 집은 `j`번째 집과 거리 `j - i`만큼 떨어져 있습니다. (1 ≤ `i` ≤ `j` ≤ `n`)트럭에는 재활용 택배 상자를 최대 `cap`개 실을 수 있습니다. 트럭은 배달할 재활용 택배 상자들을 실어 물류창고에서 출발해 각 집에 배달하면서, 빈 재활용 택배 상자들을 수거해 물류창고에 내립니다. 각 집마다 배달할 재활용 택배 상자의 개수와 수거할 빈 재활용 택배 상자의 개수를 알고 있을 때, 트럭 하나로 모든 배달과 수거를 마치고 물류창고까지 돌아올 수 있는 최소 이동 거리를 구하려 합니다. **각 집에 배달 및 수거할 때, 원하는 개수만큼 택배를 배달 및 수거할 수 있습니다.**

다음은 `cap`=4 일 때, 최소 거리로 이동하면서 5개의 집에 배달 및 수거하는 과정을 나타낸 예시입니다.

트럭에 실을 수 있는 재활용 택배 상자의 최대 개수를 나타내는 정수 `cap`, 배달할 집의 개수를 나타내는 정수 `n`, 각 집에 배달할 재활용 택배 상자의 개수를 담은 1차원 정수 배열 `deliveries`와 각 집에서 수거할 빈 재활용 택배 상자의 개수를 담은 1차원 정수 배열 `pickups`가 매개변수로 주어집니다. 이때, 트럭 하나로 모든 배달과 수거를 마치고 물류창고까지 돌아올 수 있는 최소 이동 거리를 return 하도록 solution 함수를 완성해 주세요.

## Flow.

- **그리디 알고리즘**의 관점으로 접근했다.
- 가장 먼곳부터 배송과 수거를 할 것이기 때문에 **스택자료** 구조를 사용
- 배송 → 가장 먼 곳 부터 모든 배송을 다하고 수거를 시작한다.
    - 논리는 이렇지만 두 경우를 모두 포함한다.
    - 가장 먼곳에 먼저 4건 배송을 배송하고 이전 포인트에 1건 배송
    - 이전 포인트에 1건 배송하고 가장 먼 곳에 4건 배송
- 수거 → 가장 먼곳 부터 수거를 해서 가져온다.
- 배송과 수거 경우 한 사이클마다 둘 중 먼곳의 distance를 업데이트 해준다.
- CAP만큼 배송과 수거를 하며 CAP이 꽉차면 (distance * 2) 를 answer에 더해준다 (왕복하기 때문에)

## Code.

```java
package kakaoBlind2023;

import java.util.Stack;

public class P2_택배배달과수거하기 {
	public static void main(String[] args) {
		int cap = 4;
		int n = 5;
		int[] deliveries = { 1, 0, 3, 1, 2 };
		int[] pickups = { 0, 3, 0, 4, 0 };
		System.out.println(solution(cap, n, deliveries, pickups));

	}

	public static long solution(int cap, int n, int[] deliveries, int[] pickups) {
		Stack<int[]> deliveryPoint = new Stack<>();
		Stack<int[]> pickupPoint = new Stack<>();
		long answer = 0;

		for (int i = 1; i <= n; i++) {
			if (deliveries[i - 1] > 0)
				deliveryPoint.push(new int[] { i, deliveries[i - 1] });
			if (pickups[i - 1] > 0)
				pickupPoint.push(new int[] { i, pickups[i - 1] });
		}

		int distance = 0;
		int currentCap = 0;
		while (!deliveryPoint.isEmpty() || !pickupPoint.isEmpty()) {
			currentCap = 0;
			distance = 0;
			while (!deliveryPoint.isEmpty() && currentCap < cap) {
				int[] now = deliveryPoint.pop();
				distance = Math.max(distance, now[0]);

				if (now[1] + currentCap <= cap) {
					currentCap += now[1];
				} else {
					now[1] -= cap - currentCap;
					deliveryPoint.push(now);
					break;
				}
			}
			currentCap = 0;
			while (!pickupPoint.isEmpty() && currentCap < cap) {
				int[] now = pickupPoint.pop();
				distance = Math.max(distance, now[0]);

				if (now[1] + currentCap <= cap) {
					currentCap += now[1];
				} else {
					now[1] -= (cap - currentCap);
					pickupPoint.push(now);
					break;
				}
			}
			answer += (2 * distance);
		}
		return answer;
	}

}
```