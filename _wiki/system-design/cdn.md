---
layout  : wiki
title   : CDN(Content Delivery Network)
summary : CDN 빠르고 안전한 컨텐츠 전송
date    : 2025-04-12 21:24:00 +0900
updated : 2025-04-12 21:24:00 +0900
tag     : cdn system-design
toc     : true
comment : true
public  : true
parent  : [[/system-design]]
latex   : true
---
* TOC
{:toc}

## CDN(Content Delivery Network)

### 컨텐츠 전송 네트워크

- 개념

  - CDN은 사용자와 **가까운 서버(Edge 서버)**를 통해 컨텐츠(이미지, 동영상, CSS 등)를 빠르게 제공하는 분산 네트워크

- 주요 목적

    - 지연 시간 최소화: **사용자와 가까운 서버**에서 컨텐츠 제공
    - 트래픽 분산: 서버 과부하 방지 및 대규모 트래픽 처리
    - 성능 개선: 빠른 로드 시간과 안정성 제공

- 주요 특징

    - **캐싱**: 정적 컨텐츠를 Edge 서버에 저장하여 재사용
        - 대역폭 비용 절감
        - 단점: 비용(CDN 추가 구성), 컨텐츠 동기화 문제, 보안 이슈
    - **지리적 분산**: 전 세계 데이터 센터 네트워크
    - 고가용성: 장애 발생시 다른 서버로 자동 전환

- 사용 사례

    - 이미지, 동영상 스트리밍, 웹 애플리케이션 컨텐츠 전송
        - e.g) AWS CloudFront

### CDN Process

- 클라이언트 요청

    - 사용자가 웹페이지를 열 때, 브라우저가 HTML에 명시된 이미지 URL 요청

- DNS 조회

    - CDN의 CNAME 레코드를 확인하여 가장 가까운 Edge 서버를 찾음
        - e.g) images.example.com → Edge 서버 IP로 매핑

- Edge 서버 확인

    - 요청된 이미지가 Edge 서버에 캐싱되어 있는지 확인
        - Cache Hit: 이미지가 캐시에 있으면 Edge 서버에서 바로 제공
        - Cache Miss: 이미지가 없으면 원본 서버(Origin)에서 가져옴

- 원본 서버 요청(캐시 미스 시)

    - Edge 서버가 원본 서버(Origin)에 이미지 요청
    - 원본 서버는 요청받은 이미지를 Edge 서버로 전달

- 이미지 전달 및 캐싱

    - Edge 서버는 이미지를 클라이언트에 전달하고 캐시에 저장
    - 이후 동일 이미지 요청 시 캐시에서 바로 제공

- 브라우저 렌더링

    - 클라이언트는 Edge 서버에서 이미지를 받아와 브라우저에 렌더링

### AWS CloudFront - CDN

- Origin 서버 설정(S3, EC2, 외부 서버)
- CloudFront Distribution 생성
    - Origin 원본 서버 연결
- 캐싱 정책 설정
    - 정적 컨텐츠(e.g 이미지): 긴 TTL(eg 7일)
    - 동적 컨텐츠(e.g API 응답): 짧은 TTL(eg 1시간)
- HTTPS 설정
    - AWS ACM으로 무료 SSL 인증서를 적용해 보안을 강화

- 사례

    - 정적 컨텐츠 제공
        - 이미지, CSS, JS 파일
    - 동영상 스트리밍
        - 유튜브, 넷플릭스 같은 서비스
        - Read-heavy System
    - API 응답 캐싱
        - API 게이트웨이와 연계