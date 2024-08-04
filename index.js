import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

// README.md 파일에 쓸 고정된 초기 텍스트 설정
let text = `
# 프로젝트 이름

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

`;

// rss-parser 설정
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }
});

// 비동기 함수 실행
(async () => {
    // Tistory RSS 피드 가져오기
    const feed = await parser.parseURL('https://eunmastudio.tistory.com/rss');

    // 최신 5개의 글의 제목과 링크를 text 변수에 추가
    for (let i = 0; i < 5 && i < feed.items.length; i++) {
        const { title, link } = feed.items[i];
        text += `<a href="${link}">${title}</a></br>`;
    }

    // README.md 파일에 텍스트 쓰기
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    });

    console.log('업데이트 완료');
})();
