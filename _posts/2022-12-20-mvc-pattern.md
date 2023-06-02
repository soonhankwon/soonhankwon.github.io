---
layout : single
title : "MVC Pattern"
categories : spring
tags : [til, spring, mvc] 
---

**Mention** : Model?📊 View?🎨 Controller?💁🏻‍♂️

## Background

- 코드의 복잡성, 유지보수의 불편
    - 유지보수가 편한 패턴이 생겨나게됨
    - MVC 패턴이 탄생

## Model, View, Controller

![https://junhyunny.github.io/images/mvc-pattern-2.JPG](https://junhyunny.github.io/images/mvc-pattern-2.JPG)

- **M**odel
    - Data
    - 데이터와 관련된 부분
- **V**iew
    - html, css
    - 사용자한테 보여지는 부분
- **C**ontroller
    - Model 의 데이터를 View에 연결
    - 전반적인 제어 (중개자 역할)

### MVC Web Framework

- ex) Spring

### MVC를 지키면서 코딩하는 방법

- Model은 Controller와 View에 의존하지 않아야 한다.
    - Model 내부에 Controller와 View에 관련된 코드가 있으면 안된다.
- View는 Model에만 의존해야 하고,  Controller에는 의존하면 안된다.
    - View 내부에 Model의 코드만 있을 수 있고, Controller의 코드가 있으면 안된다.
- View가 Model로부터 데이터를 받을 때는, 사용자마다 다르게 보여주어야 하는 데이터에 대해서만 받아야한다.
- Controller는 Model과  View에 의존해도 된다.
    - Controller 내부에는 Model과 View의 코드가 있을 수 있다.
- View가 Model로부터 데이터를 받을 때, 반드시 Controller에서 받아야한다.
- Summary
    - 애플리케이션을 **Model, View, Controller** 이 세가지의 역할로 구분한 아키텍쳐 디자인 패턴 또는 개발 방법론 중 하나입니다. 사용자가 **Controller**를 통해 접근 한 URL에 따라서 사용자의 요청사항을 파악한 후에 그 요청에 맞는 **데이터**를 **Mode**l 통해 가져오고 그 데이터를 바탕으로 **시각적인 표현**을 담당하는 **View**를 제어하여 사용자에게 전달하게 됩니다. MVC의 장점은 각 구성요소를 독립시킴으로써 각 팀이 **맡은 부분의 개발에만 집중**하여 따로 개발할 수 있어 **효율성**을 높일 수 있고 **유지보수성, 확장성**도 보장됩니다. 그러나 복잡한 화면과 데이터의 구성이 필요한 상황이라면 Controller에 다수의 Model과 View가 복잡하게 연결되는 상황이 생길 수 있습니다. 그로 인해 새 기능이 추가 될 때마다 코드 분석이나 테스트에 어려움이 생길 수 있는데 이러한 문제점들을 보완하기 위해 **MVVM 패턴** 같은 해결책도 제시되고 있습니다.

Reference 📚

[https://www.youtube.com/watch?v=ogaXW6KPc8I&t=89s](https://www.youtube.com/watch?v=ogaXW6KPc8I&t=89s)