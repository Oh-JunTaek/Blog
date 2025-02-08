
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

<a href="https://eunmastudio.tistory.com/49">TII-SSRC-23 데이터셋 논문 요약</a></br><a href="https://eunmastudio.tistory.com/48">TII-SSRC-23 데이터셋 논문 전문 번역</a></br><a href="https://eunmastudio.tistory.com/47">Human Pose Estimation</a></br><a href="https://eunmastudio.tistory.com/46">Human Pose Estimation 실습 계획서</a></br><a href="https://eunmastudio.tistory.com/45">DeepSeek 알아보기 - 논문 전문 한글 번역</a></br>