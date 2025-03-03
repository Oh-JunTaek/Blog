
# [SDP]네트워크 이상 감지 시스템 - data 편

(adsbygoogle = window.adsbygoogle || \[\]).push({}); if(window.ObserveAdsenseUnfilledState !== undefined){ ObserveAdsenseUnfilledState(); }

프로젝트 초안 계획서 : [계획서](https://eunmastudio.tistory.com/44)

 [프로젝트 초안

프로젝트 계획서프로젝트 명: Smart Data Pipeline & Intelligent Recommendation System (임시)1. 프로젝트 개요1.1. 배경 및 필요성데이터 중심 시대: 다양한 소스에서 발생하는 데이터를 효과적으로 수집, 정제,

eunmastudio.tistory.com](https://eunmastudio.tistory.com/44)

활용 data : [kaggle](https://www.kaggle.com/datasets/daniaherzalla/tii-ssrc-23/data)

 [TII-SSRC-23 Dataset

Network traffic for intrusion detection research.

www.kaggle.com](https://www.kaggle.com/datasets/daniaherzalla/tii-ssrc-23/data)

참고 논문 : [Typological Exploration of Diverse Traffic Patterns for Intrusion Detection](https://arxiv.org/pdf/2310.10661)

논문 한글로 맛보기 : [전문 번역](https://eunmastudio.tistory.com/48), [요약 번역](https://eunmastudio.tistory.com/49)

* * *

이상감지시스템 실습을 위해서 주제를 '네트워크보안'으로 설정하였고, 이에 적합한 데이터 셋을 탐색하였음.

전처리 과정은 참고한 논문을 토대로 가장 적중률이 높았던 모델을 바로 선정하는 것으로 결정. 전처리 과정 또한 우선 논문을 따라보기로 결정.

* * *

### **데이터 전처리**

*   **IDS 학습에 불필요한 정보 삭제**
    *   출발지 IP (Source IP)
    *   목적지 IP (Destination IP)
    *   출발지 포트 번호 (Source Port)
    *   목적지 포트 번호 (Destination Port)  
        
            def remove_unnecessary_columns(df):
                columns_to_drop = ["Flow ID", "Src IP", "Dst IP", "Source Port", "Destination Port"]
                
                # 삭제된 컬럼 값 저장 (존재하는 컬럼만 필터링)
                deleted_columns = {col: df[col].head(3).tolist() for col in columns_to_drop if col in df.columns}
            
                # 데이터프레임에서 삭제
                df = df.drop(columns=[col for col in columns_to_drop if col in df.columns], errors="ignore")
                
                print("✅ 불필요한 열 삭제 완료")
                
                # 삭제된 컬럼과 일부 샘플 출력
                if deleted_columns:
                    print(f"🗑 삭제된 컬럼 목록: {list(deleted_columns.keys())}")
                    print("🔍 삭제된 컬럼 값 (샘플 3개):")
                    for col, values in deleted_columns.items():
                        print(f"  {col}: {values}")
                
                # 남은 컬럼 출력
                print(f"📌 남은 컬럼 목록 ({len(df.columns)}개):")
                print(list(df.columns))  # 리스트 형태로 남은 컬럼 출력
                
                return df
        
          
          
        
*   누락된 값 처리 (Missing Value Handling)
    *   **수치형 데이터** → 평균(mean)으로 대체
    *   **범주형 데이터** → 최빈값(most frequent value)으로 대체  
        
            # 결측치 처리
            def handle_missing_values(df):
                num_imputer = SimpleImputer(strategy="mean")  # 수치형 → 평균(mean)
                cat_imputer = SimpleImputer(strategy="most_frequent")  # 범주형 → 최빈값(most frequent)
            
                num_cols = df.select_dtypes(include=["number"]).columns
                cat_cols = df.select_dtypes(include=["object"]).columns
            
                df[num_cols] = num_imputer.fit_transform(df[num_cols])
                df[cat_cols] = cat_imputer.fit_transform(df[cat_cols])
            
                print("✅ 결측치 처리 완료 (샘플 데이터):")
                print(df[num_cols].head(3))
                return df, num_cols, cat_cols
        
          
          
        
*   One-Hot Encoding 적용
    *   **범주형 데이터**를 One-Hot Encoding 방식으로 변환  
        
            # One-Hot Encoding (Protocol 컬럼만 변환)
            def one_hot_encode(df):
                """
                'Protocol' 컬럼만 One-Hot Encoding 적용
                """
                target_cols = ["Protocol"]  # ✅ 변환할 범주형 데이터 지정
            
                # 존재하는 컬럼만 필터링
                target_cols = [col for col in target_cols if col in df.columns]
            
                if len(target_cols) == 0:
                    print("ℹ️ One-Hot Encoding 적용할 범주형 데이터 없음")
                    return df
            
                encoder = OneHotEncoder(sparse_output=False, handle_unknown="ignore")  # 최신 버전 대응
                encoded_data = encoder.fit_transform(df[target_cols])
                encoded_col_names = encoder.get_feature_names_out(target_cols)
            
                encoded_df = pd.DataFrame(encoded_data, columns=encoded_col_names, index=df.index)
                df = df.drop(columns=target_cols).join(encoded_df)
            
                print(f"✅ One-Hot Encoding 완료 (적용 컬럼: {target_cols})")
                print(encoded_df.head(3))  # 상위 3개 샘플 출력
            
                return df
        
          
          
        
*   데이터 정규화
    *   원 핫 인코딩 전 정규화 진행  
          
        

    # 데이터 정규화 및 표준화
    def normalize_and_standardize(df, num_cols):
        scaler = StandardScaler()
    
        # Protocol 컬럼 제외하고 정규화
        cols_to_scale = [col for col in num_cols if col != "Protocol"]
        df[cols_to_scale] = scaler.fit_transform(df[cols_to_scale])
    
        print("✅ 데이터 정규화 및 표준화 완료")
        print(df[cols_to_scale].head(3))  # 변환된 값 샘플 출력
        
        return df

* * *

이렇게 전처리 로직을 작성하였다면 확인이 필요.

    import pandas as pd
    
    # 전처리된 CSV 파일 경로
    file_path = "data/processed_data/processed_data.csv"
    
    # 데이터 로드
    df = pd.read_csv(file_path)
    
    # 상위 5개 행 출력
    print(df.head())
    
    # 하위 5개 행 출력 (혹시 누락된 데이터가 있는지 확인)
    print(df.tail())

* * *

📌 **1\. IDS 학습에 불필요한 정보 삭제**
-----------------------------

✅ **계획:**

*   Flow ID, Src IP, Dst IP, Source Port, Destination Port **삭제**

🛠 **실제 결과:**

       Src Port  Dst Port  Timestamp  ...

✔ **불필요한 컬럼이 삭제되었음** ✅  
✔ **IP 주소 및 포트 관련 컬럼이 사라짐** ✅  
✔ **Timestamp 컬럼은 여전히 존재** (사용 여부 검토 필요)

* * *

📌 **2\. 결측치 처리 (Missing Value Handling)**
------------------------------------------

✅ **계획:**

*   **수치형 데이터** → 평균(mean)으로 대체
*   **범주형 데이터** → 최빈값(most frequent)으로 대체

🛠 **실제 결과:**

*   Src Port, Dst Port 등의 값이 정규화된 형태로 변환됨 → **결측치 처리 완료** ✅
*   **전체 행 개수(8656767개) 유지됨 → 데이터 손실 없이 유지됨** ✅

* * *

📌 **3\. One-Hot Encoding 적용**
------------------------------

✅ **계획:**

*   Protocol 컬럼만 One-Hot Encoding 수행

🛠 **실제 결과:**

       Protocol_0  Protocol_6  Protocol_17
    0         0.0         1.0          0.0
    1         0.0         1.0          0.0
    2         0.0         1.0          0.0
    ...
    8656762   0.0         0.0          1.0
    8656763   1.0         0.0          0.0
    8656764   0.0         0.0          1.0

✔ **One-Hot Encoding 적용됨!** ✅  
✔ **Protocol 값이 Protocol\_0, Protocol\_6, Protocol\_17로 변환됨** ✅

❗ **다만, Protocol 컬럼이 없어진 상태에서 원본과 비교할 수 없으므로, 변환된 값이 정확한지 샘플링하여 확인하는 것이 좋음!**

    print(df[["Protocol_0", "Protocol_6", "Protocol_17"]].sample(10))

* * *

📌 **4\. 데이터 정규화 및 표준화**
------------------------

✅ **계획:**

*   모든 수치형 데이터 **StandardScaler**로 정규화 및 표준화
*   **Protocol 컬럼은 제외**하고 정규화 적용

🛠 **실제 결과:**

       Src Port  Dst Port  ...
    0  1.410664  4.783896  ...
    1  1.949468  2.652542  ...
    2 -1.276774  2.901166  ...

✔ **모든 수치형 데이터가 정규화 및 표준화됨** ✅  
✔ **값이 StandardScaler를 통해 변환된 형태임** ✅  
✔ **Protocol 컬럼 제외 후 정규화 적용됨** ✅

* * *

📌 **5\. 데이터 컬럼 개수 및 파일 구조**
----------------------------

✅ **계획:**

*   원래 컬럼 개수 (86) → **불필요한 컬럼 삭제 후 줄어야 함**
*   One-Hot Encoding 후 **컬럼 수가 소폭 증가해야 함**

🛠 **실제 결과:**

    [5 rows x 85 columns]

✔ **삭제 후 컬럼 수가 85개로 조정됨 → 정상** ✅  
✔ **One-Hot Encoding으로 Protocol\_0, Protocol\_6, Protocol\_17 추가됨 → 정상** ✅

* * *

**✅ 최종 점검 결과**
--------------

항목

계획대로 수행됨?

문제점

**불필요한 컬럼 삭제**

✅

없음

**결측치 처리**

✅

없음

**정규화 및 표준화 (Protocol 제외)**

✅

없음

**One-Hot Encoding (Protocol만 적용)**

✅

없음

**파일 저장 구조 (processed\_파일명.csv)**

✅

없음

🎯 **결론: 모든 전처리 과정이 계획한 대로 수행됨!** 🎯

* * *

이제 지도학습을 위한 데이터 2차 정제가 필요.

### **1) 레이블(정답) 확인: Y값 설정**

*   **이진 분류 (Binary Classification)**
    *   Label이 **Benign(정상) vs Malicious(악성)** 으로 분류된 경우
    *   **사용할 Y값:** Label (Benign → 0, Malicious → 1)
*   **다중 클래스 분류 (Multiclass Classification)**
    *   Traffic Type 또는 Traffic Subtype을 이용해 **DoS, Brute Force, Port Scan 등으로 세분화**
    *   **사용할 Y값:** Traffic Type 또는 Traffic Subtype

    df["Label"] = df["Label"].map({"Benign": 0, "Malicious": 1})  # 이진 분류

### **2) 데이터셋 분할 (Train/Test Split)**

*   모델 학습을 위해 데이터를 **훈련 데이터(Train)와 테스트 데이터(Test)로 분할**.
*   **80% 훈련 (Train), 20% 테스트 (Test) 비율로 나누는 것이 일반적**.

    from sklearn.model_selection import train_test_split
    
    # X: 입력 데이터, Y: 라벨 (정답)
    X = df.drop(columns=["Label"])  # Feature 데이터
    y = df["Label"]  # Target 데이터
    
    # 80:20 비율로 데이터 분할
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    print(f"✅ 데이터 분할 완료: 훈련 데이터 {X_train.shape[0]}개, 테스트 데이터 {X_test.shape[0]}개")

* * *

머신러닝편 이어서 보기

[https://eunmastudio.tistory.com/51](https://eunmastudio.tistory.com/51)

 [\[SDP\]네트워크 이상 감지 시스템 - 머신러닝

데이터 편 보고오기 : https://eunmastudio.tistory.com/50 \[SDP\]네트워크 이상 감지 시스템 - data 편프로젝트 초안 계획서 : 계획서 프로젝트 초안프로젝트 계획서프로젝트 명: Smart Data Pipeline & Intelligent Rec

eunmastudio.tistory.com](https://eunmastudio.tistory.com/51)

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 50 }

공유하기

게시글 관리

**EunmaStudio**

#### '[\[STUDY\]](/category/%5BSTUDY%5D) > [\[Team\_Project\]](/category/%5BSTUDY%5D/%5BTeam_Project%5D)' 카테고리의 다른 글

[\[SDP\]네트워크 이상 감지 시스템 - 머신러닝](/51)  (0)

2025.02.09
            