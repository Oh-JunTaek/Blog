
# TII-SSRC-23 데이터셋 논문 요약

참고한 논문 : [https://arxiv.org/pdf/2310.10661](https://arxiv.org/pdf/2310.10661)

프로젝트 계획서 : [https://eunmastudio.tistory.com/44](https://eunmastudio.tistory.com/44)

 [프로젝트 초안

프로젝트 계획서프로젝트 명: Smart Data Pipeline & Intelligent Recommendation System (임시)1. 프로젝트 개요1.1. 배경 및 필요성데이터 중심 시대: 다양한 소스에서 발생하는 데이터를 효과적으로 수집, 정제,

eunmastudio.tistory.com](https://eunmastudio.tistory.com/44)

깃허브 : [https://github.com/EunmaCorp/SDP](https://github.com/EunmaCorp/SDP)

논문 전문 : [https://eunmastudio.tistory.com/48](https://eunmastudio.tistory.com/48)

* * *

**TII-SSRC-23 데이터셋 논문 요약**
--------------------------

### **1\. 연구 배경 및 필요성**

*   **네트워크 침입 탐지 시스템(IDS)의 성능**은 주로 머신러닝 기반이며, 학습 데이터셋의 품질에 크게 의존함.
*   기존 IDS 데이터셋들은 **다양한 악성 트래픽을 포함하지 못하고**, 현대 네트워크 환경을 충분히 반영하지 못하는 한계가 있음.
*   특히, **IoT(사물인터넷) 및 클라우드 환경**에서 발생하는 새로운 유형의 공격이 기존 데이터셋에 반영되지 않아 IDS 모델의 성능이 저하될 가능성이 큼.

### **2\. TII-SSRC-23 데이터셋 소개**

*   **27.5GB 규모의 대형 IDS 데이터셋**으로, **정상(Benign) 및 악성(Malicious) 트래픽**을 포함.
*   **8개 주요 트래픽 유형**과 **32개 하위 트래픽 유형**으로 구성되어 다양한 네트워크 공격을 반영함.
*   **PCAP 파일(원본 네트워크 트래픽) 및 CSV 파일(추출된 특징 데이터) 제공**
*   연구자들이 **머신러닝 및 비지도 학습(Anomaly Detection) 기반 IDS 모델을 훈련하고 성능을 평가하는 데 활용 가능**

* * *

### **3\. 데이터 생성 방법 및 네트워크 환경**

*   데이터 수집을 위해 **5개의 노드(2대의 노트북 + 3대의 임베디드 장치)를 포함하는 실험 환경**을 구축.
*   **다양한 정상 및 악성 트래픽을 시뮬레이션하여 데이터셋 생성**

#### **✅ 정상 트래픽(Benign Traffic) 생성**

*   **오디오/텍스트 트래픽**: VoIP 및 메시징 서비스(Mumble) 활용
*   **백그라운드 트래픽**: DNS, FTP, SSH 등 일반적인 네트워크 활동 포함
*   **비디오 스트리밍 트래픽**: VLC(Video LAN Client)를 사용해 HTTP, RTP, UDP 기반 영상 스트리밍 수행

#### **✅ 악성 트래픽(Malicious Traffic) 생성**

*   **DoS 공격**: TCP SYN Flood, HTTP DoS, UDP Flood 등 12가지 유형
*   **브루트포스 공격**: FTP, SSH, Telnet 인증을 대상으로 크리덴셜 공격 수행
*   **정보 수집 공격**: Nmap 및 Hping3 도구를 사용해 포트 스캔, OS 탐지 등 수행
*   **Mirai 봇넷 공격**: IoT 기기를 대상으로 한 DDoS 공격, 봇넷 활동 포함

* * *

### **4\. 특징 추출 및 중요도 분석 (Feature Extraction & Importance Analysis)**

*   **네트워크 패킷 데이터를 분석하여 75개의 특징(feature) 추출** (CICFlowMeter 도구 활용)
*   **송신/수신 패킷 크기, 초당 데이터 전송량, TCP 윈도우 크기 등의 요소가 IDS 탐지에 중요한 특징으로 확인됨**

#### **✅ 주요 특징 5가지**

특징 (Feature)설명

**FWD Max Packet Length**

송신 방향 최대 패킷 크기

**BWD Initial Window Byte Size**

수신 방향 초기 윈도우 크기

**Flow Byte Rate**

초당 흐름 바이트 수

**FWD Initial Window Byte Size**

송신 방향 초기 윈도우 크기

**FWD Min Segment Size**

송신 방향 최소 세그먼트 크기

*   **FWD Initial Window Byte Size**가 모든 실험에서 가장 중요한 특징으로 나타남 → IDS 모델에서 중요하게 고려해야 할 요소임.

* * *

### **5\. IDS 탐지 성능 평가 및 기준 성능(Baseline Performance)**

**✅ 지도 학습(Supervised Learning) 기반 탐지 실험**

*   랜덤 포레스트, XGBoost, SVM, MLP 등을 사용하여 IDS 탐지 성능 평가
*   **XGBoost, 익스트라 트리(ET) 모델이 가장 우수한 성능을 보임**
*   다중 클래스 분류(트래픽 유형 8개 분류)에서 F1 Score = **97.31% (XGBoost)**

모델정확도(Accuracy)F1 ScoreAUROC

XGBoost

99.99

**97.31**

99.80

랜덤 포레스트

99.98

97.28

99.53

익스트라 트리

99.98

96.71

99.49

**✅ 비지도 학습(Unsupervised Learning) 기반 탐지 실험**

*   정상 트래픽만 학습한 후, 이상 탐지 기법(Anomaly Detection) 적용
*   **Deep SVDD 모델이 가장 높은 탐지 성능을 기록 (AUROC = 97.84, F1 Score = 99.76)**
*   Isolation Forest, KDE 모델은 상대적으로 낮은 성능을 보임

* * *

### **6\. 결론 및 향후 연구 방향**

**TII-SSRC-23 데이터셋은 다양한 IDS 연구에 활용될 수 있는 강력한 데이터셋**이며, IDS 모델의 일반화 성능을 높이는 데 기여할 수 있음.

**향후 연구 방향:**

1.  **정상 트래픽 데이터 다양성 확대**
    *   기존 IDS 데이터셋(KDD99, CICIDS2017 등)과 병합하여 실전 네트워크 환경 반영
2.  **IDS 모델의 실전 배포 및 성능 검증**
    *   클라우드 및 엣지 컴퓨팅 환경에서 IDS 모델 테스트
3.  **LLM(대형 언어 모델) 기반 IDS 탐지 연구**
    *   GPT 등 LLM을 활용한 네트워크 이상 탐지 연구 진행
4.  **IDS 탐지 모델의 설명 가능성(Explainability) 연구**
    *   SHAP, LIME 기법을 활용하여 IDS 모델의 의사결정 과정 해석

* * *

### **7\. 최종 정리**

*   **TII-SSRC-23 데이터셋은 최신 IDS 연구를 지원하는 강력한 데이터셋으로, 다양한 정상 및 악성 트래픽을 포함**
*   **XGBoost, 익스트라 트리 모델이 지도 학습에서 높은 성능을 보였으며, Deep SVDD가 비지도 학습에서 우수한 결과를 기록**
*   **향후 연구는 IoT, 클라우드 환경 확장 및 LLM 기반 IDS 탐지 모델 개발 방향으로 진행될 수 있음**

(adsbygoogle = window.adsbygoogle || \[\]).push({}); if(window.observeAdsenseUnfilledState !== undefined){ observeAdsenseUnfilledState(); }

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 49 }

공유하기

게시글 관리

**EunmaStudio**

#### '[\[STUDY\]](/category/%5BSTUDY%5D) > [\[논문\]](/category/%5BSTUDY%5D/%5B%EB%85%BC%EB%AC%B8%5D)' 카테고리의 다른 글

[TII-SSRC-23 데이터셋 논문 전문 번역](/48)  (0)

2025.02.08
            