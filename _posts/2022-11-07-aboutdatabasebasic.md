---
layout : single
title : "221107 About Database & MySQL Basic"
categories : til
tags : [database, til, mysql] 
---

# 221107 TIL

**Mention** : 벌써 파이널 프로젝트라니🥶❗️항해99 백엔드 팀으로의 사실상 첫 주의 시작이다. 날씨도 어느새 아침온도가 0도에 가깝게 떨어졌다. 겨울냄새가 난다. 

**Acheivement & Problem** :
백엔드 팀의 주 목표는 대용량 데이터베이스 핸들링이다. 그동안 프로젝트에서는 데이터베이스에 관해 깊게 공부할 필요가 없었는데, 필요성이 너무나 느껴졌다.

데이터베이스 기초를 다시 다지고 가기위해 MySQL 강의를 들으며 아래와 같이 정리해보았다.
<hr/>
Database → data의 저장소

SQL → Structured Query Language

데이터베이스에서 데이터를 저장하거나 얻기 위해서 사용하는 표준화된 언어

![database](https://s3-ap-northeast-1.amazonaws.com/opentutorialsfile/module/98/320.png)

Database Client 를 통해서 Database에 접근할 수 있다.

TABLE은 Column(열) 과 Row(행) 으로 구성 

**Schema?** 데이터베이스 스키마

테이블에 적재할 데이터의 구조와 형식을 정의하는 것 (데이터의 설계도)

데이터베이스에서 자료의 구조, 자료의 표현 방법, 자료 간의 관계를 형식 언어로 정의한 구조이다. 데이터베이스 관리 시스템(DBMS)이 주어진 설정에 따라 데이터베이스 스키마를 생성하며, 데이터베이스 사용자가 자료를 저장 조회, 삭제, 변경할 때 DBMS는 자신이 생성한 데이터베이스 스키마를 참조하여 명령을 수행한다. 

- 외부 스키마(External Schema) : 프로그래머나 사용자의 입장에서 데이터베이스의 모습으로 조직의 일부분을 정의한 것

- 개념 스키마(Conceptual Schema) : 모든 응용 시스템과 사용자들이 필요로하는 데이터를 통합한 조직 전체의 데이터베이스 구조를 논리적으로 정의한 것

- 내부 스키마(Internal Schema) : 전체 데이터베이스의 물리적 저장 형태를 기술하는 것

📄 Reference

<https://opentutorials.org/course/3161/19521>