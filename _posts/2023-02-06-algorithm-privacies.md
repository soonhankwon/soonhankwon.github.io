---
layout : single
title : "프로그래머스 JAVA LV1 : 개인정보 수집 유효기간"
categories : til
tags : [algorithm, 프로그래머스] 
---

## 2023 KAKAO BLIND RECRUITMENT

[문제 상세보기](https://school.programmers.co.kr/learn/courses/30/lessons/150370)

### **문제 설명**

고객의 약관 동의를 얻어서 수집된 1~`n`번으로 분류되는 개인정보 `n`개가 있습니다. 약관 종류는 여러 가지 있으며 각 약관마다 개인정보 보관 유효기간이 정해져 있습니다. 당신은 각 개인정보가 어떤 약관으로 수집됐는지 알고 있습니다. 수집된 개인정보는 유효기간 전까지만 보관 가능하며, 유효기간이 지났다면 반드시 파기해야 합니다.

예를 들어, A라는 약관의 유효기간이 12 달이고, 2021년 1월 5일에 수집된 개인정보가 A약관으로 수집되었다면 해당 개인정보는 2022년 1월 4일까지 보관 가능하며 2022년 1월 5일부터 파기해야 할 개인정보입니다.당신은 오늘 날짜로 파기해야 할 개인정보 번호들을 구하려 합니다.

**모든 달은 28일까지 있다고 가정합니다.**

다음은 오늘 날짜가 `2022.05.19`일 때의 예시입니다.

| 약관 종류 | 유효기간 |
| --- | --- |
| A | 6 달 |
| B | 12 달 |
| C | 3 달 |

| 번호 | 개인정보 수집 일자 | 약관 종류 |
| --- | --- | --- |
| 1 | 2021.05.02 | A |
| 2 | 2021.07.01 | B |
| 3 | 2022.02.19 | C |
| 4 | 2022.02.20 | C |
- 첫 번째 개인정보는 A약관에 의해 2021년 11월 1일까지 보관 가능하며, 유효기간이 지났으므로 파기해야 할 개인정보입니다.
- 두 번째 개인정보는 B약관에 의해 2022년 6월 28일까지 보관 가능하며, 유효기간이 지나지 않았으므로 아직 보관 가능합니다.
- 세 번째 개인정보는 C약관에 의해 2022년 5월 18일까지 보관 가능하며, 유효기간이 지났으므로 파기해야 할 개인정보입니다.
- 네 번째 개인정보는 C약관에 의해 2022년 5월 19일까지 보관 가능하며, 유효기간이 지나지 않았으므로 아직 보관 가능합니다.

따라서 파기해야 할 개인정보 번호는 [1, 3]입니다.

오늘 날짜를 의미하는 문자열 `today`, 약관의 유효기간을 담은 1차원 문자열 배열 `terms`와 수집된 개인정보의 정보를 담은 1차원 문자열 배열 `privacies`가 매개변수로 주어집니다. 이때 파기해야 할 개인정보의 번호를 오름차순으로 1차원 정수 배열에 담아 return 하도록 solution 함수를 완성해 주세요.

## Flow.

- 항상 이러한 데이터가 주어지고 데이터에서 유의미한 결과를 도출하여 출력하는 문제는, 먼저 주어진 입력값을 사용할 수 있는 자료로 만드는 것을 생각한다.
- 마치 데이터베이스를 다루는 것과 같은 원리이다.
- 약관의 유효기간 자료는 해쉬맵으로 만들어주는 것이 좋다고 생각했다.
    - key가 unique하기 때문에.
- 문제에서 한달은 28일로 고정되어있어서 년월일을 모두 날짜로 바꿔준 누적날짜를 계산하면 간편할 것이라고 생각해서 날짜 계산 함수를 만들어주었다.
- today의 누적 날의 합과 privacies data의 가입날짜부터의 누적 날의 합 차이 (즉, 가입한 날짜부터 today까지의 누적 날의 합)가 유효 기간 이상이면 파기리스트에 넣어준다.
- 유효기간은 약관마다 각각 다르기 때문에 맵에서 키를 찾아서 비교해준다.
- 파기 리스트 출력

## Code.

```java
package kakaoBlind2023;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class P1_개인정보수집유효기간 {

	public static void main(String[] args) {
		String today = "2022.05.19";
		String[] terms = { "A 6", "B 12", "C 3" };
		String[] privacies = { "2021.05.02 A", "2021.07.01 B", "2022.02.19 C", "2022.02.20 C" };
		System.out.println(Arrays.toString(solution(today, terms, privacies)));
	}

	public static int[] solution(String today, String[] terms, String[] privacies) {
    // 약관의 유효기간(월 -> 일) 자료
		HashMap<String, Integer> daysOfTerms = new HashMap<>();
		for (int i = 0; i < terms.length; i++) {
			daysOfTerms.put(terms[i].split(" ")[0], Integer.parseInt(terms[i].split(" ")[1]) * 28);
		}
    // today 누적 날짜 합 (년 + 월 + 일)
		int todayCumulativeDate = calculateDays(today);
    // 파기할 자료 리스트
		ArrayList<Integer> destructionList = new ArrayList<>();
    // privacies의 가입날짜의 누적 날짜 합과 today 누적 날짜 합의 차이를 계산하여 약관의 유효기간 자료와 비교해준다.
    // 비교해서 남은 날이 유효기간 이상이면 파기리스트에 넣어준다.
		for (int i = 0; i < privacies.length; i++) {
			int remainDays = todayCumulativeDate - calculateDays(privacies[i].split(" ")[0]);
			if (remainDays >= daysOfTerms.get(privacies[i].split(" ")[1]))
				destructionList.add(i + 1);
		}

		int[] answer = destructionList.stream().mapToInt(Integer::intValue).toArray();
		return answer;
	}
  
  // 날짜 계산 함수
	private static int calculateDays(String days) {
		String[] yearMonthDay = days.split("\\.");
		int totalDays = 0;
		return totalDays += (Integer.parseInt(yearMonthDay[0]) * 336) + (Integer.parseInt(yearMonthDay[1]) * 28)
				+ (Integer.parseInt(yearMonthDay[2]));
	}
}
```