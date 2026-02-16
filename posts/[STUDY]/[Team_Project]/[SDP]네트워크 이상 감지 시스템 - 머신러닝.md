
# [SDP]네트워크 이상 감지 시스템 - 머신러닝

데이터 편 보고오기 : [https://eunmastudio.tistory.com/50](https://eunmastudio.tistory.com/50)

 [\[SDP\]네트워크 이상 감지 시스템 - data 편

프로젝트 초안 계획서 : 계획서 프로젝트 초안프로젝트 계획서프로젝트 명: Smart Data Pipeline & Intelligent Recommendation System (임시)1. 프로젝트 개요1.1. 배경 및 필요성데이터 중심 시대: 다양한 소스

eunmastudio.tistory.com](https://eunmastudio.tistory.com/50)

* * *

목차
--

### **머신러닝 모델 학습 과정 (랜덤 포레스트 vs XGBoost)**

### **Feature Importance 분석**

### **추가 확장 계획: 모델 개선 및 앙상블 기법 적용**

### **최종 결론 및 향후 과제**

* * *

**네트워크 이상 탐지: 머신러닝 모델 학습 과정**
-----------------------------

> **랜덤 포레스트 vs XGBoost, 최고의 모델은?**

### **머신러닝 모델 선정**

네트워크 이상 탐지는 **지도학습(Supervised Learning)** 기반으로 진행되며,  
다양한 알고리즘 중에서 **랜덤 포레스트(Random Forest)와 XGBoost**를 선정했다.

**선정 이유**  
✅ **랜덤 포레스트 (Random Forest)**:

*   다수의 결정 트리(Decision Tree) 기반 → **과적합 방지**
*   네트워크 데이터에서 **높은 성능을 발휘**
*   훈련 속도가 비교적 빠르고, 해석이 용이함

✅ **XGBoost (Extreme Gradient Boosting)**:

*   부스팅(Boosting) 기반 → **더 강력한 학습 능력**
*   GPU 가속 지원 → 대량의 네트워크 데이터에서도 빠른 훈련 가능
*   복잡한 패턴도 잘 잡아낼 수 있음

* * *

### **랜덤 포레스트(Random Forest) 학습 과정**

#### **모델 학습 준비**

훈련 데이터(train\_dataset.csv)와 검증 데이터(val\_dataset.csv)를 로드한 후,  
랜덤 포레스트 모델을 생성했다.

    from sklearn.ensemble import RandomForestClassifier
    
    # 랜덤 포레스트 모델 생성
    model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)

**주요 하이퍼파라미터**

*   n\_estimators=100: 100개의 결정 트리 사용
*   n\_jobs=-1: CPU 코어 모두 활용 (병렬 연산)
*   random\_state=42: 실험 재현성을 위한 고정된 난수

* * *

#### **모델 훈련 & 진행률 표시 (tqdm 적용)**

모델이 학습되는 진행 상황을 tqdm을 활용해 시각적으로 확인할 수 있도록 설정했다.

    from tqdm import tqdm
    
    # 모델 학습
    print("랜덤 포레스트 모델 학습 시작...")
    for i in tqdm(range(100), desc="랜덤 포레스트 학습 진행"):
        model.fit(X_train, y_train)

**결과:**

*   **12분 14초** 소요
*   학습 진행률 **100% 달성  
    **

* * *

#### **모델 평가 (Accuracy & Confusion Matrix)**

    from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
    
    # 예측 수행
    y_pred = model.predict(X_val)
    
    # 정확도 출력
    acc = accuracy_score(y_val, y_pred)
    print(f"정확도(Accuracy): {acc:.4f}")

**결과 분석**

*   **정확도(Accuracy)**: 99.79%
*   **혼동 행렬(Confusion Matrix):**
    
*   **Precision, Recall, F1-score 모두 0.99 이상 → 매우 우수한 성능!**

    [[356670    578]
     [   462 129901]]

![](https://blog.kakaocdn.net/dna/Q4GZS/btsMa5V4p71/AAAAAAAAAAAAAAAAAAAAAH-ZiSKvpXhXj7jr4_K3RB9I0u7qKUXG16_gpSrRjA6P/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=7g1vaYxvvc3dS0XoS2pnUJisiAk%3D)

* * *

### **랜덤 포레스트 Feature Importance 분석  
**

![](https://blog.kakaocdn.net/dna/kYiYD/btsMcz9ijXT/AAAAAAAAAAAAAAAAAAAAAKBl7dkjWBfVgUaVhta5SutGiMBjic4tA9bQQzYrbRU0/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=JOpyBSR1uCZuicEte%2BQzIXU4RtI%3D)

**가장 중요한 5개 특성**

1.  **rst\_flag\_counts** (RST 플래그 발생 횟수)
2.  **payload\_bytes\_variance** (페이로드 바이트 크기 분산)
3.  **fwd\_packets\_IAT\_mean** (포워드 패킷 간 평균 간격)
4.  **bwd\_rst\_flag\_counts** (백워드 RST 플래그 발생 횟수)
5.  **payload\_bytes\_max** (최대 페이로드 바이트 크기)

**분석**

*   랜덤 포레스트는 TCP RST 플래그(연결 리셋)와 페이로드 크기를 핵심적으로 활용
*   RST 플래그는 네트워크 공격(포트 스캔, DDoS)과 밀접한 관련이 있음
*   페이로드 바이트 크기(Variance, Max)도 중요한 특징으로 반영됨
*   패킷의 간격(IAT mean)을 통해 공격 패턴을 탐지하는 경향

**결론**: **랜덤 포레스트는 TCP 연결 상태 및 패킷 크기 기반으로 이상 탐지 수행**

* * *

### **XGBoost 학습 과정 (GPU 활용)**

#### **XGBoost 모델 설정 (GPU 적용)**

XGBoost는 tree\_method="gpu\_hist" 옵션을 사용하여 GPU 가속을 활성화할 수 있다.

    from xgboost import XGBClassifier
    
    # XGBoost 모델 생성 (GPU 활용)
    model = XGBClassifier(
        n_estimators=300,
        learning_rate=0.1,
        max_depth=6,
        tree_method="hist",
        device="cuda",  # GPU 가속 적용
        random_state=42
    )

**주요 하이퍼파라미터**

*   n\_estimators=300: 300번 반복 학습
*   learning\_rate=0.1: 학습률 조정 (적절한 수렴 속도 유지)
*   max\_depth=6: 트리 깊이 설정 (과적합 방지)
*   device="cuda": GPU 가속 활성화

* * *

#### **학습 진행률 확인 (tqdm 적용)**

    from tqdm import tqdm
    
    # 학습 진행 시각화
    print("XGBoost 모델 학습 시작...")
    for i in tqdm(range(300), desc="XGBoost 학습 진행"):
        model.fit(X_train, y_train)

**결과:**

*   **17초** 소요 (랜덤 포레스트보다 **훨씬 빠름**)
*   GPU 가속 덕분에 **학습 시간이 획기적으로 단축됨**

* * *

#### **모델 평가**

    # 예측 수행
    y_pred = model.predict(X_val)
    
    # 정확도 출력
    acc = accuracy_score(y_val, y_pred)
    print(f"정확도(Accuracy): {acc:.4f}")

**결과 분석**

*   **정확도(Accuracy)**: 99.63%
*   **혼동 행렬(Confusion Matrix):**
    
*   **랜덤 포레스트보다 오차가 조금 더 높음**
*   **하지만 연산 속도는 훨씬 빠름!  
      
    **

    [[356461    787]
     [   993 129370]]

![](https://blog.kakaocdn.net/dna/bzQyPg/btsMcjMsD84/AAAAAAAAAAAAAAAAAAAAAB1JAGTz0UmNV_BiXu3rluYHlVxqiEzKuqfxj09lmPHO/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=jK8J78Vbr6r7ik%2BGxYdB2%2B72ym8%3D)

* * *

### **XGBoost Feature Importance 분석**

![](https://blog.kakaocdn.net/dna/dxFmJI/btsMcP5abou/AAAAAAAAAAAAAAAAAAAAAF59RFenu1_tzaJmLM7Om-vIRTVjizuCUgnNIclNhSCp/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=hV7Q1NpGvQgLbb2K91Ik9YhbWqE%3D)

**가장 중요한 5개 특성**

1.  **bwd\_init\_win\_bytes** (백워드 초기 윈도우 크기)
2.  **packets\_IAT\_mean** (패킷 간 평균 간격)
3.  **fwd\_packets\_IAT\_mean** (포워드 패킷 간 평균 간격)
4.  **fwd\_init\_win\_bytes** (포워드 초기 윈도우 크기)
5.  **duration** (트래픽 지속 시간)

**분석**

*   XGBoost는 패킷 흐름과 전송 패턴을 분석하는 경향이 강함
*   윈도우 크기(init\_win\_bytes)는 TCP 통신에서 연결 안정성을 나타내는 요소
*   패킷 간 평균 간격(IAT mean)을 통해 정상 트래픽과 비정상 트래픽을 구별하려 함
*   트래픽 지속 시간(duration)이 공격 여부 판단에 중요한 역할을 함

**결론**: **XGBoost는 트래픽 흐름과 시간 패턴을 분석하여 이상 탐지를 수행**

* * *

### **두 모델 성능 비교 (Random Forest vs XGBoost)**

![](https://blog.kakaocdn.net/dna/bKIrz4/btsMdrCRMx0/AAAAAAAAAAAAAAAAAAAAANrMv6autWhPZDVS27yEdEYkUS6nSBtg87dLFalsxRKU/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=XGjgcKVgwezgLrqDgZMmMUBxJvA%3D)

**결론:**

*   **랜덤 포레스트**는 **더 높은 정확도**를 제공하지만 유의미한 차이는 아님
*   **XGBoost**는 **훨씬 빠른 학습 속도**를 제공함

* * *

**추가 확장 계획: 모델 개선 및 앙상블 기법 적용**
-------------------------------

### **추가적으로 고려할 지도학습 모델**

**(1) LightGBM (Light Gradient Boosting Machine)**

*   XGBoost보다 **더 빠른 학습 속도**와 **적은 메모리 사용**
*   대용량 네트워크 데이터에서도 효과적
*   GPU 최적화 가능

**(2) SVM (Support Vector Machine)**

*   결정 경계를 명확히 설정하는 데 강점
*   이상 탐지(Anomaly Detection)에서 높은 정밀도 가능
*   하지만, 데이터 크기가 너무 크면 학습 속도가 느려질 수 있음

* * *

### **비지도 학습 기법 추가**

**(1) Autoencoder (자동 인코더)**

*   정상 트래픽 패턴을 학습 후, **재구성 오차(Reconstruction Error)** 기반 탐지
*   정상 데이터와의 차이를 이용해 **새로운 공격 유형**도 감지 가능

**(2) Isolation Forest (고립 포레스트)**

*   비지도 학습 기반 **이상 탐지 모델**
*   트리를 이용해 이상값을 쉽게 분리
*   기존의 랜덤 포레스트와 조합 가능

* * *

### **지도 + 비지도 학습의 앙상블 적용**

**방법 1: Soft Voting (소프트 투표)**

*   랜덤 포레스트, XGBoost, LightGBM 등 지도 학습 모델을 결합
*   각 모델의 예측 확률을 평균 내어 최종 예측 결정

**방법 2: Stacking (스태킹 앙상블)**

*   지도 학습(랜덤 포레스트, XGBoost)과 비지도 학습(Autoencoder, Isolation Forest)을 조합
*   각각의 모델 결과를 **메타 모델**에 입력하여 최종 예측 수행

**방법 3: Hybrid Approach (하이브리드 접근법)**

*   **비지도 학습(Autoencoder) → 지도 학습(XGBoost) 순서로 모델 적용**
*   비지도 학습으로 이상 탐지를 먼저 수행하고, 이를 새로운 피처로 추가하여 지도 학습 모델을 강화

* * *

**추가 목표 확장**

*   현재 모델을 기반으로 **비지도 학습 탐지 모델**을 추가 개발
*   지도 학습과 비지도 학습을 조합하여 **최적의 네트워크 이상 탐지 시스템 구축**
*   최종적으로 **하이브리드 앙상블 모델**을 통해 탐지 성능을 극대화

(adsbygoogle = window.adsbygoogle || \[\]).push({}); if(window.observeAdsenseUnfilledState !== undefined){ observeAdsenseUnfilledState(); }

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 51 }

공유하기

게시글 관리

**EunmaStudio**

#### '[\[STUDY\]](/category/%5BSTUDY%5D) > [\[Team\_Project\]](/category/%5BSTUDY%5D/%5BTeam_Project%5D)' 카테고리의 다른 글

[\[SDP\]네트워크 이상 감지 시스템 - data 편](/50)  (1)

2025.02.09
            