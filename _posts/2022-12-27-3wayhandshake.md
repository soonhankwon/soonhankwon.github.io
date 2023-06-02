---
layout : single
title : "TCP 3 Way-Handshake & 4 Way-handshake"
categories : network
tags : [til, web, network] 
---

**Mention** : 데이터 보낼 준비가 됬는지 서로 악수해봅시다🤝

- 3-Way Handshake 는 TCP의 접속, 4-Way Handshake는 TCP의 접속 해제 과정
- TCP 는 신뢰성있는 Data 통신이 가능한 프로토콜이다.
    - 3-Way handshake 즉, 양방향 통신을 통해 연결을 한다.
    - data를 순차적으로 전달하여 **흐름 문제, 혼잡 문제**를 해결한다.
- 포트(PORT) 상태 정보
    - CLOSED : 포트가 닫힌 상태
    - LISTEN : 포트가 열린 상태로 연결 요청 대기 중
    - SYN_RCV : SYNC 요청을 받고 상대방의 응답을 기다리는 중
    - ESTABLISHED : 포트 연결 상태
- 플래그 정보
    
    ![https://velog.velcdn.com/images%2Frlacksals96%2Fpost%2Fe39e83ab-23fe-4765-979e-526eb4b4e43c%2Fimage.png](https://velog.velcdn.com/images%2Frlacksals96%2Fpost%2Fe39e83ab-23fe-4765-979e-526eb4b4e43c%2Fimage.png)
    
    - TCP Header에는 CONTROL BIT(플래그 비트, 6bit)가 존재하며, 각각의 bit는 URG-ACK-PSH-RST-SYN-FIN 의 의미를 가진다.
        - 즉, 해당 위치의 bit가 1이면 해당 패킷이 어떠한 내용을 담고 있는 패킷인지를 나타낸다.
    - SYN(**Sy**nchro**n**ization)
        - **연결 요청** 플래그
        - **시퀸스 번호**를 임의적으로 설정하여 세션을 연결하는 데에 사용
            - 초기에 시퀸스 번호를 보낸다.
    - ACK(Acknowledgement)
        - 응답
        - 상대방에게 패킷을 받았다는 것을 알려주는 패킷
        - 받는 사람이 보낸 사람의 시퀸스 번호에 TCP 계층에서 길이 또는 데이터 양을 더한 것과 같은 **ACK**를 보낸다.
    - RST(Reset)
        - 재설정
        - 양방향에서 동시에 일어나는 중단 작업
        - 비정상적인 세션 연결 끊기에 해당
        - 패킷을 보내는 곳이 현재 접속하고 있는 곳과 즉시 연결을 끊고자 할 때 사용
    - PSH(Push)
        - 밀어넣기
        - 받은 데이터를 즉시 목적지인 애플리케이션 계층으로 전송하도록 하는 플래그
        - 대화형 트래픽에 사용
        - 버퍼가 채워지기를 기다리지 않고 데이터를 전달
    - URG(Urgent)
        - Urgent pointer 전송하는 데이터 중에서 긴급히 전달해야 할 내용이 있을 경우 사용
    - FIN(Finish)
        - 세션 연결을 종료 시킬 때 사용

## TCP의 3-Way Handshake

- TCP 통신을 이용하여 데이터를 전송하기 위해 네트워크 연결을 설정(Connection Establish) 하는 과정
- TCP/IP 프로토콜을 이용해서 통신을 하는 응용 프로그램이 데이터를 전송하기 전에 먼저 정확한 전송을 보장하기 위해 상대방 컴퓨터와 **사전에 세션을 수립**하는 과정
    - 양쪽 모두 데이터를 전송할 준비가 되었다는 것을 보장하고, 실제로 데이터 전달이 시작하기 전에 한쪽이 다른 쪽이 준비되었다는 것을 알 수 있도록 한다.

### 3-Way Handshake 메커니즘

- TCP 통신은 **PAR(Positive Acknowledgement with Re-transmission)** 을 통해 신뢰적인 통신을 제공
- Connection

![https://velog.velcdn.com/images%2Frlacksals96%2Fpost%2F3fe27cec-a6a3-4352-aa09-a6e3019cbb20%2Fimage.png](https://velog.velcdn.com/images%2Frlacksals96%2Fpost%2F3fe27cec-a6a3-4352-aa09-a6e3019cbb20%2Fimage.png)

- Data

![https://velog.velcdn.com/images%2Frlacksals96%2Fpost%2F38f30905-139c-4363-aef8-9c409b6efc0b%2Fimage.png](https://velog.velcdn.com/images%2Frlacksals96%2Fpost%2F38f30905-139c-4363-aef8-9c409b6efc0b%2Fimage.png)

- PAR을 사용하는 기기는 **ACK**를 받을 때까지 데이터 유닛을 재전송한다.
- 클라이언트와 서버 사이에서 3개의 Segment가 교환되는 것을 확인할 수 있다.
    - 3-Way handshake의 기본 메커니즘

### 4-Way Handshake

- Connection 해제

![https://velog.velcdn.com/images%2Frlacksals96%2Fpost%2F5b971395-6c01-4fa7-aa8f-17cb9fa9b123%2Fimage.png](https://velog.velcdn.com/images%2Frlacksals96%2Fpost%2F5b971395-6c01-4fa7-aa8f-17cb9fa9b123%2Fimage.png)

### Summary

- TCP는 IP 프로토콜에서 발생하는 패킷소실문제, 전달순서 문제 등을 보완하기 위하여 생겨났습니다. TCP는 신뢰성있는 데이터 통신이 가능한 전송 제어 프로토콜 입니다. 3 way handshake란 TCP/IP 프로토콜을 이용해서 통신을 하는 응용 프로그램이 데이터를 전송하기 전에 먼저 정확한 전송을 보장하기 위해 상대방 컴퓨터와 사전에 세션을 수립하는 과정입니다.
- 클라이언트는 서버에 연결해달라는 **SYN**(시퀸스번호)을 보내고 이를 받은 서버는 **SYN+ACK** 를 즉, 요청을 수락했다는 확인을 보냅니다.
그럼 클라이언트는 **ACK + Packet**를 보내 서버의 요청을 수락합니다.
이렇게 클라이언트와 서버 사이에서 **3개의 세그먼트**가 교환되는 것을 확인할 수 있는데 이것이 3 way handshake의 기본 메커니즘입니다.
이를 통해, 서로 데이터를 보낼 수 있다는 것을 확인하고, 데이터를 순차적으로 전달하여 흐름 문제, 혼잡 문제를 해결합니다.

Reference 📚

[https://mindgear.tistory.com/206](https://mindgear.tistory.com/206)

[https://velog.io/@rlacksals96/네트워크-TCPUDP와-3way-handshake](https://velog.io/@rlacksals96/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-TCPUDP%EC%99%80-3way-handshake)

[https://velog.io/@averycode/네트워크-TCPUDP와-3-Way-Handshake4-Way-Handshake](https://velog.io/@averycode/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-TCPUDP%EC%99%80-3-Way-Handshake4-Way-Handshake)