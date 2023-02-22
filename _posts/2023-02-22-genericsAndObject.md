---
layout : single
title : "Object 와 제네릭을 사용하는 것의 차이점?"
categories : til
tags : [java, til, lang, generics] 
---
## 제네릭(Generics)의 등장

자바에서 다양한 타입의 객체를 다루는 경우, 제네릭이 등장하기 전에는 Object를 사용했다.

### Object 와 제네릭을 사용하는 것의 차이점?

1. 타입 안정성
    
    Object는 모든 클래스의 부모 클래스이므로, 어떤 타입의 객체도 다룰 수 있다. 이는 컴파일러가 **타입 안정성을 검사하지 않으므로**, 런타임에 에러가 발생할 수 있다. 제네릭을 사용하면 **컴파일러가 타입을 검사**해줘서 런타임 에러를 방지할 수 있다.
    
2. 코드 가독성
    
    Object를 사용하면 코드 가독성이 떨어진다. 타입이 명시되어 있지 않기 때문이다. 반면 제네릭은 **타입이 명시**되어 있기 때문에 가독성이 향상된다.
    
3. 코드 재사용성
    
    Object를 사용하면 **코드 재사용성**이 떨어진다. 다시 사용할 때마다 타입 캐스팅을 해야하기 때문이다. 반면, 제네릭을 사용하면 **타입 캐스팅**을 하지 않아도 됨으로 코드 재사용성이 향상된다.
    
    ```java
    package genericsExam;
    
    public class Champion<T> {
        T passive;
    
        public T getPassive() {
            return passive;
        }
    
        public void setPassive(T passive) {
            this.passive = passive;
        }
    }
    ```
    
    ```java
    public class App {
        public static void main(String[] args) {
            System.out.println("WhatSup");
    
            Champion<String> champion = new Champion<>();
            champion.setPassive("리븐 평타 캔슬 추가 데미지");
            String passive = champion.getPassive();
    
            System.out.println("passive : " + passive);
        }
    }
    ```
    
    제네릭을 사용한 Champion 클래스 인스턴스를 App 클래스에서 사용할 때, 다음과 같이 Champion<String> 으로 선언하여 사용할 수 있다.
    
    따라서, 타입 캐스팅을 하지 않아도 되며 코드 재사용성이 향상된다.