---
layout : single
title : "String, StringBuilder, StringBuffer"
categories : java
tags : [string, stringbuilder, stringbuffer] 
---
## is final? is thread safe?

- String 과 StringBuilder, Buffer 의 차이점을 아시나요?
- 실제로 기술 면접에서 한 번 경험한 질문입니다. 이 질문의 포인트는 결국 두 가지라고 생각합니다. 
- String 클래스는 불변, StringBuilder, Buffer 는 가변이다.
- String, StringBuilder 는 쓰레드 세입하지 않고 StringBuffer 는 쓰레드 세입하다.

## String

```java
@Stable
private **final** byte[] value;
```

- String의 큰 특징은 위의 코드에서 보이듯이 불변이라는 것입니다. **final** 
- String 은 두 가지 방법으로 생성할 수 있습니다.
- String str1 = new String(”abc”)
    - 힙 메모리에 인스턴스 생성
    - 이런 방식으로 생성한다면 intelliJ 에서는 불필요하다는 것을 알려줍니다. **redundant**
- String str2 = “abc”
    - **상수 풀 사용**
    - 상수 풀의 문자열은 모두 같은 주소를 가집니다.
    - 상수 풀을 사용함으로써 메모리를 효율적으로 사용할 수 있습니다. 
- String 을 수정하면 기존의 String 객체가 수정되는 것이 아닌 새로운 String 객체가 생성됩니다.
    - String 객체는 **불변**이기 때문입니다.
    - **새로운 String 문자열 객체를 생성** 후 상수풀에 추가한다!
    - 빈번하게 문자열이 바뀌는 로직이라면?
        - 기존 String 객체가 남아있으므로 **메모리 낭비** 가 발생할 수 있다.

## StringBuilder, StringBuffer

```java
abstract class AbstractStringBuilder
**byte[] value; //final이 아니다.**
```

- StringBuilder 와 StringBuffer 는 가변객체입니다.
- 위의 코드에서 보이듯이 final 키워드가 없습니다.
    - 가변적인 배열을 멤버 변수를 가집니다.
    - 이를 통해 **새로운 인스턴스를 생성하지 않고 문자열을 변경**합니다.
- **문자열의 빈번한 수정**이 있는 로직이라면 유용하며 메모리 낭비를 줄입니다.

### StringBuffer
- 내부적으로 락을 거는 매커니즘이 있으며, 이를 통해 멀티쓰레드 프로그래밍에서 동기화(Synchronization) 을 보장합니다.
    - 즉, **쓰레드 세입**합니다.
    - StringBuilder 는 쓰레드 세입하지 않습니다.
- 그렇다면, StringBuffer가 제일 좋은데?
    - CASE BY CASE! 락을 거는 메커니즘 때문에 무거우며, 오버헤드 발생 가능성이 있습니다.
    - 단일 쓰레드 프로그램에서는 StringBuilder 사용이 권장됩니다.
    - 멀티 쓰레드 프로그램에서 유용합니다.

## TestCode

```java
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class StringClassTest {

    @Test
    void newString() {
        String java = new String("java");
        String java1 = new String("java");

        assertThat(java).isNotSameAs(java1);

        String java2 = "java";
        String java3 = "java";

        assertThat(java2).isSameAs(java3);
    }

    @Test
    void modifyString() {
        // immutable String
        String java = "java";
        int hashCode = System.identityHashCode(java);

        String spring = "spring";
        java = java.concat(spring);
        // 새 객체가 생성된다. 기존 hashcode 의 String 객체는 GC의 대상이 된다.(하지만 상수풀에 들어간 문자열은 보통 프로그램 전반에서 사용되어 프로그램 종료시 GC의 대상이 되는 경우가 많다.)
        assertThat(System.identityHashCode(java)).isNotEqualTo(hashCode);
    }

    @Test
    void stringBuilder() {
        // mutable
        StringBuilder sb = new StringBuilder();
        int sbHashCode = System.identityHashCode(sb);

        sb.append("java");
        sb.append("spring");

        // 기존 StringBuilder 에 가변적으로 추가된다. 새 객체 생성 X
        assertThat(System.identityHashCode(sb)).isEqualTo(sbHashCode);
    }

    @Test
    void stringBuffer() {
        // mutable & thread safe
        StringBuffer sb = new StringBuffer();
        int sbHashCode = System.identityHashCode(sb);

        sb.append("java");
        sb.append("spring");

        // 기존 StringBuffer 에 가변적으로 추가된다. 새 객체 생성 X
        assertThat(System.identityHashCode(sb)).isEqualTo(sbHashCode);
    }
}
```