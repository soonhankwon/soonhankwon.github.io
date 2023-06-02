---
layout : single
title : "About Multipart"
categories : http
tags : [spring, til, http] 
---

# 221022 TIL

**Acheivement & Problem** : AMAZON S3를 이용해서 클라우드에 이미지를 업로드하는 기능을 구현했다. 

이게 쉬워보였는데, 아마존 특유의 콘솔의 복잡함과 SDK 버전을 맞추고, AccessKey, SecretKey, Bucket, Region을 맞추는 과정 중

발생하는 세팅하는 과정에서의 에러가 펑펑 터져주었다. 이것저것 수정하며, 해결해서 포스트맨으로 버킷에 사진 업로드 테스트 완료.

어떤 기능을 구현할 때, 프로젝트를 새로 하나 만들어서 작은 단위로 구현을 한 다음 원래 프로젝트에 적용해주는 방법도 좋을것같다는 생각이 들었다.

이에 대한 장점은 화면에 다른 쓰잘데 없는 클래스들이 안보여서 직관적으로 로직을 만들기 편하다! 머리가 보다 잘돌아간다(**본인기준**)

---

## Multipart란?

웹 클라이언트가 요청을 보낼 때, HTTP 프로토콜의 **바디** 부분에 **데이터를 여러 부분**으로 나워서 보내는 것

웹 클라이언트가 서버에게 파일을 업로드 할 때, http프로토콜의 바디 부분에 파일 정보를 담아서 전송을 하는데, 파일을 한번에 여러개 전송을 하면 Body 부분에 파일이 여러개의 부분으로 연결되어 전송되는 것이 Multipart data라고 한다.
	
왜 멀티라는 단어를 굳이 쓸까라는 생각이 의문이 들었는데 하나 이상의 데이터 세트가 단일 본문에 결합되있으며
	
여러유형의 데이터(바이너리, 텍스트)가 포함되어 멀티파트 사용이라고 한다. 
	
As the official specification says, "one or more different sets of data are combined in a single body". So when photos and music are handled as multipart messages as mentioned in the question, probably there is some plain text metadata associated as well, thus making the request containing different types of data (binary, text), which implies the usage of multipart.

Usage : 보통 파일을 전송할 때 사용

**MultipartFile 이란?**

사용자가 업로드한 File을 핸들러에서 손쉽게 다룰 수 있게 도와주는 매개변수 중 하나
MultipartFile 인터페이스는 스프링에서 업로드 한 파일을 표현할 떄 사용되는 **인터페이스**

MultipartFile 인터페이스를 이용해 업로드한 파일의 이름, 실제 데이터, 파일 크기등을 구할 수 있다. 

**Method**

```java
String getName() //파라미터의 이름을 구함
String getOriginalFilename() //업로드한 파일의 이름을 구함
String isEmpty() // 업로드한 파일이 존재하지 않는 경우 true 리턴
long getSize() //업로드한 파일 크기를 구함
byte[] getBytes() throws IOException //업로드한 파일 데이터를 구함
InputStream getInputStream() throws IOException 
//업로드한 파일 데이터를 읽어오는 InputStream을 구함
//InputStream의 사용이 끝나면 알맞게 종료해주어야 한다.
void transfer To(File dest) throws IOException 
// 업로드한 파일 데이터를 지정한 파일에 저장

```

📄 Reference

https://antstudy.tistory.com/308
	
https://stackoverflow.com/questions/16958448/what-is-http-multipart-request