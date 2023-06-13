---
layout : single
title : "프로그래머스 LV1 JAVA : 성격 유형 검사하기"
categories : algorithm
tags : [algorithm, 프로그래머스] 
---

[2022 KAKAO TECH INTERNSHIP](https://school.programmers.co.kr/learn/challenges)

## Category : Map, 구현

- 주변에서 많이 접할 수 있는 MBTI 검사를 간소하게 구현해볼수 있는 알고리즘이어서 흥미로웠습니다.
- 훨씬 객체지향적으로 구현할 수 있었을 것 같아서 아쉬움이 들지만, 후에 리팩토링으로 개선해보자 (테스트 시간의 제약)

## Flow.

- **HashMap 자료구조**를 사용해서 성격유형 지표 조합 RT, CF, JM, AN 을 Key 로 가진 자료를 만들어주었습니다.
- 성격유형은 PersonalityType 이라는 **열거형**으로 정의했습니다.
- ex) Map 의 키 RT 의 **value 가 positive 라면 R 을 리턴, negative 라면 T를 리턴,** **value 가 같다면 사전상 앞의 글자를 리턴**하도록 로직을 구현했습니다.
- Survey 와 Choice 배열을 매개변수로 받아서 성격유형의 점수를 계산합니다.
    - survey 는 RT, TR …. AN, NA 16가지 종류를 가지고 있습니다.
    - 4(Choice) 모르겠음을 제외한 점수 계산의 경우의 수는 아래와 같습니다.
    - ex) RT, 5(Choice) 라면 → Map 의 RT 에 -1
    - ex) RT, 3(Choice) 라면 → Map 의 RT 에 +1
    - ex) TR, 5(Choice) 라면 → Map 의 RT 에 -1
    - ex) TR, 3(Choice) 라면 → Map 의 RT 에 +1
- TR 과 같이 순서가 바뀌어서 들어오는 경우
    - PersonalityType 에 값이 존재하는지 판별 후
    - 존재하지 않는값 (테스트 조건에서는 바뀌어서 들어오는 경우) 이라면 **점수계산 후 문자열 변환**을 통해 RT 로 바꾸어 Map에 값을 넣어줍니다.
- 순서가 바뀌기 때문에 계산로직도 정확히 **반대**입니다.
    - map.put(key, map.get(key) - (choices[i] - 4));
    - map.put(key, map.get(key) + (choices[i] - 4));
- 점수 계산이 끝난후 결과를 리턴합니다.

## Code.

```java
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {
    public String solution(String[] survey, int[] choices) {
        Map<PersonalityType, Integer> map = new HashMap<>();
        initPersonalityTypeMap(map);
        calculateTypeScore(survey, choices, map);
        return getPersonalityTypeResult(map);
    }
    
    private static void initPersonalityTypeMap(Map<PersonalityType, Integer> map) {
        for (PersonalityType type : PersonalityType.values()) {
            map.put(type, 0);
        }
    }

    private static void calculateTypeScore(String[] survey, int[] choices, Map<PersonalityType, Integer> map) {
        for (int i = 0; i < survey.length; i++) {
            String str = survey[i];
            if (isSurveyMatchPersonalityType(str)) {
                PersonalityType key = PersonalityType.valueOf(survey[i]);
                map.put(key, map.get(key) - (choices[i] - 4));
            } else {
                String str1 = String.valueOf(survey[i].charAt(1));
                String str2 = String.valueOf(survey[i].charAt(0));
                PersonalityType key = PersonalityType.valueOf(str1 + str2);
                map.put(key, map.get(key) + (choices[i] - 4));
            }
        }
    }

    private static boolean isSurveyMatchPersonalityType(String str) {
        return Arrays.stream(PersonalityType.values())
                .anyMatch(v -> v.name().equals(str));
    }

    private static String getPersonalityTypeResult(Map<PersonalityType, Integer> map) {
        StringBuilder sb = new StringBuilder();
        PersonalityType[] types = PersonalityType.values();
        //RT , CF, JM, AN
        Arrays.stream(types).forEach(type -> {
            if (isTypeValuePositive(map, type)) {
                sb.append(type.name().charAt(0));
            } else if (map.get(type) < 0) {
                sb.append(type.name().charAt(1));
            } else {
                if (type.name().charAt(0) > type.name().charAt(1))
                    sb.append(type.name().charAt(1));
                else
                    sb.append(type.name().charAt(0));
            }
        });
        return sb.toString();
    }

    private static boolean isTypeValuePositive(Map<PersonalityType, Integer> map, PersonalityType type) {
        return map.get(type) > 0;
    }

    public enum PersonalityType {
        RT, CF, JM, AN
    }
```