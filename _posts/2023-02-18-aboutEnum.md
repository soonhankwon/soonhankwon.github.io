---
layout : single
title : "자바에서 열거형(Enum)에 필드를 가지게 하는 이유는?"
categories : til
tags : [java, til, lang, enum] 
---
## 열거형이란?

- 자바에서 열거형(Enum)은 기본적으로 상수값을 가지는 유한 집합을 표현하는 자료형이다.
- 하지만 때로는 각 열거형 상수에 대해 연관된 데이터를 저장해야 할 필요가 있을 때가 있다. 이 때에는 열거형에 필드를 추가할 수 있다.

```java
public enum Currency {
    USD(1.00),
    EUR(0.82),
    GBP(0.72);

    private double exchangeRate;

    private Currency(double exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public double getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(double exchangeRate) {
        this.exchangeRate = exchangeRate;
    }
}

class MyTest {
    static int money = 10000;

    public static void main(String[] args) {
        ExchangeMachine exchangeMachine = new ExchangeMachine();
        exchangeMachine.exchangeEur(money);
    }
}

class ExchangeMachine {
    void exchangeEur(int money) {
        System.out.println((double)money * Currency.EUR.getExchangeRate());
    }
}

//output : 8200.0
```

- 각 통화마다 환율을 가지도록 열거형에 필드를 추가하면, 각 통화의 환율을 참조할 수 있다.
- 또한, 상수의 값을 변경할 때마다 해당 값을 사용하는 모든 코드를 수정할 필요가 없다.