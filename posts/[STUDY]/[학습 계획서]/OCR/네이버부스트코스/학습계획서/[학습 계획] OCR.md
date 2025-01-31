
# [학습 계획] OCR

(adsbygoogle = window.adsbygoogle || \[\]).push({}); if(window.ObserveAdsenseUnfilledState !== undefined){ ObserveAdsenseUnfilledState(); }

**학습 계획서**
----------

**Optical Character Recognition(OCR)**

**주제:** OCR의 개념과 활용 이해하기

**대상:** 파이썬을 사용해 본 수준의 초보자

**강의자료**: [네이버 부스트코스](http://www.boostcourse.org/ai343)

 [수학 공식을 이해하는 딥러닝 모델 (OCR)

부스트코스 무료 강의

www.boostcourse.org](http://www.boostcourse.org/ai343)

![](https://blog.kakaocdn.net/dn/YBPu3/btsLxjlSUTj/xB1RVGnbkZmn6oDV0KLy50/img.png)

* * *

### **목표**

*   OCR의 핵심 개념 이해
*   이미지에서 텍스트를 추출하는 과정 이해
*   OCR 알고리즘을 구현하고 시각화할 수 있는 능력 갖추기
*   현실 세계에서 OCR이 어떻게 사용되는지 이해

* * *

### **1차시: OCR이란 무엇인가? (개념 이해)**

#### • **학습 목표:** OCR의 기본 개념과 필요성을 이해한다

• **학습 내용:**

*   OCR의 정의, 기본개념
*   이미지에서 텍스트를 추출하는 원리
*   Faster-RCNN과 SSD의 이해
*   Segmentation의 대표적인 모델인 U-Net과 Mask R-CNN
*   Detection과 Segmentation 기반의 Text Localization 모델

• **실습 확장:**

*   Python과 OpenCV를 활용한 이미지 전처리 실습  
    \- 간단한 이미지를 불러와 그레이스케일 변환, 이진화, 노이즈 제거 등의 전처리 과정을 수행합니다.
*   Pre-trained 모델을 활용한 텍스트 검출  
    \- 오픈소스 라이브러리인 Tesseract OCR을 설치하고, 간단한 이미지를 통해 텍스트를 추출해 봅니다.

* * *

### **2차시: Text Recongnition**

#### • **학습 목표:** 텍스트 인식의 기초 이해 및 다양한 모델을 학습한다.

• **학습 내용:**

*   CNN 기반 네트워크로 텍스트 인식 수행
*   CTC(Connectionist Temporal Classification)의 이해
*   Attention 메커니즘을 활용한 텍스트 인식 (Teacher Forcing)
*   ASTER 모델의 변형 및 코드 분석
*   CNN 기반 CSTR 모델과 Visual, Semantic 정보를 활용한 모델
*   SATRN 모델 이해 및 코드 리뷰
*   Detection과 Recognition의 End-to-End 수행 이해
*   Mask TextSpotter의 Pixel Voting 이해

• **실습 확장:**

*   간단한 CNN 모델 구현  
    \- Keras를 활용하여 숫자 이미지(MNIST 데이터셋)의 분류 모델을 구현하고 학습시켜 봅니다.
*   CTC 손실 함수 적용 실습  
    \- 파이썬으로 간단한 시퀀스 데이터를 생성하고, CTC 손실 함수를 적용하여 출력 시퀀스를 예측해 봅니다.
*   Pre-trained 모델 활용  
    \- 오픈소스 OCR 모델(예: CRNN)을 활용하여 이미지에서 텍스트를 인식해 보고, 결과를 분석합니다.

* * *

### **3차시: Evaluation Metrics**

#### • **학습 목표:** Detection과 Recognition의 성능 평가를 위한 다양한 지표를 이해한다.

• **학습 내용:**

*   Detection 성능 평가를 위한 지표 탐색 및 경험
*   Detection과 Recognition의 End-to-End 평가를 위한 대표적인 지표 분석
*   수식 인식을 위한 적절한 평가 지표 고민 및 프로젝트 계획 수립
*   성능을 개선을 위한 방법 탐색

• **실습 확장:**

*   모델 평가 지표 계산  
    \- 주어진 예측 결과와 실제 라벨을 비교하여 Precision, Recall, F1-Score 등을 계산해 봅니다.
*   Bounding Box 평가  
    \- Detection 결과의 IoU(Intersection over Union)를 계산하여 모델의 위치 정확도를 평가합니다.
*   End-to-End 평가 실습  
    \- 텍스트 검출 및 인식 결과를 종합하여 전체 시스템의 정확도를 평가하는 방법을 실습합니다.

* * *

### **4차시: OCR의 실제 활용 사례와 프로젝트**

#### • **학습 목표:** OCR의 실제 활용 사례를 이해하고 간단한 프로젝트를 진행한다.

• **학습 내용:**

*   예시 1) 문서 디지털화: 스캔한 문서에서 텍스트 추출
*   예시 2) 자동차 번호판 인식 시스템
*   예시 3) 스마트폰 앱에서의 OCR 활용
*   예시 4) 명함에서 정보 추출하기
*   확장 - OCR의 한계와 최신 연구 동향

* * *

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 38 }

공유하기

게시글 관리

**EunmaStudio**

#### '[\[STUDY\]](/category/%5BSTUDY%5D) > [\[학습 계획서\]](/category/%5BSTUDY%5D/%5B%ED%95%99%EC%8A%B5%20%EA%B3%84%ED%9A%8D%EC%84%9C%5D)' 카테고리의 다른 글

[\[학습 계획\] Github 기초부터 Master까지](/39)  (0)

2024.12.31

[\[학습 계획\] 푸리에 변환](/37)  (1)

2024.12.19
            