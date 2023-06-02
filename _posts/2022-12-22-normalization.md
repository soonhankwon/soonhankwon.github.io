---
layout : single
title : "정규화(normalization),1NF,2NF,3NF,BCNF"
categories : database
tags : [til, database, mysql] 
---

**Mention** : 쪼개고 쪼개고 또 쪼개고🪓

## 정규화(Normalization)

- 정규화의 가장 큰 목표는 중복된 데이터를 허용하지 않는 것이다.
    - 중복된 데이터를 만들지 않으면, 무결성을 유지할 수 있고, DB 저장 용량 또한 효율적으로 관리할 수 있다.
- 목적
    - 데이터의 중복을 없애면서 불필요한 데이터를 최소화시킨다.
    - 무결성을 지키고, 이상 현상을 방지한다.
    - 테이블 구성을 논리적이고 직관적으로 할 수 있다.
    - 데이터베이스 구조를 확장에 용이해진다.
- 정규화에는 여러가지 단계가 있지만, 대체적으로 1~3단계 정규화까지의 과정을 거친다.

### Background

- super key
    - table에서 tuple들을 **unique**하게 식별할 수 있는 attributes set
- (candidate)key
    - 어느 한 attribute라도 제거하면 unique하게 tuples를 식별할 수 없는 super key
    - ex) {account_id}, {bank_name, account_num}
- primary key
    - table에서 tuple들을 unique하게 식별하려고 선택된 (candidate)key
- prime attribute
    - 임의의 key에 속하는 attribute
    - ex) account_id, bank_name, account_num
- non-prime attribute
    - 어떠한 key에도 속하지 않는 attribute

### 제 1정규화(1NF)

- 테이블 컬럼이 **원자값(하나의 값)을 갖도록** 테이블을 분리시키는 것을 말한다.
- 조건
    - 어떤 릴레이션에 속한 모든 도메인이 **원자값**만으로 되어 있어야한다.
    - 모든 속성에 반복되는 그룹이 나타나지 않는다.
    - 기본키를 사용하여 관련 데이터의 각 집합을 고유하게 식별할 수 있어야 한다.
- 관계를 의미하는 1NF 테이블
    - Chris Date에 의하면 “어떤 관계와 동일 구조”이면 1NF이다. 이는 아래의 5가지 조건을 충족한다는 의미이다.
        - 열에는 위-아래 순서가 없다.
            - ex) 뷰의 결과가 특정한 순서를 가지게 정의한 뷰 (조건위배)
        - 행에는 좌-우 순서가 없다.
        - **중복되는 열이 없다.**
            - ex) 유니크 키가 없다 (조건위배)
        - 모든 열과 행의 중복지점에는 (열과 행의) 해당되는 분야에서 한 개의 값을 가진다.
            - ex) Null 속성을 가지는 테이블 (조건위배, 논란이 있는 부분)
        - 모든 행은 규칙적이다.

![https://camo.githubusercontent.com/160f714f11647f2f3768d2fb763cc392c6451b5e77654270542a38f3eecbbc5d/687474703a2f2f646c2e64726f70626f782e636f6d2f732f397338766f77647a733374363675772f254543253841254134254544253831254143254542254136254230254543253833254237253230323031382d31322d303225323031372e35302e30322e706e67](https://camo.githubusercontent.com/160f714f11647f2f3768d2fb763cc392c6451b5e77654270542a38f3eecbbc5d/687474703a2f2f646c2e64726f70626f782e636f6d2f732f397338766f77647a733374363675772f254543253841254134254544253831254143254542254136254230254543253833254237253230323031382d31322d303225323031372e35302e30322e706e67)

- 현재 테이블은 이메일주소를 여러개 가지고 있어서 원자값이 아니다. 따라서 1NF에 맞추기 위해서는 아래와 같이 분리할 수 있다.
    
    ![https://camo.githubusercontent.com/1bb08b107650881e68eabefb1b6479d5a7c622279284c1399dd67cb83b0adddb/687474703a2f2f646c2e64726f70626f782e636f6d2f732f317272386f667875793436693631622f254543253841254134254544253831254143254542254136254230254543253833254237253230323031382d31322d303225323031382e30302e35322e706e67](https://camo.githubusercontent.com/1bb08b107650881e68eabefb1b6479d5a7c622279284c1399dd67cb83b0adddb/687474703a2f2f646c2e64726f70626f782e636f6d2f732f317272386f667875793436693631622f254543253841254134254544253831254143254542254136254230254543253833254237253230323031382d31322d303225323031382e30302e35322e706e67)
    
- 1NF를 충족하는 디자인
    - Customer Name
        
        
        | Customer ID | First Name | Surname |
        | --- | --- | --- |
        | 123 | Pooja | Singh |
        | 456 | San | Zhang |
        | 789 | John | Doe |
    - Customer Telephone Number
        
        
        | Customer ID | Telephone Number |
        | --- | --- |
        | 123 | 555-861-2025 |
        | 123 | 192-122-1111 |
        | 456 | 182-929-2929 |
        | 456 | (555)403-1659 Ext.53 |
        | 789 | 555-808-9633 |

### 제2정규화(2NF)

- 테이블의 모든 컬럼이 **완전 함수적 종속**을 만족해야 한다.
- 모든 non-prime attribute는 모든 key에 **fully functionally dependent** 해야한다.
- 2NF는 key가 composite key가 아니라면 2NF는 자동적으로 만족한다. (일반적)
    
    
    | bank_name | account_num | account_id | class | ratio | empl_id | empl_name | card_id |
    | --- | --- | --- | --- | --- | --- | --- | --- |
    | Woori | 010-9231-1121 | a11 | bronze | 0.1 | e1 | sony | c101 |
    | Woori | 102-992-1880 | a12 | silver | 0.2 | e1 | sony | c102 |
    | Kookmin | 020-555-4554 | a13 | loyal | 0.7 | e1 | sony | c103 |
    | Kookmin | 010-1221-1732 | a21 | loyal | 1 | e2 | messi | c201 |
    | Kookmin | 010-1221-1732 | a21 | loyal | 1 | e2 | messi | c202 |
- 위의 테이블에서 card_id가 하나의 원자값을 가지기 위해 1NF를 만족한 테이블이다.
    - 하지만 중복 데이터가 생기고 PK도 변경을 해야한다.
- ex] (candidate) key
    - {**account_id**, card_id} , {**bank_name, account_num**, card_id}
- ex] non-prime attribute
    - class, ratio, empl_id, empl_name
    - 모든 non-prime attribute 들이 {**account_id**, card_id}} 에 partially dependent 하다.
    - 모든 non-prime attribute 들이 **bank_name, account_num**, card_id} 에 partially dependent 하다.
- EMPLOYEE_ACCOUNT
    
    
    | bank_name | account_num | account_id | class | ratio | empl_id | empl_name |
    | --- | --- | --- | --- | --- | --- | --- |
    | Woori | 010-9231-1121 | a11 | bronze | 0.1 | e1 | sony |
    | Woori | 102-992-1880 | a12 | silver | 0.2 | e1 | sony |
    | Kookmin | 020-555-4554 | a13 | loyal | 0.7 | e1 | sony |
    | Kookmin | 010-1221-1732 | a21 | loyal | 1 | e2 | messi |
- ACCOUNT_CARD
    
    
    | account_id | card_id |
    | --- | --- |
    | a11 | c101 |
    | a12 | c102 |
    | a13 | c103 |
    | a21 | c201 |
    | a21 | c202 |
- ACCOUNT_CARD 테이블을 생성해서 2NF 정규화
    - 모든 non-prime attribute 는 모든 key에 **완전 함수적 종속**
- 테이블에서 기본키가 **복합키(키1,키2)**로 묶여있을 때, 두 키 중 하나의 키만으로 다른 컬럼을 결정지을 수 있으면 안된다.
    - 기본키의 부분집합 키가 결정자가 되어선 안된다.

### 제3정규화(3NF)

- 2NF가 진행된 테이블에서 **이행적 종속**을 없애기 위해 테이블을 분리하는 것이다.
- 모든 non-prime attribute는 어떤 key에도 **transitively dependent** 하면 안된다.
- non-prime attribute 와 non-prime attribute 사이에는 **FD**가 있으면 안된다.
- EMPLOYEE_ACCOUNT
    
    
    | bank_name | account_num | account_id | class | ratio | empl_id | empl_name |
    | --- | --- | --- | --- | --- | --- | --- |
    | Woori | 010-9231-1121 | a11 | bronze | 0.1 | e1 | sony |
    | Woori | 102-992-1880 | a12 | silver | 0.2 | e1 | sony |
    | Kookmin | 020-555-4554 | a13 | loyal | 0.7 | e1 | sony |
    | Kookmin | 010-1221-1732 | a21 | loyal | 1 | e2 | messi |
    - {account_id} → **{empl_id}** , **{empl_id}** → {empl_name}
    - {account_id} → {empl_name}
    - {bank_name, account_num} → **{empl_id}** , **{empl_id}** → {empl_name}
    - {bank_name, account_num} → {empl_name}
    - functional dependency 존재
    - **transitive FD** (이행적 종속)
        - if X → Y & Y → Z holds, then X → Z is transitive FD
        - unless either Y or Z is **not subset** of any key
- EMPLOYEE_ACCOUNT
    
    
    | bank_name | account_num | account_id | class | ratio | empl_id |
    | --- | --- | --- | --- | --- | --- |
    | Woori | 010-9231-1121 | a11 | bronze | 0.1 | e1 |
    | Woori | 102-992-1880 | a12 | silver | 0.2 | e1 |
    | Kookmin | 020-555-4554 | a13 | loyal | 0.7 | e1 |
    | Kookmin | 010-1221-1732 | a21 | loyal | 1 | e2 |
- EMPLOYEE
    
    
    | empl_id | empl_name |
    | --- | --- |
    | e1 | sony |
    | e2 | messi |
    - 위의 ACCOUNT_CARD 테이블을 포함하여 3NF 만족
    - 정규화(normalized)됨

### BCNF(Boyce-Codd Normal Form)

- 모든 유효한 **non-trivial FD** X → Y는 **X가 super key**여야 한다.
- EMPLOYEE_ACCOUNT
    
    
    | bank_name | account_num | account_id | class | ratio | empl_id |
    | --- | --- | --- | --- | --- | --- |
    | Woori | 010-9231-1121 | a11 | bronze | 0.1 | e1 |
    | Woori | 102-992-1880 | a12 | silver | 0.2 | e1 |
    | Kookmin | 020-555-4554 | a13 | loyal | 0.7 | e1 |
    | Kookmin | 010-1221-1732 | a21 | loyal | 1 | e2 |
    - kookmin 계좌 등급 : Star → Prestige → loyal
    - woori 계좌 등급 : Bronze → Silver → Gold
    - class → bank_name (functional dependency)
    - class 는 super key 인가? no
        - BCNF 위반
- ACCOUNT_CLASS
    
    
    | class | bank_name |
    | --- | --- |
    | star | Woori |
    | prestige | Woori |
    | loyal | Woori |
    | bronze | Kookmin |
    | silver | Kookmin |
    | gold | Kookmin |
- EMPLOYEE_ACCOUNT
    
    
    | account_num | account_id | class | ratio | empl_id |
    | --- | --- | --- | --- | --- |
    | 010-9231-1121 | a11 | bronze | 0.1 | e1 |
    | 102-992-1880 | a12 | silver | 0.2 | e1 |
    | 020-555-4554 | a13 | loyal | 0.7 | e1 |
    | 010-1221-1732 | a21 | loyal | 1 | e2 |
- 위의 ACCOUNT_CARD, EMPLOYEE ************************************************************************************테이블을 포함하여 **BCNF** 만족

### 역정규화(Denormalization)

- DB를 설계할 때 과도한 조인과 중복 데이터 최소화 사이에서 적정 수준을 잘 선택할 필요가 있다.
    - ex) BCNF → 3NF

### Summary

- 정규화의 가장 큰 목표는 중복된 데이터를 허용하지 않는 것입니다. 중복된 데이터를 만들지 않으면, 무결성을 유지할 수 있고, DB 저장 용량 또한 효율적으로 관리할 수 있습니다.
- 정규화에는 여러가지 단계가 있지만, 대체적으로 1~3 단계 까지를 거치면 정규화됬다고 합니다.
- 단점은 너무 많은 단계를 거치면, 과도한 조인으로 데이터베이스 성능에 문제가 생길수 있다는 것입니다. 이럴 경우 역정규화를 합니다.
- 결론적으로 DB설계시 과도한 조인과 중복 데이터 최소화 사이에서 적정 수준을 잘 선택할 필요가 있습니다.

Reference 📚

[https://www.youtube.com/watch?v=5QhkZkrqFL4](https://www.youtube.com/watch?v=5QhkZkrqFL4)

[https://github.com/gyoogle/tech-interview-for-developer/blob/master/Computer Science/Database/정규화(Normalization).md](https://github.com/gyoogle/tech-interview-for-developer/blob/master/Computer%20Science/Database/%EC%A0%95%EA%B7%9C%ED%99%94(Normalization).md)