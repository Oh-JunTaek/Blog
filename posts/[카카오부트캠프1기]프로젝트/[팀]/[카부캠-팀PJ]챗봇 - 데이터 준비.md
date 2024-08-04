
# [카부캠/팀PJ]챗봇 - 데이터 준비

'카부캠' 특화 챗봇을 위한 '카부캠'특화 데이터 준비
==============================

* * *

목차
--

1.  데이터 수집 소스
    *   카카오 구름 노션
    *   디스코드 공지
2.  목록 별 데이터 수집 방법 탐색
3.  데이터의 저장 및 활용
4.  RAG 기법을 통해 챗봇에게 데이터를 전달

* * *

### 1.1. 카카오 구름 노션

* * *

### 1.2 디스코드

*   방법, 데이터 선정(전체/공지)

#### 준비물

*   디스코드 개발자 계정 : 디스코드 개발자 포털 가입 후 애플리케이션 생성 [Discord Developers](https://discord.com/developers/applications, "디스코드 디벨로퍼")
*   봇 토큰 : 생성한 애플리케이션에 봇을 추가 후 토큰 발급
*   파이썬 : 라이브러리들 필요.

#### 가이드

1.  디스코드 봇 생성 및 설정
    1.  디스코드 개발자 포털에서 새 애플리케이션 생성
    2.  New 애플리케이션 생성
    3.  봇 추가 및 토큰발급
    4.  초대 후 권한 부여  
        
        ![](https://blog.kakaocdn.net/dn/cv2uRg/btsIRemyQzY/kpAKUDFP5Y8eqTRPM0T4X1/img.jpg)
        

2.  파이썬 환경 설정

    pip install discord.py

3.  메시지 수집 코드예시
    *   지정 채널에서 최근 100개의 메시지를 출력
        
            import discord
            import asyncio
            TOKEN = 'YOUR_BOT_TOKEN'
            CHANNEL_ID = YOUR_CHANNEL_ID
            class MyClient(discord.Client):
            async def on_ready(self):
              print(f'Logged in as {self.user} (ID: {self.user.id})')
              print('------')
              channel = self.get_channel(CHANNEL_ID)
              async for message in channel.history(limit=100):
                  print(f'{message.author}: {message.content}')
            client = MyClient()
            client.run(TOKEN)
        

4.  코드 저장 방식 채택
    
    1.  CSV
        
        *   간단하고 빠르지만, 구조화된 데이터일 경우 곤란함.
            
                import csv
                class MyClient(discord.Client):
                async def on_ready(self):
                print(f'Logged in as {self.user} (ID: {self.user.id})')
                print('------')
                channel = self.get_channel(CHANNEL_ID)
                with open('messages.csv', 'w', newline='', encoding='utf-8') as csvfile:
                    fieldnames = ['author', 'content']
                    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                    writer.writeheader()
                    async for message in channel.history(limit=100):
                        writer.writerow({'author': message.author.name, 'content': message.content})
                client = MyClient()
                client.run(TOKEN)
            
    2.  json
        
        *   구조화된 데이터에 강함
        *   가독성이 좋고, 다른 언어와 호환성이 좋음
        *   용량이 커지면 성능 저하
            
                import discord
                import json
                TOKEN = 'YOUR_BOT_TOKEN'
                CHANNEL_ID = YOUR_CHANNEL_ID
                class MyClient(discord.Client):
                async def on_ready(self):
                print(f'Logged in as {self.user} (ID: {self.user.id})')
                print('------')
                channel = self.get_channel(CHANNEL_ID)
                messages = []
                async for message in channel.history(limit=100):
                    messages.append({
                        'author': message.author.name,
                        'content': message.content
                    })
                with open('messages.json', 'w', encoding='utf-8') as f:
                    json.dump(messages, f, ensure_ascii=False, indent=4)
                client = MyClient()
                client.run(TOKEN)
            
    3.  SQLite
        
        *   SQL쿼리를 통해 데이터 검색 및 조작이 가능
            
                import discord
                import sqlite3
                TOKEN = 'YOUR_BOT_TOKEN'
                CHANNEL_ID = YOUR_CHANNEL_ID
                # SQLite 데이터베이스 연결
                conn = sqlite3.connect('messages.db')
                c = conn.cursor()
                # 테이블 생성
                c.execute('''
                CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                author TEXT,
                content TEXT
                )
                ''')
                class MyClient(discord.Client):
                async def on_ready(self):
                print(f'Logged in as {self.user} (ID: {self.user.id})')
                print('------')
                channel = self.get_channel(CHANNEL_ID)
                async for message in channel.history(limit=100):
                    c.execute('INSERT INTO messages (author, content) VALUES (?, ?)', 
                              (message.author.name, message.content))
                conn.commit()
                client = MyClient()
                client.run(TOKEN)
                # 데이터베이스 연결 종료
                conn.close()
            

### 실시간 데이터 동기화 예제

0.  schedule 라이브러리
    
        # 실시간
        import asyncio
        # 정해진 시간
        import schedule
        import time
        import threading
    
1.  1분마다 동기화
    
         async def sync_messages(self):
             await self.wait_until_ready()
             while not self.is_closed():
                 await asyncio.sleep(60)  # 1분마다 동기화
                 async for message in self.channel.history(limit=100):
                     self.store_message(message.author.name, message.content)
    
2.  정해진 시간 동기화(18:00)
    
        class MyClient(discord.Client):
         async def on_ready(self):
             print(f'Logged in as {self.user} (ID: {self.user.id})')
             print('------')
             self.channel = self.get_channel(CHANNEL_ID)
             schedule.every().day.at("18:00").do(self.sync_messages)
    

### 데이터 사용 방법

*   과정
    
    1.  디스코드 채팅 크롤링
    2.  최신화 된 데이터를 AWS에 저장
    3.  Flask로 Api 구축(데이터를 가져와서 사용하기 위해서)
*   예시 코드
    
        # 최신화 된 데이터를 AWS에 저장
        import boto3
        import json
        s3_client = boto3.client('s3')
        BUCKET_NAME = 'your-bucket-name'
        with open('messages.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        s3_client.put_object(Bucket=BUCKET_NAME, Key='messages.json', Body=json.dumps(data))
    
        # Flask로 Api구축
        from flask import Flask, jsonify
        import boto3
        import json
        app = Flask(__name__)
        s3_client = boto3.client('s3')
        BUCKET_NAME = 'your-bucket-name'
        @app.route('/get_messages', methods=['GET'])
        def get_messages():
            s3_client.download_file(BUCKET_NAME, 'messages.json', 'messages.json')
            with open('messages.json', 'r', encoding='utf-8') as f:
                messages = json.load(f)
            return jsonify(messages)
        if __name__ == '__main__':
            app.run(debug=True)
    

### RAG

*   순서
    
    1.  데이터 수집 및 저장
    2.  데이터 인덱싱 및 검색 시스템 구축
    
    *   RAG 모델이 효율적으로 검색할 수 있도록 데이터를 인덱싱
    *   벡터 데이터베이스활용(Elasticsearch, Pinecone, Weaviate)
    
    3.  챗봇 구성(이건 테디노트에서 알려줌)
    
    *   챗봇이 인덱싱된 데이터베이스에서 관련 문서를 검색하도록 로직구현

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 3 }

공유하기

게시글 관리

**EunmaStudio**
            