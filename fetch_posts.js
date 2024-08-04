import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import Parser from "rss-parser";
import axios from 'axios';
import { JSDOM } from 'jsdom';

// RSS parser 설정
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }
});

// 블로그 RSS URL
const rssUrl = 'https://eunmastudio.tistory.com/rss';

// 카테고리별 폴더 생성 및 포스팅 저장
const savePost = async () => {
    // RSS 피드 가져오기
    const feed = await parser.parseURL(rssUrl);

    for (let i = 0; i < feed.items.length; i++) {
        const { title, link, categories } = feed.items[i];

        // 포스팅 내용 가져오기
        const response = await axios.get(link);
        const dom = new JSDOM(response.data);
        const content = dom.window.document.querySelector('.article').innerHTML;

        // 카테고리별 폴더 경로 설정
        const categoryPath = `./posts/${categories.join('/')}`;
        if (!existsSync(categoryPath)) {
            mkdirSync(categoryPath, { recursive: true });
        }

        // 파일명 설정
        const fileName = `${categoryPath}/${title.replace(/[/\\?%*:|"<>]/g, '-')}.md`;

        // Markdown 파일 내용 설정
        const markdownContent = `
# ${title}

${content}
        `;

        // Markdown 파일 생성
        writeFileSync(fileName, markdownContent, 'utf8');
        console.log(`Saved: ${fileName}`);
    }

    console.log('All posts saved.');
};

// 실행
savePost();
