---
layout : single
title : "221019 About @RequiredArgsConstructor Annotation"
catagories : til
tags : [orm, til] 
---

# 221019 TIL

**Acheivement** : SPRING 심화과정 팀 프로젝트END👏

숙련과정 프로젝트를 다시 한번 복기하는 중이다. 그리고, 백준 기초 알고리즘 문제 7문제 COMPLETED. 시간이 되면 매일 꾸준히 GOGO
  
**Problem** : 현재 단순히 강의를 듣고 따라서 프로그래밍을 하는 부분이 많다(흐름이나 왜 이렇게 쓰는지는 최대한 이해하고 하지만).  

**Feedback** : **내가 만들고 싶은 것이 무엇인지?** 생각하여 내가 만들고 싶은 것을 구현해야겠다. 생각한 아이디어를 구현하고, 배운것을 응용하는 과정에서 부족한 부분을 배워서 발전하는 과정을 가져야겠다🔥
<hr/>

생성자 주입의 단점은 생성자를 만들기 번거롭다는 것이다. 하지만 이를 보완하기 위해 롬복(lombok)을 사용하여 

간단한 방법으로 생성자 주입 방식의 코딩을 할 수 있다. **초기화 되지 않은 final 필드**나, **@NotNull이 붙은 필드**의 생성자를 자동 생성해주는 
롬복 어노테이션이다. DI 편의성을 위해서 사용되곤 한다. 

어떠한 빈(Bean)이 생성자가 오직 하나만 있고, 생성자의 파라미터 타입이 빈으로 등록 가능한 존재라면 이 빈은 @Autowired 어노테이션 없이도 의존성 주입이 가능하다. 

```
@Service
@RequiredArgsConstructor
public class RequiredArgsConstructorDIServiceExample {
	private final First Repository firstRepositorty;
	private final Second Repository secondRepositorty;
	private final Third Repository thirdRepositorty;
}
----> //컴파일 시 아래와 같이 생성됨
@Service
public class RequiredArgsConstructorDIServiceExample {
  @ConstructorProperties({"firstRepository", "secondRepository", "thirdRepository"})
  public RequiredArgsConstructorDIServiceExample(FirstRepository firstRepository, SecondRepository secondRepository, ThirdRepository thirdRepository) {
    this.firstRepository = firstRepository;
    this.secondRepository = secondRepository;
    this.thirdRepository = thirdRepository;
  }
}
```
