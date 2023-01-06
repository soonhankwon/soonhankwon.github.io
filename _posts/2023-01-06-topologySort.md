---
layout : single
title : "위상정렬(topology sort)"
categories : til
tags : [til, algorithm, graph] 
---

- Do it! 알고리즘 코딩 테스트 책의 내용을 기반으로 위상정렬을 구현해보았다.
- 위상 정렬이란?
    - 사이클이 없는 방향 그래프에서 노드 순서를 찾는 알고리즘
    - 사이클이 존재하면 위상 정렬을 적용할 수 없다.
    - why? 순서를 정의할 수 없기 때문이다.
    - 노드 간의 순서를 결정한다.
    - 시간 복잡도는 O(V+E)

### 핵심 아이디어 

- 진입차수 (in-degree)
    - 자기 자신을 가리키는 엣지의 개수
- ArrayList<노드>[N] 인접 리스트 구현
    - 이때 진입 차수 값을 계산
        - 1→2,3 (D[2]++, D[3]++)
    - 진입 차수 배열 D[N]
- 진입 차수 배열에서 **진입 차수가 0인 노드를 선택** 하고 선택된 노드를 위상 정렬 배열에 저장
    - 진입 차수가 0인 노드는 큐 자료구조에 add
    - 해당 노드의 인접 리스트의 연결값의 진입 차수를 1씩 빼기
    - 이 과정을 모든 노드가 정렬될 때까지 반복

```java
Input
1 2
1 3
2 4
2 5
3 4
4 5
Output
[1,2,3,4,5]
```

```java
package graph;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

public class Node_prac {
	static ArrayList<Integer>[] A;
	static int[] D;

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		A = new ArrayList[6];
		D = new int[6];
		ArrayList<Integer> sortResult = new ArrayList<>();

		for (int i = 1; i <= 5; i++) {
			A[i] = new ArrayList<>();
		}

		for (int i = 0; i < 6; i++) {
			int x = sc.nextInt();
			int y = sc.nextInt();
			A[x].add(y);
			D[y]++;
		}

		Queue<Integer> queue = new LinkedList<>();
		for (int i = 1; i <= 5; i++) {
			if (D[i] == 0) {
				queue.offer(i); // 진입 차수가 0이면 큐에 데이터를 넣어준다. 위상 정렬 시작점
				sortResult.add(i);
			}
		}
		while (!queue.isEmpty()) {
			int now = queue.poll(); // 위상정렬이 시작된다. 진입차수가 0인 데이터를 빼주고 연결값의 진입차수를 뺀다. 그리고 진입차수를 뺀 노드를 큐에 넣어준다.
			for (int next : A[now]) {
				D[next]--;
				if (D[next] == 0) {
					queue.offer(next);
					sortResult.add(next);
				}
			}
		}
		System.out.println(sortResult);

	}
}
```