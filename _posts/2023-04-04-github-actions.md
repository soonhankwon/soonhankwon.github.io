---
layout : single
title : "Github Actions + Docker + EC2 (nohup, port-forwarding) 배포자동화"
categories : til
tags : [til, cd, github-actions] 
---

### **Github Actions** 와 **Docker** 를 사용해서 **EC2 서버**로 **배포 자동화**

**feat** : 빌드 완료 후 **Slack Webhook** (알람)

현재 사이드 프로젝트로 등산 관련 어플리케이션을 개발하고 있습니다.

프로젝트간 안드로이드, 애플 모바일 개발 팀원분들 요구사항에 맞춰 빈번하게 빌드 & 배포해야할 상황이어서 **Github Actions**를 사용해서 배포 자동화(CD)를 구축해보았습니다.

추가로 배포가 완료되면 슬랙 개발 채널에 알람이 자동으로 가도록 스크립트를 만들었습니다 **(slack web hook).**

![cd-slack-webhook](https://user-images.githubusercontent.com/113872320/229683046-7f56c56b-13c8-46ed-aedd-26c1caff5260.png)

시작전 프로젝트의 스프링부트 어플리케이션에서 jar를 빌드하는 **Dockerfile**이 필요합니다.

```docker
FROM amazoncorretto:11
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

### Workflow.

- master 브랜치 푸쉬 & PR 시 on
- 기본 Checkout
- JDK 버전 설정 (11, temurin)
- 그래들 캐싱(20~30% 빌드 속도 향상)
- secret에 저장한 properties 사용 (DB 정보)
- Gradle Build
- 도커 이미지 빌드 후 도커 허브 레포지토리에 푸시
- EC2 서버**(ubuntu)**에서 도커 이미지 pull
- 도커 이미지 컨테이너 -d -p 로 nohub으로 구동
- 80 → 8080 포트포워딩

### + Slack-Webhook 연동

- [슬랙 웹훅 API 생성하기](https://jojoldu.tistory.com/552)
- 배포 완료 시 슬랙 개발 채널로 알람
- rtCamp/action-slack-notify@v2.0.0 사용

### Github Actions Secrets

- Github Actions 스크립트에서 사용되는 개인정보
- Secrets → Secrets and variables에 저장해서 사용
    - APPLICATION : 스프링 애플리케이션 DB 정보
    - DOCKER-USERNAME : 도커 유저네임
    - DOCKER-PASSWORD :  도커 비밀번호
    - EC2_HOST : 호스팅 아이피
    - EC2_KEY : EC2 SSH KEY (pem key)
        
        ```yaml
        -----BEGIN RSA PRIVATE KEY-----
        내용
        -----END RSA PRIVATE KEY-----
        ```
        

### Actions Script.

```yaml
name: Spring Boot & Gradle & Docker & EC2 CD

on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master

permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # 기본 체크아웃
      - name: Checkout
        uses: actions/checkout@v3

      # JDK version 설정
      - name: Set up JDK 11
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'temurin'
          
      # 그래들 캐싱
      - name: Gradle Caching
        uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
          restore-keys: |
            ${{ runner.os }}-gradle-
            
      # main 설정 파일 생성 및 write
      - name: Set .properties for main
        run: |
          # main 설정 파일 디렉토리로 이동
          cd ./src/main/resources
          touch ./application.properties
          echo "${{ secrets.APPLICATION }}" >> ./application.properties
        shell: bash

      # Gradle build
      - name: Build with Gradle
        run: ./gradlew bootJar

      # Spring 어플리케이션 Docker Image 빌드
      - name: Build Docker Image For Spring
        run: |
          docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
          docker build -t ${{ secrets.DOCKER_USERNAME }}/[도커 레포지토리 이름] .
          docker push ${{ secrets.DOCKER_USERNAME }}/san-monkey
          
      # 서버에서 Docker 이미지 실행
      - name: EC2 Docker Run
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_KEY }}
          script: |
            sudo docker pull ${{ secrets.DOCKER_USERNAME }}/[도커 레포지토리 이름]
            sudo docker run -d -p 8080:8080 ${{ secrets.DOCKER_USERNAME }}/[도커 레포지토리 이름]
            sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
  Slack-Notification:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Slack Notification
        uses: rtCamp/action-slack-notify@v2.0.0
        env:
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK_URL }}
        with:
          status: ${{ job.status }}
          fields: repo,commit,message,author
          mention: here
          if_mention: failure,cancelled
``` 

### Gradle Caching

[https://github.com/actions/cache](https://github.com/actions/cache)

### Reference.

[https://zzang9ha.tistory.com/404https://zzang9ha.tistory.com/404](https://zzang9ha.tistory.com/404)

[https://velog.io/@pppp0722/GitHub-Actions-Docker-EC2-CD-구축하기](https://velog.io/@pppp0722/GitHub-Actions-Docker-EC2-CD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0)