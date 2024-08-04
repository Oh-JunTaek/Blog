import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

// README.md 파일에 쓸 초기 텍스트 설정
let text = `
![Logo_EunmaStudio2](https://github.com/Oh-JunTaek/Blog/blob/main/Logo_EunmaStudio2.PNG)

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
    for (let i = 0; i < 5; i++) {
        const { title, link } = feed.items[i];
        text += `<a href=${link}>${title}</a></br>`;
    }

    // README.md 파일에 텍스트 쓰기
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e)
    });

    console.log('업데이트 완료');
})();
