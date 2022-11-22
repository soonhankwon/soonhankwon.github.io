---
layout : single
title : "221122 FetchType"
categories : til
tags : [jpa, til, spring] 
---

# 221122 TIL FetchType?

**Mention** : 인프런 Querydsl 김영한님 강의 도중 ManyToOne 에 fetchType.Lazy에 대한 궁금증이 생겼다❓

### Fetch Type 이란

Fetch Type은 JPA가 하나의 Entity를 조회할 때, 연관관계에 있는 객체들을 어떻게 가져올 것이냐를 나타내는 설정값이다. 

Fetch Type은 크게 Eager 와 Lazy 두가지 전략이 있다. Fetch Type Issue 라는 것은 하나의 Entity를 로드할 때, 아래의 두가지 전략 중 고민하는 상황을 말한다. 

- 연관 관계에 있는 Entity 모두 가져온다 → Eager 전략
- 연관 관계에 있는 Entity 가져오지 않고, getter로 접근할 때 가져온다 → Lazy 전략

ManyToOne은 기본적으로 FetchType.EAGER를 사용하는데 이것은 연관관계의 두 클래스 모두 DB에서 JOIN 조회

FetchType.LAZY로 변경하게 되면 
Member 클래스만 DB에서 조회한다.

#### POINT

실무에서는 한번 조회할 때 다수의 테이블(대략 5개 이상)을 JOIN해서 가지고 오면 성능문제를 일으킨다고 한다. 

- **가급적 지연 로딩만 사용(특히나 실무에서)**

- 즉시 로딩을 적용하면 예상하지 못한 SQL이 발생

- 즉시로딩은 JPQL에서 N+1문제를 일으킨다.

- **@ManyToOne**, @OneToOne은 기본이 즉시로딩. -> **LAZY**로 설정하기.
- @OneToMany, @ManyToMany는 기본이 지연로딩.

Reference📝

[http://jaynewho.com/post/39](http://jaynewho.com/post/39)
[https://adg0609.tistory.com/29](https://adg0609.tistory.com/29)