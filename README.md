
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

<a href="https://eunmastudio.tistory.com/28">한국어 특화 모델 EXAONE 논문 리뷰</a></br><a href="https://eunmastudio.tistory.com/27">한국어 자연어 처리 언어 모델 Exaone 소개</a></br><a href="https://eunmastudio.tistory.com/26">멀티 에이전트 Magentic-one 논문 리뷰</a></br><a href="https://eunmastudio.tistory.com/25">MS - Magentic-one 다중 에이전트 시스템 마젠틱 원</a></br><a href="https://eunmastudio.tistory.com/24">카카오 부트캠프 생성형 AI 1기 후기</a></br>