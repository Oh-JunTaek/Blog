
# [파인튜닝] Qwen 1.5B(4bit) LoRA로 파인튜닝

![](https://blog.kakaocdn.net/dna/mcCM5/btsPWoDmdrB/AAAAAAAAAAAAAAAAAAAAAHpHXWri2U5NZhZsRbpoJ7A1KLkWDp79iUehAV6xSEft/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=biCTmklKvwACaG4EqVCRPuNhqDE%3D)

들어가기 전에
-------

1.  코랩 무료플랜으로도 진행 가능(T4)
2.  계획 수립 단계 : [https://eunmastudio.tistory.com/58](https://eunmastudio.tistory.com/58)
3.  노트북 파일 공유 : [구글드라이브](https://drive.google.com/file/d/1IpaAfsSeQMD-4uRM8UXBwiYLX5vpXgZU/view?usp=sharing)
4.  결과물 공유 : [허깅페이스](https://huggingface.co/Eunma/korean-model)

 [Eunma/korean-model · Hugging Face

한국어 교육 자료 파인튜닝 모델 (Qwen2.5-1.5B + LoRA) 모델 소개 Qwen/Qwen2.5-1.5B-Instruct 를 기반으로 maywell/korean\_textbooks 데이터셋, 그리고 LoRA(저랭크 적응) 기법을 사용해 파인튜닝한 어댑터(LoRA 가중치

huggingface.co](https://huggingface.co/Eunma/korean-model)

 [\[파인튜닝 도전 - 워크플로우\] 소형 오픈소스 LLM을 활용한 파인튜닝

파인튜닝 Qwen2.5-1.5B를 4bit+LoRA로 한국어 교과 데이터에 SFT 해보기 (Unsloth/TRL 실습)구성1. 프로젝트 개요목표: 오픈소스 소형 LLM(Qwen1.5B)을 한국어 데이터셋으로 파인튜닝하여 자연스러운 한국어 응

eunmastudio.tistory.com](https://eunmastudio.tistory.com/58)

* * *

목차
--

1.  배경 & 목표 (TL;DR)
2.  환경 준비
3.  모델 로드(4bit, Unsloth)
4.  LoRA 장착
5.  데이터셋 준비
6.  학습 설정 & 실행
7.  메모리/시간 로그 
8.  Inference 추론
9.  저장 & Hugging Face 업로드

* * *

1) 배경 & 목표
----------

*   **베이스**: [Qwen/Qwen2.5-1.5B-Instruct](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct)
*   **데이터셋**: [maywell/korean\_textbooks](https://huggingface.co/datasets/maywell/korean_textbooks)
*   **방법**: 4bit 로드 + **LoRA**(r=8, α=16), **SFTTrainer**로 SFT
*   **목표**: 한국어 교육/설명형 응답 품질 개선, **허브 업로드**까지

 **추가 예정**: 최종 HF 리포 화면, 전/후 출력 비교

* * *

2) 환경 준비
--------

    pip install "transformers>=4.43" peft trl bitsandbytes accelerate unsloth

*   GPU: T4 16GB(권장), Python 3.10+

![](https://blog.kakaocdn.net/dna/NiTq5/btsPUhSR9Iv/AAAAAAAAAAAAAAAAAAAAAHLmww8rTljBOA15uvjjco2udMEig5FvlOJrW8YlV355/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=UlGeLdxZf2IqZNSpgrx%2F7eQOI2I%3D)

![](https://blog.kakaocdn.net/dna/sICQu/btsPVm66bJc/AAAAAAAAAAAAAAAAAAAAAB1PKjsf9x3yWyL1SAeVhRKSf3YeqRZELI-RqOhrSaRN/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=Bzn%2BHwMgJ4N23FESKnvcEbRgAZ8%3D)

 T4를 사용하여 진행한 모습

* * *

3) 모델 로드(4bit, Unsloth)
-----------------------

    from unsloth import FastLanguageModel
    import torch
    
    max_seq_length = 512   # 512부터 시작 권장
    dtype = None
    model_name = "Qwen/Qwen2.5-1.5B-Instruct"
    
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=model_name,
        dtype=dtype,
        max_seq_length=max_seq_length,
        load_in_4bit=True,
        full_finetuning=False,
    )
    
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    
    print("Loaded:", model_name,
          "| pad:", tokenizer.pad_token_id, "| eos:", tokenizer.eos_token_id)

*    저는 Qwen2.5-1.5B라는 소형 모델을 사용했습니다. 다른모델을 사용하시려면 모델명을 변경해주시면 됩니다. 
*   unsloth를 통해 Qwen2.5-1.5B-Instruct를 **4bit로 로딩, get\_peft\_model로 **LoRA 어댑터 장착****
    *   설치/코드 변경이 작고, 속도/메모리 체감 이득이 큼
    *   QLoRA 실습에 최적 (T4 16GB에서도 무난)
    *   HF/PEFT/TRL 생태계와 자연스럽게 연동

* * *

4) LoRA 장착
----------

    # === LoRA 어댑터 장착 (Qwen 1.5B) ===
    model = FastLanguageModel.get_peft_model(
        model,
        r=8,  
        target_modules=[
            "q_proj","k_proj","v_proj","o_proj",  
            "gate_proj","up_proj","down_proj",    
        ],  # LoRA 적용 모듈 목록
        lora_alpha=16,     
        lora_dropout=0,    
        bias="none",       
        use_gradient_checkpointing="unsloth",  
        random_state=3407, 
        use_rslora=False,  
        loftq_config=None, 
    )
    print("LoRA attached.")

*   **r**: 어댑터 차원(메모리/표현력 트레이드오프)
*   **alpha**: LoRA 스케일 계수(어댑터 출력 크기 조절)
*   **target\_modules**: Attention/MLP 핵심 모듈 (
    
    "q\_proj","k\_proj","v\_proj","o\_proj",  \# 어텐션 투영층
    
    "gate\_proj","up\_proj","down\_proj",    \# FFN 투영층
    

![](https://blog.kakaocdn.net/dna/bMyc7J/btsPXBIWk26/AAAAAAAAAAAAAAAAAAAAAD43ifIwEx87fVGZsEDetdZVDcUU41XHVuSSuBMPgWUd/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=lktLoqgwckZ7O2indlSlbc7fGuI%3D)

* * *

5) 데이터셋 준비
----------

    def formatting_prompts_func(examples):
        convos = examples["messages"]
        texts = [tokenizer.apply_chat_template(convo, tokenize = False, add_generation_prompt = False) for convo in convos]
        return { "text" : texts, }
    pass
    
    from datasets import load_dataset
    dataset = load_dataset("maywell/korean_textbooks", name="claude_evol", split="train")
    dataset

*   [maywell/korean\_textbooks](https://huggingface.co/datasets/maywell/korean_textbooks) 활용

    print(dataset[0]['text'])

*   데이터 셋 확인

    안녕하세요. 오늘의 강의에서는 2의 거듭제곱에 대해 이야기하고 이것이 컴퓨터, 과학 및 일상 생활에서 어떻게 사용되는지 알아보겠습니다.
    
    **2의 거듭제곱의 개념**
    
    2의 거듭제곱은 단순히 2의 지수 또는 반복 곱셈입니다. 예를 들어, 2의 3제곱은 2 x 2 x 2 = 8입니다. 2의 거듭제곱은 수학에서 매우 중요하며 컴퓨터 과학을 포함한 다양한 분야에서 광범위한 응용 프로그램을 가지고 있습니다.
    
    **컴퓨터 과학에서 2의 거듭제곱의 중요성**
    
    컴퓨터 과학에서 2의 거듭제곱은 저장 용량, 메모리 주소, 파일 크기 및 네트워크 주소를 포함한 여러 가지 목적으로 사용됩니다. 그 이유는 2진 시스템이 컴퓨터에서 사용되는 바이너리 시스템의 기반이기 때문입니다. 2진 시스템에서 모든 값은 0과 1의 두 개의 숫자를 사용하여 나타냅니다. 이것은 2의 거듭제곱을 사용하여 값을 표현하는 것을 매우 간단하게 만들며 이것이 컴퓨터에서 그토록 널리 사용되는 이유입니다.
    
    **과학적 계산에서 2의 거듭제곱 사용**
    
    과학적 계산에서 2의 거듭제곱은 종종 매우 큰 수 또는 매우 작은 수를 표현하는 데 사용됩니다. 예를 들어, 천문학자는 종종 빛의 속도와 같이 매우 큰 수를 측정할 때 2의 거듭제곱을 사용합니다. 물리학자들은 종종 원자와 같이 매우 작은 수를 측정할 때 2의 거듭제곱을 사용합니다.
    
    **일상 생활에서 2의 거듭제곱 사용**
    
    일상 생활에서 2의 거듭제곱은 연료 소모, 속도, 거리 및 돈과 같은 다양한 것을 측정하는 데 사용됩니다. 예를 들어, 자동차의 연료 소모는 종종 마일당 갤런(MPG) 단위로 측정됩니다. 갤런은 2의 거듭제곱으로 측정되므로 자동차의 연료 소모도 2의 거듭제곱으로 측정됩니다.
    
    **비트 연산자와 논리 연산자 사용법**
    
    비트 연산자는 비트 수준에서 두 개의 정수 값을 조작하는 연산자입니다. AND, OR, XOR, NOT와 같은 다양한 비트 연산자가 있습니다. 논리 연산자는 논리적 또는 불 논리 연산을 수행하는 연산자입니다. AND, OR, NOT와 같은 다양한 논리 연산자가 있습니다.
    
    **부호 있는 및 부호 없는 숫자 계산법**
    
    부호 있는 숫자 계산법은 음수와 양수를 모두 나타낼 수 있는 숫자 계산법입니다. 부호 없는 숫자 계산법은 양수만 나타낼 수 있는 숫자 계산법입니다. 2의 보수 계산법은 음수를 나타내는 방법 중 하나입니다.
    
    **2의 보수 사용법**
    
    2의 보수는 음수를 나타내는 방법 중 하나입니다. 2의 보수를 사용하면 뺄셈 연산을 덧셈 연산으로 바꿀 수 있습니다. 이것은 컴퓨터에서 뺄셈 연산을 구현하는 것을 훨씬 쉽게 만듭니다.
    
    **결론**
    
    2의 거듭제곱은 수학에서 매우 중요하며 컴퓨터 과학, 과학 및 일상 생활을 포함한 다양한 분야에서 광범위한 응용 프로그램을 가지고 있습니다. 이 강의에서는 2의 거듭제곱의 개념, 컴퓨터 과학에서의 중요성, 일상 생활에서의 사용에 대해 살펴보았습니다.
    
    이것이 오늘의 강의입니다. 질문이 있으시면 언제든지 문의하세요.

* * *

6) 학습 설정 & 실행
-------------

    from trl import SFTConfig, SFTTrainer
    trainer = SFTTrainer(
        model = model,
        tokenizer = tokenizer,
        train_dataset = dataset,
        args = SFTConfig(
            per_device_train_batch_size = 1,   # 장치당 배치 크기
            gradient_accumulation_steps = 4,   # 그래디언트 누적(유효 배치 = 1*4)
            warmup_steps = 5,                  # 워밍업 스텝 수
            # num_train_epochs = 1,            # 에폭 수(전체 데이터 반복)
            max_steps = 30,                    # 총 학습 스텝 수(데모 런)
            learning_rate = 2e-4,              # 초기 학습률
            logging_steps = 1,                 # 로깅 주기(스텝 단위)
            optim = "adamw_8bit",              # 8비트 옵티마이저(VRAM 절약)
            weight_decay = 0.01,               # 가중치 감쇠(정규화)
            lr_scheduler_type = "linear",      # 학습률 스케줄러 유형
            seed = 3407,                       # 시드(재현성)
            output_dir = "outputs",            # 출력 경로(체크포인트/로그)
            report_to = "none",                # 로깅 백엔드 비활성
            fp16 = True,                       # FP16 훈련(T4 권장)
            bf16 = False,                      # BF16 비사용(T4)
            gradient_checkpointing = True,     # 그래디언트 체크포인팅(메모리 절약)
            save_steps = 0,                    # 중간 저장 비활성(짧은 실험)
        ),
    )

*   T4이상 사용하신다면 fp16~save\_steps까지는 주석처리 하셔도 됩니다.

* * *

7) 메모리/시간 로그
------------

*   T4를 사용중이시라면 현재 메모리 상태를 확인

    gpu_stats = torch.cuda.get_device_properties(0)
    start_gpu_memory = round(torch.cuda.max_memory_reserved() / 1024 / 1024 / 1024, 3)
    max_memory = round(gpu_stats.total_memory / 1024 / 1024 / 1024, 3)
    print(f"GPU = {gpu_stats.name}. Max memory = {max_memory} GB.")
    print(f"{start_gpu_memory} GB of memory reserved.")

![](https://blog.kakaocdn.net/dna/n96fQ/btsPYOufbgq/AAAAAAAAAAAAAAAAAAAAAOvTc1vRPgUTbOgegr1Zwk4bDT7CGHkJqg3TBNKHzThB/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=Xe4tRg%2FASVNCzmSeFqDUYVT%2BNu8%3D)

*   그리고 train 진행

    trainer_stats = trainer.train()

![](https://blog.kakaocdn.net/dna/NIncU/btsPVbYKlmc/AAAAAAAAAAAAAAAAAAAAAJy6Tq-Xa2OXc517AAZWTXSZ_5J-T4zTlmhnCM95TfHA/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=7JN76XySXvMAqATo%2FLAkmUdhAVw%3D)

*   최종 메모리 및 시간 통계 확인

    used_memory = round(torch.cuda.max_memory_reserved() / 1024 / 1024 / 1024, 3)
    used_memory_for_lora = round(used_memory - start_gpu_memory, 3)
    used_percentage = round(used_memory / max_memory * 100, 3)
    lora_percentage = round(used_memory_for_lora / max_memory * 100, 3)
    print(f"{trainer_stats.metrics['train_runtime']} seconds used for training.")
    print(
        f"{round(trainer_stats.metrics['train_runtime']/60, 2)} minutes used for training."
    )
    print(f"피크 예약 메모리: {used_memory} GB")
    print(f"학습으로 증가한 피크 메모리: {used_memory_for_lora} GB")
    print(f"피크 예약 메모리/최대 메모리: {used_percentage} %")
    print(f"학습 증가분/최대 메모리: {lora_percentage} %")

![](https://blog.kakaocdn.net/dna/V6S6d/btsPWj3mgBX/AAAAAAAAAAAAAAAAAAAAANZMqALdJXIiM2XtV3Nuu3bKIMXzrqPMfrhIC8m2IoAq/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=aarADPE6%2FjQLYvZ2vm3gvWqPpS8%3D)

* * *

8) Inference 추론
---------------

*   캐시 이슈가 발생하여 비활성화를 하고 진행

    messages = [
        {"role": "system", "content": "당신은 한국어로 교육 내용을 설명하는 도움이 되는 어시스턴트입니다."},
        {"role": "user", "content": "2의 거듭제곱에 대해 설명해주세요."},
    ]
    
    inputs = tokenizer.apply_chat_template(
        messages,
        add_generation_prompt=True,
        return_tensors="pt",
        return_dict=True,
    ).to(model.device)
    
    # (중요) attention_mask 명시: pad=eos 경고/추론 실패 방지
    import torch
    if "attention_mask" not in inputs:
        inputs["attention_mask"] = torch.ones_like(inputs["input_ids"])
    
    # 1) 모델/젠컨피그에서 캐시 비활성화
    model.generation_config.use_cache = False
    model.config.use_cache = False
    
    from transformers import TextStreamer
    _ = model.generate(
        **inputs,
        max_new_tokens=512,  # 128에서 512로 증가
        streamer=TextStreamer(tokenizer),
        do_sample=True,      # 더 다양한 응답을 위해 추가
        temperature=0.7,     # 응답의 창의성 조절
        pad_token_id=tokenizer.eos_token_id  # 패딩 토큰 설정
    )

    # 답변
    
    <|im_start|>system
    당신은 한국어로 교육 내용을 설명하는 도움이 되는 어시스턴트입니다.<|im_end|>
    <|im_start|>user
    2의 거듭제곱에 대해 설명해주세요.<|im_end|>
    <|im_start|>assistant
    2의 거듭제곱은 2를 곱한 횟수에 따라 결정되는 수학적 개념입니다. 2의 거듭제곱은 n을 의미하며, 2가 n번 곱한 결과를 나타냅니다.
    
    예를 들어:
    - 2^1 = 2 (두 개의 2를 곱한 것)
    - 2^2 = 4 (두 개의 2를 곱한 것)
    - 2^3 = 8 (세 개의 2를 곱한 것)
    
    그러나 2의 거듭제곱은 항상 자연수만으로 이루어집니다. 정수 n을 입력하면, 2^n라는 점수를 얻습니다.
    
    예: 
    - 2^5 = 32 (5개의 2를 곱한 것)
    - 2^6 = 64 (6개의 2를 곱한 것)
    
    또는 더 큰 숫자를 사용할 수도 있습니다:
    - 2^7 = 128 (7개의 2를 곱한 것)
    - 2^8 = 256 (8개의 2를 곱한 것)
    
    2의 거듭제곱은 수학에서 매우 중요하고 다양한 분야에서 활용됩니다. 예를 들어, 컴퓨터 프로그래밍에서는 데이터를 저장하거나 처리하기 위해 사용될 수 있으며, 통계학에서도 중요한 역할을 합니다. 또한, 물리학이나 생물학等领域에서도 2의 거듭제곱과 관련된 개념들이 많이 사용됩니다.<|im_end|>

*   중간에 한자가 조금 섞인 모습

* * *

9) 저장 & Hugging Face 업로드
------------------------

*   **Model card**: 베이스/데이터/하이퍼/사용법 명시
*   **adapter\_config.json**: task\_type, peft\_type, base\_model\_name\_or\_path 보정 권장
*   **generation\_config.json** 함께 저장(선택)

    import os
    import json
    import shutil
    from huggingface_hub import HfApi, login
    
    def fix_adapter_config(model_path):
    
    def save_and_upload_model():
    
    def upload_existing_model():

* * *

11) 추후 진행
---------

*   허브에서 재로딩 테스트
*   트러블슈팅 FAQ
*   파인튜닝 전/후 테스트
*   확장 아이디어

(adsbygoogle = window.adsbygoogle || \[\]).push({}); if(window.observeAdsenseUnfilledState !== undefined){ observeAdsenseUnfilledState(); }

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 59 }

공유하기

게시글 관리

**EunmaStudio**

#### '[\[STUDY\]](/category/%5BSTUDY%5D) > [\[공부\]](/category/%5BSTUDY%5D/%5B%EA%B3%B5%EB%B6%80%5D)' 카테고리의 다른 글

[\[파인튜닝 도전 - 워크플로우\] 소형 오픈소스 LLM을 활용한 파인튜닝](/58)  (2)

2025.08.18

[\[딥러닝의 모든것\] - 활성화 함수](/54)  (0)

2025.02.16

[\[딥러닝의 모든것\] - 딥러닝, 뉴런](/53)  (0)

2025.02.16
            