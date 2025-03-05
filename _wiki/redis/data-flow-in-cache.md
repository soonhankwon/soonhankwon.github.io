---
layout  : wiki
title   : Data flow in cache
summary : 
date    : 2025-03-05 16:04:00 +0900
updated : 2025-03-05 16:04:00 +0900
tag     : redis cache
toc     : true
comment : true
public  : true
parent  : [[/redis]]
latex   : true
---
* TOC
{:toc}

## Data flow in cache

데이터 스토어보다 적은 양을 보관하는 데이터베이스의 Subset

- 캐시는 가득 차지 않게 일정 양의 데이터를 유지해야함
- 적절한 시간의 **TTL(Time-To-Live)** 값 설정 필요

### Time To Live

- TTL(Time To Live)
    - 데이터가 **얼마나** 저장될 것인지를 나타내는 시간 설정
    - 데이터의 수명을 관리하고 메모리 공간을 효율적으로 사용하는데 도움을 준다.
    
    ```bash
    SET a 100
    OK
    EXPIRE a 60
    (integer) 1
    TTL a
    (integer) 17
    ```
    
    - INCR, RENAME 하더라도 만료시간은 변경되지 않음
    - 하지만 기존 키에 새로운 값을 저장해 덮어쓰면 만료시간이 유지되지 않고 사라진다.
    
    ```bash
    SET b 100
    OK
    EXPIRE b 60
    (integer) 1
    TTL b
    (integer) 55
    SET b banana
    OK
    TTL b
    (integer) -1
    ```
    
- 레디스에서 키가 만료됐다고 해도 바로 메모리에서 삭제되는 것은 아님
    - **passsive** 방식
        - 클라이언트가 키에 접근하고자 할 때 키가 만료됐다면 메모리에서 **수동적**으로 삭제한다.
    - **active** 방식
        - TTL값이 있는 키 중 20개를 **랜덤**하게 뽑아낸 뒤, 만료된 키를 모두 메모리에서 삭제한다.
        - 만약 25% 이상의 키가 삭제됐다면 다시 20개의 키를 랜덤하게 뽑은 뒤 확인 → 아니라면 뽑아놓은 20개의 키 집합에서 다시 확인
        - 이러한 과정을 1초에 10번 수행
    - 만료된 키를 곧바로 삭제하지 않기 때문에 키를 삭제하는 데에 들어가는 리소스를 줄일 수 있지만, 그만큼 메모리를 더 사용할 가능성이 존재한다.
    - 최악의 경우 전체 메모리의 1/4는 이미 만료된 키 값일 가능성 존재