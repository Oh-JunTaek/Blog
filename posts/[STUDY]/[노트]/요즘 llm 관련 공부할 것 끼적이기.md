
# 요즘 llm 관련 공부할 것 끼적이기

(adsbygoogle = window.adsbygoogle || \[\]).push({}); if(window.observeAdsenseUnfilledState !== undefined){ observeAdsenseUnfilledState(); }

정리해야함

* * *

1\. 요즘 핫한 llm 논문들 분석하기 -> 딥식이와 s1 ([https://arxiv.org/pdf/2501.19393](https://arxiv.org/pdf/2501.19393))

2\. s1 깃허브 [https://github.com/simplescaling/s1](https://github.com/simplescaling/s1)

 [GitHub - simplescaling/s1: s1: Simple test-time scaling

s1: Simple test-time scaling. Contribute to simplescaling/s1 development by creating an account on GitHub.

github.com](https://github.com/simplescaling/s1)

3\. 킹갓 일민이 준 링크 자세히 확인하기 : [https://github.com/SafeAILab/EAGLE](https://github.com/SafeAILab/EAGLE)

 [GitHub - SafeAILab/EAGLE: Official Implementation of EAGLE-1 (ICML'24) and EAGLE-2 (EMNLP'24)

Official Implementation of EAGLE-1 (ICML'24) and EAGLE-2 (EMNLP'24) - SafeAILab/EAGLE

github.com](https://github.com/SafeAILab/EAGLE)

![](https://blog.kakaocdn.net/dna/AJIb1/btsMdIZRkae/AAAAAAAAAAAAAAAAAAAAAL7CCUUZe4NHh55i59Bx_MM-taWwnjpUHCEdzyh-oWwc/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1774969199&allow_ip=&allow_referer=&signature=tjKe5CdBIv78cTksN3crUCzQNEo%3D)

**🚀 1. vLLM (Very Fast Inference)**
------------------------------------

📌 **LLM 추론을 빠르게 돌리는 툴**

### **✅ vLLM이 필요한 이유**

기본적인 transformers 라이브러리는 속도가 느려서 **최대 2~3배 빠르게 실행할 수 있도록 최적화된 라이브러리**가 필요해.  
vLLM은 **PagedAttention**이라는 기술을 사용해서 **VRAM을 절약하면서도 빠르게 모델을 실행**할 수 있어.

🔥 **장점**

*   **다중 요청(batch) 처리 최적화** → 여러 개의 요청을 빠르게 실행 가능
*   **효율적인 VRAM 관리** → 메모리 부족한 환경에서도 사용 가능
*   **GPT-4, LLaMA 등 거의 모든 모델 지원**

💡 **사용 추천 시점:**

*   LLaMA 3.2 1B로 빠른 인퍼런스를 돌리고 싶을 때
*   여러 개의 요청을 한 번에 실행해야 할 때 (예: API 서버 운영)

* * *

**🚀 2. TensorRT-LLM (NVIDIA GPU 최적화)**
---------------------------------------

📌 **NVIDIA GPU를 활용한 LLM 가속기**

### **✅ TensorRT-LLM이 필요한 이유**

*   NVIDIA의 **TensorRT**는 **GPU에서 LLM을 빠르게 실행**할 수 있도록 최적화된 라이브러리야.
*   기본적인 PyTorch 모델보다 **최대 4배 이상 빠르게 실행 가능**.

🔥 **장점**

*   **NVIDIA GPU 최적화 → VRAM 효율적으로 사용**
*   **빠른 속도로 인퍼런스 가능 (PyTorch보다 2~4배 빠름)**
*   **실제 프로덕션 환경에서 많이 사용됨**

💡 **사용 추천 시점:**

*   **RTX 3090, 4090, A100, H100 같은 NVIDIA GPU가 있다면 강추**! 🚀
*   딥러닝 추론 속도를 극대화하고 싶을 때

* * *

**🚀 3. SGLang (Inference + Fine-Tuning)**
------------------------------------------

📌 **SFT, LoRA 적용 가능한 LLM 최적화 툴**

### **✅ SGLang이 필요한 이유**

*   **vLLM은 주로 빠른 추론에 초점**, **SGLang은 추론 + 학습(SFT, LoRA) 최적화까지 지원**!
*   적은 VRAM에서도 SFT(미세 조정)가 가능
*   vLLM보다 더 **다양한 파인튜닝 옵션 제공**

🔥 **장점**

*   **빠른 LLM 추론 + SFT 지원**
*   **최신 LLaMA 3, Mistral, Falcon 등 지원**
*   **VRAM 최적화 → 24GB VRAM에서도 SFT 가능**

💡 **사용 추천 시점:**

*   **LLaMA 3.2 1B 모델을 SFT하고 싶을 때**
*   **LoRA 같은 가벼운 파인튜닝을 적용할 때**
*   **인퍼런스 + 파인튜닝을 하나의 프레임워크에서 해결하고 싶을 때**

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 52 }

공유하기

게시글 관리

**EunmaStudio**

#### '[\[STUDY\]](/category/%5BSTUDY%5D) > [\[노트\]](/category/%5BSTUDY%5D/%5B%EB%85%B8%ED%8A%B8%5D)' 카테고리의 다른 글

[신경망에 대해서 공부하다가 든 아이디어 정리](/57)  (0)

2025.02.25

[깃 커밋 규칙](/33)  (0)

2024.11.29
            