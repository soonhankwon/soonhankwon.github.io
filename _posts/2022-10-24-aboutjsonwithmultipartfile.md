---
layout : single
title : "About Json with MultipartFile"
categories : til
tags : [spring, til, http] 
---

# 221024 TIL


**Mention** : Winter is coming🥶 아침에 춥....춥다! 시간날 때, 깃블로그로 전환해야겠다💡

**Acheivement & Problem** : 어제 구현했던 AWS S3를 이용한 이미지 업로드기능을 실제 프로젝트에 적용 & 구현해보았다.

어제는 MultipartFile만 Body에 받아서  Post API를 구현했는데, 프로젝트에서는 JSON 타입의 데이터도 받아서 

Post API를 구현해야했다. 게시글의 제목, 내용, 유저네임은 JSON MediaType, 이미지파일은 MULTIPART MediaType 이런 구조이다.

에러의 원인은 빨리 파악한 거 같은데, 적용중 Configure Bean? 적어놓진 않았는데 이러한 에러가 발생🤯

기존 자바 클래스파일을 지우고 다시 쓰고 하는 과정중에 not founded 에러로 발생한 문제인듯 싶다. 

Gradle에 들어가서 Clean -> Build를 해주면 깔끔하게 청소된다. 어째저째 해결하고 두 가지 타입의 데이터를 받아서

기능을 구현하고 Postman 테스트 & AWS S3 Bucket에 저장되는 것 까지 확인완료🔥

클라이언트에서 서버까지 데이터의 흐름 & HTTP 에 대해서 정확히 알아둬야 오늘과 같은 에러의 근본 원인을 빠르게

해결할 수 있을 것이다🛠
<hr/>

오늘 구현했던, API에서 Json과 MultipartFile을 한번에 전달 받는 방법이다. 

일반적으로 API에서 클라이언트에게 값을 전달받기 위해서 @RequestBody로 데이터를 전달받도록 구현한다.

하지만, Multipartfile은 미디어타입이 달라 @RequestBody로 데이터를 전달 받을 수가 없다.

**@RequestPart**를 사용하면 Json & MultipartFile 미디어 타입(파일)을 둘 다 받을 수 있다.

이때 API에서 **consume**할 **MediaType**을 아래의 코드와 같이 지정해줘야 한다. 만약 적절한 MediaType를 지정하지

않을 경우 415 Unsupported MediaType ERROR와 인사하게 된다🤯

```java
@PostMapping(value = "/api/article", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createArticle(@RequestPart ArticleRequestDto requestDto, @RequestPart MultipartFile multipartFile) throws IOException {
        return ResponseEntity.ok(articleService.createArticle(requestDto, multipartFile));
    } 
```