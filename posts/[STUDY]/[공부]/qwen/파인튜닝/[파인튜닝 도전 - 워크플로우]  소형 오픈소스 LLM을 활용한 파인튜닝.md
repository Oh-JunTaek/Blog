
# [파인튜닝 도전 - 워크플로우]  소형 오픈소스 LLM을 활용한 파인튜닝

### 파인튜닝 

> Qwen2.5-1.5B를 4bit+LoRA로 한국어 교과 데이터에 SFT 해보기 (Unsloth/TRL 실습)

### 구성

1\. 프로젝트 개요

*   **목표**: 오픈소스 소형 LLM(Qwen1.5B)을 한국어 데이터셋으로 파인튜닝하여 자연스러운 한국어 응답 성능 확인
*   **이유**
    *   20B 이상 모델은 VRAM/자원 요구치가 높아 개인 실습에 적합하지 않음
    *   1~3B 소형 모델은 Colab/개인 GPU에서도 시도 가능
*   **출력물**
    *   학습 코드 (Colab / VSCode 환경)
    *   학습 로그 및 그래프
    *   샘플 질의응답 결과
    *   실험 후기 및 한계점 분석

* * *

2\. 환경 준비

*   **필수 라이브러리**
    *   transformers, datasets, peft(LoRA/QLoRA), accelerate, bitsandbytes
*   **환경 선택**
    *   Colab Pro (T4 / A100 권장)
    *   로컬 GPU (예: RTX 3060, 12GB 이상)
*   **실습 팁**
    *   QLoRA로 4bit/8bit 양자화 → VRAM 절약
    *   학습 로그는 wandb나 tensorboard로 기록하면 블로그에 시각화 가능

* * *

3\. 데이터셋 준비

*   **데이터셋 선정**
    *   maywell/korean\_textbooks 데이터셋 ([https://huggingface.co/datasets/maywell/korean\_textbooks](https://huggingface.co/datasets/maywell/korean_textbooks))
*   **전처리 과정**
    *   JSON → HF Dataset 형태 변환
    *   입력/출력 텍스트 구조화:
        *   Input: "질문: 서울의 수도는 어디인가?"
        *   Output: "정답: 서울은 대한민국의 수도입니다."
    *   토큰 수 제한 (4096 이내)
*   **체크포인트**
    *   데이터 샘플 3~5개 블로그에 그대로 소개 (before/after 포맷 변환)

* * *

4\. 모델 로드 & 어댑터 준비

*   **기본 모델**
    *   Qwen/Qwen1.5-1.8B
*   **양자화**
    *   bitsandbytes 활용 4bit 로드
*   **어댑터**
    *   peft.LoraConfig 정의
    *   rank, alpha, dropout 값 설명 및 선택 근거 기록
*   **코드 스니펫**
    *   모델 로드, 양자화, LoRA 적용 부분 캡쳐하여 블로그 삽입

* * *

5\. 학습 설정

*   **하이퍼파라미터**
    *   학습률 (learning\_rate=2e-4)
    *   batch size (per\_device\_train\_batch\_size=4)
    *   epoch (2~3회)
    *   max seq length (512 ~ 1024)
*   **콜백**
    *   eval\_steps마다 검증
    *   save\_steps마다 체크포인트 저장
*   **실습 포인트**
    *   작은 epoch으로 빠르게 결과 확인
    *   이후 점진적으로 늘려서 비교

* * *

6\. 학습 실행

*   **학습 루프 실행**
    *   Trainer or SFTTrainer 활용
*   **로그 기록**
    *   loss 곡선, validation 결과
*   **체크포인트 관리**
    *   가장 성능 좋은 checkpoint만 남기기

* * *

7\. 결과 평가

*   **테스트 데이터**
    *   학습에 쓰지 않은 샘플 10개
*   **평가 방법**
    *   사람이 직접 읽고 “자연스러운가/틀렸는가” 확인
    *   간단한 자동평가 지표 (BLEU, ROUGE) 계산
*   **출력 예시**
    *   질문: "대한민국의 수도는?"
    *   모델 답변: "대한민국의 수도는 서울입니다." 
    *   질문: "에펠탑이 위치한 도시는?"
    *   모델 답변: "에펠탑은 프랑스 파리에 위치해 있습니다." 

* * *

8\. 모델 저장 & 배포

*   **저장 방식**
    *   LoRA adapter만 저장 (수 MB~수백 MB)
    *   base 모델 + LoRA → 합쳐서 추론 가능
*   **배포**
    *   HuggingFace Hub 업로드
    *   로컬에서 추론 예제 코드 공유

* * *

9\. 기타

*   **참고 영상**
    *   [https://www.youtube.com/watch?v=F\_RpQ9OYHss&list=LL](https://www.youtube.com/watch?v=F_RpQ9OYHss&list=LL)

(adsbygoogle = window.adsbygoogle || \[\]).push({}); if(window.observeAdsenseUnfilledState !== undefined){ observeAdsenseUnfilledState(); }

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 58 }

공유하기

게시글 관리

**EunmaStudio**

#### '[\[STUDY\]](/category/%5BSTUDY%5D) > [\[공부\]](/category/%5BSTUDY%5D/%5B%EA%B3%B5%EB%B6%80%5D)' 카테고리의 다른 글

[\[파인튜닝\] Qwen 1.5B(4bit) LoRA로 파인튜닝](/59)  (2)

2025.08.19

[\[딥러닝의 모든것\] - 활성화 함수](/54)  (0)

2025.02.16

[\[딥러닝의 모든것\] - 딥러닝, 뉴런](/53)  (0)

2025.02.16
            