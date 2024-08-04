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

const inspectPost = async () => {
    // RSS 피드 가져오기
    const feed = await parser.parseURL(rssUrl);

    for (let i = 0; i < 1; i++) { // 첫 번째 포스트만 확인
        const { title, link } = feed.items[i];

        try {
            // 포스팅 내용 가져오기
            const response = await axios.get(link);
            const dom = new JSDOM(response.data);

            // 포스팅 HTML을 콘솔에 출력
            console.log(dom.window.document.body.innerHTML);
            
        } catch (error) {
            console.error(`Failed to fetch post: ${title}`);
            console.error(error);
        }
    }
};

// 실행
inspectPost();
