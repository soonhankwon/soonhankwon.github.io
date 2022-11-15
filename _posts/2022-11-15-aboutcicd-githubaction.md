---
layout : single
title : "221115 CI/CD 기초 개념과 GitHub Action"
categories : til
tags : [ci/cd, til, github-action] 
---
# 221115 TIL

**Mention** : "Time waits no one" 몇년전에 본 애니인지 기억도 나지 않는 시달소에서 나온 문구이다. 시간낭비하지 말고 시간있을때 공부하자😴  

**Acheivement & Problem** : CI/CD 에 대한 정확한 개념이 부족해 드림코딩 영상 2편을 통해 개념파악 & 실습을 했다. 프론트 개발자분 답게 유튜브영상의 그림이 정말 깔끔하다👍🏽

## CI/CD?

CI/CD 개발 프로세스 → 대부분의 회사에서 사용

어플리케이션 개발 단계부터 배포 단계까지 이 모든 단계들을 **자동화**를 통해서 조금 더 효율적이고 빠르게 사용자에게 빈번이 배포할 수 있도록 만드는 것

🧑🏻‍💻 ———🚀———>👥

### CI(Continuous Integration) 지속적인 통합

- 레포지토리에 주기적으로 빌드→테스트→머지
- 코드 변경사항을 주기적으로 빈번하게 머지해야 한다. (머지 충돌 해결을 쉽게함)
- 통합을 위한 단계(빌드, 테스트, 머지)의 자동화
🧑🏻‍💻  → Repository → CI Server(Script를 통한 Build & Test)
→ ✅  or ⛔️
- 버그 수정 용이, 문제점을 빠르게 발견
- 코드의 퀄리티 향상, 개발 생산성 향상

### CD(Continuous Delivery & Deploy) 지속적인 제공 & 배포

- CI(Build, Test) → Prepare Release → ⛔️  → Deploy Release
- ⛔️   Continuous Delivery (배포는 수동 & 배포전 확인)
- Deploy Release까지 자동화는 Continuous Deployment (수동X)

CODE → BUILD → TEST → RELEASE → DEPLOY

Tools : Jenkins, Buildkite, GitHub Actions etc

유저 → Repository → CI Server(Build, Test)
개발 프로세스의 핵심 자동화

### 2018년 GitHub Action 등장

1. Events 
ex) on: push
main 브랜치로 머지, 커밋을 푸쉬, 이슈를 누군가가 열면
2. Workflows
ex) 
이벤트가 발생한다면 Workflow가 실행
3. Jobs
ex) Job : run unit tests
Job : run E2E tests
Workflow 안에 Job 정의되어 있음(병렬적 실행)
4. Actions
ex) acton check out
action setup node
깃허브 액션 - 명령어 (잘 만들어진 액션들)
5. Runners
ex)
JOB을 실행하는 VM or Container 라고 할수 있다.

프로젝트 경로안에

.github/workflows/workflow.yml (yml 파일이름 상관없음 경로안에 있으면 됨)

```java
name: Example CI

on:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

permissions:
  contents: read

jobs:
  test:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: Set up JDK 11
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'temurin'
    - name: Build with Gradle
      uses: gradle/gradle-build-action@67421db6bd0bf253fb4bd25b31ebb98943c375e1
      with:
        arguments: build
```
📝 Reference

 <https://www.youtube.com/watch?v=iLqGzEkusIw>

 <https://www.youtube.com/watch?v=0Emq5FypiMM>