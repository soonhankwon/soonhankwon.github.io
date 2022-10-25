---
layout : single
title : "221018 About ORM Relationship Mapping Basic"
catagories : til
tags : [orm, til] 
---

# 221018 TIL

**Acheivement** : PRING 팀 프로젝트ING🤝 거의 대부분의 기능 구현 완료!

GIT **Merge**과정에서 **Conflict** 해결을 해보았다. 백준 아이디 생성 및 기초 알고리즘 문제 10문제 COMPLETED.
  
**Problem** : Service Business Logic을 짜는데 아직 미숙한 점이 많다. 심화과정들어와서 JPA 영속성 및 데이터베이스, HTTP 등

공부가 꽤나 필요한 이론들을 한꺼번에 많이 접하게되어 두뇌가 어지럽다🤯
    
**Feedback** : 같은 조 팀원분에게 그림으로 로직을 먼저 짜보라는 조언을 받았다. 실제로 많은 도움이 됨👍🏽

**Many to One, One to Many** 에 대한 정확한 이해 필요! -> 엔티티 매핑 관련

하루에 하나정도의 주제로 정확히 숙지해주는 것이 중요하다 생각하고 꼭 실행하자🔥
<hr/>

| 관계 | 코드선언 | Entity | Example | 
| --- | --- | --- |--- |
| 일대다 | @OneToMany | Order(1) : Food(N) | 배달 주문 1개에 음식 여러개 선택 가능
| 다대일 | @ManyToOne | Owner(N) : Restaurant(1) | 음식점 주인 여러명이 하나의 음식점을 소유 가능
| 일대일 | @OneToOne | Order(1) : Coupon(1) | 배달 주문 1개 주문 시, 쿠폰 1개만 할인 적용 가능
| 다대다 | @ManyToMany | User(N) : Restaurant(N) | 고객은 음식점 여러개 찜 가능, 음식점은 고객 여러명에게 찜 가능

<hr/>
  방향 관계를 매핑할 때 둘 중 어떤 것을 사용해야 할지는 <u>반대편 관계</u>에 달려있다. 

반대편이 일대다 관계면 다대일을 사용하고, 반대편이 일대일 관계면 일대일을 사용하면 된다.

다대다 관계는 **지양**하고 다대다 관계에 **연결(조인) Entity**를 생성하여 일대다, 다대일의 명확한 관계를 쓰는것을 **지향**하는 것이 좋다.

WHY❓ : 관계형 데이터베이스는 정규화된 테이블 2개로 다대다 관계를 표현할 수 없기 때문이다. 따라서 연결 테이블을 추가해서 일대다, 다대일 관계로 풀어내야 한다. 