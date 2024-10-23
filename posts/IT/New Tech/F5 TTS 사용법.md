
# F5 TTS 사용법

#### _**TTS란?**_

Text To Speech의 줄임말이며 컴퓨터의 프로그램을 통해 사람의 목소리를 구현해 내는 것으로, 성우 없이도 단어와 문장의 음성을 쉽게 소리 내는 것이 특징인 기술.

일반적으로 TTS는 다음과 같은 과정을 거칩니다.

1\. 텍스트 전처리

*     텍스트를 받아 문장 구조와 발음 기호(phonemes)로 변환하는 과정. 이를 통해 기계가 텍스트를 음성 신호로 바꿀 수 있도록 함

2\. 음소변환

*   텍스트의 각 부분을 음소로 변환하여 해당 소리로 변환할 수 있도록 준비. 이 단계에서 문장 구조, 억양, 강세 등이 고려됨

3\. 음성합성 

*   음소를 실제 음성 신호로 합성하는 단계. 주로 다음 두 방식이 사용된다.

1.  파형 기반 합성 : 미리 녹음된 음성 조각을 조합하여 음성을 생성하는 방식
2.  신경망 기반 합성 : 딥러닝 모델을 사용하여 음성을 직접 생성. 대표적으로 WaveNet, Tacotron

4\. 후처리

생성된 음성을 자연스럽게 다듬고, 음질을 향상시키는 과정

#### _**그럼 F5 TTS는 어떤 점이 다른가?**_

1\. 비자기회귀형방식 

*   텍스트 입력을 일정 길이로 패딩 하여 음성을 한 번에 생성할 수 있음.
*   이전에 생성된 출력이 다음 출력을 결정하는 데 사용하는 기존 autoregressive 방식보다 속도면에서 큰 장점을 가짐.

2\. Flow Matching

*   기존의 음소 정렬이나 텍스트 인코더가 필요하지 않으면서도 음성 신호 사이의 일관성을 유지하면서도 보다 자연스러운 음성을 생성할 수 있도록 도움

3\. Sway Sampling

*   새로운 추론방식으로 샘플링전략을 도입하여 속도 및 성능을 모두 향상함

#### _**기존 모델 E2-TTS와의 차이점?**_

*   Flat-UNet 구조를 사용하여 수렴이 느리고 다양한 언어 간 전환에서 안정적이지 못한 부분을 개선.
*   제로샷 음성을 생성 - 사전 학습 없이도 자연스러운 음성 생성을 수행

#### _**F5 TTS의 학습 & 추론 과정**_

*   학습과정

1.  텍스트를 입력받음
2.  문자 시퀀스로 변환
3.  입력 음성의 길이에 맞추어 패딩
4.  ConvNeXt블록을 통한 정제
5.  텍스트와 음성 입력을 결합하여 학습

![](https://blog.kakaocdn.net/dn/dHGEAd/btsJ7AClxE4/SLFrvztKv6fSMx8WJ9bGTk/img.png)

*   추론과정

1.  Sway sampling을 활용하여 샘플링된 노이즈로부터 음성을 생성

![](https://blog.kakaocdn.net/dn/b6hIWQ/btsJ7BuuZw0/Up6uMKgZKxCVhhISq59oy0/img.png)

#### _**성능 테스트**_

*   LibriSpeech 및 LibriSpeech-PC 테스트 세트를 기반으로 다양한 TTS모델의 성능을 비교한 표.

![](https://blog.kakaocdn.net/dn/cdP84p/btsJ7bXgFdS/MsA3TN2VLiAazmXdvdlHIk/img.png)

각 항목에 대한 설명입니다.

### 1\. **모델 이름 (Model)**:

*   각 행에 모델 이름이 나열, 성능 비교에 사용된 모델. **VALL-E 2**, **Voicebox**, **NaturalSpeech 3**, **F5-TTS** 등 여러 모델을 비교

### 2\. **#Param.**:

*   모델의 파라미터 수. 모델이 얼마나 복잡하고 큰지에 대한 정보. 파라미터 수가 많을수록 일반적으로 더 복잡한 모델이지만, 반드시 성능이 더 좋은 것은 아님. 예를 들어, **Voicebox**는 330M 파라미터, **F5-TTS**는 336M 파라미터를 가짐.

### 3\. **#Data(hrs)**:

*   각 모델이 학습된 데이터의 총 시간(단위: 시간). 모델이 훈련된 데이터량이 많을수록 모델의 성능이 향상될 가능성이 있지만, 역시 데이터량이 많다고 무조건 성능이 좋은 것은 아님. 예를 들어, **F5-TTS**는 10만 시간(Multi. 언어)의 데이터를 사용.

### 4\. **WER (%) ↓ (Word Error Rate)**:

*   Word Error Rate는 모델이 생성한 음성의 정확성을 평가하는 지표로, 값이 낮을수록 더 정확한 음성을 생성한다는 의미. 표에서는 **WER 값이 낮을수록 좋음**. 예를 들어, \*\*F5-TTS (32 NFE)\*\*의 WER은 2.42로, 이는 비교적 좋은 성능.

### 5\. **SIM-o ↑ (Speaker Similarity)**:

*   **스피커 유사성**을 나타내는 지표로, 모델이 원본 음성과 얼마나 유사하게 음성을 생성하는지를 측정. 값이 높을수록 더 유사한 음성을 생성. 예를 들어, **VALL-E 2**는 0.643의 스피커 유사성을 보여주고 있음, \*\*F5-TTS (32 NFE)\*\*는 0.66의 유사성을 보임.

### 6\. **RTF ↓ (Real-Time Factor)**:

*   RTF는 모델의 추론 속도를 나타내는 지표. **값이 낮을수록** 모델이 음성을 더 빠르게 생성할 수 있음을 의미. 예를 들어, \*\*F5-TTS (32 NFE)\*\*는 **0.31**로 상당히 빠른 추론 속도를 보임.

*   Seed-TTS 테스트-zh를 통한 성능비교 그래프

![](https://blog.kakaocdn.net/dn/dXssAU/btsJ59eUNlj/dlwAVkOvWrc1r68wz9VR5K/img.png)

### 1\. 왼쪽 그래프: **WER(Word Error Rate)**

*   \*\*WER(%)\*\*는 음성 생성의 오류율. **값이 낮을수록 더 좋은 성능**을 의미.
*   학습 업데이트(k)가 증가할수록 모델의 WER의 변화를 표현한 그래프.
*   **F5-TTS**는 **E2-TTS**에 비해 훨씬 낮은 WER을 유지. 학습이 진행됨에 따라 더 나은 성능을 보임. 특히, **F5-TTS**는 800K 업데이트에서 \*\*WER 4.17%\*\*를 달성하는 반면, **E2-TTS**는 \*\*WER 9.63%\*\*로 훨씬 높은 오류율을 보임.
*   **F5-TTS+Conv2 Audio는** 다소 높은 WER을 보이며, 음성 정렬의 견고함이 낮아지지만, 약간의 스피커 유사성 향상을 보임.

### 2\. 오른쪽 그래프: **SIM-o(Speaker Similarity)**

*   **SIM-o**는 생성된 음성과 원본 음성 간의 유사성을 나타냄. **값이 높을수록 더 자연스럽고 유사한 음성을 생성**.
*   **F5-TTS**는 **SIM-o**에서 점진적인 성능 향상을 보여주며, 800K 업데이트에서 **0.54**의 스피커 유사성을 달성. 반면, **E2-TTS**는 동일한 업데이트에서 **0.53**으로 약간 낮은 성능을 보임.
*   **F5-TTS+Conv2 Audio는** 약간 더 높은 스피커 유사성 (**0.55**)을 제공하지만, WER 측면에서의 성능 저하를 대가로 함.

허깅페이스에서 테스트해보기
--------------

[허깅페이스 E2- F5 - TTS](https://huggingface.co/spaces/mrfakename/E2-F5-TTS)

 [F5-TTS - a Hugging Face Space by mrfakename

Running on Zero

huggingface.co](https://huggingface.co/spaces/mrfakename/E2-F5-TTS)

허깅페이스에 접속하면 다음과 같은 화면이 나옵니다.

![](https://blog.kakaocdn.net/dn/bDNPXy/btsJ7Nawn5i/4Qo50gqCKBJY6ypPYL1Pk1/img.png)

1\. 이 웹 UI에서는 두 가지 TTS모델을 지원합니다.

*   **F5-TTS**: Flow Matching 기법을 사용하여 자연스러운 음성을 생성하는 모델.
*   **E2-TTS**: Non-Autoregressive Zero-Shot TTS 모델로 빠르고 간편하게 음성을 생성.

2\. 아쉽게도 _**영어/중국어**_만 지원 가능합니다.

3\. 오디오 파일 준비:

*   **참고 오디오**를 사용할 경우, WAV 또는 MP3 형식으로 **15초 이하**로 잘라서 업로드.
*   참고 오디오가 너무 길면 음성 생성에 문제가 발생할 수 있음. 따라서 최대한 짧게 유지하는 것을 추천.
*   오디오 파일을 업로드한 후 **완전히 업로드**될 때까지 기다린 후에 음성 생성을 진행.

4\. 텍스트 입력:

*   음성을 생성할 **텍스트**를 입력.
*   텍스트를 제공하지 않으면, 업로드한 오디오가 있는 경우 **Whisper**라는 자동 음성 인식(ASR) 기술을 통해 텍스트가 자동으로 생성.
*   **15초 이하의 짧은 텍스트**가 더 좋은 결과를 얻을 수 있음.

5\. 음성 생성 시작:

*   모든 준비가 완료되면, **"Generate"** 버튼을 눌러 음성을 생성.

6\. 문제가 발생할 경우:

*   오디오 파일이 길거나 텍스트가 길면 결과가 좋지 않을 수 있음. 이 경우 텍스트를 짧게 하거나 오디오 파일을 15초 이하로 자르는 것을 권장.
*   모든 파일이 제대로 업로드되었는지 확인한 후 재시도.

#### _**깃허브에서 확인하기**_

_**[https://github.com/SWivid/F5-TTS](https://github.com/SWivid/F5-TTS)**_

 [GitHub - SWivid/F5-TTS: Official code for "F5-TTS: A Fairytaler that Fakes Fluent and Faithful Speech with Flow Matching"

Official code for "F5-TTS: A Fairytaler that Fakes Fluent and Faithful Speech with Flow Matching" - SWivid/F5-TTS

github.com](https://github.com/SWivid/F5-TTS)

*   저장소 복제

    git clone https://github.com/SWivid/F5-TTS.git
    cd F5-TTS

*   본인 버전의 CUDA 버전에 맞는 라이브러리 설치

    pip install torch==2.3.0+cu118 --extra-index-url https://download.pytorch.org/whl/cu118
    pip install torchaudio==2.3.0+cu118 --extra-index-url https://download.pytorch.org/whl/cu118

*   필수 패키지

    pip install -r requirements.txt

*   데이터셋 준비
    *   필요에 따라 자신만의 데이터셋 클래스를 model/dataset.py로 작성
    *   혹은 예제 데이터셋 준비

    python scripts/prepare_emilia.py
    python scripts/prepare_wenetspeech4tts.py

*   모델학습 설정 파일생성

    accelerate config

*   모델 학습 시작  
      
    

    accelerate launch train.py

*   추론
    *   Hugging Face에서 체크포인트를 다운로드하거나 inference-cli 및 gradio\_app을 통해 자동으로 다운
    *   추론 시 30초를 초과하지 않도록 입력 및 생성된 오디오 길이를 제한
    *   참고 오디오는 **15초 이하**로 사용
    *   대문자는 하나하나 발음되므로, 일반적인 단어는 소문자로 입력하는 것이 좋음
*   CLI 추론  
      
    

    python inference-cli.py \
    --model "F5-TTS" \
    --ref_audio "tests/ref_audio/test_en_1_ref_short.wav" \
    --ref_text "Some call me nature, others call me mother nature." \
    --gen_text "I don't really care what you call me. I've been a silent spectator, watching species evolve, empires rise and fall. But always remember, I am mighty and enduring. Respect me and I'll nurture you; ignore me and you shall face the consequences."

*   Gradio 앱
    *   웹 인터페이스를 통해 추론할 수 있는 GUI를 제공
    *   Hugging Face에서 체크포인트를 자동으로 불러옴
    *   원하는 경우 gradio\_app.py에서 로컬경호 지정 가능

    python gradio_app.py --port 7860 --host 0.0.0.0

*   (선택) Gradio 공유 링크 생성  
      
    

    python gradio_app.py --share

* * *

#### _**참고자료**_

공식 깃허브 : [https://github.com/SWivid/F5-TTS](https://github.com/SWivid/F5-TTS)

허깅페이스 : [https://huggingface.co/spaces/mrfakename/E2-F5-TTS](https://huggingface.co/spaces/mrfakename/E2-F5-TTS)

공식 arXiv : [https://arxiv.org/abs/2410.06885](https://arxiv.org/abs/2410.06885)

논문 : [F5-TTS: A Fairytaler that Fakes Fluent and Faithful Speech with Flow Matching](https://arxiv.org/pdf/2410.06885)

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 19 }

공유하기

게시글 관리

**EunmaStudio**

#### '[IT](/category/IT) > [New Tech](/category/IT/New%20Tech)' 카테고리의 다른 글

[멀티 에이전트 시스템- SWARM](/21)  (5)

2024.10.21

[Llama 3.2 모델 출시](/18)  (5)

2024.10.15
            