---
layout  : wiki
title   : What is LangChain?
summary : 랭체인이란?
date    : 2025-05-25 08:40:00 +0900
updated : 2025-05-25 08:40:00 +0900
tag     : ai langchain
toc     : true
comment : true
public  : true
parent  : [[/langchain]]
latex   : true
---
* TOC
{:toc}

## What is LangChain

LangChain은 **대규모 언어 모델(LLM)**을 활용한 애플리케이션 개발을 위한 프레임워크입니다. 주요 특징은 다음과 같습니다:

- LLM 기반 애플리케이션 개발을 위한 종합적인 프레임워크
- **다양한 LLM 모델**들을 쉽게 통합하고 활용할 수 있는 추상화 계층 제공
- 모듈화된 컴포넌트를 통한 빠른 개발과 실험 가능
- 주요 LLM 제공자들 지원 (OpenAI, Anthropic, Google, Meta 등)

### Core Components

LangChain은 다음과 같은 핵심 컴포넌트들을 제공합니다:

1. **Models**
   - LLMs: 대규모 언어 모델 (GPT-4, Claude 등)
   - Chat Models: 대화형 인터페이스를 위한 모델
   - Embeddings: 텍스트를 벡터로 변환하는 모델

2. **Prompts**
   - Prompt Templates: 재사용 가능한 프롬프트 템플릿
   - Output Parsers: 모델 출력을 구조화된 형식으로 변환

3. **Chains**
   - LLM 체인: 여러 단계의 LLM 호출을 조합
   - Agent: 동적 의사결정과 도구 사용을 위한 에이전트

4. **Memory**
   - 대화 기록 저장
   - 컨텍스트 관리
   - 상태 유지

5. **Indexes**
   - 문서 로딩
   - 텍스트 분할
   - 벡터 저장소 통합

### Framework Components

LangChain 생태계는 다음과 같은 주요 구성요소로 이루어져 있습니다:

1. **LangChain Libraries**
   - Python과 JavaScript 지원
   - 핵심 기능 구현
   - 모듈화된 컴포넌트 제공

2. **LangChain Templates**
   - 사전 구성된 애플리케이션 템플릿
   - 빠른 시작을 위한 예제 제공
   - 다양한 사용 사례별 템플릿

3. **LangServe**
   - REST API 서버 구현
   - 배포 및 확장성 지원
   - API 엔드포인트 자동 생성

4. **LangSmith**
   - 디버깅 및 모니터링
   - 성능 평가
   - 트레이스 분석
   - 실험 관리

### Installation

```python
# 기본 패키지 설치
pip install langchain

# 실험적 기능 포함 설치
pip install langchain-experimental

# LangServe 설치 (API 서버)
pip install "langserve[all]"

# LangChain CLI 설치
pip install langchain-cli

# LangSmith SDK 설치 (모니터링 및 디버깅)
pip install langsmith
```