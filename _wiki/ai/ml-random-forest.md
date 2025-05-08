---
layout  : wiki
title   : 아이리스 데이터셋으로 배우는 랜덤 포레스트 분류기
summary : Scikit-Learn 활용한 랜덤 포레스트 분류기(ML)
date    : 2025-05-08 11:16:00 +0900
updated : 2025-05-08 11:16:00 +0900
tag     : ml ai scikit-learn random-forest
toc     : true
comment : true
public  : true
parent  : [[/ai]]
latex   : true
---
* TOC
{:toc}

머신러닝을 처음 배우는 사람들이라면 누구나 한 번쯤 만나게 되는 고전 데이터셋, 아이리스(Iris). 이번 글에서는 Scikit-Learn을 사용하여 이 아이리스 데이터셋을 분류하는 **랜덤 포레스트(Random Forest) 모델**을 학습시키고, 이를 분석해보는 과정을 단계별로 소개하겠습니다.

### 아이리스(Iris) 데이터셋이란?

아이리스 데이터셋은 150개의 붓꽃 샘플이 있으며, 각각은 4가지 특성(sepal length, sepal width, petal length, petal width)을 가지고 있고, 3가지 품종(setosa, versicolor, virginica) 중 하나로 분류됩니다.

```python
from sklearn.datasets import load_iris

iris = load_iris()
print("데이터셋 크기:", iris.data.shape)
print("특성 이름:", iris.feature_names)
print("클래스 이름:", iris.target_names)
```

### 데이터 분할(Train/Test Split)

모델의 일반화 성능을 평가하기 위해 전체 데이터를 훈련용(80%), 테스트용(20%)으로 나눕니다.

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42
)
```

### 랜덤 포레스트 모델 학습

[랜덤 포레스트](https://ko.wikipedia.org/wiki/%EB%9E%9C%EB%8D%A4_%ED%8F%AC%EB%A0%88%EC%8A%A4%ED%8A%B8)는 여러 개의 결정 트리를 조합하여 예측을 수행하는 앙상블 모델입니다. 각 트리는 서로 다른 특성과 샘플을 사용하여 과적합을 줄이고 성능을 향상시킵니다.
 
- 랜덤 포레스트는 **정답(label) 정보**를 기반으로 학습하는 **지도학습(Supervised Learning) 모델**이며, 대표적으로 **분류(Classification)**와 회귀(Regression) 문제에 널리 사용됩니다.

```python
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)
```

### 모델 성능 평가

모델의 정확도를 훈련 데이터와 테스트 데이터에 각각 적용해보겠습니다.

```python
train_score = clf.score(X_train, y_train) # 훈련 세트 정확도
test_score = clf.score(X_test, y_test) # 테스트 세트 정확도

print(f"훈련 데이터 정확도: {train_score:.3f}")
print(f"테스트 데이터 정확도: {test_score:.3f}")
```

```python
훈련 데이터 정확도: 1.000
테스트 데이터 정확도: 1.000
```

- 결과해석
    - 훈련/테스트 모두 **정확도 100%**라는 것은 모델이 모든 샘플을 완벽하게 분류했다는 의미
    - 아이리스 데이터셋은 잘 정제된 대표 데이터셋으로, 위 결과가 자연스러움
    - 현실 데이터에서는 이런 높은 정확도는 **과적합(overfitting)**의 가능성도 고려해야함

### 특성 중요도 분석
랜덤 포래스트는 각 특성이 예측에 얼마나 기여했는지를 feature_importances_ 속성으로 제공합니다.

```python
for name, importance in zip(iris.feature_names, clf.feature_importances_):
    print(f"{name}: {importance:.3f}")
```

```python
sepal length (cm): 0.108
sepal width (cm): 0.030
petal length (cm): 0.440
petal width (cm): 0.422
```

- 결과해석
    - petal length와 petal width가 대부분의 결정에 큰 영향을 끼쳤습니다.
    - 반면 sepal width는 거의 도움이 되지 않았습니다.
    - 이는 실제로 petal 쪽 특성들이 품종 분리에 더 명확한 기준이 되는 것을 반영합니다.