
# 티스토리 글 깃허브로 자동 연동하기

이 프로젝트는 티스토리 블로그와 GitHub를 연동하여 최신 블로그 포스트를 README.md 파일에 자동으로 업데이트합니다.

## 프로젝트 구조

- posts/
  - [카테고리1]/
    - [포스트 제목1].md
    - [포스트 제목2].md
  - [카테고리2]/
    - [포스트 제목1].md
    - [포스트 제목2].md
- README.md

## 구현 방법

1. 티스토리 블로그에서 RSS 피드를 가져옵니다.
2. GitHub Actions를 사용하여 일정 주기마다 README.md 파일을 업데이트합니다.
3. 블로그 포스트는 카테고리별로 분류되어 마크다운 파일로 저장됩니다.

## 📕 Latest Blog Posts

<a href="https://eunmastudio.tistory.com/58">[파인튜닝 도전 - 워크플로우]  소형 오픈소스 LLM을 활용한 파인튜닝</a></br><a href="https://eunmastudio.tistory.com/57">신경망에 대해서 공부하다가 든 아이디어 정리</a></br><a href="https://eunmastudio.tistory.com/55">[학습 계획]야 너두 파인튜닝 할 수 있어</a></br><a href="https://eunmastudio.tistory.com/54">[딥러닝의 모든것] - 활성화 함수</a></br><a href="https://eunmastudio.tistory.com/53">[딥러닝의 모든것] - 딥러닝, 뉴런</a></br>