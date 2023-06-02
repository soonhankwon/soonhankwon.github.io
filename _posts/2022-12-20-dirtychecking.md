---
layout : single
title : "더티체킹(Dirty Checking)이란?"
categories : jpa
tags : [til, spring, jpa] 
---

**Mention** : persist, remove, find... where is update?✅

- JPA를 사용하면서 더티 체킹과 트랜잭션의 관계에 대해서 알고 있지 않으면, 비즈니스 로직에서 다루는 엔티티 데이터가 꼬이는 경우가 발생한다.

## 더티체킹(Dirty Checking)이란?

- JPA는 entity manager 가 엔티티를 저장,조회,수정,삭제를 한다.
- 하지만, entity manager의 메서드를 찾아보면 저장,조회,삭제로 **수정**에 해당하는 메서드가 없다.
- 대신 수정에 해당하는 **더티 체킹**을 지원한다.
    - 더티 체킹은 Transaction 안에서 엔티티의 변경이 일어나면, 변경 내용을 자동으로 데이터베이스에 반영하는 JPA 특징
- 데이터베이스에 변경 데이터를 저장하는 시점
    - Transaction commit 시점
    - Entity flush 시점
    - JPQL 사용 시점
- 또한, 영속성 컨택스트(Persistence Context) 안에 있는 엔티티를 대상으로 더티 체킹이 일어난다.
    
    ![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcokEKI%2FbtqygTOISLW%2FTrI5hAUoR9wiVP92OJlIJ0%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcokEKI%2FbtqygTOISLW%2FTrI5hAUoR9wiVP92OJlIJ0%2Fimg.png)
    
- 더티 체킹이 일어나는 환경은 아래 두 가지 조건이 충족되어야 합니다.
    - **영속 상태(Managed)** 안에 있는 엔티티인 경우
    - **Transaction** 안에서 엔티티를 변경하는 경우
- Transaction은 두 가지 방식으로 사용할 수 있습니다.
    - Service Layer에서 **@Transactional**을 사용하는 경우
        
        ```java
        @Service
        public class ExampleService {
             @Transactional
             public void updateInfo(Long id, String name) {
                  User user = userRepository.findById(id);
                  user.setName(name);
             }
        }
        ```
        
    - **EntityTransaction**을 이용해서 **트랜잭션을 범위를 지정**하고 사용하는 경우
        
        ```java
        @Service
        public class ExampleService {
             public void updateInfo(Long id, String name) {
                  EntityManager em = entityManagerFactory.createEntityManager();
                  EntityTransaction tx = em.getTransaction();
                  // 1. 트랜잭션 시작
                  tx.begin();
                  // 2.User 엔티티를 조회 & User 스냅샷 생성
                  User user = em.find(User.class, id);
                  // 3.User 엔티티의 name을 변경
                  user.setName(name);
                  // 4. 트랜잭션
                  // 5.User 스냅샷과 최종 user의 내용을 비교해서 Dirty를 Checking 해서 Update Query 발생
                  tx.commit();
             }
        }
        ```
        
- Summary
    - 더티 체킹이란 “상태 변경 검사”입니다. JPA에서는 트랜잭션이 끝나는 시점에 최초 조회 상태로부터 변화가 있는 모든 엔티티 객체를 데이터베이스에 자동으로 반영해줍니다. 엔티티를 조회하면 해당 엔티티의 조회 상태 그대로 **스냅샷**을 만들어 놓고 트랜잭션이 끝나는 시점에는 이 스냅샷과 비교해서 다른점이 있다면 **Update Query**를 데이터베이스로 전달합니다. 상태 변경 검사의 대상은 영속성 컨텍스트가 관리하는 엔티티에만 적용됩니다. 즉, 준영속/비영속 상태의 엔티티는 더티 체킹의 대상에 포함되지 않아 값을 변경해도 데이터베이스에 반영되지 않습니다.

Reference 📚

[https://interconnection.tistory.com/121](https://interconnection.tistory.com/121)