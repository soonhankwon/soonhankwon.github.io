---
layout : single
title : "프로그래머스 LV2 JAVA : [1차] 캐시"
categories : algorithm
tags : [프로그래머스, 2018 KAKAO BLIND RECRUITMENT] 
---

[2018 KAKAO BLIND RECRUITMENT](https://school.programmers.co.kr/learn/courses/30/lessons/17680)

## Category : Queue, 구현, LRU

큐 자료구조와 문제의 LRU 알고리즘을 정확히 이해하면 풀리는 문제

## Flow.

- 첫번째로 캐시사이즈가 0인 경우 즉, 캐시를 사용하지 않는경우 city 배열의 길이 * 5 를 해서 빠르게 리턴해줍니다. (예외)
- 핵심 로직 - 경우의 수
    - 캐시에 공간이 남은 경우
        - 캐시 Hit or Miss
    - 캐시에 공간이 남지 않은 경우
        - 캐시 Hit or Miss
- 캐시에 공간이 남은 경우 & 캐시 Miss
    - 큐에서 요소를 Poll 하지않고 Add 만 해줍니다.
- 캐시에 공간이 남지 않은 경우 & 캐시 Miss
    - 큐에서 요소를 Poll 하고 Add 해줍니다.
- **캐시 Hit 경우 (공통) → LRU**
    - 큐에서 해당 요소를 삭제해주고 새롭게 Add 해줍니다.
    - remove 와 poll 의 차이가 중요합니다.
    - 사람들이 가게앞에 줄이 서있다면 poll 은 제일 앞사람이 빠지는 경우, remove 는 중간에 있는 사람을 빼는 경우라고 비유할 수 있습니다.

## Code.

- 초기 코드에서 거의 비슷한 로직들이 반복
- 리팩토링을 통하면 상당부분 개선시킬수 있을것이라고 생각했습니다.
- **함수자체를 매개변수로 전달**해서 **공통로직**을 뽑아냈고 이를통해 코드를 개선시켰습니다.
- 리팩토링 주 과정 : 조건문을 메서드 추출
- 반복된 공통 로직에서 다르게 구현할 점
    - 캐시에 공간이 남은 경우 & 캐시 Miss → Add 만한다.
        - 큐에서 요소를 Poll 하지않고 Add 만 해줍니다.
    - 조건문 메서드를 메서드 매개 변수로 넘겨 로직을 합침
    - 최종 getExecutionTime 으로 리팩토링
- 메서드 이름 및 변수 이름 일부 수정

### Refactoring Version

```java
import java.util.LinkedList;
import java.util.Queue;

class Solution {
    
    private static int answer;
    
    public int solution(int cacheSize, String[] cities) {
        Queue<String> cacheQueue = new LinkedList<>();
        answer = 0;
        if (isNotUsedCache(cacheSize)) {
            return cities.length * 5;
        }

        for (String c : cities) {
            String city = c.toLowerCase();
            if (isCacheSpaceUnderCacheSize(cacheSize, cacheQueue)) {
                getExecutionTime(cacheSize, cacheQueue, city);
            }
            else {
                getExecutionTime(cacheSize, cacheQueue, city);
            }
        }
        return answer;
    }
    
    private static boolean isNotUsedCache(int cacheSize) {
        return cacheSize == 0;
    }

    private static boolean isCacheSpaceUnderCacheSize(int cacheSize, Queue<String> cacheQueue) {
        return cacheQueue.size() < cacheSize;
    }

    private static void getExecutionTime(int cacheSize, Queue<String> cacheQueue, String city) {
        if (isCityExistCache(cacheQueue, city)) {
            cachingCaseByHit(cacheQueue, city);
            answer++;
        } 
        else {
            cachingCaseByMissAndCacheSpace(cacheQueue, city, isCacheSpaceUnderCacheSize(cacheSize, cacheQueue));
            answer += 5;
        }
    }

    private static boolean isCityExistCache(Queue<String> cacheQueue, String city) {
        return cacheQueue.contains(city);
    }

    private static void cachingCaseByHit(Queue<String> cacheQueue, String cityLowerCased) {
        cacheQueue.remove(cityLowerCased);
        cacheQueue.add(cityLowerCased);
    }

    private static void cachingCaseByMissAndCacheSpace(Queue<String> cacheQueue, String city, boolean isCacheSpaceUnderCacheSize) {
        if (isCacheSpaceUnderCacheSize) {
            cacheQueue.add(city);
        }
        else {
            cacheQueue.poll();
            cacheQueue.add(city);
        }
    }
}
```

### Before Refactoring

```java
import java.util.LinkedList;
import java.util.Queue;

class Solution {
    public int solution(int cacheSize, String[] cities) {
        Queue<String> cacheQueue = new LinkedList<>();
        int answer = 0;
        if(cacheSize == 0) {
            return cities.length * 5;
        }
        for (String city : cities) {
            String cityLowerCased = city.toLowerCase();
						// if 와 else 로직이 거의 중복, 반복되는 것을 볼 수 있다.
            if (cacheQueue.size() < cacheSize) {
                if(isCityExistCache(cacheQueue, cityLowerCased)) {
                    cachingCaseByHit(cacheQueue, cityLowerCased);
                    answer++;
                }
                else {
										// 리팩토링이 가능한 부분
										// 다른부분 -> cacheQueue.size() < cacheSize 이 녀석을 메서드로
										// 그리고 함수자체를 매개 변수로 넘겨 리팩토링하면 어떨까?
                    cacheQueue.add(cityLowerCased);
                    answer += 5;
                }
            }
            else {
                if(isCityExistCache(cacheQueue, cityLowerCased)) {
                    cachingCaseByHit(cacheQueue, cityLowerCased);
                    answer++;
                }
                else {
                    cachingCaseByMiss(cacheQueue, cityLowerCased);
                    answer += 5;
                }
            }
        }
        return answer;
    }
    
    private static void cachingCaseByHit(Queue<String> cacheQueue, String cityLowerCased) {
        cacheQueue.remove(cityLowerCased);
        cacheQueue.add(cityLowerCased);
}
```