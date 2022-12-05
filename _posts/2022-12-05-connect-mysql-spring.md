---
layout : single
title : "SpringBoot(gradle) + MySQL🐬 + JPA 연동하기"
categories : til
tags : [til, spring, mysql] 
---

- MAC에서 MySQL WORKBENCH 사용한 스프링부트 + MySQL + JPA 연동하기
    - 항상 첫걸음은 세팅부터다🛠

1. MySQL 서버를 구동시켜 준다.(terminal)
    - cd /usr/local/mysql/bin/
    - ./mysql -uroot -p
    - password 입력

2. WORKBENCH 🐬에서 create a new schemas 로 새로운 스키마(DB)를 만들어 준다.

3. build.gradle에 아래 dependency를 추가해준다.
    ```java
    dependencies {
        implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
        implementation 'mysql:mysql-connector-java'
    }
    ```
4. 아래의 설정으로 properties 나 yml 파일의 내용을 세팅해준다.

    ```java
    # MySQL 설정
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    # DB Source URL
    spring.datasource.url=jdbc:mysql://<IP>:<PORT>/<DB NAME>?useSSL=false&useUnicode=true&serverTimezone=Asia/Seoul
    spring.datasource.url=jdbc:mysql://localhost:3306/testdb?characterEncoding=UTF-8&serverTimezone=UTC
    # DB usernamer
    spring.datasource.username=<MySQL USERNAME>
    # DB password
    spring.datasource.password=<MySQL PASSWORD>
    logging.level.com.example = debug
    spring.jpa.properties.hibernate.format_sql=true
    spring.jpa.properties.hibernate.show_sql = true
    #spring.jpa.hibernate.ddl-auto=create
    spring.jpa.hibernate.ddl-auto=update
    ```

spring.jpa.hibernate.dll-auto : create, create-drop, update, validate, none 옵션 설정 가능

- **create : JPA가 DB와 상호작용할 때 기존에 있던 스키마(테이블)을 삭제하고 새로 만드는 것을 뜻함**
    - 테스트 용도로 자주 사용

- create-drop : JPA 종료 시점에 기존에 있었던 테이블을 삭제

- **update : JPA에 의해 변경된 부분만 반영**
    - 실제 서비스와 비슷한 환경이라고 개인적으로 생각

- validate : 엔티티와 테이블이 정상 매핑되어 있는지만 검증

- none : 초기화 동작을 사용하지 않는다

spring.jpa.show-sql: JPA가 생성한 SQL문을 보여줄 지에 대한 여부를 알려주는 프로퍼티입니다.

spring.jpa.generate-dll: 

spring.jpa.hibernate.dll-auto 옵션을 사용할 것인지를 결정하는 프로퍼티입니다. **기본적으로 false**로 되어있기 때문에 JPA에 의한 데이터베이스 자동 초기화 기능을 사용하려면 true로 세팅해야 한다.

Reference 📝

[https://engkimbs.tistory.com/794](https://engkimbs.tistory.com/794)