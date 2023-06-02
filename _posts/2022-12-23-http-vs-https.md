---
layout : single
title : "HTTP에 비해 HTTPS가 안전한 이유"
categories : http
tags : [til, web] 
---

**Mention** : HTTP(HyperText Transfer Protocol) + S(Secure)🔒

## HTTP(HyperText Transfer Protocol)

- 하이퍼 텍스트 전송 프로토콜으로 간단히 말해서 **인터넷을 작동**시키는 역할을 하며, 웹 서버 및 웹 브라우저 상호 간의 **데이터 전송을 위한 응용계층 프로토콜**입니다.
    - HTTP 서버는 기본 포트인 80번 포트에서 서비스 대기 중이며, 클라이언트가 TCP 80 포트를 사용해 연결하면 요청에 응답하며 정보를 전송한다.
- 웹 사이트에 액세스하기 위해서는 프로토콜 변형이 필요한데, 이때 웹 사이트 URL이 일반적으로 “[http://www](http://www/)..”로 시작하며 URL에 해당하는 웹 페이지를 가져오기 위해 웹 사이트 서버에 명령을 보내 작동하게 됩니다.
- HTTP의 문제점
    - **평문 통신**이기에 도청이 가능하다 → 암호화
    - 완전성을 증명할 수 없기 때문에 **변조**가 가능하다 → 암호화
    - 통신 상대를 확인하지 않기 때문에 **위장**이 가능하다 → 인증
        - 의미없는 리퀘스트도 수신하기 때문에 DoS 공격을 당할 수 있다.
        - 통신하고 있는 상대방이 허가된 상대인지 확인할 수 없다.

### HTTPS(Hypertext Transfer Protocol Secure)

- 하이퍼 텍스트 전송 프로토콜 **보안**으로 표준 HTTP와 동일한 방식으로 작동합니다. 서버와 주고받는 **데이터가 암호화**되기 때문에 **웹사이트에 추가적인 보호를 제공**합니다. 즉, 개인 데이터를 훔치거나, 해킹하거나 볼 수 없도록 작동합니다.
- 모든 HTTP 요청과 응답 데이터는 네트워크로 보내지기 전에 SSL 계층을 통해 암호화 된다.
    
    ![https://user-images.githubusercontent.com/58318041/92450515-80994a80-f1f6-11ea-80a7-b0cc26f78ab5.png](https://user-images.githubusercontent.com/58318041/92450515-80994a80-f1f6-11ea-80a7-b0cc26f78ab5.png)
    
- SSL 인증서
    - 클라이언트와 서버간의 통신을 공인된 제 3자(CA) 업체가 보증해주는 전자화된 문서
    - 통신 내용이 노출, 변경되는 것을 방지
    - 클라이언트가 접속하려는 서버가 신뢰 할 수 있는 서버인지 확인
    - SSL 통신에 사용할 공개키를 클라이언트에게 제공
- 대칭키 암호화(비밀키)
    - 비밀키는 개인키(private key)와 동일하다.
    - 암호화와 복호화를 **하나의 비밀키**로 사용하는 방식
    - 클라이언트와 서버 양측 모두 비밀키를 가지고 있어야한다. 즉, 비밀키를 교환하는 과정이 필요하다.
    - 키가 탈취되면 암호화 내용이 모두 유출될 수 있다는 치명적인 단점
        - 하지만 비대칭키 알고리즘 방식에 비해 속도가 빠르다
    - DEX, SEED, ARIA 등이 있다.
    
    ![https://user-images.githubusercontent.com/58318041/92457018-a4f92500-f1fe-11ea-835e-95384ea32b0f.png](https://user-images.githubusercontent.com/58318041/92457018-a4f92500-f1fe-11ea-835e-95384ea32b0f.png)
    
- 비대칭키 암호화(공개키 + 비밀키)
    - 공개키(public key)와 비밀키(private key)를 사용한다.
    - 공개키로 암호화 한 문서는 비밀키로만 복호화 할 수 있고, 비밀키로 암호화하면 공개키로만 복호화 할 수 있다.
    - 공개키는 공개키 저장소에 등록되어 있으며 수신자의 공개키를 얻을 수 있다.
    - 비대칭키의 암호화 방식에는 **공개키를 이용한 암호화** 방식과 **비밀키를 이용한 전자서명** 두 가지 방식이 있다.
    - 공개키를 이용한 암호화 방식은 비밀키의 소유자만 복호화 할 수 있기 때문에 보안적으로 안전하다.
    - 비밀키를 이용한 전자서명 방식은 정보 제공자의 신원을 확인할 수 있는 장점이 있다.
    
    ![https://user-images.githubusercontent.com/58318041/92457145-d1ad3c80-f1fe-11ea-8dfb-6dfa6b21bae2.png](https://user-images.githubusercontent.com/58318041/92457145-d1ad3c80-f1fe-11ea-8dfb-6dfa6b21bae2.png)
    
    - 대표적인 비대칭키 알고리즘으로 RSA, Elgamal가 있다.

### Summary

- HTTP란 웹 서버 및 브라우저 **상호간의 데이터 전송을 위한 프로토콜**입니다.
- HTTP는 도청, 위장, 완전성의 문제가 있습니다.
- 이 3가지 문제를 해결하기 위해 HTTPS는 **SSL(Secure Socket Layer)** 또는**TLS(Transport Layer Security)**와 같은 프로토콜을 사용하여 **공개키/개인키** 기반으로 데이터를 암호화하고 있습니다. 데이터는 **암호화**되어 전송되기 때문에 악의적인 의도의 사용자가 데이터를 조회하여도 원본의 데이터를 보는 것은 불가능하고, 완전성 또한 증명할 수 있습니다.

Reference 📚

[https://www.ascentkorea.com/difference-between-http-and-https/](https://www.ascentkorea.com/difference-between-http-and-https/)

[https://wooody92.github.io/network/HTTP-보안-문제와-HTTPS/](https://wooody92.github.io/network/HTTP-%EB%B3%B4%EC%95%88-%EB%AC%B8%EC%A0%9C%EC%99%80-HTTPS/)