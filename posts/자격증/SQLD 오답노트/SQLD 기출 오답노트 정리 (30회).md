
# SQLD 기출 오답노트 정리 (30회)

![](https://blog.kakaocdn.net/dn/FF7vG/btsIPWf3OBW/Xmg4d2obUKA0WnyY3zeWZk/img.png)

    * 반정규화 : 반정규화는 데이터베이스 성능을 향상시키기 위해 테이블을 중복하거나 조인을 줄이는 등의 작업을 의미합니다. 테이블을 추가하는 것은 반정규화의 한 형태일 수 있지만, 반정규화를 회피하는 방법은 아닙니다.

![](https://blog.kakaocdn.net/dn/brxfBz/btsIP6iwwqv/kBFMOyMC8TjcgDtIt6bSF1/img.png)

    1.  개괄적 모델링 (Preliminary) : 설계 초기단계. 요구사항파악&대략적인 데이터 모델 정의.
    
    * 데이터베이스 설계의 큰 그림을 그리고, 주요 엔터티와 관계를 식별
    
    2.  개념적 모델링 (Conceptual) : 데이터베이스의 논리적 구조를 고수준에서 정의. 어떤 데이터를 저장할지, 관계 정의 단계
    
    * ERD를 사용하여 엔터티, 속성, 관계를 시각적으로 표현. 데이터타입과 제약조건은 다루지 않음
    
    3.  논리적 모델링 (Logical) : 개념적모델을 구체화 하여 DBMS에 독립적인 논리적 구조를 정의. 정규화를 수행, 중복의 최소화 작업
    
    *  엔터티, 속성, 관계를 상세히 정의. 정규화를 통해 일관성 유지. 데이터 타입과 제약 조건을 포함.
    
    4.  물리적 모델링(Physical) : 논리적 모델을 특정 DBMS에 맞게 실제 데이터베이스로 구현. 물리적 저장 구조와 성능을 최적화
    
    *  테이블 스키마, 인덱스, 파티션, 저장소 구조 등을 정의하고 실제 데이터베이스를 생성.

![](https://blog.kakaocdn.net/dn/bFuTjJ/btsIQ3ejYtJ/9V8P0KFfSbWheOzx5FWrkK/img.png)

    -   ERD : 데이터베이스 설계에서 엔터티 간의 관계를 시각적으로 표현하는 다이어그램
    -   카테시안 조인(Cartesian Join) : 두 테이블 간 조인 조건이 없을 때 발생. 모든 가능한 조합을 반환.위 그림에서 B 테이블을 제외하면 A와C간의 관계를 정의할 조인 조건이 없기에 카테시안조인이 된다.
    -   세 개의 테이블을 모두 조인할 때 필요한 최소 조인 조건은 2개이다.(ex\_ A-B, B,C)
    -   Outer Join : 두 테이블의 모든 행을 포함하고, 일치하지 않는 행은 NULL. C의 데이터가 B에 모두 존재할 시 INNER JOIN 으로 충분
    -   INNER JOIN : 두 테이블에서 일치하는 행만 반환
    ```sql
    SELECT * FROM A
    INNER JOIN B ON A.key = B.key;
    ```

![](https://blog.kakaocdn.net/dn/wMgua/btsIPKtoN8m/HgjFbXYAkbRWKJfskku3Rk/img.jpg)

    *   주식별자는 대표성을 가지며 참조관계 연결을 할 수 있습니다. 보조식별자는 대표성을 가지지 못함.

![](https://blog.kakaocdn.net/dn/nMeBw/btsIPZ4WqII/3D1ao6Xy7wAKpZ6pKsCAJ0/img.jpg)

    * Row Migration : 데이터가 저장된 블록에 업데이트가 발생하여 블록이 가득 찼을 때, 해당 행이 다른 블록으로 이동하는 현상. 디스크 I/O가 증가하여 성능 저하
    * Row Chaining : 하나의 행이 너무 커서 여러 블록에 걸쳐 저장되는 현상. 디스크I/O가 증가하여 성능 저하
    * 엔터티(Entity) : 데이터베이스에서 저장할 객체나 개념. 사각형으로 표시
    * 속성(Attribute) : 엔터티의 특성. 타원으로 표시
    * 관계(Relationship) : 엔터티 간의 관계. 다이아몬드 또는 직선으로 표시

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 1 }

공유하기

게시글 관리

**EunmaStudio**
            