---
layout : single
title : "Composite Index(결합 인덱스)"
categories : tidatabasel
tags : [til, database, mysql] 
---

**Mention** : 컬럼을 결합해서 인덱스를 만들어보자 📚+📚

## 결합 인덱스

- 결합 인덱스란 두 개 이상의 컬럼을 합쳐서 인덱스를 만드는 것이다.
- 단일 컬럼으로는 나쁜 분포도를 가지지만 여러 개의 컬럼을 합친다면 좋은 분포도를 가진다.
    - 분포도(Selectivity) [https://jdm.kr/blog/169](https://jdm.kr/blog/169)
    - 해당 컬럼의 유니크한 데이터의 종류가 많다 → 분포도가 좋다.
- WHERE 절에서 AND 조건에 많이 사용되는 컬럼들을 결합 인덱스로 구성한다.

### 결합 인덱스 컬럼의 설정 시 고려해야 할 우선순위

- WHERE절 조건에 많이 사용되는 컬럼이 우선시
- Equal(’=’) 로 사용되는 컬럼 우선
- 분포도가 좋은 컬럼을 우선
- 자주 이용되는 순서대로 결합 인덱스 컬럼의 순서 결정

### 결합 인덱스의 예시

- 결합 인덱스 생성
    - create index emp_pay on emp_payemp_pay(급여년월, 급여코드, 사원번호);
- 결합 인덱스 사용
    - select * from emp_pay **where 급여년월** = '202107';
    - select * from emp_pay **where 급여년월** = '202107' and 급여코드 ='정기급여';
    - select * from emp_pay **where 급여년월** = '202107' and 급여코드 = '정기급여' and 사원번호 = '20210401';
- 결합 인덱스가 사용되지 않을 때
    - select * from emp_pay where 급여코드 = '정기급여';
    - select * from emp_pay where 사원번호 = '20210401';
    - select * from emp_pay where 사원번호 = '20210401' and 급여코드 = '정기급여';
    - **where 조건문**을 나열할 때 결합 **인덱스의 첫 번째 컬럼**인 급여년월의 조건식이 없으면 B-Tree 구조인 결합 인덱스를 검색할 수 없다.

### 결합 인덱스의 효율성이 떨어지는 경우

- 결합 인덱스도 일반적인 인덱스와 마찬가지로 **데이터들이 정렬되어 보관**되기 때문에 소수의 데이터를 빠르게 찾는 것에는 유리하지만 아래와 같이 **스캔이 많이 생기게 된다면 효율성이 떨어지게 됩다.** 아래의 예시들은 emp_pay_idx 인덱스를 사용하기는 하지만 스캔이 많이 생기는 경우로 인덱스의 효율성이 떨어지는 경우들의 예시이다.
    - select * from emp_pay where 급여년월 **LIKE** '2021%' and 급여코드 = '정기급여';
        - 범위 연산자인 LIKE% 조건을 쓰면 쉽게 찾을 수가 없다.
            - 각 컬럼별로 정렬이 되어 있는것이 아님
            - 결합이 되어 정렬이 되어있기 때문에
    - select * from emp_pay where 급여년월 = '202107' and 사원번호 = '20210401';
        - 급여코드에 대한 조건이 없으므로, 풀 테이블 스캔이 일어난다.

### Summary

- 복합 인덱스란 두 개 이상의 컬럼을 합쳐서 인덱스를 만드는 것입니다. 단일 컬럼으로는 나쁜 분포도를 가지지만, 여러 개의 컬럼을 합친다면 좋은 **분포도**를 가지게 됩니다.
**where 절**에서 and 조건에 많이 사용되는 컬럼들을 결합 인덱스로 구성하면 효율적입니다. 다만 where 조건절을 결합 인덱스에 맞지 않게 사용한다면, 스캔이 많이 생기게 되서 효율성이 떨어지게됩니다.

Reference 📚

[https://coding-factory.tistory.com/755](https://coding-factory.tistory.com/755)