import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

let text = `
![tumblr_274a5850aed7bb06a033d29105882770_01bb2de3_500](https://user-images.githubusercontent.com/91704826/224994575-846ea991-f3dc-4b0d-a9b3-e3cc7928ea44.gif)
# Hi there 👋

## 📕 Latest Blog Posts

`;

const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }
});

(async () => {
    const feed = await parser.parseURL('https://eunmastudio.tistory.com/rss');

    for (let i = 0; i < 5; i++) {
        const { title, link } = feed.items[i];
        text += `<a href=${link}>${title}</a></br>`;
    }

    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e)
    });

    console.log('업데이트 완료');
})();
