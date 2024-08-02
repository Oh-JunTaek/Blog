import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

let text = `
![Logo_EunmaStudio2](C:/Users/dev/Documents/GitHub/Blog/Logo_EunmaStudio2.png)
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
