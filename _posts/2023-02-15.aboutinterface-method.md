---
layout : single
title : "자바9의 인터페이스에서 왜 static method 에 private을 추가했을까?"
categories : til
tags : [java, til, lang, interface] 
---

## 인터페이스의 private 메서드, JAVA 9

java8 에서는 default method와 static method가 추가되었고, java9에서는 **private method와 private static method**가 추가되었다.

default method와 static method

- 단지 특정 기능을 처리하는 내부 method 인데, 외부로 공개되는 public method로 만들어야 하기 떄문이다.
- 인터페이스를 구현하는 다른 인터페이스 혹은 클래스가 해당 메서드에 엑세스하거나 상속하는 것을 원하지 않는경우 불편하다.
- 코드의 중복 및 인터페이스에 대한 **캡슐화**를 유지하기 위해서 사용

```java
public interface Car {
    void carMethod();
 
    default void defaultCarMethod() {
        System.out.println("Default Car Method");
 
        privateCarMethod();
        privateStaticCarMethod();
    }
 
    private void privateCarMethod() {
        System.out.println("private car method");
    }
 
    private static void privateStaticCarMethod() {
        System.out.println("private static car method");
    }
}

public class DefaultCar implements Car {
 
    @Override
    public void carMethod() {
        System.out.println("car method by DefaultCar");
    }
}

public class Main {
    public static void main(String[] args) {
        DefaultCar car = new DefaultCar();
 
        car.carMethod();
        car.defaultCarMethod();
    }
}

// output 
// car method by DefaultCar
// Default Car Method
// private car method
// private static car method
```

### 굳이 static method 까지 private를 붙여야 하나?

- 위 코드에서 privateCarMethod(), privateStaticCarMethod() 는 완벽히 같은 기능을 한다.
- 그렇다면 그냥 privateCarMethod(), privateCarMethod2() 이런식으로 구현해서 사용하면 캡슐화가 유지될텐데…
- **왜? static method 까지** private 기능이 생겼나 의문이 생겼다.
- 하나의 이유는 인터페이스 내에서도 클래스를 구현할 수 있기 때문이라고 생각한다.
- 다른 하나의 이유는 **정적 메서드와 메서드의 차이점** 때문이다.

### 인터페이스 내의 내부클래스(Inner Class)와 중첩클래스(Nested Class)

내부 클래스는 다른 클래스 내부에 선언되는 클래스를 말하며, 인터페이스 내부에도 선언할 수 있다. 인터페이스 내부 클래스는 두 가지 유형이 있다.

- **정적 내부 클래스 (Static Nested Class)**
    - 인터페이스 내부에 선언되는 클래스이며 static 키워드를 사용하여 선언다.
    - 외부 클래스의 인스턴스에 종속되지 않는 정적 클래스이다.

```java
public interface MyInterface {
    void doSomething();
    static class MyStaticNestedClass {
        void doSomethingElse() {
            System.out.println("doSomethingElse() is called.");
        }
    }
}
```

- **내부 클래스 (Inner Class)**
    - **인터페이스 내부에 선언되는 클래스**이며 static 키워드를 사용하지 않고 선언됩니다.
    - 외부 클래스의 인스턴스에 종속되며, 외부 클래스의 인스턴스를 생성해야 내부 클래스의 인스턴스를 생성할 수 있습니다.

```java
public interface MyInterface {
    void doSomething();
    class MyInnerClass {
        void doSomethingElse() {
            System.out.println("doSomethingElse() is called.");
        }
    }
}
```

- 위 코드에서 볼 수 있듯이, 내부 클래스와 정적 내부 클래스는 인터페이스 내에서 다른 클래스와 마찬가지로 정의된다.
- 단지, 인터페이스 내에서 정의된 클래스이기 때문에 해당 인터페이스와 밀접한 관련이 있는 클래스를 정의할 때 사용한다고 한다.

### 정적 메서드와 메서드의 차이점

- 정적 메서드는 클래스에 속하고 객체에 **독립적**이다.
- 인스턴스 메서드는 객체에 속하고 객체에 **종속적**이다.

## 결론

```java
public interface MyInterface {
    void doSomething();
		// 내부 클래스 구현
    class MyInnerClass {
        void doSomethingElse() {
            System.out.println("doSomethingElse() is called");
        }
        private int notStaticCalculateSum(int x, int y) {
            return x + y;
        }
    }
		// 내부 클래스2에 private static method 구현
    class MyInnerclass2 {
        private static int calculateSum(int x, int y) {
            return x + y;
        }
    }
		// default 메서드에 내부클래스2에서 구현한 static method 사용
    default void detailMethod() {
        int sum = MyInnerclass2.calculateSum(1,2);
        System.out.println("sum: " + sum);
    }
		// default 메서드에 내부클래스 1의 객체를 불러와서 사용해야함
    default void detailMethod2() {
        MyInnerClass myInnerClass = new MyInnerClass();
        int sum = myInnerClass.notStaticCalculateSum(1,2);
        System.out.println("sum: " + sum);
    }
		// default 메서드3에 static method와 method 사용	
		default void detailMethod3() {
		        int x = 1;
		        int y = 1;
		        int sum = 0;
		        sum = calculateMethod(x, y);
		        sum = MyInnerclass2.calculateSum(x, y);
		    }
    
    private int calculateMethod(int x, int y) {
        return  x + y;
    }
}
```

- 위 코드처럼 MyInnerClass2 클래스에 static 메서드를 구현하여 인스턴스를 불러오지 않고 메서드를 사용할 수 있다.
- 반면 MyInnerClass 클래스에 private 메서드를 구현한 경우 인스턴스를 불러와서 메서드를 사용해야 한다.
- private method 와 private static method 는 주로 헬퍼 메서드(helper method)로 사용된다. 이러한 메서드는 클래스(여기서는 인터페이스) 내부에서만 사용되며, 클래스 외부에서는 사용될 필요가 없기 때문이다(캡슐화)
- 사실 인터페이스 내 클래스 구현을 실제로 많이 사용할까 의문이 들기도 하고, 사용해본적이 없기도 하다. 잘 아시는 분이 예시를 알려주시면 좋겠다🙋‍♂️