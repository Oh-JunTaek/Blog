
# 한국어 중심 소형 LLM을 처음부터 만들기(for Android)

**프로젝트 마스터 기획서 v1.2 | 2026-11-24 | 상태: 기획 기준선 / 실험 수치 미확정**

> 목적: 공개 연구와 공개 데이터를 활용하여 한국어 중심 범용 소형 LLM을 무작위 초기 가중치부터 학습하고, 성능·비용·재현성·라이선스를 검증해 모델 가중치와 코드를 공개한다. 최종적으로 Android 개인 비서 **EU**에서 활용 가능성을 평가한다.  
> 이 글은 작업하면서 체크하는 **살아 있는 문서**다. `[ ]`는 검증 전, `[x]`는 산출물과 증빙을 확보한 작업만 표시한다.

* * *

목차
--

0.  [사전 준비물: 개발을 시작하기 전에](#0-%EC%82%AC%EC%A0%84-%EC%A4%80%EB%B9%84%EB%AC%BC-%EA%B0%9C%EB%B0%9C%EC%9D%84-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90)
1.  [왜 이 프로젝트를 시작하나](#1-%EC%99%9C-%EC%9D%B4-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC-%EC%8B%9C%EC%9E%91%ED%95%98%EB%82%98)
2.  [범위와 성공의 정의](#2-%EB%B2%94%EC%9C%84%EC%99%80-%EC%84%B1%EA%B3%B5%EC%9D%98-%EC%A0%95%EC%9D%98)
3.  [전체 개발·학습 흐름](#3-%EC%A0%84%EC%B2%B4-%EA%B0%9C%EB%B0%9C%ED%95%99%EC%8A%B5-%ED%9D%90%EB%A6%84)
4.  [연구 선례: 국내 모델에서 가져올 것](#4-%EC%97%B0%EA%B5%AC-%EC%84%A0%EB%A1%80-%EA%B5%AD%EB%82%B4-%EB%AA%A8%EB%8D%B8%EC%97%90%EC%84%9C-%EA%B0%80%EC%A0%B8%EC%98%AC-%EA%B2%83)
5.  [공개 데이터와 공개 라이선스 전략](#5-%EA%B3%B5%EA%B0%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%99%80-%EA%B3%B5%EA%B0%9C-%EB%9D%BC%EC%9D%B4%EC%84%A0%EC%8A%A4-%EC%A0%84%EB%9E%B5)
6.  [내 PC로 학습하는 전략](#6-%EB%82%B4-pc%EB%A1%9C-%ED%95%99%EC%8A%B5%ED%95%98%EB%8A%94-%EC%A0%84%EB%9E%B5)
7.  [P0~P9 및 P6-FC 작업 로드맵](#7-p0p9-%EB%B0%8F-p6-fc-%EC%9E%91%EC%97%85-%EB%A1%9C%EB%93%9C%EB%A7%B5)
8.  [측정 지표 및 EU 통합 기준](#8-%EC%B8%A1%EC%A0%95-%EC%A7%80%ED%91%9C-%EB%B0%8F-eu-%ED%86%B5%ED%95%A9-%EA%B8%B0%EC%A4%80)
9.  [개발 저장소와 산출물 관리](#9-%EA%B0%9C%EB%B0%9C-%EC%A0%80%EC%9E%A5%EC%86%8C%EC%99%80-%EC%82%B0%EC%B6%9C%EB%AC%BC-%EA%B4%80%EB%A6%AC)
10.  [리스크, 의사결정 및 중단 기준](#10-%EB%A6%AC%EC%8A%A4%ED%81%AC-%EC%9D%98%EC%82%AC%EA%B2%B0%EC%A0%95-%EB%B0%8F-%EC%A4%91%EB%8B%A8-%EA%B8%B0%EC%A4%80)
11.  [참고자료와 링크](#11-%EC%B0%B8%EA%B3%A0%EC%9E%90%EB%A3%8C%EC%99%80-%EB%A7%81%ED%81%AC)

* * *

0\. 사전 준비물: 개발을 시작하기 전에
-----------------------

> **읽는 법:** 이 절은 프로젝트 착수용 준비 탭이다. `준비 이유 → 확보할 것 → 확인 방법 → 증빙` 순으로 읽는다. 체크박스는 설치·다운로드만으로 완료 처리하지 않고 실제 작동과 권리 조건까지 검증한 뒤 체크한다. **모든 데이터셋을 지금 전부 내려받을 필요는 없다.** 처음에는 목록과 소량의 표본만 확보한다.

### 0.1 준비물 한눈에 보기

분류

준비할 것

준비 이유 / 목적

확인할 결과

시점

하드웨어

RX 9060 XT 16GB, RAM 32GB, 저장공간·온도 점검

학습이 지속 가능해야 함

GPU 인식 및 안정성 로그

즉시

개발 환경

Git, Python, 가상환경, PyTorch/ROCm 지원 조합

동일 환경 재현과 패키지 충돌 방지

`forward/backward/optimizer step` 통과

즉시

원본 설계

MiniMind 공식 저장소, 커밋·LICENSE 고정

수정 전 기준선 보존

commit SHA, 원본 테스트

즉시

모바일 경로

MiniMind → GGUF → llama.cpp Android

학습 후 모바일 변환 불가능 위험 조기 발견

**실제 Android 추론 시험은 미완료**

초기 호환성 시험

코드·문서

GitHub 저장소, 실험 장부, 라이선스·데이터 등록부

오픈 모델 재현성과 권리 증빙

문서 템플릿 생성

즉시

사전학습 데이터

WanJuan-Korean 등 허용 후보

한국어 언어 능력 학습

샘플 품질·이용조건 승인

P3 전

대화 SFT 데이터

AI-Hub 개별 데이터, 공개 지시 데이터 후보

한국어 대화와 응답 능력

스키마·원천 조건 확인

P6 전

평가 자료

KLUE·EU 작업 평가셋 등

학습 효과와 실패를 객관적으로 측정

고정 평가 분할 및 누수 검사

P2

배포

Hugging Face 계정, 모델 카드 초안

무료 공개·다운로드와 저작자 표시

비공개 테스트 배포

릴리스 전

실행 모니터링

GPU 로그·토큰/초·피크 VRAM·손실 기록

데이터/모델 크기 결정 근거

100~1,000 step 스모크 기록

P1

### 0.2 PC·개발 환경 준비 체크리스트

*    **공간·안정성 확인:** 학습 데이터, 캐시, 체크포인트, 백업을 별도로 저장할 폴더와 디스크 여유 공간을 점검한다. 저장 용량은 실측 후 결정하며 무작정 수십 GB를 예약하지 않는다. **증빙:** 디스크 점검표.
*    **AMD 학습 지원 확인:** 공식 [Windows ROCm 호환성](https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/compatibility/compatibilityrad/windows/windows_compatibility.html) 및 [WSL ROCm 호환성](https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/compatibility/compatibilityryz/wsl/wsl_compatibility.html)에서 드라이버·Python·PyTorch 조합을 확인한다. **이유:** NVIDIA CUDA 전용 코드가 있을 수 있다. **증빙:** 버전·GPU 탐지 로그.
*    **MiniMind 고정:** [원본 저장소](https://github.com/jingyaogong/minimind)를 clone/fork하고 정확한 커밋을 기록한다. `LICENSE` 및 `NOTICE` 여부도 확인한다. **증빙:** 원본 커밋과 라이선스 사본.
*    **짧은 학습 검증:** PyTorch 순전파·역전파·옵티마이저 업데이트와 MiniMind 소형 학습을 실행한다. **증빙:** Loss, GPU 메모리, 속도, 오류 기록.
*    **중단·복원 검증:** 체크포인트 저장과 학습 재개가 되는지 시험한다. **이유:** 개인 PC에서는 작업 중단 가능성이 크다. **증빙:** 재개 전후 step 비교.
*    **Android 진입 경로 스모크:** 원본 MiniMind 구조의 GGUF 변환과 `llama.cpp` Android 실행 가능 여부를 조사·시험한다. 아직 성공으로 간주하지 않는다. **증빙:** 변환 로그, 실제 기기 출력 및 제약 사항.

### 0.3 계정·개발 운영 준비 체크리스트

*    GitHub: 프로젝트 저장소·이슈·릴리스·코드 라이선스 고지 준비 — **이유:** 코드 변경과 연구 이력 추적.
*    Hugging Face: 모델 저장소·모델 카드 준비 — **이유:** 누구나 모델 가중치와 Tokenizer를 다운로드하도록 공개.
*    블로그(Tistory): 본 마스터 기획서를 게시하고 작업 증빙 링크를 추가 — **이유:** 진행 상황을 한눈에 파악.
*    `DATA_REGISTER.csv`: 데이터마다 출처, 버전/리비전, 라이선스 URL, 학습·상업·가중치 공개 조건, 승인 상태 기록 — **이유:** 학습 후 공개 불가 리스크 방지.
*    `EXPERIMENT_LOG.csv`: 가설, 실험 변수, VRAM, tokens/sec, Loss, 한국어 평가 점수 기록 — **이유:** 주관적 인상 대신 측정으로 결정.
*    원본 학습 데이터, 인증 정보, 비공개 체크포인트는 Git에 커밋하지 않도록 `.gitignore`와 비밀정보 점검 설정 — **이유:** 원본 재배포 금지·키 유출 방지.

### 0.4 사전 준비 데이터셋 목록 (다운로드 전 승인용)

**중요:** 아래의 `우선 후보`는 _프로젝트 계획상 채택_이지 _개별 원천의 법적 권리 검증 완료_가 아니다. 원본 데이터는 재배포하지 않지만 학습 및 **Apache 2.0 가중치의 자유로운 상업적 재배포가 가능한지** 각각 확인해야 한다. 실제 다운로드는 샘플부터 진행한다.

후보 / 공식 접근 경로

활용 단계

공개 표기·기본 조건

현재 승인 상태

준비할 작업

[WanJuan-Korean](https://huggingface.co/datasets/opendatalab/WanJuan-Korean)

Tokenizer·사전학습

데이터 카드 CC BY 4.0 표기, 출처 표시 필요. 웹 원문 권리 별개

**우선 후보 / 미승인**

카드 버전 고정, 원천 권리·PII 표본 감사, 토큰 수 산정

[AI-Hub](https://www.aihub.or.kr/) 개별 한국어 대화·요약 자료

SFT·대화

일반 정책은 학습 결과물 이용·배포 안내. 개별 예외 및 원본 재배포 제한

**조건부 / 데이터별 미승인**

실제 데이터셋 ID 확정, 개별 약관 보관, 공개 가중치 배포 확인

[Korean Writing Style Instruct](https://huggingface.co/datasets/coastral/korean-writing-style-instruct)

SFT 문체

카드 Apache 2.0 표기

**보류 / 생성원천 검토**

원 생성 모델·데이터 권리 검토, 중복·품질 샘플링

[CarrotAI Korean Instruction](https://huggingface.co/datasets/CarrotAI/ko-instruction-dataset)

SFT 지시응답

카드 Apache 2.0 표기

**보류 / 생성원천 검토**

합성 생성 모델 이용조건 확인

[한국어 위키백과 덤프](https://dumps.wikimedia.org/kowiki/)

일반 지식

콘텐츠별 CC BY-SA·GFDL 등, 저작자 표시

**조건부**

실제 덤프 날짜·기여자 표시·원문/가중치 권리 검토

[FineWeb2 한국어](https://huggingface.co/datasets/HuggingFaceFW/fineweb-2/tree/main/data/kor_Hang)

사전학습 확장

ODC-By 1.0 표기; 웹 원문 저작권 별도

**조건부**

원문 권리·PII·중복·삭제요청 대응 검토

[HPLT 2.0](https://hplt-project.org/datasets/v2.0)

사전학습 보충

데이터 배포 표기와 웹 원문 권리 분리 필요

**조건부**

한국어 파티션·해당 버전 약관 확인

[Keural Conversation](https://huggingface.co/datasets/mkd-chanwoo/keural-conversation-ko)

대화 SFT

CC BY 4.0 표기, 생성 모델 조건 별도

**보류**

생성 모델 권리 및 품질 확인

[KoSGD](https://huggingface.co/datasets/AIWORKX/KoSGD)

Tool 평가 후보

CC BY-SA 4.0 표기, 공개 split 확인 필요

**평가 검토**

Train 공개 여부 확인, 테스트 데이터 학습 누수 방지

[KLUE](https://github.com/KLUE-benchmark/KLUE)

한국어 평가

벤치마크 규칙·라이선스 준수

**평가 검토**

평가 전용 분리, 메트릭·태스크 확정

[모두의 말뭉치](https://kli.korean.go.kr/corpus)

향후 한국어 보강

결과물 외부 공개 사전 승인 요건 확인 필요

**승인 전 제외**

국립국어원에 가중치 공개 조건 문의

[Polyglot-Ko 논문](https://arxiv.org/abs/2306.02254)

연구 참고

원본 학습 말뭉치 제공과 별개

**데이터 확보 목록 제외**

학습 방법만 참조

**선별 우선순위:** (1) 사전학습용 WanJuan-Korean 표본 권리·품질 검수 → (2) AI-Hub **개별** 대화 데이터 선정 → (3) SFT 후보 원천 검토 → (4) FineWeb2·위키백과·HPLT 보충 여부 결정. 모든 후보를 반드시 사용하는 것이 목표는 아니다.

**원본 데이터 재배포 금지 운영:** 학습 데이터 원본은 공식 제공처에서 개별 다운로드한다. 프로젝트에는 **데이터 출처·버전·수집/정제 코드·해시·승인 이력**만 공개한다. 단, 이 조치가 원천 저작권 문제를 자동으로 해결하지는 않는다.

### 0.5 사전 준비 완료 게이트

*    하드웨어에서 작은 학습이 실제 작동한다.
*    MiniMind 원본 커밋·라이선스가 고정되었다.
*    최소 하나의 **모바일 추론 후보 경로**와 기술적 위험을 문서화했다. (Android 실제 실행은 별도 스모크 시험 결과로 판정)
*    첫 번째 학습 데이터 후보의 이용 조건을 검증하고 표본을 감사했다.
*    평가 데이터와 학습 데이터를 분리할 방법이 정해졌다.
*    코드·데이터·모델 공개 정책과 검증 미완료 항목을 기록했다.

* * *

1\. 왜 이 프로젝트를 시작하나
------------------

### 1.1 목표

이 프로젝트는 **거대한 모델 제작 경쟁**이 아니다. 개인용 GPU의 자원을 효율적으로 사용하여 **한국어로 자연스럽게 대화하고, 일상적인 질문과 요청을 이해하는 소형 범용 LLM**을 학습한다. 직접 사전학습을 경험하면서 LLM의 Tokenizer·Transformer·가중치·손실함수·역전파·SFT·평가를 이해하고, 결과물이 실제 개인 비서 EU에 유용한지 측정한다.

**기술적 질문:** 같은 하드웨어와 학습 예산이라면, 한국어 데이터 구성과 Tokenizer, 모델 크기, 학습 방법 중 무엇이 실사용 성능에 가장 크게 기여할까?

### 1.2 확정 원칙

*   **처음부터 학습:** MiniMind의 구조·코드를 참고하되, 사전학습된 MiniMind/EXAONE/Qwen 가중치를 가져다 시작하지 않는다. _실험용 교사 모델, 평가자 모델은 출처와 이용조건을 지킨 경우 별도 활용할 수 있다._
*   **한국어 우선:** 한국어 데이터를 중심에 두되 영어 등 다른 언어가 포함된 공개 자료를 일부러 모두 제거하지 않는다.
*   **코딩 능력에 별도 예산 없음:** 코드 전용 데이터 수집·코딩 벤치마크 최적화는 하지 않는다. 데이터셋에 우연히 섞인 코드까지 무리하게 제거하는 일도 목표가 아니다.
*   **범용 모델:** 단일 판단 분류기가 아닌 일반 대화형 LLM이다. EU 의도 해석·구조화 출력은 중요한 **적용 평가 과제**다.
*   **공개 우선:** 코드와 Tokenizer는 Apache 2.0 공개를 기본으로 하며, **가중치도 Apache 2.0으로 누구나 무료 다운로드·수정·재배포·상업적으로 활용할 수 있게 공개하는 것이 목표**다. 최종 가중치 라이선스 적용은 투입 데이터·합성 데이터·외부 모델 약관 검토 후 승인한다. 학습 설정, 평가표, 모델 카드와 재현 방법을 공개한다. 제3자 데이터 원본은 허가 없이 재배포하지 않는다.
*   **성능 우선:** 64M은 출발점이며 목표 성능에 도달하지 못하면 다른 크기(예: 128M/256M)를 시험한다. 큰 모델 자체가 목표는 아니다.
*   **EU와 독립 운영:** EU 앱과 본 프로젝트는 별도 저장소·릴리스. **EU에서 이 모델 사용은 선택사항**이며 기존 다른 모델을 계속 쓸 수 있다. 누구나 Hugging Face 등 공식 경로에서 다운로드할 수 있고, EU 앱에도 공식 다운로드 선택지를 제공한다. EU와의 실험적 통합은 평가 통과 이후 수행한다.

### 1.3 이번 프로젝트에서 하지 않을 일

*   처음부터 대형 MoE, 초대형 멀티모달, 긴 문맥 강화학습까지 구현하기
*   복잡한 외부 서비스 실행 권한을 모델의 출력만 믿고 부여하기
*   Android 배포부터 먼저 구현하기
*   라이선스가 불분명한 데이터를 관행적으로 일괄 학습·배포하기
*   성능 결과가 없는데도 특정 모델의 대체 가능성을 선언하기

* * *

2\. 범위와 성공의 정의
--------------

### 2.1 단계별 목표

단계

목표

성공을 확인하는 증거

L0 환경 재현

MiniMind 기본 모델 학습 스모크 테스트

GPU 사용 기록, 로그, 체크포인트 재개 성공

L1 언어 기본기

한국어 Base 모델

고정 검증셋 Loss/Perplexity와 생성 예시

L2 범용 대화

한국어 질의응답 SFT

고정 대화 평가 결과와 실패 사례

L3 간단한 비서

메모·일정·알림 등 명령 해석 및 적절한 기능 선택

의도·슬롯·함수명·인자·JSON 스키마 검증률

L4 복합 비서

다중 기능 호출·호출하지 않기·추가 질문·실행 결과 반영

EU 평가셋에서 기존 모델 대비 비교

L5 공개 릴리스

재현 가능한 오픈 모델

라이선스 검토, 모델 카드, 가중치, 코드, 테스트 완료

L6 모바일 검증(후속)

Android 추론 실험

실제 단말 지연·메모리·발열·호환성 수치

**정량적 통과 점수는 P2에서 평가셋과 기준 모델을 실제 실행한 후 결정한다.** 지금 숫자를 임의로 확정하지 않는다. 초소형 모델이 현행 EU의 Gemma 계열 모델을 대체할 것이라고 가정하지 않는다.

### 2.2 공개물

`모델 가중치 (safetensors 등) + Tokenizer + config + 학습 코드 + 환경 잠금 파일 + 데이터 출처표 + 실험 로그 + 평가 결과 + 사용 예제 + MODEL_CARD + LICENSE/NOTICE + 한계와 위험 설명`

오픈소스 코드와 오픈 가중치는 법적·기술적으로 별개다. 모델/데이터에 적용되는 권리와 코드 라이선스를 따로 검토한다.

* * *

3\. 전체 개발·학습 흐름
---------------

    [사전 준비물 점검 / 기준선·라이선스 조사]
              ↓
    [AMD GPU + MiniMind 원본 재현 / Android GGUF 경로 조기 검증]
              ↓
    [평가셋 고정 / 기준 모델 측정] ────────────────────┐
              ↓                                         │
    [공개 데이터 선정 → 정제 → 중복·PII 제거 → 분할]     │
              ↓                                         │
    [한국어 Tokenizer 후보 학습·비교]                    │
              ↓                                         │
    [64M 모델 무작위 초기화 / 사전학습]                   │
              ↓                                         │
    [Base 평가] → [Chat v1 한국어 대화 SFT / 보존] → [Tool v1 Function Calling 추가 학습] → [EU 평가] ←─────────┘
              ↓
    [오류 분석·소규모 개선 실험 / 크기 확대 여부 결정]
              ↓
    [라이선스·안전·재현성 점검 → 공개 릴리스]
              ↓
    [후속: Android 변환 및 EU 실험 통합]

**한 작업의 반복 루프:** (1) 가설 기록 → (2) 기준 실험 고정 → (3) 단일 변수 변경 → (4) GPU 메모리·시간·품질 측정 → (5) 결과 기록 → (6) 채택·보류 결정. 변경을 한 번에 여러 개 섞지 않는 것이 원인 분석에 유리하다.

* * *

4\. 연구 선례: 국내 모델에서 가져올 것
------------------------

> 공개 논문의 _학습 아이디어_를 참조하는 것이지, 해당 기업의 비공개 데이터나 모델 학습 절차 전체를 재현한다는 뜻은 아니다.

선례

공개 참고자료

우리에게 유용한 점

채택 방향

**LG AI연구원 EXAONE 3.5**

[기술 보고서](https://www.lgresearch.ai/data/upload/tech_report/ko/Technical_report_EXAONE_3.5.pdf)

한국어·영어 학습, 단계별 사전학습과 데이터 관리

평가 후 부족한 데이터 영역 보강

**LG K-EXAONE**

[논문](https://arxiv.org/abs/2601.01739), [공식 코드](https://github.com/LG-AI-EXAONE/K-EXAONE)

어휘 재설계, SuperBPE, 언어별 토큰 효율

150K 어휘를 모방하지 않고 작은 어휘 실험

**LG K-EXAONE 2.0**

[논문](https://arxiv.org/abs/2608.04505)

Upcycling·지속학습·확장 전략

첫 모델 후속 연구, 초기 범위 제외

**NAVER HyperCLOVA X**

[보고서](https://arxiv.org/abs/2404.01954), [네이버 설명](https://www.navercorp.com/media/pressReleasesDetail?seq=31714)

한국어·문화적 문맥, 한국어 중심 학습과 평가

문화·구어체·표현력 평가 항목 반영

**NAVER HyperCLOVA X THINK**

[기술 보고서](https://clova.ai/cdn/media/2025/06/HyperCLOVA_X_THINK_Technical_Report.pdf)

품질 필터링과 한국어 데이터 보강

문서 질 평가와 필터 실험 참고

**EleutherAI Polyglot-Ko**

[논문](https://arxiv.org/abs/2306.02254), [GitHub](https://github.com/EleutherAI/polyglot)

한국어 중심 자동회귀 언어 모델 구축 선례

한국어 단일 우선 모델의 평가·훈련 참고

**Upstage Solar Open**

[논문](https://arxiv.org/abs/2601.07022)

한국어 데이터 부족과 품질 개선·합성 데이터

합성 데이터는 라이선스·품질 통제 후 후속 검토

**분명히 구분할 것:** `논문 공개` ≠ `원본 학습 데이터 공개` ≠ `가중치 재배포 가능` ≠ `코드 오픈소스`. 각 항목을 따로 기록한다. K-EXAONE의 대규모 Tokenizer 성능 개선 수치를 64M 모델에 그대로 적용할 수 없다.

### 조사 체크리스트

*    논문별로 Tokenizer, 데이터 필터, 학습 단계, 평가법을 1쪽씩 요약한다.
*    공개 코드·실제 공개 가중치·공개 데이터 여부를 구분한다.
*    MiniMind에 구현 가능한 것과 GPU 예산상 불가능한 것을 분류한다.
*    출처 링크, 확인 날짜, 관련 절, 적용 가설을 `docs/RESEARCH_REGISTER.md`에 기록한다.

* * *

5\. 공개 데이터와 공개 라이선스 전략
----------------------

### 5.1 첫 번째 원칙: 공개된 데이터라도 무조건 배포 가능한 것은 아니다

우리는 최종 가중치를 공개할 예정이므로 **데이터 권리·출처·이용 조건을 학습 전부터 기록**한다. 원본을 재배포하지 않더라도 모델 가중치의 공개와 상업적 사용에 별도 제한이 있을 수 있다. 법률적 불확실성이 남는 데이터는 학습 파이프라인의 기본값에서 제외한다.

데이터 후보

용도

이용·공개 확인 포인트

초기 판단

[FineWeb2 한국어 `kor_Hang`](https://huggingface.co/datasets/HuggingFaceFW/fineweb-2/tree/main/data/kor_Hang)

대규모 한국어 웹 사전학습

데이터셋 ODC-By 1.0, **개별 웹페이지 저작권은 별도**; 출처/삭제 요청/원문 포함 여부 검토

**우선 후보, 조건부**

[한국어 위키백과 덤프](https://dumps.wikimedia.org/kowiki/)

설명문·일반 지식

문서별 저작자표시, CC BY-SA 등 적용 조항·변경 이력 검토

**우선 후보, 조건부**

[모두의 말뭉치](https://kli.korean.go.kr/corpus)

문어체·구어체·언어현상

이용 약정 및 **결과물 공개 승인** 요건 확인

**승인 확인 전 학습 보류**

[AI-Hub](https://www.aihub.or.kr/)

대화·요약·지시 SFT

일반 FAQ, 개별 데이터 약관, 출처표시, 원본 재배포 금지 및 특수 제한

**데이터별 검토**

[Open Korean Instructions 모음](https://github.com/HeegyuKim/open-korean-instructions)

한국어 SFT 후보 탐색

개별 데이터셋의 원본 출처, 생성 모델 정책, 상업·재배포 허용 여부

**목록 조사용**

[Open Korean Corpora](https://github.com/ko-nlp/Open-korean-corpora)

추가 코퍼스·벤치마크 탐색

링크별 실제 라이선스 확인

**목록 조사용**

참고: [국립국어원 FAQ](https://kli.korean.go.kr/boards/faqList.do), [AI-Hub FAQ](https://www.aihub.or.kr/aihubnews/faq/list.do), [AI-Hub 이용정책](https://aihub.or.kr/intrcn/guid/usagepolicy.do), [FineWeb2 데이터 카드](https://huggingface.co/datasets/HuggingFaceFW/fineweb-2). **AI-Hub의 일반적인 결과물 활용 안내만으로 모든 개별 데이터의 무조건적 공개 허용을 단정하지 않는다.** 국립국어원은 공개 신청 절차 확인이 필수다.

### 5.2 공개 정책과 데이터 선정의 경계

**2026-11-24 정책 확정:** 프로젝트 코드·Tokenizer는 Apache 2.0을 채택하고, **가중치도 Apache 2.0 공개를 목표**로 한다. 모델을 EU 사용자로 제한하지 않으며 누구나 개인·연구·상업 목적으로 다운로드, 수정, 재배포할 수 있도록 설계한다. **원본 학습 데이터는 재배포하지 않는다.** 이는 원본 데이터 이용조건과 모델 가중치 배포권의 확인을 생략할 이유가 되지는 않는다.

**승인 기준:** ① AI 학습 가능 ② 상업적 활용 가능 ③ 가중치를 자유롭게 공개·재배포·수정·상업 활용하도록 라이선스 부여 가능 ④ 필요한 저작자 표시/NOTICE 준수 ⑤ 합성 데이터의 원천 모델 조건 충족 ⑥ 개인정보·원문 재현 위험 통제. 판정이 불명확하면 `NEEDS_REVIEW`로 남겨 실제 학습에서 제외한다.

**초기 후보 우선순위:** WanJuan-Korean(사전학습) → AI-Hub의 _개별 승인된_ 한국어 대화 자료(SFT) → Korean Writing Style/CarrotAI(생성원천 확인 후) → FineWeb2·위키백과·HPLT(보충). 모두의 말뭉치는 별도 공개 승인 확인 전 보류. KoSGD·KLUE는 우선 평가 목적이며 훈련셋에 섞지 않는다. 자세한 링크·작업 체크리스트는 [0.4 사전 준비 데이터셋](#04-%EC%82%AC%EC%A0%84-%EC%A4%80%EB%B9%84-%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%85%8B-%EB%AA%A9%EB%A1%9D-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EC%A0%84-%EC%8A%B9%EC%9D%B8%EC%9A%A9) 참조.

**Apache 2.0은 데이터셋의 개별 이용권을 덮어쓰지 않는다.** 원본 웹문서의 권리나 공개 모델 결과물의 이용권이 명시적이지 않으면 이용약관·법적 해석을 별도로 확인한다. 출시 전 최종 법무 검토 권장.

### 5.3 데이터 소스 등록표 (학습 전 필수)

각 데이터셋을 사용할 때 아래 열을 채운다.

ID

출처/버전·해시

언어/분야

라이선스·약관 URL

원본 재배포

학습 가능

가중치 공개 가능

문서 수/토큰 수

품질·PII 위험

승인

D001

WanJuan-Korean / 미확정

한국어 웹

CC BY 4.0 표기 + 원문 권리

검토

검토

검토

측정 전

웹 노이즈·PII

대기

D002

AI-Hub 특정 데이터 ID 미선정

한국어 대화

일반 정책 + 개별 조건

검토

검토

검토

측정 전

중복·시대 편향

대기

**승인 값:** `APPROVED / RESTRICTED / EXCLUDED / NEEDS_REVIEW`. `NEEDS_REVIEW`는 최종 공개 모델의 학습 입력으로 사용하지 않는다.

### 5.4 데이터 파이프라인

1.  **메타데이터 수집:** 문서 출처, 라이선스, 언어, 작성/수집 일시, 버전 해시를 기록한다. → 추후 책임 있는 공개와 재현에 필요.
2.  **샘플링:** 전체 다운로드 전에 다양한 출처의 샘플을 스트리밍하여 실제 품질·토큰 길이를 측정한다. → 저장공간과 시간을 절약.
3.  **정제:** HTML 잔재, 깨진 인코딩, 과도한 반복, 기계 번역 노이즈, 광고·스팸 제거. → 학습 효율 개선.
4.  **중복 제거:** 정확 중복 해시 + 근사 중복(예: MinHash) 탐지. → 특정 문장이 과도하게 학습되는 것을 방지.
5.  **민감정보 필터:** 전화번호, 계정, 주소, 이메일 등 PII 및 위험한 텍스트를 점검. → 유출 위험 감소.
6.  **학습·검증·평가 분리:** 원문/근사 중복이 분할 사이에 섞이지 않게 한다. 평가 문제·정답은 학습에서 제외. → 데이터 누수 방지.
7.  **토큰화·패킹:** 최종 Tokenizer 기준 토큰 수를 계측하고 짧은 문서들을 효율적으로 패킹. → GPU 활용도 향상.
8.  **재현 명세 보관:** 실제 원본을 공개할 수 없다면 다운로드·변환 스크립트와 해시·출처 목록만 공개한다. → 권리 준수와 재현 가능성 절충.

**영어·코딩 데이터 원칙:** 자연스럽게 포함된 다국어·코드를 강제로 모두 제거하지 않되, 코딩 전용 대규모 데이터를 별도 수집하거나 가중치를 부여하지 않는다. 최종 데이터 혼합비는 샘플 감사 후 결정한다.

**스트리밍 참고:** [Hugging Face Datasets Streaming](https://huggingface.co/docs/datasets/stream).

### 데이터 작업 체크리스트

*    데이터 후보 10개 내외와 각 원본 링크 작성
*    이용조건 원문·스크린샷/버전 보관, 공개 가중치의 권리 검토
*    1천~1만 문서 샘플 품질 감사 및 결측/중복/PII 비율 확인
*    저장 크기(GB) 대신 **Tokenizer 기준 토큰 수** 추정
*    출처별 train/validation/test 분할과 중복 차단
*    데이터 카드·정제 스크립트·해시·제외 사유 기록

* * *

6\. 내 PC로 학습하는 전략
-----------------

### 6.1 기준 장비

*   CPU: Ryzen 7 5700X3D
*   GPU: **AMD Radeon RX 9060 XT, VRAM 16GB**
*   시스템 RAM: 32GB
*   주 사용환경: Windows / PowerShell, 필요 시 WSL2 Linux

**검증 전제:** AMD 공식 ROCm 호환성 표에는 RX 9060 XT가 포함되지만, Windows에서는 전체 ROCm 스택이 지원되는 것이 아니며 환경과 PyTorch 버전별 지원 범위가 다르다. 또한 일부 RX 9060 XT 구성에서 LLM 작업 메모리 문제나 불안정성이 안내되어 있다. **실제 MiniMind 학습이 성공한다는 의미는 아니다.** ([Windows 지원](https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/compatibility/compatibilityrad/windows/windows_compatibility.html), [WSL 지원](https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/compatibility/compatibilityryz/wsl/wsl_compatibility.html), [제한사항](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-7.1/docs/limitations/limitationsrad.html))

### 6.2 환경 선택 순서

1.  Windows Native PyTorch+ROCm 지원 조합 확인(버전 고정) → 최소 텐서 연산·역전파 테스트.
2.  학습 코드를 실행해 CUDA 전용 연산/FlashAttention/xFormers/Triton 등 의존성을 찾아 대체 가능 여부 확인.
3.  불안정하거나 지원되지 않으면 **WSL2 ROCm** 지원 조합 시험. 필요하다면 네이티브 Linux를 별도 후보로 검토.
4.  정상 학습과 체크포인트 저장·복구·재개를 검증한 환경만 채택.

**주의:** PyTorch에서 AMD ROCm GPU를 호출할 때도 `torch.cuda` 인터페이스를 쓰는 경우가 있다. 코드 문자열에 `cuda`가 있다는 이유만으로 모두 NVIDIA 전용이라고 판단하지 말고 실제 연산자·패키지 지원을 검사한다.

### 6.3 GPU 사용 최적화, 우선순위대로 적용

우선순위

기술

목적

리스크·확인 항목

P0

혼합 정밀도 BF16/FP16

메모리 절약·처리속도 개선

연산 지원·수치 안정성 확인

P0

Sequence length와 microbatch 실험

VRAM 내 최대 처리량 도출

OOM, 품질·문맥 제한

P0

효율적인 데이터 패킹·prefetch

GPU 유휴시간 줄이기

패딩·문서 경계 처리

P0

체크포인트와 자동 재개

긴 학습의 복구 가능성

옵티마이저·RNG·데이터 위치까지 복원

P1

Gradient accumulation

작은 microbatch로 목표 유효 배치 구현

업데이트 빈도·속도 차이

P1

Activation checkpointing

계산량과 VRAM 교환

실제 느려지는 정도 측정

P1

효율적 attention 커널

긴 시퀀스 속도 개선

AMD 해당 조합 지원 확인

P2

Torch compile 등

속도 추가 개선

컴파일 비용과 호환성

참고: [PyTorch Activation Checkpointing](https://docs.pytorch.org/docs/stable/checkpoint.html). CPU offload는 성능 손실이 커질 수 있어 최후 수단으로 둔다. **VRAM 16GB를 항상 100% 채우는 것이 목표가 아니다.** OOM 없는 안정적 tokens/sec가 목표다.

### 6.4 벤치마크 장부

실험

모델/시퀀스

microbatch

정밀도

peak VRAM

tokens/sec

전력·온도

재개 성공

GPU-SMOKE-001

미측정

\-

\-

\-

\-

\-

\-

*   **처음 10M 토큰:** 학습 기능 확인용, 최종 성능 달성을 보장하지 않음.
*   **100M / 500M / 1B 토큰:** 후속 실험 _후보_이며 자동 집행 예산이 아님. 측정된 처리량, Loss, 품질 개선, 저장공간을 근거로 확대 여부 결정.
*   전력·시간·발열 로그를 유지하고 장시간 학습 전에 안정성 테스트와 디스크 여유공간을 확인한다.

* * *

7\. P0~P9 및 P6-FC 작업 로드맵
------------------------

각 단계는 **목적 → 이유 → 해야 할 업무 → 완료 조건 → 산출물** 순서로 읽는다. 미완료 항목이 있으면 다음 단계 대규모 실행을 보류한다.

### P0. 프로젝트 기준선·권리·재현성 구축

**목적:** 나중에 무엇을 학습했는지 설명하고 가중치를 합법적으로 공개할 수 있는 기반을 만든다. **이유:** 데이터 출처가 누락된 모델은 학습이 성공해도 공개 단계에서 막힐 수 있다.

*    MiniMind 저장소의 **commit SHA** 고정, 라이선스와 NOTICE 확인. ([원본 저장소](https://github.com/jingyaogong/minimind), [Apache-2.0 라이선스](https://github.com/jingyaogong/minimind/blob/master/LICENSE))
*    코드를 원본/수정 부분으로 구분하고 변경 로그 작성.
*    오픈소스 공개 범위, 데이터 원본 비공개 원칙, 개인정보·데이터 삭제 요청 대응 정책 작성.
*    재현성 요소(seed, 버전, config, 데이터 해시, 로그, 체크포인트 규칙) 표준화.
*    연구 질문·성공 기준·기준 실험을 `PROJECT_SPEC.md`에 기록.

**완료 조건:** 외부 사람이 코드 출처·학습 계획·데이터 승인 절차를 이해하고, 누구나 다운로드 가능한 가중치 공개 목표 및 EU 비필수 사용 원칙을 확인할 수 있음.  
**산출물:** `PROJECT_SPEC.md`, `DECISIONS.md`, `THIRD_PARTY_NOTICES.md`, `DATA_REGISTER.csv`.

### P1. AMD GPU 환경·MiniMind 원본 재현

**목적:** 수정 전에 원본이 실행되는지 검증. **이유:** 한국어 변경과 하드웨어 호환성 문제를 분리하기 위해.

*    Windows/WSL 지원 조합 기록, PyTorch ROCm 디바이스 인식 검사.
*    `forward → backward → optimizer step` 작은 텐서 테스트.
*    MiniMind 기본 Tokenizer 및 모델 학습 스크립트 분석.
*    100~1,000 step의 짧은 학습·추론 수행.
*    체크포인트 저장→프로세스 종료→동일 지점에서 재개 검증.
*    측정: peak VRAM, 평균 tokens/sec, GPU 사용률, Loss, 에러 로그.

**완료 조건:** 재실행 가능한 학습 로그와 체크포인트 확보.  
**산출물:** `ENVIRONMENT.md`, `GPU_BENCHMARK.csv`, 스모크 테스트 코드.

### P2. 평가 문제와 EU 기준 모델 고정

**목적:** 개선 여부를 숫자로 판별. **이유:** 평가 없이 학습하면 한국어가 좋아졌는지 알 수 없음.

*    한국어 짧은 문장 생성·문맥·높임법·요약·일상 질문 평가 제작(소량 수동 검수 포함).
*    공개 평가: [KLUE](https://github.com/KLUE-benchmark/KLUE), [KoBEST 자료목록](https://github.com/ko-nlp/Open-korean-corpora), [KMMLU](https://huggingface.co/datasets/HAERAE-HUB/KMMLU), KoBALT 등 적합성 검토.
*    작은 모델에 무리한 고난도 평가를 강제하지 않고 난이도별 분리.
*    EU 실제 업무 평가셋: 단일 명령, 복합 명령, 날짜·시간, 생략된 주어, 모호한 요청, JSON 형식, 거부·추가 확인.
*    기존 EU 기본 모델과 MiniMind 원본을 동일 평가셋·동일 규칙으로 측정.
*    평가 데이터와 학습 데이터를 해시/근사중복으로 분리; 공개 평가셋의 학습 유입 차단.

**완료 조건:** 고정된 평가 버전, 자동 채점 스크립트, 일부 수동 채점 기준 마련.  
**산출물:** `EVAL_SPEC.md`, `eval/` 스크립트, `baseline_results.json`.

### P3. 데이터 확보·검수·정제

**목적:** 제한된 토큰 예산에서 학습 가치가 높은 공개 문장을 선정. **이유:** 나쁜 데이터는 GPU 시간을 낭비하며 출력 위험을 키움.

*    데이터 승인표 완성 및 버전 해시 고정.
*    메타데이터 기반 샘플 다운로드/스트리밍.
*    출처·장르·언어 분포, PII·광고·중복률 측정.
*    허용된 데이터만 정제하고 비허용·불확실 데이터는 격리.
*    Train/Validation/Test 분리 및 벤치마크 유출 점검.
*    코퍼스 크기(문서, GB, 토큰), 최종 출처 비중과 제외 사유 기록.

**완료 조건:** 재생성 가능한 학습 데이터 목록과 정제 파이프라인 확보.  
**산출물:** `DATA_CARD.md`, `dataset_manifest.jsonl`, 정제 스크립트.

### P4. 한국어 Tokenizer 재설계

**목적:** 한국어 중심 데이터에 맞는 효율적인 토큰 단위 선택. **이유:** 어휘 과대설계는 작은 모델의 임베딩 비용을 키우고, 과소설계는 문장을 지나치게 잘게 나눌 수 있음.

*    기본 MiniMind Tokenizer의 한국어 효율 측정.
*    공개 데이터에서 편향을 제어한 Tokenizer 학습 전용 샘플 구축.
*    BPE/Unigram 등 기존 알고리즘으로 6,400(기준)/8,192/16,384/32,768 후보 학습.
*    한국어 구어체·띄어쓰기·존댓말·숫자·영어 혼용·오타 샘플 테스트.
*    tokens/문장, bytes/token, unknown/byte fallback, 임베딩 파라미터 비용 비교.
*    상위 후보의 간단한 모델 학습 성능까지 비교해 최종 확정.

**완료 조건:** 토큰 압축률뿐 아니라 학습 효율과 품질을 근거로 한 선택.  
**산출물:** `TOKENIZER_REPORT.md`, 최종 tokenizer 파일, 비교 스크립트.

### P5. 64M급 Base 모델 사전학습

**목적:** 처음부터 한국어 문장 패턴을 학습. **이유:** 사전학습이 모델 언어 능력의 출발점.

*    MiniMind-3 구조를 시작점으로 동일 파라미터 예산 안에서 설정 확정.
*    학습률, warmup, optimizer, context length, microbatch, accumulation, seed 기록.
*    데이터 패킹·검증 Loss·주기적 checkpoint·재개 구현.
*    10M 토큰 스모크 → 100M 이후는 성능·속도 근거로 확대 승인.
*    Loss 곡선, 검증 perplexity, 단계별 한국어 생성 예제 기록.
*    손실 발산·NaN·OOM·동일 문장 반복 발생 시 자동 중단.

**완료 조건:** 임의 초기 가중치에서 학습된 Base 모델과 재현 로그 확보.  
**산출물:** `base-model/`, `PRETRAIN_REPORT.md`, 실험 결과 표.

### P6. 한국어 대화 SFT

**목적:** 단순 다음 토큰 생성 모델을 질문에 응답하는 범용 챗봇으로 개선. **이유:** Base 모델의 언어 패턴 학습만으로는 좋은 비서 대화를 보장하지 않음.

*    공개·권리 확인된 한국어 지시/응답 데이터 선정.
*    대화 포맷(역할/시작/끝 토큰)을 tokenizer와 일치시킴.
*    데이터 정제, 반복 응답·거짓 정보·형식 오류 검수.
*    일반 대화·요약·정리·질의응답·부족한 정보 확인 예제 균형화.
*    SFT 전후 동일 평가로 품질 비교, 원래 언어 능력 퇴행 여부 점검.

**완료 조건:** 고정된 대화 평가에서 Base 대비 향상, 오류 사례 공개.  
**산출물:** `chat-model/`, `SFT_REPORT.md`, 데모 질의응답.

### P6-FC. Function Calling 학습·평가 (EU 필수 게이트)

**목적:** 자연어 요청을 적절한 도구 호출(함수명·인자)로 바꾸거나, 필요할 때는 **호출하지 않고 추가 질문**을 할 수 있는 능력 확보. **이유:** EU는 단순 챗봇이 아니라 메모·일정·알림 등 실제 업무를 수행하므로 JSON 유효성만으로는 안전하거나 올바른 기능 선택을 보장할 수 없음. 코딩 능력은 불필요하지만 구조화된 함수 호출 능력은 필수임.

**선행 조건:** 일반 한국어 SFT 모델 확보, EU 실제 도구 목록 및 인자 스키마 확정. 별도 거대 모델 재학습 없이 기존 모델에 별도의 기능 호출 SFT를 적용하고, 일반 대화 능력의 퇴행을 함께 확인한다.

*    EU Core의 실제 함수 목록, 함수 설명, 필수·선택 인자, 날짜/시간 기준, 사용 권한 및 실패 응답 형식 추출.
*    공개된 합법적 Tool/Function Calling 학습 데이터 후보 조사. 한국어 변환·합성 데이터는 생성 출처와 재배포 허용 범위 검토, 필요 시 소량의 자체 테스트 케이스만 제작.
*    **no-call(도구 호출 불필요), clarification(추가 질문), one-call(단일 호출), multi-call(복수 호출), tool-result(호출 결과 기반 후속 응답)** 시나리오를 구분.
*    실제 없는 함수 사용, 위험한 인자, 누락된 필수 인자, 날짜·시간 착오, 실행 결과 조작을 실패로 기록.
*    한국어 대화 데이터와 도구 호출 데이터를 혼합해 일반 대화 능력 퇴행 여부 비교.
*    원래의 모델에 대화 SFT만 적용한 기준선과 기능 호출 SFT 적용 모델을 동일한 평가셋으로 비교.
*    모델이 **도구 호출안을 출력할 뿐 직접 실행하지 않도록** 하고, EU Core에서 스키마 검증·사용자 확인·권한 검사·중복 실행 방지·작업 큐 스냅샷 정책 유지.
*    공개 전 학습·평가 데이터의 누출 여부와 도구 프롬프트 인젝션 사례 검사.

**정량 평가:** 함수 선택 정확도, 호출 필요성 판단(no-call precision/recall), 인자 정확도 및 스키마 준수율, 다중 호출 구성 성공률, 추가 확인 적절성, 결과 기반 답변 충실도, 존재하지 않는 함수 호출률, 기존 대화 품질 퇴행. 실사용 게이트 수치는 P2 기준선 측정 이후 결정하며, 특히 삭제·외부전송 등 영향 큰 작업에는 별도 권한 확인을 적용한다.

**완료 조건:** EU 실제 도구 스키마에 맞춘 평가셋 및 실패 사례를 갖추고, 기존 모델과의 비교 결과가 기록됨. **산출물:** `FUNCTION_CALLING_SPEC.md`, `TOOL_DATA_MANIFEST.md`, `FUNCTION_CALLING_EVAL.md`, Function Calling SFT 체크포인트.

### P7. EU 적용 평가 및 최소 통합 실험

**목적:** 한국어를 잘하는 것과 실제 비서 업무 수행 가능성을 구분. **이유:** 형식이 잘못된 JSON이나 틀린 날짜는 실제 앱에서 문제를 일으킬 수 있음.

*    기존 EU의 업무 계약/JSON 스키마와 입력·출력을 확인.
*    동일 업무를 기존 Gemma 모델과 신모델에 각각 입력.
*    P6-FC의 함수 호출 실험 결과를 EU 실제 Function/Tool 목록과 대조하고 단일·다중·호출 불필요·도구 실패 재시도 케이스를 평가.
*    단일 요청, 복합 요청, 모호함, 취소·수정, 날짜·상대시각, 오타, 문맥 참조를 평가.
*    정확 일치·슬롯 F1·JSON 유효율·스키마 준수율·추가 질문 성공율 측정.
*    모델 출력이 실제 실행을 직접 지시하지 않도록 EU Core의 검증·권한 확인 경계를 유지.
*    최초에는 **시뮬레이션/읽기 전용** 테스트로만 연결.

**완료 조건:** 기존 모델 대비 성능·응답 속도·실패 유형 비교 보고서, 통합/보류 결정.  
**산출물:** `EU_COMPAT_REPORT.md`, 평가용 adapter, 테스트 로그.

### P8. 개선 실험·규모 결정

**목적:** GPU 투입 대비 품질 개선 효과가 가장 큰 요인을 확인. **이유:** 모델을 무작정 키우는 것보다 데이터·Tokenizer·SFT를 개선하는 편이 효율적일 수 있음.

*    오류를 '한국어 표현/지식 부족/형식 오류/문맥 오류/추론 오류/데이터 오염'으로 분류.
*    데이터 비중 또는 품질 필터의 **단일 변수** 실험.
*    최종 Tokenizer 후보 비교 및 채택 근거 업데이트.
*    64M 한계가 확인된 경우에만 128M/256M 추가 실험 후보 검토.
*    개선분 대비 GPU 시간, VRAM, 전력 소비, 모바일 가능성 비교.
*    DPO·RL·MoE 등 복잡한 기법은 **명확한 병목과 기대효과가 생긴 후** 결정.

**완료 조건:** 다음 버전의 성능 개선이 우연이 아닌 재현 가능한 실험으로 설명됨.  
**산출물:** `ABLATION_REPORT.md`, 모델 버전 비교표.

### P9. 공개 릴리스와 Android 후속 과제

**목적:** 모델을 책임 있게 공개하고 다른 사람이 재현할 수 있게 함. **이유:** 가중치만 업로드한 파일은 완전한 공개 연구 산출물이 아님.

*    모든 사용 데이터에 대한 **가중치 공개 적합성** 검토 완료; 불명확한 데이터 포함 시 공개 보류 또는 해당 데이터 제외 후 재학습.
*    코드 Apache-2.0 의무(저작권·NOTICE·변경표시 등) 준수, 다른 의존성 라이선스 확인.
*    모델 가중치의 실제 배포 조건/라이선스 확정, 임의로 원본 코드 라이선스와 동일하다고 가정하지 않음.
*    Model Card: 사용 목적, 데이터 범주, 학습 설정, 평가 점수, 한계, 위험, 비권장 용도 작성.
*    Tokenizer/config/checkpoint 해시, 설치·추론 예제, 최소 GPU/CPU 요구사항 공개.
*    개인·민감 정보 유출, 학습 문장 과도 재현, 유해 출력, 평가 오염 검사.
*    GitHub에 코드, Hugging Face에 합법적으로 공개 가능한 가중치·모델 카드 공개.
*    **후속 작업:** ONNX/기타 Android 런타임 변환·양자화, 실제 EU 단말에서 메모리·지연·발열 측정.

**완료 조건:** 권리 검토와 기본 테스트를 통과한 재현 가능한 공개 릴리스.  
**산출물:** 공개 리포지터리, Model Card, 버전별 릴리스, 재현 가이드, Android 타당성 보고서.

* * *

8\. 측정 지표 및 EU 통합 기준
--------------------

**Function Calling은 코딩 능력이 아니라 EU 적용을 위한 구조화된 행동 선택 능력이다.** 실습 과정에서 채팅 전용 모델과 기능 호출 SFT 모델을 각각 보존하여 정확도와 대화 능력 퇴행을 함께 비교한다. 실행 권한은 언제나 EU Core가 가지며 모델의 텍스트 출력만으로 실제 작업을 허용하지 않는다.

### 8.1 범용 한국어 지표

지표

측정 방법

확인하려는 것

Validation Loss / Perplexity

고정 검증셋 토큰 평균, 동일 Tokenizer 조건의 실험 위주 비교

다음 토큰 예측 개선

한국어 문장 평가

문법·높임법·구어체·오타·문맥

한국어 자체의 자연스러움

대화 SFT 평가

고정 질문/답변 세트, 블라인드 평가

응답 적절성·일관성

요약/질의응답

짧은 원문과 사실 근거 비교

정보 누락·환각·충실도

공개 벤치마크

KLUE/KoBEST/KoBALT/KMMLU 중 모델 규모에 맞는 항목

외부 기준으로의 상대적 평가

Tokenizer가 다르면 cross-tokenizer Perplexity 값은 단순 비교하기 어렵다. 정규화한 bytes/character 단위 평가나 동일 태스크 정확도도 함께 기록한다.

### 8.2 EU 업무 지표

지표

예시

주의

의도 정확도

알림 vs 메모 vs 일정

다중 의도는 분리 평가

슬롯 추출 정확도

날짜·시간·제목·대상

상대 시간의 기준 날짜·시간대 고정

JSON 유효율/스키마 준수율

필수 필드·형식

파싱 성공과 의미 정답 구분

추가 확인 적절성

시간 빠진 예약 요청

질문 과다도 실패로 집계

잘못된 실행 제안율

없는 데이터를 지어냄

실제 앱 실행은 별도 검증

기능 호출 선택 정확도

존재하는 함수 중 정답 함수 선택

이름이 유사한 함수와 미등록 함수를 혼동하지 않는가

인자 정확도

시간·제목·대상·옵션

JSON 형식이 맞아도 값이 틀리면 실패

도구 호출 불필요 판단

일반 질문에는 함수 미호출

불필요·위험 호출 방지

다중 도구 호출·결과 반영

메모 조회 후 요약 등

도구 결과를 조작하거나 없는 성공을 주장하지 않는가

성능

응답 지연, 메모리, 배터리

PC와 Android 별도 측정

**출시 게이트:** EU 실사용 수준의 정량 점수는 기준 모델 결과를 본 후 정한다. 특히 일정 변경·삭제·외부 호출은 모델만의 판단으로 실행하지 않는다.

### 8.3 실험 기록 템플릿

    ## EXP-0001 — 한국어 Tokenizer 8K vs 16K
    - 가설:
    - 비교 대상 / 고정 변수:
    - 모델 파라미터 / 데이터 버전·해시 / Tokenizer 버전:
    - GPU 환경 / PyTorch·ROCm 버전:
    - 학습 토큰 수 / step / epoch / seed:
    - peak VRAM / tokens per second / 시간·전력:
    - validation loss / 한국어 품질 / EU 평가:
    - 실패·이상 현상:
    - 결론: 채택 / 보류 / 재검증
    - 관련 커밋 / 로그 / 체크포인트:

* * *

9\. 개발 저장소와 산출물 관리
------------------

    korean-minimind/
    ├─ README.md                    # 프로젝트 소개·작업 현황
    ├─ LICENSE / NOTICE             # 코드 및 제3자 고지
    ├─ AGENTS.md                    # AI 코딩 에이전트 작업 규칙
    ├─ configs/                     # 모델·데이터·학습 설정
    ├─ src/                         # 모델·학습·추론 코드
    ├─ scripts/                     # 데이터 다운로드·정제·평가·변환
    ├─ tests/                       # 단위/계약/재현성 테스트
    ├─ eval/                        # 고정 평가 항목과 채점 코드
    ├─ docs/
    │  ├─ PROJECT_SPEC.md
    │  ├─ RESEARCH_REGISTER.md
    │  ├─ DATA_REGISTER.csv
    │  ├─ DATA_CARD.md
    │  ├─ TOKENIZER_REPORT.md
    │  ├─ GPU_BENCHMARK.csv
    │  ├─ PRETRAIN_REPORT.md
    │  ├─ SFT_REPORT.md
    │  ├─ EU_COMPAT_REPORT.md
    │  ├─ ABLATION_REPORT.md
    │  ├─ DECISIONS.md
    │  └─ HANDOFF.md
    └─ artifacts/                   # 로컬 결과물(대형 체크포인트는 Git 제외)

**중요:** 원본 데이터, 토큰화된 문서, 개인 정보, 대형 체크포인트, API 키는 Git에 넣지 않는다. 공개 가능한 모델 파일은 최종 검수 후 Hugging Face 등에서 버전별 관리한다. Git LFS 또는 저장소의 적절한 대용량 파일 저장 방식을 사용한다.

* * *

10\. 리스크, 의사결정 및 중단 기준
----------------------

위험

영향

대응·게이트

데이터 사용·공개 권한 미확인

가중치 공개 불가

학습 전 소스 승인표, 필요 시 제외/재학습

AMD 학습 코드 호환성

학습 중단

P1 최소 역전파 및 재개 테스트 선행

16GB OOM / 과열

불안정·손실

microbatch·sequence 길이 조절, 경고 시 중지

64M 모델의 실사용 능력 부족

EU 대체 실패

L1~L3 목표와 연구성과 분리; 규모 확장 옵션

데이터 중복·평가 오염

허위 성능 향상

원문 해시·근사중복 검사, 평가셋 동결

SFT로 기본 언어 능력 퇴행

품질 악화

Base 대비 동일 평가, 이전 체크포인트 보존

긴 학습 재개 실패

컴퓨팅 자원 낭비

옵티마이저·RNG·샘플 순서까지 저장 확인

대화 출력에서 개인정보 재현

공개 모델 위험

PII 필터와 유출 테스트, 위험시 릴리스 보류

Android 런타임 미지원

온디바이스 적용 지연

별도 마일스톤, PC 결과부터 공개

### 지금 확정하지 않는 항목과 결정 시점

미확정 항목

언제 결정하나

판단 자료

모델 크기(64M/128M/256M)

P1·P5·P8

VRAM·tokens/sec·성능 추세

Tokenizer 어휘 수

P4

토큰 효율·파라미터 비용·모델 품질

데이터셋 비율

P3~P5

승인된 데이터 품질·언어 분포·Loss

총 학습 토큰 수

P1·P5

속도·비용·검증 손실 개선

SFT 데이터 조합

P6

라이선스·문체·대화 정확도

EU 채택 조건 수치

P2·P7

기존 모델의 베이스라인·오류 비용

Android 런타임

P9 이후

지원 연산·변환·실제 단말 테스트

모델 가중치 라이선스

릴리스 전

코드/데이터/제3자 권리 최종 검토

**중단 규칙:** 라이선스 불분명 데이터의 확대 학습, GPU에서 반복 OOM/NaN, Loss 정체에 비해 과도한 비용, 체크포인트 재개 실패, 평가셋 오염 발견 시 대규모 학습을 즉시 보류하고 원인을 해결한다.

* * *

11\. 참고자료와 링크
-------------

### A. 기본 모델 및 학습 프레임워크

1.  MiniMind 공식 저장소 — [https://github.com/jingyaogong/minimind](https://github.com/jingyaogong/minimind)
2.  MiniMind 영문 안내 — [https://github.com/jingyaogong/minimind/blob/master/README\_en.md](https://github.com/jingyaogong/minimind/blob/master/README_en.md)
3.  MiniMind 코드 라이선스 — [https://github.com/jingyaogong/minimind/blob/master/LICENSE](https://github.com/jingyaogong/minimind/blob/master/LICENSE)
4.  PyTorch Activation Checkpoint — [https://docs.pytorch.org/docs/stable/checkpoint.html](https://docs.pytorch.org/docs/stable/checkpoint.html)
5.  Hugging Face Datasets Streaming — [https://huggingface.co/docs/datasets/stream](https://huggingface.co/docs/datasets/stream)

### B. 한국어 LLM 연구 선례

6.  LG AI Research EXAONE 3.5 — [https://www.lgresearch.ai/data/upload/tech\_report/ko/Technical\_report\_EXAONE\_3.5.pdf](https://www.lgresearch.ai/data/upload/tech_report/ko/Technical_report_EXAONE_3.5.pdf)
7.  K-EXAONE 기술 보고서 — [https://arxiv.org/abs/2601.01739](https://arxiv.org/abs/2601.01739)
8.  K-EXAONE 공식 저장소 — [https://github.com/LG-AI-EXAONE/K-EXAONE](https://github.com/LG-AI-EXAONE/K-EXAONE)
9.  K-EXAONE 2.0 기술 보고서 — [https://arxiv.org/abs/2608.04505](https://arxiv.org/abs/2608.04505)
10.  NAVER HyperCLOVA X 기술 보고서 — [https://arxiv.org/abs/2404.01954](https://arxiv.org/abs/2404.01954)
11.  HyperCLOVA X THINK 기술 보고서 — [https://clova.ai/cdn/media/2025/06/HyperCLOVA\_X\_THINK\_Technical\_Report.pdf](https://clova.ai/cdn/media/2025/06/HyperCLOVA_X_THINK_Technical_Report.pdf)
12.  Polyglot-Ko 기술 보고서 — [https://arxiv.org/abs/2306.02254](https://arxiv.org/abs/2306.02254)
13.  Polyglot GitHub — [https://github.com/EleutherAI/polyglot](https://github.com/EleutherAI/polyglot)
14.  Upstage Solar Open 기술 보고서 — [https://arxiv.org/abs/2601.07022](https://arxiv.org/abs/2601.07022)

### C. 데이터·권리 안내

15.  FineWeb2 dataset card — [https://huggingface.co/datasets/HuggingFaceFW/fineweb-2](https://huggingface.co/datasets/HuggingFaceFW/fineweb-2)
16.  FineWeb2 Korean `kor_Hang` — [https://huggingface.co/datasets/HuggingFaceFW/fineweb-2/tree/main/data/kor\_Hang](https://huggingface.co/datasets/HuggingFaceFW/fineweb-2/tree/main/data/kor_Hang)
17.  모두의 말뭉치 — [https://kli.korean.go.kr/corpus](https://kli.korean.go.kr/corpus)
18.  국립국어원 FAQ — [https://kli.korean.go.kr/boards/faqList.do](https://kli.korean.go.kr/boards/faqList.do)
19.  AI-Hub — [https://www.aihub.or.kr/](https://www.aihub.or.kr/)
20.  AI-Hub 이용정책 — [https://aihub.or.kr/intrcn/guid/usagepolicy.do](https://aihub.or.kr/intrcn/guid/usagepolicy.do)
21.  AI-Hub FAQ — [https://www.aihub.or.kr/aihubnews/faq/list.do](https://www.aihub.or.kr/aihubnews/faq/list.do)
22.  한국어 위키백과 원본 덤프 — [https://dumps.wikimedia.org/kowiki/](https://dumps.wikimedia.org/kowiki/)
23.  Open Korean Instructions 목록 — [https://github.com/HeegyuKim/open-korean-instructions](https://github.com/HeegyuKim/open-korean-instructions)
24.  Open Korean Corpora 목록 — [https://github.com/ko-nlp/Open-korean-corpora](https://github.com/ko-nlp/Open-korean-corpora)
25.  WanJuan-Korean — [https://huggingface.co/datasets/opendatalab/WanJuan-Korean](https://huggingface.co/datasets/opendatalab/WanJuan-Korean)
26.  Korean Writing Style Instruct — [https://huggingface.co/datasets/coastral/korean-writing-style-instruct](https://huggingface.co/datasets/coastral/korean-writing-style-instruct)
27.  CarrotAI Korean Instruction — [https://huggingface.co/datasets/CarrotAI/ko-instruction-dataset](https://huggingface.co/datasets/CarrotAI/ko-instruction-dataset)
28.  HPLT 2.0 — [https://hplt-project.org/datasets/v2.0](https://hplt-project.org/datasets/v2.0)
29.  Keural Conversation — [https://huggingface.co/datasets/mkd-chanwoo/keural-conversation-ko](https://huggingface.co/datasets/mkd-chanwoo/keural-conversation-ko)
30.  KoSGD — [https://huggingface.co/datasets/AIWORKX/KoSGD](https://huggingface.co/datasets/AIWORKX/KoSGD)
31.  Apache License 2.0 원문 — [https://www.apache.org/licenses/LICENSE-2.0](https://www.apache.org/licenses/LICENSE-2.0)

### D. 평가·공개 실무

32.  KLUE — [https://github.com/KLUE-benchmark/KLUE](https://github.com/KLUE-benchmark/KLUE)
33.  KMMLU — [https://huggingface.co/datasets/HAERAE-HUB/KMMLU](https://huggingface.co/datasets/HAERAE-HUB/KMMLU)
34.  Hugging Face Model Cards — [https://huggingface.co/docs/hub/model-cards](https://huggingface.co/docs/hub/model-cards)
35.  Hugging Face Dataset Cards — [https://huggingface.co/docs/hub/datasets-cards](https://huggingface.co/docs/hub/datasets-cards)
36.  ROCm Windows 지원 — [https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/compatibility/compatibilityrad/windows/windows\_compatibility.html](https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/compatibility/compatibilityrad/windows/windows_compatibility.html)
37.  ROCm WSL 지원 — [https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/compatibility/compatibilityryz/wsl/wsl\_compatibility.html](https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/compatibility/compatibilityryz/wsl/wsl_compatibility.html)
38.  ROCm 제한사항 — [https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-7.1/docs/limitations/limitationsrad.html](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-7.1/docs/limitations/limitationsrad.html)
39.  llama.cpp Android 빌드 — [https://github.com/ggml-org/llama.cpp/blob/master/docs/android.md](https://github.com/ggml-org/llama.cpp/blob/master/docs/android.md)
40.  Hugging Face 모델 배포 — [https://huggingface.co/docs/hub/models-uploading](https://huggingface.co/docs/hub/models-uploading)

> **출처 활용 원칙:** 위 링크는 검토 출발점이지 모든 데이터의 모델 학습·가중치 배포 허가를 증명하는 법률 의견이 아니다. 소스별 실제 버전과 약관을 확인하고, 공개 모델에 반영하기 전에 출처표와 필요한 승인 여부를 확정한다.

* * *

바로 시작할 첫 번째 체크리스트
-----------------

*    준비: [0장 사전 준비물](#0-%EC%82%AC%EC%A0%84-%EC%A4%80%EB%B9%84%EB%AC%BC-%EA%B0%9C%EB%B0%9C%EC%9D%84-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90) 점검 및 데이터 후보 등록
*    P0: 저장소 생성 및 MiniMind 원본 commit 고정
*    P0: 코드/모델/데이터 공개 권리 구분표 작성
*    P1: RX 9060 XT에서 PyTorch GPU 역전파 시험
*    P1: MiniMind 학습 재현 및 체크포인트 재개 시험
*    P1: 모바일 GGUF/llama.cpp 경로 조기 검증
*    P2: 한국어 평가·EU 평가 데이터셋 고정
*    P3: 라이선스 검토된 공개 데이터 샘플 품질 측정
*    P4: 한국어 Tokenizer 후보 비교 시작

**최종 원칙:** _가장 큰 모델이 아니라, 학습 과정과 성능을 설명할 수 있고 실제로 유용하며 공개 조건을 충족하는 한국어 소형 LLM을 만든다._

(adsbygoogle = window.adsbygoogle || \[\]).push({}); if(window.observeAdsenseUnfilledState !== undefined){ observeAdsenseUnfilledState(); }

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 60 }

공유하기

게시글 관리

**EunmaStudio**

#### '[\[AI\]](/category/%5BAI%5D) > [모델](/category/%5BAI%5D/%EB%AA%A8%EB%8D%B8)' 카테고리의 다른 글

[논문 기반 검색 증강 언어 모델 OpenScholar](/34)  (4)

2024.11.30

[한국어 자연어 처리 언어 모델 Exaone 소개](/27)  (0)

2024.11.16
            