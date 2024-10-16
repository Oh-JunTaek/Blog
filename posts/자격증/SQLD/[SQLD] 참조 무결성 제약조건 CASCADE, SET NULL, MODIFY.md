
# [SQLD] 참조 무결성 제약조건 CASCADE, SET NULL, MODIFY

참조 무결성
======

참조무결성이란?
--------

*   DBMS에서 데이터를 입력/삭제를 할 때 데이터의 일관성(Consistency)이 깨지는 것을 DBMS차원에서 방어를 해줌.
*   예시 : 고객(부모) 중 고객번호(PK)에는 (101, 102, 103)까지만 있는데 주문(자식) 주문번호 중 고객번호(FK)에 (1004)가 있다면 데이터의 일관성이 깨진 것

1.  DELETE/ MODIFY ACTION  
    
    ![](https://blog.kakaocdn.net/dn/dZVqeH/btsJbtdVpnZ/3kCtt2Sii05gXsWyE9rpI0/img.jpg)
    

*   CASCADE - 부모 고객번호 1002를 삭제 시 자식 고객번호 1002도 삭제
*   SET NULL - 부모 고객번호 1002를 삭제 시 자식 고객번호 1002는 NULL값이 된다.(NOT NULL일 경우 오류 발생)
*   SET DEFAULT
*   RESTRICT - 비식별자만 삭제 가능.
*   NO ACTION - 제약조건 위배 시 아무런 행동 하지 않는다.

2.  INSERT ACTION  
    
    ![](https://blog.kakaocdn.net/dn/b41FZE/btsJdd8wPXe/M9YbBgGcR3zPRr7FqtZAeK/img.jpg)
    

* * *

Quiz
----

1.  다음 중 CASCADE 제약 조건에 대한 설명으로 올바른 것은 무엇인가요?
    
        a) 부모 테이블에서 행이 삭제되면 자식 테이블의 외래 키가 NULL로 설정된다.
        b) 부모 테이블에서 행이 삭제되면 자식 테이블의 외래 키도 함께 삭제된다.
        c) 부모 테이블에서 행이 삭제되면 자식 테이블의 외래 키는 기본값으로 설정된다.
        d) 부모 테이블에서 행이 삭제되면 자식 테이블에 아무런 변화가 없다.
    
2.  SET NULL 제약 조건이 설정된 경우, 부모 테이블에서 행을 삭제하면 자식 테이블의 해당 외래 키에 어떤 값이 들어가나요?
    
        a) 기본값
        b) NULL
        c) 그대로 유지
        d) 다른 테이블의 값으로 변경
    
3.  다음 SQL 쿼리에서 CASCADE 제약 조건에 따라 수행될 작업을 설명하세요.
    

*   질문: 위의 쿼리에서 DeptID가 10인 행이 Departments 테이블에서 삭제될 때, Employees 테이블에서는 어떤 일이 발생하나요?
    
        CREATE TABLE Departments (
          DeptID INT PRIMARY KEY,
          DeptName VARCHAR(50)
        );
        CREATE TABLE Employees (
          EmpID INT PRIMARY KEY,
          EmpName VARCHAR(50),
          DeptID INT,
          FOREIGN KEY (DeptID) REFERENCES Departments(DeptID) ON DELETE CASCADE
        );
        DELETE FROM Departments WHERE DeptID = 10;
    

4.  다음 SQL 쿼리에서 SET NULL 제약 조건이 적용되었을 때, 결과를 설명하세요.

*   질문: Categories 테이블에서 CategoryID가 5인 행을 삭제하면, Products 테이블에서 어떤 변화가 생기나요?
    
        CREATE TABLE Categories (
          CategoryID INT PRIMARY KEY,
          CategoryName VARCHAR(50)
        );
        CREATE TABLE Products (
          ProductID INT PRIMARY KEY,
          ProductName VARCHAR(50),
          CategoryID INT,
          FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID) ON DELETE SET NULL
        );
        DELETE FROM Categories WHERE CategoryID = 5;
    

5.  다음 중 DELETE/MODIFY ACTION과 INSERT ACTION의 비교에 대한 설명으로 올바른 것을 고르세요.
    
        1. DELETE ACTION은 부모 테이블에서 데이터가 삭제될 때 자식 테이블의 데이터를 삭제하거나 업데이트합니다. 반면, INSERT ACTION은 자식 테이블에 새로운 데이터가 삽입될 때 부모 테이블에 자동으로 데이터를 삽입합니다.
        a) 맞다
        b) 틀리다
        2. MODIFY ACTION은 부모 테이블에서 기본 키가 수정될 때 자식 테이블의 외래 키 값을 자동으로 수정합니다. 반면, INSERT ACTION은 자식 테이블에 외래 키가 삽입될 때 부모 테이블의 기본 키가 자동으로 수정됩니다.
        a) 맞다
        b) 틀리다
        3. INSERT ACTION과 관련된 제약 조건은 부모 테이블에 없는 외래 키 값을 자식 테이블에 삽입하려고 할 때 발생합니다. 이 경우, 제약 조건에 따라 삽입이 거부될 수 있습니다.
        a) 맞다
        b) 틀리다
        4. DELETE ACTION과 MODIFY ACTION은 주로 부모 테이블에서의 데이터 삭제나 변경 시 자식 테이블에 어떤 영향을 미칠지를 제어하는 제약 조건과 관련됩니다. 반면, INSERT ACTION은 데이터 삽입 시의 관계 무결성을 제어합니다.
        a) 맞다
        b) 틀리다
    
    * * *
    
    quiz 정답
    -------
    
    1.  b) 부모 테이블에서 행이 삭제되면 자식 테이블의 외래 키도 함께 삭제된다.
    2.  b) NULL
    3.  Employees 테이블에서 DeptID가 10인 모든 행이 삭제됩니다.
    4.  Products 테이블에서 CategoryID가 5인 행의 CategoryID 값이 NULL로 변경됩니다
    5.  b b a a
        
            * DELETE ACTION: 부모 테이블에서 데이터가 삭제될 때 자식 테이블에 미치는 영향을 제어하는 제약 조건입니다. 
            * INSERT ACTION: 자식 테이블에 데이터를 삽입할 때 부모 테이블의 무결성 제약 조건을 검사하는 것입니다.
            * 이 기능은 ON UPDATE CASCADE와 같은 제약 조건에서 이루어집니다.
            * INSERT ACTION은 부모 테이블의 무결성을 유지하기 위해 삽입 작업을 제어할 뿐
        

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 14 }

공유하기

게시글 관리

**EunmaStudio**

#### '[자격증](/category/%EC%9E%90%EA%B2%A9%EC%A6%9D) > [SQLD](/category/%EC%9E%90%EA%B2%A9%EC%A6%9D/SQLD)' 카테고리의 다른 글

[\[SQLD\] DROP, TRUNCATE, DELETE의 차이. DDL,DML,AUTOCOMMIT](/13)  (0)

2024.08.22

[\[SQLD\] 01 데이터 모델링의 이해](/2)  (0)

2024.07.27

[SQLD 기출 오답노트 정리 (30회)](/1)  (0)

2024.07.27
            