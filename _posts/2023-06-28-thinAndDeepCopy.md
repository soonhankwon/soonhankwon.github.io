---
layout : single
title : "객체 배열 복사하기 - 얇은 복사, 깊은 복사"
categories : java
tags : [array, object] 
---
## 얇은 복사와 깊은 복사

### 객체 배열 선언과 구현

- 기본 자료형 배열은 선언과 동시에 배열의 크기만큼의 메모리가 할당됩니다.
- **객체 배열**의 경우엔 **요소가 되는 객체의 주소가 들어갈(4바이트, 8바이트) 메모리만 할당**되고 **(null)** 각 요소 객체는 생성하여 저장해야 함
    - 객체 주소 공간만 잡힘

### 객체 배열 복사하기

- System.arrayCopy() 자바에서 제공되는 배열 복사 메서드
    - 얇은 복사이다.
    - public static native void arraycopy(Object src, int srcPos, Object dest, int destPost, int length);
- 얇은 복사
    - 객체 주소만 복사되어 한쪽 배열의 요소를 수정하면 같이 수정된다.
    - 즉, 두 배열이 같은 객체를 가리킴
- 깊은 복사
    - 객체의 값만 복사
    - 즉, 두 배열이 다른 객체를 가리킴 (따로 관리)

### TEST CODE

```java

import org.junit.jupiter.api.Test;
import java.util.stream.IntStream;
import static org.assertj.core.api.Assertions.assertThat;

public class ArrayCopyTest {
    @Test
    void thinCopy() {
        Book[] books = new Book[5];
        IntStream.range(0, books.length)
                .forEach(i -> books[i] = new Book("귀멸의 칼날" + (i + 1), "SOON"));

        Book[] copyBooks = new Book[5];

        System.arraycopy(books, 0 , copyBooks, 0, 5);

        // 객체 주소 값을 복사하지만 books 와 copybooks 배열 자체는 스택영역에 할당
        assertThat(copyBooks).isNotSameAs(books);
        // 객체 배열 요소들의 값은 같다.
        assertThat(copyBooks).isEqualTo(books);

        // 객체 주소 값을 복사함으로 원본 객체 배열 요소 수정시 해당 객체를 참조하는 복사 배열 요소 값이 바뀜
        books[3].setTitle("SLAMDUNK");
        assertThat(copyBooks[3].getTitle()).isEqualTo("SLAMDUNK");
    }

    @Test
    void deepCopy() {
        Book[] books = new Book[5];
        IntStream.range(0, books.length)
                .forEach(i -> books[i] = new Book("귀멸의 칼날" + (i + 1), "SOON"));

        Book[] copyBooks = new Book[5];
        IntStream.range(0, books.length)
                .forEach(i -> copyBooks[i] = new Book(books[i].getTitle(), books[i].getAuthor()));

        // 원본 배열 객체 요소의 값만 복사하고 객체 주소값은 다름
        assertThat(copyBooks).isNotEqualTo(books);

        // 객체 주소값이 다르므로 원본 배열의 수정에 영향을 받지 않는다. 깊은 복사
        books[3].setTitle("SLAMDUNK");
        assertThat(copyBooks[3].getTitle()).isNotEqualTo("SLAMDUNK");
    }
}
```