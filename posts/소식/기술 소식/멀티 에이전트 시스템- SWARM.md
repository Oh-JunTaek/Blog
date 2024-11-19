
# 멀티 에이전트 시스템- SWARM

(adsbygoogle = window.adsbygoogle || \[\]).push({}); if(window.ObserveAdsenseUnfilledState !== undefined){ ObserveAdsenseUnfilledState(); }

![](https://blog.kakaocdn.net/dn/W32dp/btsKccvFDdd/v7HckO0h8YWRc5lcGIJV8k/img.png)

llm을 활용할 수 있는 새로운 프레임 워크 openAI의 SWARM이 공개되었는데 공개된지 한 달이 되지 않았는데 많은 사람들이 관심을 가지고 있습니다.

![](https://blog.kakaocdn.net/dn/Nm4Th/btsKdoBWXiG/iWQVMMKnB8SEblsUitoGBk/img.png)

* * *

#### _**SWARM의 주요 특징**_

1\. 자율성

각 개체가 독립적으로 행동하며, 서로 간에 상호작용을 통해 전체 시스템의 목표를 달성합니다.

마치 회사에서 하나의 목표를 위해 각자의 역할을 수행하는 모습과 같습니다.

2\. 확장성

개체 수가 늘어나더라도 시스템이 원활하게 작동할 수 있음.

3\. 강건성

일부 개체가 고장 나더라도 전체 시스템에 큰 영향을 주지 않고 계속 작동이 가능함.

4\. 핸드오프

에이전트가 자신이 맡은 작업을 마치면, 다음 단ㄱ계의 작업을 다른 에이전트에게 작업을 넘김

5\. 컨텍스트 변수

에이전트 간 정보를 공유하기 위한 변수로, 작업중에 갱신되어 여러 에이전트가 통합된 정보를 기반으로 응답을 생성하여 연속성과 일관성을 유지

* * *

#### _**GPT에게 계속 시키는것과는 어떤 차이가?**_

**GPT와의 대화**

**Swarm 에이전트**

_**중앙 집중**_  
사용자가 GPT와 1대1로 대화할 때는 주로 중앙 집중식 구조에서 한 번에 하나의 요청에 대해 응답을 얻는 방식입니다. 모든 질문은 같은 모델에 전달되고, 그 모델이 개별적인 응답을 제공합니다.

_**분산처리**_  
Swarm 에이전트는 분산된 시스템을 기반으로 작동합니다. 즉, 여러 에이전트가 서로 다른 역할을 맡아 협력적으로 작업을 처리하는 방식입니다. 각 에이전트가 독립적으로 특정 작업을 수행하면서 서로 상호작용하기 때문에 작업을 동시에 여러 방향에서 처리할 수 있습니다.

일반적인 GPT 대화에서는 사용자가 한 질문을 하고 모델이 답변을 주는 형식으로, 한 번에 하나의 응답만 생성됩니다. 복잡한 문제를 다룰 때는 이 단일 응답이 적합하지 않거나 시간 소모가 클 수 있습니다.

_**병렬처리 및 협력적 수행**_  
Swarm 시스템은 여러 작업을 병렬적으로 처리할 수 있습니다. 예를 들어, 하나의 글을 작성할 때 여러 에이전트가 동시에 목차 작성, 내용 구성, 문법 검토 등을 분담하여 작업을 진행할 수 있습니다. 그 결과, 보다 복잡한 작업이 효율적으로 처리되고 시간도 단축될 수 있습니다. 각 에이전트는 자신이 맡은 부분을 처리한 뒤 이를 협력적으로 종합하여 최종 결과물을 만들어냅니다.

하나의 GPT 모델은 모든 질문에 대해 답변할 수 있지만, 모든 역할을 전담하다 보니 다소 일반적이고 포괄적인 답변이 나올 수 있습니다. 또한 문법 검토나 SEO 최적화 등 구체적인 작업에서는 추가적인 전문적인 처리가 필요할 수 있습니다.

_**전문성 특화 및 역할분담**_  
각 에이전트는 특정한 역할에 전문화되어 있습니다. 예를 들어, 일부 에이전트는 주제 설정에 강하고, 다른 에이전트는 문법 검토, 또 다른 에이전트는 SEO 최적화를 담당할 수 있습니다. 이를 통해 더 세밀하고 전문적인 결과를 얻을 수 있습니다. 특정 에이전트는 더 나은 SEO 결과를 내기 위해 최적화 알고리즘을 사용할 수 있고, 다른 에이전트는 글의 일관성을 유지하는 데 집중할 수 있습니다.

GPT 대화에서 얻는 결과는 주로 한 번에 하나의 응답이므로, 사용자가 이를 보고 직접 피드백을 주거나 수정 요청을 해야 합니다. 이러한 방식에서는 연속적인 피드백이 있지만, 시스템이 스스로 응답을 평가하고 개선하는 데에는 한계가 있습니다.

에이전트들끼리 상호작용하고 피드백을 주고받을 수 있습니다. 예를 들어, 한 에이전트가 주제를 선정하고 구조를 만들면, 다른 에이전트가 이를 바탕으로 내용을 작성한 후 다시 첫 에이전트에게 수정할 부분을 요청할 수 있습니다. 이를 통해 각 단계에서 스스로 개선하는 피드백 루프가 형성되며, 최종 결과물의 품질을 높일 수 있습니다.

보통 사용자가 직접 질문하고 답변을 받는 방식으로, 여러 작업을 동시에 진행하려면 다수의 세션이 필요하거나 하나의 세션에서 많은 시간이 소요됩니다.

_**확장성**_  
여러 작업을 동시에 처리할 수 있는 구조이므로 확장성이 뛰어납니다. 각 에이전트가 독립적으로 작업을 수행하므로, 작업량이 많아지더라도 적절한 에이전트 수를 조정함으로써 시스템이 효율적으로 처리할 수 있습니다.

GPT는 한 번에 하나의 요청에 대해 처리하지만, 모든 작업을 한 번에 다룰 수 없으며 각 작업을 순차적으로 진행해야 합니다.

_**개별화**_  
각 에이전트는 개별적으로 데이터를 처리하고 특정한 작업을 완수할 수 있기 때문에, 더 세밀하게 각 과정에서 전문적인 처리를 할 수 있습니다. 예를 들어, 특정 문단을 SEO에 최적화할 때 그 과정을 별도의 에이전트가 전담하여 결과물을 개선할 수 있습니다.

단 SWARM은 실험적/교육용이기에 서비스 배포에는 다소 부족함이 있을 수 있습니다.

> Swarm is currently an experimental sample framework intended to explore ergonomic interfaces for multi-agent systems. It is not intended to be used in production, and therefore has no official support. (This also means we will not be reviewing PRs or issues!)  
> The primary goal of Swarm is to showcase the handoff & routines patterns explored in the Orchestrating Agents: Handoffs & Routines cookbook. It is not meant as a standalone library, and is primarily for educational purposes.

> \[!경고\] Swarm은 현재 실험적인 샘플 프레임워크로, 멀티 에이전트 시스템을 위한 인체공학적 인터페이스를 탐구하기 위한 것입니다. 프로덕션 환경에서 사용하기 위한 것이 아니며, 공식적인 지원을 제공하지 않습니다. (따라서 PR이나 이슈는 검토되지 않습니다!)
> 
> Swarm의 주요 목표는 [Orchestrating Agents: Handoffs & Routines](https://cookbook.openai.com/examples/orchestrating_agents) Cookbook 에서 탐구한 핸드오프 및 루틴 패턴을 보여주는 것입니다. 독립적인 라이브러리로 사용하기보다는 교육적인 목적으로 만들어졌습니다.  
>   

해당 프레임워크는 openAI의 [github](https://github.com/openai/swarm) 에서 확인 가능합니다.

* * *

참고 자료

openAI github :  [https://github.com/openai/swarm](https://github.com/openai/swarm)

 [GitHub - openai/swarm: Educational framework exploring ergonomic, lightweight multi-agent orchestration. Managed by OpenAI Solut

Educational framework exploring ergonomic, lightweight multi-agent orchestration. Managed by OpenAI Solution team. - openai/swarm

github.com](https://github.com/openai/swarm)

테디노트 유튜브 : [https://www.youtube.com/watch?v=iqXn6Oiis4Q](https://www.youtube.com/watch?v=iqXn6Oiis4Q)

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 21 }

공유하기

게시글 관리

**EunmaStudio**

#### '[소식](/category/%EC%86%8C%EC%8B%9D) > [기술 소식](/category/%EC%86%8C%EC%8B%9D/%EA%B8%B0%EC%88%A0%20%EC%86%8C%EC%8B%9D)' 카테고리의 다른 글

[F5 TTS 사용법](/19)  (1)

2024.10.16

[Llama 3.2 모델 출시](/18)  (5)

2024.10.15
            