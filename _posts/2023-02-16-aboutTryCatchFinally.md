---
layout : single
title : "ANIT 패턴과 try-catch-finally가 관계가 있어?"
categories : java
tags : [java, til, lang, anit] 
---
## ANIT 패턴이 뭐지?🧐
개인적인 자바 예외처리 파트 공부를 하는 도중 try-catch-finally의 적절한 사용이 ANIT 패턴이라는 글을 보고
- ANIT 패턴은 무엇이고 왜 디자인패턴이 예외처리와 관련이 있다는 건지 의문이 들었다.

### ANIT 패턴과 try-catch-finally가 관계가 있어??

- ANIT 패턴은 객체지향 디자인 원칙과 관련된 패턴으로, 상속 대신 **합성**, **인터페이스** 사용, **테스트 용이성**을 고려한 설계를 권장하는 패턴
- "Avoid Needless Inheritance, Use Favor Composition Over Inheritance, Prefer Interfaces to Abstract Classes, and Always Design for Testability”
- ANIT 패턴에서는 **테스트 용이성을 고려한 설계를 권장**다. 이때 **예외 처리**에 대한 고려가 중요한데, 예외 처리가 잘못 구현되면 테스트 용이성이 떨어지고, 버그가 발생할 가능성이 크다.
- 따라서 try-catch-finally 블록을 적절하게 활용하여 예외 처리를 구현하는 것이 중요
- ANIT 패턴에서는 **인터페이스를 사용하여 추상화를 정의**하고, 이를 구현하는 클래스를 만들어 **의존성을 낮추는 것을 권장**한다.
- 이때 인터페이스를 구현하는 클래스에서 **예외 처리를 적절하게 구현**하면, 유연하고 안정적인 코드를 작성

### Finally Block 안에서 Return을 하지말자

try-catch-finally 예외처리를 적절하게 사용하기 위해서는 이것을 생각해야한다.

- try 안에 return : finally  블록을 거쳐서 정상 실행
- catch 안에 return : finally 블록을 거쳐서 정상 실행
- finally 안에 return : **try 블록 안에서 발생한 예외는 무시**되고 finally 거쳐 정상 종료 (예외를 알 수 없음)

```java
public class FinallyReturnExample {
    public static void main(String[] args) {
        int result = divide(10, 0);
        System.out.println("결과: " + result);
    }
    
    private static int divide(int a, int b) {
        try {
            return a / b;
        } catch (ArithmeticException e) {
            System.out.println("0으로 나눌수 없습니다.");
            return -1;
        } finally {
            System.out.println("Finally block 실행");
            return 0; // Finally block에서 return
        }
    }
}

/*
 * output 
 * 0으로 나눌수 없습니다. (catch블록의 return은 수행이 안된다.)
 * Finally block 
 * 실행 결과: 0 (finally블록의 return -> 무조건 수행)
 */
```

- 위 예시 코드에서는 divide 메서드가 a 를 b로  나누는 간단한 기능을 수행한다.
- try에서는 나눗셈을 수행, 만약 ArithmeticException 예외가 발생하면 catch 블록에서 -1을 반환한다. 그리고 finally 블록에서 “Finally block 실행”을 출력하고 0을 반환한다.
- 위 예시 코드를 실행하면 ArithmeticException 예외가 발생하여 catch 블록이 실행되지만, finally 블록에서 0을 반환하게 된다.
- 즉, 예외가 발생했음에도 불구하고 finally 블록에서 반환문이 실행되어 예외가 무시되고 메서드가 정상적으로 종료되는 것이다.
- 결론적으로 **finally 블록에서 return을 사용하지 않는 것이 좋다**.
    - 컴파일러에서 이상하다고 보통 알려준다 (컴파일은 된다)

### 결론

- ANIT 패턴과 try-catch-finally의 직접적인 연관은 없다.
- 굳이 연관을 짓는다면 적절한 예외처리로 인한 테스트 용이성 & 인터페이스를 구현하는 클래스에서 예외처리를 적절하게 구현하는 것인것 같다.
- try-catch-finally를 통한 예외처리를 할 경우, finally의 return은 지양하자.