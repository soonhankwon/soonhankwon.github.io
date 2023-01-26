---
layout : single
title : "연산자"
categories : til
tags : [java, til, lang] 
---

# 3주차과제 : 연산자

# 목표

자바가 제공하는 다양한 연산자를 학습하세요.

---

# 학습할 것

- 산술 연산자
- 비트 연산자
- 관계 연산자
- 논리 연산자
- instanceof
- assignment(=) operator
- 화살표(->) 연산자
- 3항 연산자
- 연산자 우선 순위
- (optional) Java 13. switch 연산자

---

### 연산자 (operator)

- 연산에 사용되는 표시나 기호
- 연산자와 함께 연산되는 데이터 → 피연산자 (operand)
- 연산자와 피연산자를 이용하여 연산의 과정을 기술한 것 → 연산식(expression)

### 산술 연산자

- Binary Operator
    - +, -, *, /, %(Modulo)
    - 사칙연산 및 나머지 계산
    - **ArithmeticException** 발생 가능
        - Divide by zero
        - Modulo by zero

### 비트 연산자

컴퓨터가 기존 자료형(int,char etc)을 비트로 변환하는 작업을 사용자가 미리 해주기 때문에 속도가 빠르다. 

비트(bit) 단위로 논리 연산을 할 때 사용하는 연산자

- &: 대응되는 비트가 모두 1이면 1을 반환한다(비트 AND 연산)
- | : 대응되는 비트 중에서 하나라도 1이면 1을 반환한다(비트 OR 연산)
- ^: 대응되는 비트가 서로 다르면 1을 반환한다.(비트 XOR 연산)
- ~: 비트를 1이면0으로,0이면 1로 반전시킨다.(비트 NOT 연산)
- "<<":지정한 수만큼 비트들을 전부 왼쪽으로 이동시킨다.(left shift 연산)
- ">>":부호를 유지하면서 지정한 수만큼 비트를 전부 오른쪽으로 이동시킨다.(right shift 연산)
- &=:왼쪽의 피연산자를 오른쪽의 피연산자와 비트 AND연산한후 , 그결과값을 왼쪽의 피연산자에 대입한다.
- |=:왼쪽의 피연산자를 오른쪽의 피연산자와 비트 OR연산한후 , 그결과값을 왼쪽의 피연산자에 대입한다.
- ^=:왼쪽의 피연산자를 오른쪽의 피연산자와 비트 XOR연산한후 , 그결과값을 왼쪽의 피연산자에 대입한다.
- <<=:왼쪽의 피연산자를 오른쪽의 피연산자만큼 왼쪽 시프트한후, 그 결과값을 왼쪽의 피연산자에 대입한다.
- ">>=":왼쪽의 피연산자를 오른쪽의 피연산자만큼 부호를 유지하며 오른쪽 시프트한후, 그 결과값을 왼쪽의 피연산자에 대입한다.
- ">>>=":왼쪽의 피연산자를 오른쪽의 피연산자만큼 부호에 상관없이 오른쪽 시프트한후, 그 결과값을 왼쪽의 피연산자에 대입한다.

### 관계 연산자

비교 연산자라고도 한다.

- ">":왼쪽항이 크면 참, 아니면 거짓을 반환한다.
- "<":왼쪽항이 작으면 참, 아니면 거짓을 반환한다.
- ">=":왼쪽항이 오른쪽항 보다 크거나 같으면 참, 아니면 거짓을 반환한다.
- "<=":왼쪽항이 오른쪽항 보다 작거나 같으면 참, 아니면 거짓을 반환한다.
- "==":두개 항의 값이 같으면 참, 아니면 거짓을 반환한다.
- "!=":두개 항이 다르면 참, 아니면 거짓을 반환한다.

### 논리 연산자

논리 연산자는 주어진 논리식을 판단하여 true, false를 결정하는 연산자이다.

- &&:논리식이 모두 참이면 1을 반환한다.(LOGICAL AND)
- ||:논리식 중 에 하나 라도 참이면 1을 반환한다.(LOGICAL OR)
- !:논리식의 결과가 참이면 0을,거짓이면 1을 반환한다.(LOGICAL NOT)

### instanceof

객체가 어떤 클래스인지, 어떤 클래스를 상속받았는지 확인하는데 사용하는 연산자

- Syntax
    - object instanceOf type

```java
public class ArrayList<E> implements List [
}
public List {
}

ArrayList list = new ArrayList();
System.out.println(list instanceof ArrayList);
System.out.println(list instanceof List);
System.out.println(list instanceof Set);
System.out.println(list instanceof Object);

//output : true
//output : true
//output : false
//output : true (만약 list(Object) 가 null이라면 false 반환)
```

### assignment(=) operator

대입연산자라고도 하며 대입연산자는 변수에 값을 대입할 때 사용하는 이항연산자이다. 피연산자들의 결합 방향은 오른쪽에서 왼쪽이다.

- =:왼쪽의 피연산자에 오른쪽 피연산자를 대입한다.
- +=:왼쪽의 피연산자에 오른쪽의 피연산자를 더한 후 , 그 결과값을 왼쪽의 피연산자에 대입한다.
- -=:왼쪽의 피연산자에서 오른쪽의 피연산자를 뺀후, 그 결과값을 왼쪽의 피연산자에 대입한다.
- *=:왼쪽의 피연산자에서 오른쪽의 피연산자를 곱한후, 그 결과값을 왼쪽의 피연산자에 대입한다.
- /=:왼쪽의 피연산자에서 오른쪽의 피연산자를 나눈후, 그 결과값을 왼쪽의 피연산자에 대입한다.
- %=:왼쪽의 피연산자에서 오른쪽의 피연산자를 뺀후, 그 나머지값을 왼쪽의 피연산자에 대입한다.

### 화살표(->) 연산자

- 8 버전부터 람다 표현식(lambda expression) 이 공식적으로 적용
- 람다식이란?

메서드를 하나의 식 으로 표현 한것

또한 람다식은 함수를 간략하게 하면서도 명확한 식으로 표현할수 있게 해준다.

메서드를 람다식으로 표현하면 메서드의 이름과 반환값이 없어져 람다식을 '익명함수'라고도 한다.

```java
(argument, ...) -> {expression}

int[] arr = new int[5];
Arrays.setAll(arr, (i) -> (int) (Math.random() * 100) + 1);
System.out.println(Arrays.toString(arr));
```

### 삼항 연산자

피연산자를 세 개 가지는 조건 연산자

- 조건식 ? 반환값 1 : 반환값 2

```java
int score = 95;
char grade = (score > 90) ? 'A' : 'B';

if(score > 90) {
	grade = 'A';
} else {
	grade = 'B';
}
// 두 조건식의 의미는 같다.
```

### 연산식의 우선 순위

| Operators | Precedence |
| --- | --- |
| postfix | expr++ expr-- |
| unary | ++expr --expr +expr -expr ~ ! |
| multiplicative | * / % |
| additive | + - |
| shift | << >> >>> |
| relational | < > <= >= instanceof |
| equality | == != |
| bitwise AND | & |
| bitwise exclusive OR | ^ |
| bitwise inclusive OR | | |
| logical AND | && |
| logical OR | || |
| ternary | ? : |
| assignment | = += -= *= /= %= &= ^= |= <<= >>= >>>= |
- 동일 선상에 있는 연산자들은 동일한 우선 순위를 가짐
- 대입 연산 제외한 Binary Operator 는 left → right 로 평가
- 대입 연산은 right → left 로 평가

### Reference

https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html