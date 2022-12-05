---
layout : single
title : "자바 데이터 타입, 변수 그리고 배열"
categories : til
tags : [java, til, lang] 
---
# 2주차과제 : 자바 데이터 타입, 변수 그리고 배열

### 목표

---

자바의 프리미티브 타입, 변수 그리고 배열을 사용하는 방법을 익힙니다.

### 학습할 것

---

- 프리미티브 타입 종류와 값의 범위 그리고 기본 값
- 프리미티브 타입과 레퍼런스 타입
- 리터럴
- 변수 선언 및 초기화하는 방법
- 변수의 스코프와 라이프타임
- 타입 변환, 캐스팅 그리고 타입 프로모션
- 1차 및 2차 배열 선언하기
- 타입 추론, var

- 프리미티브 타입 종류와 값의 범위 그리고 기본 값

### Primitive Type

|이름|  크기 |값 범위   |  기본 값 |  비고 |
|---|---|---|---|---|
| byte  | 1byte  | -128 ~ 127  | 0  |   |
| short  | 2bytes  | -32,768 ~ 32,767  | 0  |   |
| signed int  | 4bytes   | $-2^{31}$ ~ $2^{31}-1$  |  0 |   |
| unsigned int | 4bytes   |  0 ~ $2^{32}-1$ | 0  | java 8 이상부터 가능  |
| signed long  | 8bytes   | $-2^{63}$  ~ $2^{63}-1$  | 0L  |   |
| unsigned long  | 8bytes   | 0 ~ $2^{64}-1$  | 0L  | java 8 이상부터 가능  |
| float  | 4bytes   |  single-precision 32-bit | 0.0f  |   |
| double  | 8bytes   | double-precision 64-bit  | 0.0d |   |
| boolean  | 1bit  | true / false  | false  |   |
| char  | 2bytes   | '\u0000' ~ '\uffff'  |'\u0000'   | 하나의 문자만 저장할 수 있다.  |

Signed 와 Unsigned 의 차이 

- Signed :  부호를 가지는 값(양수, 음수의 구별 OK)
- Unsigned : 부호를 가지지 않는 값 (오직 양수 OK)
ex ) unsigned int의 양수 범위 값이 signed int의 양수 범위 값보다 범위 표현이 넓다.( $2^{31}-1$ < $2^{32}-1$)

### 프리미티브 타입과 레퍼런스 타입

- Primitive type
    - byte, short, int, long, float, double, boolean, char
    - not object
    - 값 저장
- Reference type
    - class, interface, enum, array, String type
    - 주소 저장
    

### 리터럴

- 리터럴이란 **프로그램에서 직접 표현한 값**을 의미한다.
- 고정된 값을 갖는 소스코드 표현 형태
- 종류로는 정수, 실수, 문자, 논리, 문자열 리터럴이 있다.
    
    ```java
    boolean result = true;
    char capitalC = 'C';
    byte b = 100;
    short s = 10000;
    int i = 100000;
    ```
    
- Integer Literals
    - long 타입은 L 로 끝나거나 I 로 끝나는 값
    - 그외 나머지 숫자는 int
    
    ```java
    int a = 15; //10진수 리터럴 15
    int b = 015; //0으로 시작하면 8진수, 13
    int c = 0x15; //0x로 시작하면 16진수, 15
    int d = 0b0101; //0b로 시작하면 2진수, 5
    ```
    
    - 16진수 : 0x 로 시작
    - 2진수 : 0b 로 시작
- Floating-Point Literals
    - float 타입은 F로 끝나거나 f로 끝나는 값
    - 그 외 나머지는 double (optional, D 혹은 d 로 끝나는 값)
    
    ```java
    float h = 0.1234f; //float는 f를 꼭 붙여줘야한다.
    double i = .1234D; //double은 생략가능 
    ```
    
- Character and String Literals
    
    ```java
    char a = 'H';
    char b = "한";
    char c = \uae00;(유니코드값)
    ```
    
    - 문자 리터럴은 단일 인용부호(’’)로 문자를 표현한다.
    - Unicode character
    - special escape character
        - \b : backspace
        - \t : tab
        - \n : new line
        - \f : form feed
        - \r : carriage return
        - \" : double quote
        - \' : single quote
        - \\ : backslash
    - 문자열 리터럴
        - 문자열은 기본타입이 아니며, 더블 쿼터(””)로 문자열을 표현한다.
        
        ```java
        String literal = "JAVA"
        ```
        

### 변수 선언 및 초기화하는 방법

- 자바에서 변수를 사용하기 위해서는 변수를 선언해야 한다. 
변수를 선언하는 이유는 값을 저장하는 공간을 확보하겠다는 이야기이다. 
정확히는 컴퓨터가 가진 **메모리**를 사용하겠다고 미리 컴퓨터에게 말하는 것이다.
- 변수는 변수를 선언한 후 값을 할당해주어야만 사용할 수 있다.
경우에 따라 초기화를 하지 않고도 사용할 수 있지만, 기본적으로는 변수는 **선언과 초기화**가 이루어져야 사용할 수 있다.
    
    ```java
    class A {
    	public int a;
    }
    
    class Hello {
    	public static void main(String[] args) {
    			String message1; 
    			// 변수 선언
    			message1 = "Hello World";
    			// 변수 초기화
    			String message2 = "Hello World";
    			// 변수 선언 및 초기화 
    			int value = 10;
    			// primitive type variable declaration and initialization
    			A a = new A();
    			// reference type object declaration and initialization
    	}
    }
    ```
    

### 변수의 스코프와 라이프타임

- 예시로 변수를 선언해보자
    
    ![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbhC07e%2FbtqNWEae11F%2F20XjpJuO4SKyxHKWpdiGIk%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbhC07e%2FbtqNWEae11F%2F20XjpJuO4SKyxHKWpdiGIk%2Fimg.png)
    
- 이 변수의 사용 범위는 어디까지일까? 이 변수의 사용 범위는 선언된 클래스의 중괄호 내에서 사용가능하다. 이 범위를 우리는 ‘스코프’라고 부른다.

    ![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbusSe3%2FbtqNSyvxtrF%2FOkhOJEkbBU5resjW67Mh20%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbusSe3%2FbtqNSyvxtrF%2FOkhOJEkbBU5resjW67Mh20%2Fimg.png)

- Class 안에 var1이란 변수가 선언됬으면 var1의 스코프는 클래스 전체에서 사용가능하다. 즉 foo() 메소드 안에도 들어갈 수 있다.
- 하지만 var2의 스코프는 foo() 안의 초록색 칸에서만 사용이 한정되어있다.

    ![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F4Fm6C%2FbtqNRJRGTIC%2FBKBFDHRqmv3YokPhP7diik%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F4Fm6C%2FbtqNRJRGTIC%2FBKBFDHRqmv3YokPhP7diik%2Fimg.png)

- 이렇게 if 문안에서 사용한 var3도 if문의 스코프 안에서만 활동할 수 있다.
- 생명주기(life Cycle)
    - 모든 변수는 생명주기를 가진다. 생명주기란, 변수가 생성되고 죽는것을 말한다.
    - 클래스 내에서 선언하는 변수를 인스턴스 변수
    - 메소드 내에서 선언하는 변수를 지역변수라고 한다.
    
    ![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FczMkKK%2FbtqNQvTOx5C%2FIy0Cgy4pJVRLOt2GUS5S2k%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FczMkKK%2FbtqNQvTOx5C%2FIy0Cgy4pJVRLOt2GUS5S2k%2Fimg.png)
    
    - member variable scope
        - `public` modifier: 상속받은 모든 클래스에서 사용 가능
        - `private` modifier: 자기 클래스에서만 사용 가능
    - 인스턴스 변수는 객체가 생성될 때, 변수가 생성된다. 즉, 현재 Test 클래스를 static main 메소드나 다른 클래스에서 인스턴스를 생성할때 생성이된다.
    - Garbage Collector 에 의해 참조되지 않는 객체는 제거 대상이 됨 이때, 인스턴스 변수도 같이 소멸된다.
    - 매개 변수는 예를 들어 foo() 메소드가 호출될 때, var3가 생성되고 foo() 메소드의 종료시점에 소멸된다.
    - 클래스 변수인 정적변수는 클래스가 처음 호출되면서 생성, 자바 어플리케이션이 종료되면 소멸된다.

### 타입 변환, 캐스팅 그리고 타입 프로모션

- 캐스팅 → 명시적 형 변환, 강제 형 변환
- 프로모션 → 묵시적 형 변환, 암시적 형 변환, 자동 형 변환
    - 자동 형 변환
    - 경우에 따라 편의상의 이유로 형 변환을 생략할 수 있다. 그렇다고 해서 이루어지지 않는 것은 아니다.
    - 컴파일러가 생략된 형 변환을 자동적으로 추가한다.
    - ref) [https://antstudy.tistory.com/242](https://antstudy.tistory.com/242) 형 변환 방법
- Casting → 리터럴의 타입을 다른 타입으로 변환하는 것
- Primitive type
    - Widening type cast : 더 넓은 타입으로의 형 변환
        - ex. int to long, byte to short
        
        ```java
        int value = 88;
        long value2 = value;
        ```
        
    - Narrow type cast : 더 좁은 타입으로의 형 변환
        - 값이 손실될 수 있음
        - ex. long to int, short to byte
        
        ```java
        long value = 88;
        long value2 = value;
        ```
        
- Reference type
    - 상속 관계에서만 가능
    - Upcast : subcalss → superclass
        - 모든 subclass는 superclass 의 컨텐츠를 가지고 있으므로 superclass 로의 casting이 가능함
    - Downcast : superclass → subclass
        - 모든 superclass는 subclass의 컨텐츠를 가지고 있지 않을 수도 있다. 그러므로 오류 발생 가능성이 크다.

### 1차 및 2차 배열 선언하기

```java
class ArrayExample {
	public static void main(String[] args) {
			//1차원 배열
			int[] oneDimensionArrayEx1 = {1, 2, 3, 4, 5};
			int[] oneDimensionArrayEx2;
			oneDimensionArrayEx2 = new int[5];
		
			//2차원 배열
			int[][] twoDimensionArrayEx1 = {{1,2},{3,4}}
			int[][] twoDimensionArrayEx2;
			twoDimensionArrayEx2 = new int[2][2];
	}
}
```

- 1차원 배열
    - oneDimmensionArrayEx1 은 Runtime Stack 영역의 힙 영역 주소값을 가짐
    - Heap 영역에 int 타입 크기의 요소 5개를 할당하여 사용됨
    
        ![oneDimension.png](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F674c2d06-6323-4894-a5e1-03bfa25991bf%2FUntitled.png?id=665336d3-a109-4d7e-9a54-2c4fb0427cdb&table=block&spaceId=ff7a76ea-b163-409a-99d9-bb3bc89f73d4&width=1340&userId=45338493-b7db-408a-b642-2f88eadfe21f&cache=v2)
    
- 2차원 배열
    - Runtime Stack 영역의 twoDimensionArrayEx1 은 2개의 요소크기 (2개 요소에 주소값을 가지고 있음) 를 가진 힙 영역 주소값을 가짐
    - 힙 영역에는 실제 값이 들어있는 요소들과 주소값이 들어있는 요소들로 존재하게 됨
    
        ![twoDimension.png](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fac44fd4f-af77-4127-a878-26fd5becb061%2FUntitled.png?id=5fccd8f4-0b93-4154-8767-c44be93c4821&table=block&spaceId=ff7a76ea-b163-409a-99d9-bb3bc89f73d4&width=1340&userId=45338493-b7db-408a-b642-2f88eadfe21f&cache=v2)
    

### 타입 추론, var

- 10버전 이상부터 type inference(타입 추론) 기능이 추가됨
- 타입 추론은 말 그대로 변수의 타입을 명시적으로 적어주지 않고도, 컴파일러가 알아서 이 변수의 타입을 대입된 리터럴로 추론하는 것이다.
- 대표적인 타입추론 언어는 자바스크립트, 코틀린, 스위프트 등이 있다.

```java
public static void main(String[] args) {
		String str = "Hello World";
} // 지역변수 선언 시 명시적인 타입을 적고, 선언
```

```java
public static void main(String[] args) {
		var str2 = "Hello type inference";
		if(str2 instanceof String {
			System.out.println("str2 변수의 타입은 String 입니다.");
		}
} // str2 변수의 타입을 따로 명시X, 컴파일 시점에 컴파일러가 오른쪽에 있는 초기화 값 리터럴로 타입을 추론한다. 
```

- var 라는 type keyword 를 사용하여 실제 타입을 추론

```java
var url = new URL("http://www.naver.com") // var is URL type
var list = new ArrayList<String>(); // var is ArrayList<String> type
```

- var의 잘못된 사용법
    - var 는 초기화없이 사용할 수 없다.
    - var 타입의 변수에는 null 값이 들어갈  수 없다.
    - var 타입은 로컬 변수에만 선언이 가능하다.
    - Lambda Expression에는 명시적인 타입을 지정해줘야 한다.
    - 배열을 선언할 때, var 대신 타입을 명시해줘야 한다.
        
        ```java
        ~~var~~ i; // var 타입은 초기화 값을 선언부에 명시해줘야 한다. 
        ~~var~~ i = null; //var 타입의 초기화 값은 'null'이 될 수 없다.
        private ~~var~~ i = "No member variable"; // 멤버 변수에 사용가능X
        ~~var~~ p :<lambda expression> = (String s) -> System.out.println("s = " + s);
        var arr :null = ~~{1,2,3}~~; //배열 선언할 떄 타입을 명시해줘야한다.
        ```
        
        ```java
        //var의 람다 익스프레션에서의 장점
        Consumer<String> testFoo = s -> System.out.println("s = " + s);
        Consumer<String> testFoo = (var s)-> System.out.println("s = " + s);
        //변수 앞에 var를 넣을 수 있다. why?
        Consumer<String> testFoo = (@Nonnull var s)-> System.out.println("s = " + s);
        //키워드 앞에만 사용할 수 있는 어노테이션을 사용 가능하다는 장점
        ```
        

### Reference 📝

[https://www.notion.so/2-38b5d67c7f5a48238529bb8f1617ea0d](https://www.notion.so/38b5d67c7f5a48238529bb8f1617ea0d)

[https://mine-it-record.tistory.com/100](https://mine-it-record.tistory.com/100)

[https://7942yongdae.tistory.com/22](https://7942yongdae.tistory.com/22)

[https://catch-me-java.tistory.com/18](https://catch-me-java.tistory.com/18)

[https://catch-me-java.tistory.com/19](https://catch-me-java.tistory.com/19)