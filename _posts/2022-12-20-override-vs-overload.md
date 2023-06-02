---
layout : single
title : "Overide vs Overload"
categories : java
tags : [til, java] 
---

**Mention** : 과적📦 vs 재정의💥

## Overriding

- 재정의하다
- **상위 클래스**의 메서드와 이름과 용례가 같은 함수를 하위 클래스에 **재정의** 하는것
- 즉, **상속 관계**에 있는 클래스 간에 같은 이름의 메서드를 재정의하는 것을 말한다.

## Overloading

- Overload : 과적하다
- 두 메서드가 **같은 이름**을 갖고 있으나 **인자의 수나 자료형이 다른** 경우
- 상속과는 상관이 없다.
- **메소드 이름의 절약**과 예상을 가능하게 한다.

```java
class Cal{
	public int sum(int v1, int v2){
		return v1+v2;
	}
	// Overloading
	public int sum(int v1, int v2, int v3){
		return v1+v2+v3;
	}
}
class Cal3 extends Cal{
	public int minus(int v1, int v2){
		return v1-v2;
	}
	// Overriding
	public int sum(int v1, int v2){
		System.out.println("Cal3!!");
		return v1+v2;
	}
}
public class InheritanceApp {

	public static void main(String[] args) {
		Cal c = new Cal();
		System.out.println(c.sum(2, 1)); //3
		System.out.println(c.sum(2, 1, 1)); //4 Overloading
		
		Cal3 c3 = new Cal3();
		System.out.println(c3.minus(2, 1));
		System.out.println(c3.sum(2, 1)); //Overriding
	}

}
```

- Summary
    - 오버라이드는 “**재정의”** 하는 것으로 상위 클래스, 즉 **상속 관계**에 있는 클래스 간에 같은 이름의 메서드를 재정의하는 것을 말합니다.
    오버로드는 “**과적하다”** 라는 뜻으로 두 메서드가 같은 이름을 갖고 있으나 **인자의 수나 자료형이 다른 경우**를 말합니다. 상속과는 상관이 없는 경우입니다.
    - 두 기능으로 JAVA에서 **다형성**을 구현하고, SOLID - OCP, LSP 원칙을 지킬 수 있습니다.

Reference 📚

[https://gmlwjd9405.github.io/2018/08/09/java-overloading-vs-overriding.html](https://gmlwjd9405.github.io/2018/08/09/java-overloading-vs-overriding.html)

[https://www.youtube.com/watch?v=RvZ5yJvaUAc](https://www.youtube.com/watch?v=RvZ5yJvaUAc)