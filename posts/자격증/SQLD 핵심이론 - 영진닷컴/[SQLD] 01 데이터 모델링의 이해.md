
# [SQLD] 01 데이터 모델링의 이해

SQLD 목차 (2024)
==============

    1. 데이터베이스 소개, 엔터티, 속성
    2. 관계 (Relationship)
    3. 식별자, 데이터 모델
    4. 정규화, 관계와 조인
    5. 모델이 표현하는 트랜잭션, null, 본질 vs 인조
    6. 관게형 데이터베이스 개요
    7. 함수, WHERE
    8. GROUP BY, HAVING, ORDER BY
    9. JOIN
    10. 서브쿼리
    11. 집합 연산자, 그룹 함수, 윈도우 함수
    12. TOP-N, 계층 쿼리
    13. PIVOT과 UNPIVOT, 정규 표현식
    14. DML, TCL
    15. DDL, DCL

* * *

목차
==

    1. 참고 자료(영상/출처)
    2. 시작하기 전에
    3. 주요 개념
    4. 예시
    5. 기출

* * *

1\. 참고 자료 - 이론 영상 강의
--------------------

[이기적 영진닷컴](https://www.youtube.com/watch?v=lxiEiAjp7d0&list=PL6i7rGeEmTvpLoDkB-kECcuD1zDt_gaPn, "새 창에서 열기")

* * *

2\. 1과목 데이터 모델링의 이해(SQLP,SQLD 공통)
---------------------------------

*   시험 범위가 변경이 되었음. 변경 내용과 목차는 다음과 같다.
*   SQLD는 1과목, 2과목이 해당된다.
*   암기의 영역
*   합격 총점 60점 이상/ 과락 과목별 40%미만 취득
*   1영역 10문항 + 2영역 40문항 = 총 50문항, 문항당 2점 총 점 100점 - 90분 응시
*   [공식 홈페이지](https://www.dataq.or.kr/www/sub/a_04.do#none, "K-data 데이터자격검정홈페이지")  
    
    ![](https://blog.kakaocdn.net/dn/dbcClQ/btsIPMLy2uS/Cl2KYjXC8thZb48EG5SFeK/img.jpg)
    

1.  데이터 모델링의 이해
    *   데이터모델의 이해
    *   엔터티
    *   속성
    *   관계
    *   식별자
2.  데이터 모델과 SQL
    *   정규화
    *   관계와 조인의 이해
    *   모델이 표현하는 트랜잭션의 이해
    *   Null 속성의 이해
    *   본질식별자 vs 인조식별자

* * *

3\. 주요 개념
---------

### 데이터베이스

*   여러 데이터를 모아 통합적으로 관리하는 기술
*   여러 사람들이 함께 사용하고 공유할 수 있다.

### SQL(Structured Query Language)

*   관계형 데이터베이스 관리시스템(RDBMS)에서 데이터를 정의하고 조작하기 위한 표준 프로그래밍 언어.
*   데이터베이스와 상호 작용할 수 있는 강력한 도구.
    *   데이터 조회
    *   데이터 삽입
    *   데이터 업데이트
    *   데이터 삭제
        *   목적

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 2 }

공유하기

게시글 관리

**EunmaStudio**
            