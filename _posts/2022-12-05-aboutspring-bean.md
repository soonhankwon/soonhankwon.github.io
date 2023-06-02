---
layout : single
title : "스프링 빈(Bean)에 대해서 1-1"
categories : spring
tags : [til, spring] 
---

**Mention** : 스프링 빈(Bean)🥜 에 대해서 공부, 정리해보자

### 스프링 빈이란?

---

Spring **IoC 컨테이너가 관리하는 자바 객체를 빈(Bean)** 이라고 부른다.

### 스프링 컨테이너

스프링 컨테이너는 스프링 빈의 생명 주기를 관리하며, 생성된 스프링 빈들에게 추가적인 기능을 제공하는 역할을 한다. IoC와 DI의 원리가 스프링 컨테이너에 적용된다.

개발자는 new 연산자, 인터페이스 호출, 팩토리 호출 방식으로 객체를 생성하고 소멸하지만, 스프링 컨테이너를 사용하면 해당 역할을 대신해준다. 즉 제어 흐름을 외부에서 관리하게 된다. 또한, 객체들 간의 의존 관계를 스프링 컨테이너가 런타임 과정에서 알아서 만들어 준다. 

### 제어의 역전(IoC, Inversion of Control) 이란?

> “Don’t call us, we’ll call you”

일반적인 자바 프로그램에서는 각 객체들이 프로그램의 흐름을 결정하고 각 객체를 직접 생성하고 조작한다 (객체를 직접 생성하여 메소드 호출)

하지만, IoC가 적용된 경우, **객체의 생성을 특별한 관리 위임 주체에 맡긴다.** 
이 경우 사용자는 객체를 직접 생성하지 않고, 객체의 생명주기를 컨트롤 하는 주체는 다른주체가 된다. 즉, 사용자의 제어권을 다른 주체에게 넘기는 것을 IoC(제어의 역전) 라고 한다. 

ref) [https://martinfowler.com/bliki/InversionOfControl.html](https://martinfowler.com/bliki/InversionOfControl.html)

### 스프링 빈 등록 방식

---

- Component Scan
    - 컴포넌트 스캔은 @Component를 명시하여 빈을 추가하는 방법이다. 클래스 위에 @Component를 붙이면 스프링이 알아서 스프링 컨테이너에 빈을 등록한다.
    
    ```java
    @Target(ElementType.Type)
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    @Indexed
    public @interface Component {
    ```
    
    - 참고로 @Component는 위와 같이 ElementType.TYPE 설정이 있으므로 Class 혹은 Interface에만 붙일 수 있다.

자바에서는 Annotation 이라는 기능이 있다.
어노테이션이란 자바 소스 코드에 추가하여 사용할 수 있는 메타데이터의 일종.

특별한 기능을 사용할 수 있다. 
@Component Annotation이 등록되어 있는 경우에는 Spring이 Annotation을 확인하고 자체적으로 Bean으로 등록한다.

### 컴포넌트 스캔의 대상

- @Controller
    - 스프링 MVC 컨트롤러로 인식된다.
- @ Repository
    - 스프링 데이터 접근 계층으로 인식하고 해당 계층에서 발생하는 예외는 모두 DataAccessException으로 변환한다.
- @Service
    - 특별한 처리는 하지않으나, 개발자들이 핵심 비즈니스 계층을 인식하는데 도움을 준다.
- @Configuration
    - 스프링 설정 정보로 인식하고 스프링 빈이 싱글톤을 유지하도록 추가 처리를 한다.

### Java 코드로 등록

Java 코드로 빈을 등록할 수 있다. 클래스를 생성하고, 위에서 언급한 @Configuration 어노테이션을 활용한다. 

```java
@Configuration
public class AppCofig {
		@Bean
		public MemberRepository memberRepository() {
				return new MemoryMemberRepository();
		}
		@Bean
		public MemberService memberService() {
				return new MemberServiceImpl(memberRepository());
		}
}
```

이때, 빈을 등록하기 위해 인스턴스를 생성하는 메소드 위에 @Bean을 명시하면 된다.

```java
@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Bean {
```

참고로 @Bean은 위와 같이 `ElementType`
 설정이 METHOD 혹은 ANNOTATION_TYPE이므로 메소드나 어노테이션에만 붙일 수 있다. 클래스에 붙일 수는 없다.

### Component Scan

@Configuration에는 @Component가 있으므로 컴포넌트 스캔이 대상이 되어 자동 스캔을 통해 빈 등록이 가능하다.

### @Bean vs @Component

- @Bean
    - 개발자가 컨트롤이 불가능한 **외부 라이브러리들을 Bean으로 등록하고 싶은 경우** 에 사용된다.
    - 메소드 또는 어노테이션 단위에 붙일 수 있다.
- @Component
    - 개발자가 **직접 컨트롤이 가능한 클래스들의 경우**에 사용된다.
    - 클래스 또는 인터페이스 단위에 붙일 수 있다.

내용이 많아서 1-2에 이어서 포스팅할 계획입니다 :)

Reference 📝

[https://github.com/jvm-hater/spring-study/blob/main/3주차/Spring Bean 총 정리.md](https://github.com/jvm-hater/spring-study/blob/main/3%EC%A3%BC%EC%B0%A8/Spring%20Bean%20%EC%B4%9D%20%EC%A0%95%EB%A6%AC.md)