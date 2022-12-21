---
layout : single
title : "이진탐색(Binary Search)"
categories : til
tags : [til, datastructure, algorithm] 
---

**Mention** : 업다운 게임의 가장 효율적인 방법 ➡️ ✅ ⬅️
    
![https://blog.penjee.com/wp-content/uploads/2015/04/binary-and-linear-search-animations.gif](https://blog.penjee.com/wp-content/uploads/2015/04/binary-and-linear-search-animations.gif)
    
## 이진 탐색 (이분탐색)
    
- 이진 탐색 알고리즘은 **정렬되어 있는 리스트**에서 **탐색 범위를 절반씩 좁혀가며 데이터를 탐색**하는 방법이다.
- 배열 내부의 데이터가 **정렬되어 있어야만** 사용할 수 있는 알고리즘이다.
- 변수 3개 (start, end, mid) 를 사용하여 탐색한다. **찾으려는 데이터와 중간점 위치에 있는 데이터를 반복적으로 비교해서 원하는 데이터를 찾는 것**이 이진 탐색의 과정이다.
            
    
    ```java
    import java.util.Scanner;

    public class BinarySearch {
        Scanner scan = new Scanner(System.in);
        int[] arr = new int[scan.nextInt()];

        int binarySearch(int key, int low, int high) {
            int mid;

            while (low <= high) {
                mid = (low + high) / 2;

                if (key == arr[mid]) {
                    return mid;
                } else if (key < arr[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            return -1; // 탐색 실패
        }
    ```            
        
    
### 이진 탐색의 시간복잡도
    
- 이진 탐색은 탐색을 반복할 때마다 탐색 범위를 반으로 줄인다.
- 이러한 탐색 범위가 더 이상 줄일 수 없는 **1**이 될 때의 탐색 횟수를 k라고 한다면, 아래 표와 같다.   
            
    | 비교 | 범위 |
    | --- | --- |
    | 탐색 횟수 | n |
    | 1 | n/2 |
    | 2 | n/4 |
    | ... | ... |
    | k | n/2^k |

    - 표의 마지막 행에서 n/2^k = 1 이므로, k=log_2N 이다.
    - 따라서 이진 탐색의 시간 복잡도는 **O(log n)**이 된다.
    
### Summary
    
- 이분탐색이란 정렬되어 있는 리스트에서 **탐색 범위를 절반씩 좁혀가며 데이터를 탐색하는 방법**입니다. 배열 내부의 데이터가 **정렬**되어 있어야만 사용할 수 있는 알고리즘이며, 찾으려는 데이터와 중간점 위치에 있는 데이터를 반복적으로 비교해서 원하는 데이터를 찾는 것 입니다. 이진 탐색의 시간 복잡도는 탐색을 반복할 때마다 탐색 범위를 반으로 줄이기 때문에 **O(log n)** 이 됩니다.
    
Reference 📚
    
[https://velog.io/@kimdukbae/이분-탐색-이진-탐색-Binary-Search](https://velog.io/@kimdukbae/%EC%9D%B4%EB%B6%84-%ED%83%90%EC%83%89-%EC%9D%B4%EC%A7%84-%ED%83%90%EC%83%89-Binary-Search)
    
[https://minhamina.tistory.com/127](https://minhamina.tistory.com/127)