---
layout : single
title : "String은 래퍼클래스인데 == 비교시 값 같게 나오는 이유?"
categories : til
tags : [java, til, lang] 
---

## String이 Wrapper Class?🧐

- 가장 먼저 갸우뚱했던 지점이다. 하지만 래퍼클래스 맞다.

- String은 **Wrapper Class 중 하나** 입니다. 하지만 일반적으로 Wrapper Class는 primitive 타입을 객체화하는 클래스를 말하며, String은 문자열을 다루는 클래스이므로 조금 다른 의미로 사용될 수 있습니다.

- 조금 다른 의미로 사용될 수 있다고는 한다. ChatGPT Answer!

### == 비교시 값이 같게 나오는 이유?

- 이 질문은 틀린점이 있다. 같게 나오는 경우도 있고 다르게 나오는 경우도 있다. 

- 객체를 new 연산자를 통해 생성하면 비교시 값이 다르게 나온다.

- 두 객체는 서로 다른 주소값(힙)을 참조한다.

> 하지만, String str = “abc”, String str2 = “abc” 이러한 방식을 사용하면 **메모리(상수 풀) 에 같은 내용** 을 가지고 있는 객체가 있는지 확인하고 같은 객체를 참조하기 때문에 비교시 값이 같게 나온다.

- **상수 풀 (Constant Pool)** 이란 문자열 리터럴이 저장되는 곳이다. 이 떄, 같은 문자열 리터럴은 동일한 객체를 참조하게 된다.

- 상수 풀에 이미 존재하는 문자열을 재사용하면, 메모리 사용을 최적화 할 수 있다.

> 그렇다면 == 말고 equals는? 
    > - 주소값이 아니라 대상의 값 자체를 비교한다.

- 따라서 문자열 비교시에는 **equals**를 쓰는것이 안정적이다 라고 생각한다.

```java
public class Prac1 {

	public static void main(String[] args) {
		String str = new String("abc");
		String str2 = new String("abc");

		if (str == str2) {
			System.out.println("str과 str2의 값이 같습니다.");
		} else {
			System.out.println("str과 str2의 값이 다릅니다.");
		}

		if (str.equals(str2)) {
			System.out.println("str과 str2의 값이 같습니다.");
		} else {
			System.out.println("str과 str2의 값이 다릅니다.");
		}

		String str3 = "abc";
		String str4 = "abc";

		if (str3 == str4) {
			System.out.println("str3 과 str4의 값이 같습니다.");
		} else {
			System.out.println("값이 다릅니다.");
		}

	}

}
```
```java
//output
str과 str2의 값이 다릅니다. //new 연산자로
str과 str2의 값이 같습니다. //equals 비교
str3 과 str4의 값이 같습니다. //String str = "abc"
```