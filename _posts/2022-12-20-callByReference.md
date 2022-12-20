---
layout : single
title : "call by reference(참조에 의한 호출)"
categories : til
tags : [til, java, lang] 
---

**Mention** : call by reference? call by value? 그럼 자바에서는?👀

## 개요

> ..."call by reference"..., in which the called routine has access to the **original argument**, not a local copy. - Dennis Ritchie -

- 함수 호출 과정에서 어떤 변수를 전달한다고 할 때, 이 변수를 호출부에서는 **인자(Argument)** 라고 하며, 피호출부에서는 **매개변수(Parameter)** 라고 한다. 호출된 함수가 **인자**에 접근할 수 있는 것이 Call by Reference 다.
- 프로그래밍 언어에서 함수 혹은 프로시저를 호출할 때 인자를 다루는 방법 중의 하나.
    - 프로시저와 함수 [https://mjn5027.tistory.com/47](https://mjn5027.tistory.com/47)
- 주소에 의한 호출(Call by Address)과는 비슷하면서도 다르다.
    - 참조에 의한 호출은 함수에서 함수 **외부 메모리 공간을 참조**할 때 사용
    - 함수 선언시 매개변수에 &를 사용해 변수의 위치를 받도록 하고 함수 내부에서는 위치를 준 변수를 일반 변수처럼 사용한다.

### 설명

- 함수를 호출할 때 원칙적으로는 피호출부에서는 반환값을 제외하고 호출부의 어떠한 변수도 변경할 수 없다. 그리고 모든 함수는 매개변수를 복사 방식으로 전달받는다. 하지만 함수는 반환값을 하나만 가질 수 있고 데이터를 담은 버퍼 오브젝트 등은 복사에 들어가는 부담이 크기에 모든 것을 원칙적으로 처리할 수는 없다.
- 그런데 함수는 포인터나 **참조자**를 통해 **메모리를 직접 액세스**하는 방식으로 자신에게 주어진 격리 공간을 탈출해서 외부 세계에 간섭하는 게 가능하다.
    - 똑같은 값에 의한 호출이지만 전달하는 값 그 자체가 메모리 주소 즉 포인터 값이다.
    - 함수 내부에서는 포인터 역참조 연산자를 통해 해당 메모리 주소에 직접 접근해 값을 수정함으로써 호출부의 메모리 공간에 직접 액세스한다.
- **객체**는 대부분의 프로그래밍 언어에서 **참조에 의한 호출로 생성**된다.
    - 클래스는 해당 객체의 뼈대만 정의할 뿐, 객체 그 자체가 아니기 때문.

### 컴퓨터 메모리 단에서의 이해

- 프로그래밍 언어론에서 정의하는 Function은 본래의 프로그램과 완벽하게 분리되어서 어떠한 Side Effect도 일으키지 않는 구조적인 코드 블럭을 의미한다.
    - 하지만, 현대에 이르러서는 Procedure와 혼용된다.
- Function은 **Stack Frame**이라는 메모리 구조를 통해서 만들어질 수 있다.
    - 대부분 이러한 메모리 구조, 파라미터에 해당하는 부분 또한 Stack에 저장
- Stack Frame의 Parameter에 저장되는 해당 값이 리터럴 형태의 상수인가, 아니면 어떠한 **변수를 가르키는 포인터 값**이느냐에 따라서 파라미터를 Call by Value와 Call by Reference로 구분할 수 있다.
- Call by Reference는 Stack Frame의 Parameter에 지정되는 어떠한 변수의 주소값을 가리킨다.
    - 그렇기 때문에 엄격한 함수의 정의에서 벗어나서 Procedure처럼 **Side Effect**를 일으킬 수 있다.
- 뿐만 아니라, 컴파일러 내에서의 Function에 대한 Policy를 어떻게 책정하느냐에 따라 컴파일 과정에서 해당 변수 정책이 바뀔수도 있다.
    - 일반적으로 Call by Value나 Call by Reference는 Function이냐 Procedure냐의 생각으로 이해할 수 있고, 호출에 대한 정책은 해당 프로그래밍 언어의 특징에 따른다.

### Call by Value와 Call by Reference 간의 차이점

- 함수에서 변경한 내용이 다른 함수에 적용되지 않음 vs 함수에서 변경한 내용이 다른 함수에도 적용됨
- 인자를 다루는 메모리 위치가 다름 vs 인자를 다루는 메모리 위치가 같음

### Summary

- 함수의 호출 방법 중 하나로 인자로 받은 값의 주소를 참조하여 **데이터에 직접 접근**할 수 있도록 하는 호출이다. C언어에서는 포인터를 이용해서 매개변수의 주소값을 넘겨 참조(Reference)할 수 있다. **JAVA에서는 Call by value**만 사용되어지며 메서드에서 특정 값을 참조할 때 **Heap영역에 새로운 값을 임시로 복사**하여 스택의 주소값이 가리키는 값이 원본이 아닌 **복제된 값을 가리키도록** 한다.

Reference 📚

[https://namu.wiki/w/참조에 의한 호출](https://namu.wiki/w/%EC%B0%B8%EC%A1%B0%EC%97%90%20%EC%9D%98%ED%95%9C%20%ED%98%B8%EC%B6%9C)