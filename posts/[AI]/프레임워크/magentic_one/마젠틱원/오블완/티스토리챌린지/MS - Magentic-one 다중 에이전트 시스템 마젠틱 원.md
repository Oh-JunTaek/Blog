
# MS - Magentic-one 다중 에이전트 시스템 마젠틱 원

(adsbygoogle = window.adsbygoogle || \[\]).push({}); if(window.ObserveAdsenseUnfilledState !== undefined){ ObserveAdsenseUnfilledState(); }

Magentic-one
============

* * *

목차
--

1.  Magentic-One 소개
2.  Magentic-One의 비전
3.  Magentic-One의 주요 특징

*   다중 에이전트 아키텍처
*   오케스트레이터의 역할

4.  Magentic-One의 에이전트들

*   오케스트레이터
*   웹서퍼(WebSurfer)
*   파일서퍼(FileSurfer)
*   코더(Coder)
*   컴퓨터터미널(ComputerTerminal)

5.  Magentic-One의 복잡한 작업 해결 방법

*   실제 응용 사례

6.  성능 및 평가

*   벤치마크: GAIA, AssistantBench, WebArena
*   결과 및 통찰

7.  한계 및 도전 과제

*   현재의 한계
*   위험 완화 전략

8.  미래의 가능성과 개선 방향

*   모듈식 확장
*   향상된 학습 능력

9.  결론

* * *

### 1\. Magentic-One 소개

Magentic-One은 복잡한 작업을 해결하기 위해 설계된 일반주의 다중 에이전트 시스템입니다. Microsoft Research에서 개발한 이 시스템은 대규모 언어 모델(LLM)의 발전을 바탕으로 웹 탐색, 파일 조작, 코드 작성 등 다양한 도구를 활용하여 사용자가 직면하는 다양한 작업을 처리할 수 있도록 지원합니다. Magentic-One은 여러 개의 에이전트가 협력하여 문제를 해결하는 다중 에이전트 구조를 통해 높은 성능과 확장성을 자랑합니다.

### 2\. Magentic-One의 비전

Magentic-One의 비전은 AI 에이전트가 단순한 작업을 넘어서, 계획하고, 다단계로 추론하며, 새로운 관찰에 대응하고, 오류를 복구하면서 다양한 시나리오에서 복잡한 작업을 성공적으로 완료하는 것입니다. 이를 통해 인간의 지식과 역량을 증강시켜 생산성을 크게 향상시키고 일상 생활의 여러 문제를 해결하는 데 도움을 주고자 합니다.

### 3\. Magentic-One의 주요 특징

![](https://blog.kakaocdn.net/dn/cCvLPm/btsKICgcnKt/Jry5Ly6bYCW9ntIN4SqHMk/img.png)

*   다중 에이전트 아키텍처
    *   Magentic-One은 여러 개의 에이전트가 각기 다른 전문성을 발휘해 협력하는 다중 에이전트 아키텍처를 사용합니다. 이러한 구조는 다양한 도구와 작업을 필요에 따라 분담하여 수행할 수 있도록 해, 복잡한 작업을 효과적으로 처리할 수 있게 합니다.  
          
        
*   오케스트레이터의 역할
    *   Magentic-One의 중심에는 오케스트레이터(Orchestrator)라는 리드 에이전트가 있습니다. 오케스트레이터는 고수준의 계획을 세우고, 각 에이전트에게 적절한 작업을 할당하며, 진행 상황을 추적하고, 필요할 때 계획을 다시 세워 오류를 복구하는 역할을 합니다. 오케스트레이터는 작업의 전체적인 흐름을 관리하며, 최종 목표를 달성하기 위해 각 에이전트를 지휘합니다.

### 4\. Magentic-One의 에이전트들

#### 오케스트레이터

*   오케스트레이터는 팀의 리더로서 작업을 분해하고 계획을 수립하며, 다른 에이전트들에게 세부 작업을 할당하고 전체적인 진행 상황을 모니터링하며 조정하는 역할을 합니다.

#### 웹서퍼(WebSurfer)

*   웹서퍼는 웹 브라우저 상에서 작업을 수행하는 에이전트입니다. 웹 페이지 탐색, 클릭, 입력 등의 작업을 통해 인터넷에서 필요한 정보를 수집하고 분석합니다.

#### 파일서퍼(FileSurfer)

*   파일서퍼는 로컬 파일 시스템에서 작업을 수행하는 에이전트입니다. PDF, 이미지, 오디오 파일 등 다양한 파일 형식을 읽고 필요한 정보를 추출하며, 디렉터리 탐색과 파일 네비게이션 등의 작업도 처리합니다.

#### 코더(Coder)

*   코더는 코드 작성에 특화된 에이전트입니다. 다른 에이전트가 수집한 정보를 바탕으로 Python 코드 작성이나 분석, 새로운 프로그램 생성 등의 작업을 수행합니다. 아래는 Magentic-One의 코더가 Python 코드를 작성하는 예시입니다:

    # 간단한 웹 스크래퍼를 작성하는 예시 코드
    import requests
    from bs4 import BeautifulSoup
    
    def scrape_website(url):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                title = soup.find('title').text
                return f"웹사이트 제목: {title}"
            else:
                return "웹사이트에 접속할 수 없습니다."
        except Exception as e:
            return f"오류 발생: {e}"
    
    # 사용 예시
    url = "https://www.example.com"
    print(scrape_website(url))

위 코드는 웹서퍼가 수집한 URL을 바탕으로 코더가 간단한 웹 스크래퍼를 작성하여 해당 웹사이트의 제목을 가져오는 예시입니다.

#### 컴퓨터터미널(ComputerTerminal)

*   컴퓨터터미널은 코더가 작성한 코드를 실행하고, 필요한 경우 새로운 라이브러리를 설치하는 작업을 수행하는 에이전트입니다. 이를 통해 코더가 작성한 프로그램을 실제로 실행하여 결과를 확인할 수 있습니다.

![](https://blog.kakaocdn.net/dn/bhS3fl/btsKJKYDpDX/3yuiS14gzJ2IznXEg89K9k/img.png)

위 그림은 Magentic-One의 에이전트들이 협력하여 작업을 해결하는 과정을 보여줍니다. 오케스트레이터가 작업을 계획하고, 각 에이전트에게 적절한 작업을 할당하며, 최종 결과를 도출하는 전체 흐름을 시각적으로 표현하고 있습니다. 예를 들어, 사용자가 최근 발표된 AI 안전성 논문을 조사하고 요약한 발표 자료를 작성해 달라는 요청을 했을 때, 오케스트레이터는 먼저 웹서퍼에게 논문을 조사하고 다운로드하는 작업을 할당하고, 파일서퍼에게 논문을 분석하도록 지시합니다. 그 후 코더가 발표 자료를 생성하고, 컴퓨터터미널을 통해 이를 실행하여 최종 결과를 제공합니다.

### 6\. 성능 및 평가

#### 벤치마크: GAIA, AssistantBench, WebArena

*   Magentic-One은 GAIA, AssistantBench, WebArena와 같은 다양한 벤치마크에서 성능 평가를 진행했습니다. 이러한 벤치마크는 웹 탐색, 파일 처리, 코드 실행 등 다양한 작업을 포함하며, Magentic-One은 이들 벤치마크에서 최첨단 기술과 경쟁력 있는 성능을 입증했습니다.

#### 결과 및 통찰

*   Magentic-One은 복잡한 작업을 성공적으로 완료하는 높은 성능을 보였으며, 특히 다양한 에이전트들이 협력하여 작업을 수행하는 방식에서 강점을 보였습니다. 이를 통해 일반주의 에이전트 시스템의 가능성을 보여주며, 향후 더욱 발전된 형태로 확장될 가능성을 시사합니다.

### 7\. 한계 및 도전 과제

#### 현재의 한계

*   Magentic-One은 일부 제한점을 가지고 있습니다. 예를 들어, 특정 도구에 대한 의존성으로 인해 일부 작업에서는 비효율성이 발생할 수 있습니다. 또한, 복잡한 웹 페이지나 다양한 파일 형식을 완벽히 처리하는 데에는 아직 개선의 여지가 있습니다.

#### 위험 완화 전략

*   Magentic-One을 사용할 때는 에이전트들이 잠재적으로 위험한 행동을 시도할 수 있기 때문에 주의가 필요합니다. 이를 방지하기 위해 도커(Container) 환경에서 작업을 격리하고, 실행 중 로그를 모니터링하며, 인간의 감독 하에 작업을 수행하는 등의 전략을 사용합니다.

### 8\. 미래의 가능성과 개선 방향

#### 모듈식 확장

*   Magentic-One의 모듈식 아키텍처는 팀에 새로운 에이전트를 추가하거나 기존 에이전트를 제거하는 방식으로 쉽게 확장할 수 있습니다. 이를 통해 향후 새로운 시나리오에 적응하고, 다양한 도메인에 맞춰 빠르게 발전할 수 있습니다.

#### 향상된 학습 능력

*   Magentic-One은 현재 작업 중에 학습하고 적응할 수 있지만, 장기적인 학습 능력은 제한적입니다. 앞으로는 작업 간의 경험을 공유하고 축적하여 점점 더 똑똑해지는 시스템으로 발전하는 것이 목표입니다.

### 9\. 결론

*   Magentic-One은 웹 탐색, 파일 처리, 코드 작성 등 다양한 작업을 수행할 수 있는 일반주의 다중 에이전트 시스템으로, 복잡한 작업을 성공적으로 해결하는 데 있어 강력한 성능을 보여줍니다. 오케스트레이터를 중심으로 한 다중 에이전트 아키텍처는 각 에이전트의 전문성을 최대한 활용하여 작업을 효율적으로 처리할 수 있게 합니다. 앞으로도 Magentic-One은 더욱 발전된 형태로, 인간의 삶을 증강하고 생산성을 높이는 중요한 도구가 될 것입니다.

* * *

논문 리뷰가 궁금하시다면

[https://eunmastudio.tistory.com/26](https://eunmastudio.tistory.com/26)

 [멀티 에이전트 Magentic-one 논문 리뷰

논문 : https://www.microsoft.com/en-us/research/uploads/prod/2024/11/Magentic-One.pdf 멀티 에이전트 Magentic-ONE1. 소개Magentic-One은 Microsoft Research에서 개발된 복잡한 문제 해결을 위한 다중 에이전트 시스템입니다.

eunmastudio.tistory.com](https://eunmastudio.tistory.com/26)

* * *

* * *

<참고 자료>

[https://www.microsoft.com/en-us/research/publication/magentic-one-a-generalist-multi-agent-system-for-solving-complex-tasks/](https://www.microsoft.com/en-us/research/publication/magentic-one-a-generalist-multi-agent-system-for-solving-complex-tasks/)

 [Magentic-One: A Generalist Multi-Agent System for Solving Complex Tasks - Microsoft Research

Modern AI agents, driven by advances in large foundation models, promise to enhance our productivity and transform our lives by augmenting our knowledge and capabilities. To achieve this vision, AI agents must effectively plan, perform multi-step reasoning

www.microsoft.com](https://www.microsoft.com/en-us/research/publication/magentic-one-a-generalist-multi-agent-system-for-solving-complex-tasks/)

[https://github.com/microsoft/autogen/tree/main/python/packages/autogen-magentic-one](https://github.com/microsoft/autogen/tree/main/python/packages/autogen-magentic-one)

 [autogen/python/packages/autogen-magentic-one at main · microsoft/autogen

A programming framework for agentic AI 🤖. Contribute to microsoft/autogen development by creating an account on GitHub.

github.com](https://github.com/microsoft/autogen/tree/main/python/packages/autogen-magentic-one)

* * *

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 25 }

공유하기

게시글 관리

**EunmaStudio**

#### '[\[AI\]](/category/%5BAI%5D) > [프레임워크](/category/%5BAI%5D/%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC)' 카테고리의 다른 글

[멀티 에이전트 Magentic-one 논문 리뷰](/26)  (2)

2024.11.15

[OpenAI의 Swarm Framework의 목적과 이해.](/23)  (1)

2024.10.26
            