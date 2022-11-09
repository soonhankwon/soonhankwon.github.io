---
layout : single
title : "221109 다중 자료형 리스트의 특정 인덱스요소 일괄 수정"
categories : til
tags : [java, til, spring] 
---

# 221109 TIL

**Mention** : 파이널 프로젝트의 주제인 **TMS(운송 관리 시스템)**의 기본적인 MVP가 끝났다. 확실히 파이널기간에 들어와서 같은 관심사를 가진 백엔드 팀원들과 함께하니 특정 이슈에 다방향으로 고민하는 경험을 하게되어 만족스럽다 🥰 

또한 이번 프로젝트의 팀장이 되었는데, 비슷한 레벨에서의 팀이 구성되었을때, 어떻게 팀에게 긍정적인 방향성을 제시할건지도 개인과제이다. 

**Acheivement & Problem** : PatchMapping을 통해 SubRoute(택배 관할 지역의 소단위)로 택배기사에게 운송장을 할당해주는 기능을 구현하던 도중, 

자료형 데이터 List의 특정 인덱스 요소를 일괄로 바꿔주는 식으로 로직을 생각했다.

밑의 코드는 Courier(택배) 클래스이다. 

```java
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Courier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String route;
    private int subRoute;
    private Boolean state;
    private String customer;
    private String arrivalDate;
    private String username;

    public Courier(String route, int subRoute, Boolean state, String customer, String arrivalDate, String username) {
        this.route = route;
        this.subRoute = subRoute;
        this.state = state;
        this.customer = customer;
        this.arrivalDate = arrivalDate;
        this.username = username;
    }
    public void setUpdate(int i, String username) {
        this.username = username;
    }
}
```
밑의 코드는 서비스의 해당 기능의 로직이다.

SubRoute로 검색하면 위의 Courier의 필드를 갖는 데이터들이 조회된다. 따라서 자료형 데이터의 리스트가 검색되는데, 이는 이중배열이랑 비슷하다고 생각이 들었다.

courier.replaceAll()로 시도해보았으나 저장이 타입문제로 인해 컴파일에러, Stream은 문법 지식부족으로 패스했다. 

Stream에 대해서 익숙해지면, 성능적이나 가독성면에서 비교해보고 싶은 소망이다. 

결론적으로 for문을 통해서 courier.get(i).set(리스트의 수정될 n번째 인덱스, value)를 통해 서브라우트로 불러온 운송장을 모두 value(여기서는 할당할 택배기사)로 바꿔주었다.

개인적으로 array.set()으로 변경하는 것의 응용을 서비스로직에서 구현해봤다는 것에 소소한 Achevement를 얻었다🔥
```java
@Transactional
    public CourierResUpdateDto updateCourierBySubRoute(int subRouteId,
                                                       CourierReqUpdateDto courierReqUpdateDto) {
        Account account = accountRepository.findByUsername(courierReqUpdateDto.getUsername())
                .orElseThrow(() -> new NullPointerException("해당 택배기사가 존재하지 않습니다"));

        List<Courier> courier = courierRepository.findBySubRoute(subRouteId);

        for (int i = 0; i < courier.size(); i++) {
            courier.get(i).setUpdate(5, courierReqUpdateDto.getUsername());
            courierRepository.save(courier.get(i));
        }
        return new CourierResUpdateDto("운송장 할당완료");
    }
```