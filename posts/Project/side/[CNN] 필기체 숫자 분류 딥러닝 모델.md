
# [CNN] 필기체 숫자 분류 딥러닝 모델

(adsbygoogle = window.adsbygoogle || \[\]).push({}); if(window.ObserveAdsenseUnfilledState !== undefined){ ObserveAdsenseUnfilledState(); }

CNN 딥러닝을 활용한 간단한 사이드 프로젝트 - 필기체 숫자 분류
=====================================

*   CNN의 기초 다지기로 많이 선택하는 주제입니다.
*   간단한 코드들을 제공하고 추가 확장목표를 수립합니다.
*   [결과물 GITHUB](https://github.com/Oh-JunTaek/sideProject/tree/main/handdraw)에서 전체 코드 확인이 가능합니다.

1\. 프로젝트 개요
-----------

*   이 프로젝트는 MNIST 데이터셋을 활용하여 필기체 숫자를 분류하는 딥러닝 모델을 구현하는 것을 목표로 합니다. **CNN(Convolutional Neural Network)**을 기반으로 하는 이 모델은 이미지에서 중요한 특징을 자동으로 추출하고, 이를 바탕으로 숫자를 분류하는 역할을 합니다.
    
*   CNN은 이미지와 같은 2차원 데이터를 처리하는 데 특화된 딥러닝 모델입니다. 일반적인 신경망(ANN)과 달리, CNN은 이미지의 공간적인 패턴을 효과적으로 학습할 수 있습니다. 예를 들어, 필기체 숫자처럼 서로 다른 모양의 패턴을 가진 데이터를 학습할 때, CNN은 각 이미지의 국소적인 특징(모서리, 곡선 등)을 인식하고 이를 기반으로 분류 작업을 수행합니다.
    
*   이 프로젝트에서는 CNN의 강력한 이미지 인식 능력을 활용하여, 사용자가 그린 필기체 숫자를 학습된 모델로 분류하는 시스템을 구축합니다. GUI를 통해 사용자는 직접 숫자를 그릴 수 있으며, 모델은 그려진 숫자를 실시간으로 인식하여 결과를 출력합니다. 최종적으로는 모델의 분류 과정을 로그로 기록하고, 이를 기반으로 보고서를 생성하는 것이 목표입니다.
    
*   CNN을 활용한 필기체 인식은 이미지 처리 및 딥러닝의 기초를 다질 수 있는 주제입니다. 이 프로젝트를 통해 CNN의 작동 원리, 데이터 전처리, 모델 학습 과정을 경험할 수 있으며, 더 나아가 필기체 인식과 같은 실생활의 문제를 해결하는 방법을 배울 수 있습니다.
    
*   아주 기초적인 지식만 있거나 개발에 대한 이해도만 있으면 하루안에 가능한 간단한 프로젝트입니다.
    

2\. 프로젝트 목표
-----------

1.  **MNIST 데이터셋을 활용한 모델 학습**
    
    *   필기체 숫자를 학습할 수 있는 딥러닝 모델을 구현하고 학습시킵니다.
2.  **사용자 인터페이스 개발**
    
    *   사용자가 직접 필기체 숫자를 그릴 수 있는 GUI를 구현합니다.
3.  **입력 이미지 분류**
    
    *   사용자가 그린 이미지를 저장하고, 학습된 모델을 통해 숫자를 분류합니다.
4.  **분류 과정 로그 기록 및 분석**
    
    *   CNN을 통해 필기체 숫자를 분류하는 과정의 로그를 기록하고, LLM을 통해 이를 분석하여 보고서를 자동 생성합니다.
5.  **결과 보고서 작성**
    
    *   모델 구현, 학습, GUI 결과 및 분류 과정 로그를 분석한 내용을 보고서 형태로 설명하고, 결과 그림을 제시합니다.

3\. 세부 작업 내용
------------

### 3.1 데이터셋: MNIST 사용

*   MNIST 데이터셋을 활용하여 필기체 숫자 (0-9)를 학습합니다.
    
        import tensorflow as tf
        # MNIST 데이터셋 불러오기
        (train_images, train_labels), (test_images, test_labels) = tf.keras.datasets.mnist.load_data()
    
*   데이터 전처리 과정을 포함하여 딥러닝 모델이 효과적으로 학습할 수 있도록 준비합니다.
    
        # 데이터 전처리 (정규화)
        train_images = train_images.reshape((60000, 28, 28, 1)).astype('float32') / 255
        test_images = test_images.reshape((10000, 28, 28, 1)).astype('float32') / 255
    

### 3.2 학습된 모델을 통해 필기체 분류 코드 작성

*   **모델 구현**  
    딥러닝 모델 (예: CNN)을 설계하고, MNIST 데이터셋을 학습할 수 있도록 구현합니다.
    
        # CNN 모델 설계
        model = models.Sequential([
            layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.Flatten(),
            layers.Dense(64, activation='relu'),
            layers.Dense(10, activation='softmax')
        ])
    
*   **모델 학습**  
    학습 프로세스를 설정하여 모델을 훈련시킵니다. 학습 중에는 정확도 및 손실 값 등을 모니터링하여 최적의 모델을 얻습니다.
    
        # 모델 컴파일
        model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
        
        # 모델 학습
        model.fit(train_images, train_labels, epochs=5, batch_size=64, validation_data=(test_images, test_labels))
        
        # 학습된 모델 저장
        model.save('handwritten_digit_classifier.keras')
    

### 3.3 필기체를 그릴 수 있는 GUI 구현

*   사용자가 직접 마우스를 사용하여 숫자를 그릴 수 있는 GUI를 `Tkinter`를 통해 구현합니다.
    
*   그려진 이미지를 PIL을 사용하여 저장하고, 학습된 모델을 사용하여 해당 숫자를 분류합니다.
    
        import tkinter as tk
        from PIL import Image, ImageDraw
        
          def __init__(self, root):
              self.root = root
              self.root.title("Handwritten Digit Drawer")
        
              # Canvas 설정
              self.canvas = tk.Canvas(self.root, width=280, height=280, bg="white")
              self.canvas.pack()
        
              # PIL 이미지 생성
              self.image = Image.new("L", (280, 280), "white")
              self.draw = ImageDraw.Draw(self.image)
        
              # 마우스 이벤트 바인딩
              self.canvas.bind("<B1-Motion>", self.draw_digit)
              self.canvas.bind("<ButtonRelease-1>", self.reset)
        
              # 지우기 버튼
              self.clear_button = tk.Button(self.root, text="Clear", command=self.clear_canvas)
              self.clear_button.pack()
        
              # 예측 버튼
              self.predict_button = tk.Button(self.root, text="Predict", command=self.predict_digit)
              self.predict_button.pack()
        
              self.last_x, self.last_y = None, None
        
          def draw_digit(self, event):
              x, y = event.x, event.y
              if self.last_x and self.last_y:
                  self.canvas.create_line(self.last_x, self.last_y, x, y, fill="black", width=8)
                  self.draw.line([self.last_x, self.last_y, x, y], fill="black", width=8)
              self.last_x, self.last_y = x, y
        
          def reset(self, event):
              self.last_x, self.last_y = None, None
        
          def clear_canvas(self):
              self.canvas.delete("all")
              self.image = Image.new("L", (280, 280), "white")
              self.draw = ImageDraw.Draw(self.image)
    

### 3.4 입력한 이미지 저장 및 분류

*   사용자가 입력한 필기체 이미지를 저장하고, 이를 분류하는 코드를 작성합니다.
    
*   필기체 분류 결과를 사용자가 확인할 수 있도록 출력합니다.
    
          def predict_digit(self):
              # 이미지를 28x28로 리사이즈하고 모델에 입력
              img = self.image.resize((28, 28)).convert('L')
              img = np.array(img).reshape(1, 28, 28, 1) / 255.0
        
              # CNN 모델로 예측
              prediction = model.predict(img)
              digit = np.argmax(prediction)
        
              # 예측된 숫자 출력
              print(f"예측된 숫자는: {digit}")
    
    ![](https://blog.kakaocdn.net/dn/sHAxP/btsJ3n5Bz8p/FJIFqujbx2YCFyWlLPZkE1/img.png)
    
    ### 3.5 분류 과정 로그 기록 및 분석
    
*   CNN을 통해 분류한 결과와 과정을 로그로 기록합니다.
    
*   기록된 로그 데이터를 LLM을 사용하여 분석하고, 분석 결과를 기반으로 보고서를 자동 생성합니다.
    

### 3.6 보고서 작성

*   코드 설명 및 학습 과정, 결과 분석, 로그 데이터 분석 등을 보고서 형태로 정리합니다.
*   학습 결과와 GUI 사용 예시, 분류 로그 분석 결과를 시각적으로 제시하여 전체 프로젝트의 진행 상황을 설명합니다.

4\. 기대 결과 및 활용
--------------

*   이 프로젝트는 MNIST 데이터셋을 활용하여 딥러닝 모델을 학습시키는 과정과, 사용자가 직접 그린 숫자를 모델로 분류하는 경험을 제공합니다.
*   GUI를 통한 사용자 인터페이스를 구현하여, 학습된 모델이 실생활에서 어떻게 활용될 수 있는지 확인할 수 있습니다.
*   분류 과정의 로그를 LLM을 통해 분석함으로써, 프로젝트 결과를 더욱 명확하게 보고서로 정리할 수 있습니다.
*   프로젝트 결과물은 머신러닝/딥러닝 학습의 예제로 활용되거나, 필기체 인식 시스템 개발의 기초로 사용될 수 있습니다.

5\. 작업 일정
---------

작업 내용

예상 소요 시간

데이터셋 전처리 및 모델 구현

1hour

모델 학습 및 튜닝

1hour

GUI 개발

1hour

분류 과정 로그 기록 및 보고서 작성

1hour

**총 예상 소요 시간**

**1day**

6\. 참고 자료
---------

*   [MNIST Dataset](http://yann.lecun.com/exdb/mnist/)
*   [TensorFlow/Keras Documentation](https://www.tensorflow.org/learn)
*   [Tkinter Documentation](https://docs.python.org/3/library/tkinter.html)

추가 개선 방향
--------

### 기존 데이터의 변형

      # 기존 학습된 모델 불러오기
      model = tf.keras.models.load_model('./model/handwritten_digit_classifier.keras')
      # MNIST 데이터셋 불러오기
      (train_images, train_labels), (test_images, test_labels) = tf.keras.datasets.mnist.load_data()

*   데이터 증강을 위한 변형 설정
    
        # 데이터 증강을 위한 설정
        datagen = ImageDataGenerator(
            rotation_range=5,    # 회전 범위를 더 작게
            zoom_range=0.05,     # 확대/축소 범위 축소
            width_shift_range=0.05,  # 가로 이동 범위 축소
            height_shift_range=0.05  # 세로 이동 범위 축소
        )
    
*   특정 숫자에 과적합된 경우
    
        # 숫자 8의 빈도를 랜덤하게 10~20% 줄이기
        eight_indices = np.where(train_labels == 8)[0]
        reduce_count = int(len(eight_indices) * np.random.uniform(0.1, 0.2))  # 10%~20% 줄임
        remove_indices = np.random.choice(eight_indices, size=reduce_count, replace=False)
        
        # 8의 일부를 제거하여 새로운 데이터셋 생성
        train_images = np.delete(train_images, remove_indices, axis=0)
        train_labels = np.delete(train_labels, remove_indices, axis=0)
    
*   특정 숫자에 대한 데이터 증강
    
        # 0, 6, 9에 대해 강화된 데이터 증강 적용
        for idx in range(len(train_labels)):
            if train_labels[idx] in [0, 6, 9]:  # 0, 6, 9에 대해서만 증강
                train_images[idx] = datagen.random_transform(train_images[idx].reshape(28, 28, 1))
        # 데이터 증강을 통한 추가 학습
        train_generator = datagen.flow(train_images, train_labels, batch_size=64)
    

### LLM을 활용한 추가 작업

*   랭체인을 활용하여 연계작업 - ex\_분류 과정에서 잘못 예측된 데이터를 LLM으로 분석해 어떤 부분에서 실수가 있었는지 파악

이 외에도 다양한 방향으로 확장 및 활용이 가능합니다.
==============================

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 17 }

공유하기

게시글 관리

**EunmaStudio**
            