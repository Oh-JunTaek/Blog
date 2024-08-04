
# Pandas 치트시트를 활용한 기초

pandas 치트시트를 활용한 기초
===================

*   강의 자료 : [https://www.boostcourse.org/ds112/lecture/59933?isDesc=false](https://www.boostcourse.org/ds112/lecture/59933?isDesc=false)
*   참고 링크 : [pandas공식문서](https://pandas.pydata.org/), [10분pandas](https://pandas.pydata.org/pandas-docs/version/1.0.0/getting_started/10min.html)
*   목차
    1.  학습목표
    2.  핵심키워드
    3.  강의 내용
    4.  추가 심화 학습 - GPT4
    5.  키워드 정리
    6.  학습 확인을 위한 간단한 퀴즈 - GPT4

* * *

1\. 학습 목표
---------

*   판다스 치트시트를 활용하여 기초를 학습한다.

* * *

2\. 핵심키워드
---------

*   pandas
*   dataframe
*   series
*   sort
*   drop
*   groupby
*   pivot table
*   plot

* * *

3\. 강의 내용
---------

Pandas : 수식으로 계산할 수 있고 시각화도 할 수 있는 데이터 분석도구입니다.

엑셀로도 데이터를 분석할 수 있는데 왜 판다스를 사용하는 것일까요?

엑셀로는 힘든 대용량의 데이터를 판다스는 분석할 수 있기 때문입니다.

아래에 첨부된 10 minutes to pandas를 한 번씩 실행해보시면 판다스의 전반적인 것을 익힐 수 있습니다.  
(다만, 10 minutes는 문서를 스크롤 하는데 걸리는 시간입니다ㅎㅎ 실제로는 더 오래 걸립니다.)

추가로 같이 첨부된 Pandas Cheat Sheet도 추천드립니다.

우선 판다스를 불러보겠습니다.

      import pandas as pd

일반적으로 as pd라고 정해줍니다. 이는 쉽게 별칭을 지어준다고 보시면 됩니다.

별칭을 지어주시면 나중에 불러올 때 굳이 다 적지 않으셔도 됩니다.

예를들어, pandas.DataFrame이 아닌 pd.DataFrame로 좀 더 간결하게 사용하실 수 있습니다.

일반적으로 파이썬 라이브러리들은 각각의 통용되는 별칭이 있습니다.

앞으로 나오는 것들은 일반적으로 사용되는 별칭이라고 보시면 됩니다.

#### DataFrame

Cheet Sheet에 있는 DataFrame을 가져와서 따라해 보도록 하겠습니다.

      df = pd.DataFrame(
      {"a" : [4, 5, 6],
      "b" : [7, 8, 9],
      "c" : [10, 11, 12]},
      index = [1, 2, 3])
      df

![](https://blog.kakaocdn.net/dn/WoKnh/btsIQFGkeQZ/b4VmrhNimml1ERFTtBlXTk/img.jpg)

#### Series

df\["a"\]라고 컬럼을 출력하게 되면 a 컬럼에 있는 4,5,6의 값이 출력이 되는데 이것을 Series 데이터라고 부릅니다.

      df["a"]

![](https://blog.kakaocdn.net/dn/HdiGX/btsIRglUeaZ/Ypex6FPzBa6F3PdyYJLUPk/img.jpg)

하지만 대괄호를 하나 더 쓰게 된다면 dataframe의 형태로 출력

      df[["a"]]

![](https://blog.kakaocdn.net/dn/sX3LM/btsITsZfy1A/UdAvtSvforQlkAu3QkLJm0/img.jpg)

결과를 보시면 이렇듯 dataframe은 2차원의 구조를 가지고 있고, Series는 1차원의 구조를 가지고 있다는 것을 알 수 있음.

#### subset (일부 값만 불러오기)

      # Rows 기준 예시
      df[df.Length > 7]
      # Columns 기준 예시
      df[['width', 'length', 'species']]

*   주의 : 두 개 이상의 값을 불러 올때는 DataFrame 형태로 불러와야 합니다.
*   `df["a", "b"] # 두 개 이상의 값을 불러올 때 Series형태로 불러올 경우 키값 오류가 발생합니다. df[["a", "b"]] # DataFrame 형태로 불러와야 합니다.`

#### Summarize Data

Categorical한 값의 빈도수를 구하는 방법

    df["a"]value_counts()

![](https://blog.kakaocdn.net/dn/XFuz7/btsISXk9hxd/8wKgwVftTvPKaUrnJtGqg0/img.jpg)

#### Reshaping

sort\_values, drop

1.  "a"칼럼을 기준으로 정렬하기
    
        df["a"].sort_values()
    
2.  DataFrame 전체에서 "a"값을 기준으로 정렬하기
    
        df.sort_values("a")
    
3.  "c"컬럼 drop하기
    
        df = df.drop(["c"], axis=1) df
    
4.  역순으로 정렬하기
    
        df.sort_values("a", ascending=False)
    

#### Group Data

*   Groupby, pivot\_table

1.  "a" 컬럼값을 Groupby하여 "b"의 컬럼값 평균값 구하기
    
        df.groupby(["a"])["b"].mean()
    
2.  pivot\_table로 평균값 구하기
    
        pd.pivot_table(df, index="a")
    

#### Plotting

*   데이터를 가지고 다양한 시각화 가능

1.  꺾은선 그래프
2.  `df.plot()`
3.  막대그래프
4.  `df.plot.bar()`
5.  밀도함수
6.  `df.plot.density()`

* * *

4\. 추가 심화 학습
------------

1.  dataframe

*   2차원 자료구조. 엑셀 시트와 유사. 열 = 데이터 타입/ 행 = 레이블
*   데이터 정리, 필터링, 집계, 변환 등의 작업에 사용됨
*   예시 : 주소록 中 각 행은 한명의 사람, 열은 이름, 번호, 메일 등출력값
    
        import pandas as pd
        # 예시 주소록 DataFrame 생성
        data = {
          'Name': ['John Doe', 'Jane Smith', 'Emily Davis'],
          'Phone': ['555-1234', '555-5678', '555-8765'],
          'Email': ['john@example.com', 'jane@example.com', 'emily@example.com']
        }
        df = pd.DataFrame(data)
        print(df)
    
*   출력 결과
    
                 Name     Phone              Email
        0    John Doe  555-1234   john@example.com
        1  Jane Smith  555-5678   jane@example.com
        2  Emily Davis 555-8765  emily@example.com
    

2.  Subset

*   \[부분집합\] 전체 데이터 집합에서 특정 조건에 맞는 일부 데이터를 추출
*   예시 : 고객 데이터베이스에서 특정 나이 대의 고객 or 특정 지역의 판매 데이터를 가져오는 것
    *   출력
        
            import pandas as pd
            # 예시 DataFrame 생성
            data = {
            'Name': ['John Doe', 'Jane Smith', 'Emily Davis'],
            'Age': [28, 34, 29],
            'City': ['New York', 'Los Angeles', 'Chicago']
            }
            df = pd.DataFrame(data)
            # 'Name' 열만 선택
            name_subset = df['Name']
            print(name_subset)
            # 첫 번째 행 선택
            first_row = df.iloc[0]
            print(first_row)
            # 나이가 30 이상인 사람들만 선택
            age_subset = df[df['Age'] >= 30]
            print(age_subset)
        
*   실행 결과
    
        # name 열만 선택
        0     John Doe
        1   Jane Smith
        2  Emily Davis
        Name: Name, dtype: object
    
        # 첫 번째 행 선택
        Name      John Doe
        Age             28
        City      New York
        Name: 0, dtype: object
    

      # 나이가 30 이상인 사람들만 선택
               Name  Age         City
      1  Jane Smith   34  Los Angeles

3.  Summarize Data

*   data 분석 시 데이터의 전반적인 분포, 평균, 중간값, 표준편차 등을 파악하기 위해 사용되는 **데이터 요약**
    
*   예시 : 학생 성적 데이터가 있을 때, 각 과목의 평균 점수나 최고 점수, 최저 점수를 구하는 것.
    
        import pandas as pd
        # 예시 DataFrame 생성
        data = {
          'Name': ['John Doe', 'Jane Smith', 'Emily Davis'],
          'Age': [28, 34, 29],
          'Salary': [50000, 60000, 58000]
        }
        df = pd.DataFrame(data)
        # 데이터 요약
        summary = df.describe()
        print(summary)
    
*   출력값
    
                   Age        Salary
        count   3.000000      3.000000
        mean   30.333333  56000.000000
        std     3.214550   5208.805113
        min    28.000000  50000.000000
        25%    28.500000  54000.000000
        50%    29.000000  58000.000000
        75%    31.500000  59000.000000
        max    34.000000  60000.000000
    

4.  Reshaping

*   데이터 재구조화 : 데이터의 형태나 구조를 변경하는 과정
    
*   피벗, 언피벗, 재형성 등 다양한 방법
    
*   예시 : 엑셀에서 행과 열을 교환하는 피벗 테이블
    
*   예시2 : 여러 열에 있는 데이터를 하나의 열로 합치거나, 하나의 열에 있는 데이터를 여러 열로 분리하는 작업
    
        # 예시 DataFrame 생성
        data = {
          'Name': ['John Doe', 'John Doe', 'Jane Smith', 'Jane Smith'],
          'Year': [2020, 2021, 2020, 2021],
          'Sales': [25000, 26000, 30000, 31000]
        }
        df = pd.DataFrame(data)
        
        # 피벗 테이블 생성
        pivot_df = df.pivot(index='Name', columns='Year', values='Sales')
        print(pivot_df)
    
*   출력값
    
        Year        2020  2021
        Name                   
        Jane Smith  30000 31000
        John Doe    25000 26000
    

5.  sort\_value

*   데이터를 특정 열의 값에 따라 정렬하는 기능
*   데이터 분석 시 데이터를 오름/내림차순으로 정렬하여 패턴을 찾거나, 특정 순서로 데이터를 정렬해야 할 때 사용.
*   예시 : 학생 성적을 높은 순서대로 정렬하여 상위권 학생 파악
    
        # 예시 DataFrame 생성
        data = {
          'Name': ['John Doe', 'Jane Smith', 'Emily Davis'],
          'Age': [28, 34, 29],
          'Salary': [50000, 60000, 58000]
        }
        df = pd.DataFrame(data)
        # 나이로 정렬
        sorted_df = df.sort_values(by='Age')
        print(sorted_df)
    
*   출력결과
    
               Name  Age  Salary
        0    John Doe   28   50000
        2  Emily Davis  29   58000
        1  Jane Smith   34   60000
    

6.  drop

*   데이터에서 특정 행이나 열을 삭제하는 기능
    
        # 'Age' 열 삭제
        df_dropped = df.drop(columns=['Age'])
        print(df_dropped)
        # 첫 번째 행 삭제
        df_dropped_row = df.drop(index=0)
        print(df_dropped_row)
    
*   출력결과
    
               Name  Salary
        0    John Doe   50000
        1  Jane Smith   60000
        2  Emily Davis  58000
        
               Name  Age  Salary
        1  Jane Smith   34   60000
        2  Emily Davis  29   58000
    

7.  Group Data

*   데이터를 특정 기준에 따라 그룹화하여 요약하는 과정
*   비슷한 특성을 가진 데이터를 그룹화하여 패턴을 찾거나, 집계 통계량을 계산할 때 사용
*   Groupby : 데이터프레임의 데이터를 특정 열을 기준으로 그룹화하는 기능
*   Groupby활용 : 데이터 분석 시 특정 기준으로 데이터를 그룹화하여 그룹별 요약 통계를 계산하는 용도.
*   Groupby예시 : 제품별 매출 합계, 지역별 평균 소득
    
        import pandas as pd
        # 예시 DataFrame 생성
        data = {
          'Department': ['HR', 'Finance', 'HR', 'IT', 'Finance', 'IT'],
          'Employee': ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank'],
          'Salary': [50000, 60000, 55000, 70000, 65000, 72000]
        }
        df = pd.DataFrame(data)
        # 부서별 평균 급여 계산
        grouped = df.groupby('Department')['Salary'].mean()
        print(grouped)
    
*   결과 출력
    
        Department
        Finance    62500.0
        HR         52500.0
        IT         71000.0
        Name: Salary, dtype: float64
    

8.  pivot table

*   pivot : 데이터를 재구조화하는 과정. 데이터프레임을 행,열,값의 기준으로 변환하여 요약통계 계산.
*   pivot table : 데이터를 특정 기준으로 집계하여 다차원적으로 볼 수 있는 테이블
*   예시 : 판매 데이터를 월별 및 제품별로 정리하여 합계를 구하는 것
*   예시2 : 학생 성적 데이터를 과목별 및 학년별로 정리하여 평균 성적을 구하는 것.
    
        # 예시 DataFrame 생성
        data = {
          'Department': ['HR', 'Finance', 'HR', 'IT', 'Finance', 'IT'],
          'Employee': ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank'],
          'Year': [2020, 2020, 2021, 2021, 2021, 2020],
          'Salary': [50000, 60000, 55000, 70000, 65000, 72000]
        }
        df = pd.DataFrame(data)
        # 피벗 테이블 생성
        pivot_table = df.pivot_table(values='Salary', index='Department', columns='Year', aggfunc='mean')
        print(pivot_table)
    
*   출력결과
    
        Year        2020     2021
        Department                 
        Finance   60000.0  65000.0
        HR        50000.0  55000.0
        IT        72000.0  70000.0
    

9.  plotting

*   데이터를 시각화로 표현하는 과정
    1.  라인플롯(Line)
        *   데이터 점들을 직선으로 연결하여 시간에 따른 변화를 나타냄
        *   시계열 데이터, 추세분석
    2.  바 차트(Bar)
        *   각 데이터의 값을 막대로 표현하여 비교
        *   카테고리 데이터 비교
    3.  히스토그램(Histogram)
        *   막대그래프. 각 막대는 특정 범위에 속하는 데이터의 빈도를 나타냄
        *   데이터 분포 분석
    4.  산점도(Scatter)
        *   두 변수 간의 관계를 점으로 표현
        *   상관관계 분석
    5.  파이 차트(pie)
        *   각 데이터의 비율을 파이 형태로 나타냄
        *   비율 분석
    6.  박스 플롯(Box)
        *   데이터의 분포와 이상치를 상자 형태로 나타냄
        *   데이터 분포 및 이상치 분석

10.  Series와 Column, Dimension

*   차원 : 데이터의 구조를 설명하는데 사용되는 개념. 데이터를 어떻게 구성하는지 나타냄.
    
    1.  1차원 : 데이터가 한 줄로 나열된 구조. 리스트나 배열이 1차원 데이터. 시퀀스데이터라고도 함.
        
            [1, 2, 3, 4, 5]
        
    2.  2차원 : 데이터가 행과 열로 구성된 구조. 테이블 형식. 엑셀 시트나 데이터베이스 테이블, DataFrame
        
            | Name       | Age | City       |
            |------------|-----|------------|
            | John Doe   | 28  | New York   |
            | Jane Smith | 34  | Los Angeles|
        
*   Series : pandas의 1차원 구조. 데이터의 일렬로 된 배열.DataFrame中한 열 또는 한 행이 Series에 해당.
    
        import pandas as pd
        # Series 생성
        ages = pd.Series([28, 34, 29])
        print(ages)
    
        # 실행결과(나이를 나타내는 시리즈 생성)
        0    28
        1    34
        2    29
        dtype: int64
    
*   Column : DataFrame의 세로 방향 데이터 모음. 각 Column은 하나의 시리즈로 표현.
    

* * *

5\. 추가 키워드 정리
-------------

1.  dataframe
2.  차원
3.  series
4.  column
5.  subset

* * *

6\. 간단한 퀴즈
----------

      1. DataFrame은 어떤 구조로 데이터를 저장하나요?
      a) 1차원 배열
      b) 2차원 배열
      c) 3차원 배열
      d) 그래프 구조
      2. DataFrame을 현업에서 사용하는 예로 올바르지 않은 것은?
      a) 데이터 정리와 필터링
      b) 고객 세그먼트 정의
      c) 그림 그리기
      d) 시간에 따른 판매 추이 분석

      3.  다음 중 1차원 데이터 구조는 무엇인가요?
      a) 리스트
      b) 테이블
      c) DataFrame
      d) 행렬
      4. DataFrame에서 한 열(Column)은 어떤 자료구조로 표현될 수 있나요?
      a) 리스트
      b) 배열
      c) Series
      d) 딕셔너리

      5. Subset의 의미로 올바른 것은 무엇인가요?
      a) 전체 데이터 집합
      b) 데이터의 일부 집합
      c) 데이터의 중복 집합
      d) 데이터의 순서 변경
      6. DataFrame에서 특정 조건을 만족하는 행을 선택하려면 어떤 방법을 사용해야 하나요?
      a) df.drop()
      b) df.iloc[]
      c) df[df['열 이름'] 조건]
      d) df.sort_values()

      7. 데이터를 정렬하는 함수는 무엇인가요?
      a) drop
      b) describe
      c) sort_values
      d) pivot
      8. DataFrame에서 특정 열을 삭제하려면 어떤 함수를 사용해야 하나요?
      a) drop
      b) sort_values
      c) pivot
      d) describe
      9. 데이터를 요약하는 데 사용하는 함수는 무엇인가요?
      a) drop
      b) describe
      c) sort_values
      d) pivot
      10. 데이터의 형태를 변경하는 과정을 무엇이라고 하나요?
      a) Subsetting
      b) Reshaping
      c) Sorting
      d) Dropping

      11. 데이터를 특정 기준으로 그룹화하여 요약 통계를 계산하는 pandas 함수는 무엇인가요?
      a) pivot_table
      b) groupby
      c) sort_values
      d) drop
      12. 피벗 테이블에서 데이터를 요약하기 위해 사용되는 함수는 무엇인가요?
      a) groupby
      b) pivot_table
      c) drop
      d) sort_values
      13. 다음 중 피벗 테이블의 장점으로 알맞은 것은?
      a) 데이터를 정렬할 수 있다
      b) 데이터를 특정 기준으로 그룹화하여 다양한 관점에서 분석할 수 있다
      c) 데이터를 삭제할 수 있다
      d) 데이터를 그래프로 시각화할 수 있다

      14. 데이터를 시간에 따른 변화를 시각화하기 가장 적합한 그래프는?
      a) 히스토그램
      b) 파이 차트
      c) 라인 플롯
      d) 바 차트
      15. 두 변수 간의 관계를 나타내는 그래프는?
      a) 바 차트
      b) 산점도
      c) 박스 플롯
      d) 라인 플롯
      16. 데이터의 분포를 막대 그래프로 나타내는 그래프는?
      a) 히스토그램
      b) 파이 차트
      c) 산점도
      d) 라인 플롯
      17. 데이터의 비율을 나타내는 그래프는?
      a) 박스 플롯
      b) 히스토그램
      c) 파이 차트
      d) 산점도

퀴즈 정답
-----

    1.  b) 2차원 배열  
        DataFrame은 행과 열로 구성된 2차원 데이터 구조입니다.
    2.  c) 그림 그리기  
        DataFrame은 주로 데이터 분석과 처리에 사용되며, 그림 그리기는 데이터 시각화 도구나 라이브러리를 사용해 수행합니다.

    3.  a) 리스트  
        리스트는 1차원 데이터 구조입니다. 한 줄로 나열된 데이터입니다.
    4.  c) Series  
        DataFrame의 한 열(Column)은 pandas의 1차원 자료구조인 Series로 표현됩니다.

    5.  b) 데이터의 일부 집합  
        Subset은 전체 데이터 집합에서 일부 요소를 선택한 작은 집합을 의미합니다.
    6.  c) df\[df\['열 이름'\] 조건\]  
        DataFrame에서 특정 조건을 만족하는 행을 선택할 때는 조건식을 사용합니다.

    7.  c) sort_values
        데이터를 정렬하는 함수입니다.
    8. a) drop
        DataFrame에서 특정 행이나 열을 삭제하는 함수입니다.
    9. b) describe
        데이터를 요약하는 데 사용하는 함수입니다.
    10. b) Reshaping
        데이터의 형태를 변경하는 과정을 의미합니다.

    11. b) groupby
        데이터를 특정 기준으로 그룹화하여 요약 통계를 계산하는 함수입니다.
    12. b) pivot_table
        피벗 테이블을 생성하여 데이터를 요약하는 함수입니다.
    13. b) 데이터를 특정 기준으로 그룹화하여 다양한 관점에서 분석할 수 있다
        피벗 테이블의 주요 장점 중 하나입니다.

    14. c) 라인 플롯
        라인 플롯은 시간에 따른 변화를 시각화하는 데 적합합니다.
    15. b) 산점도
        산점도는 두 변수 간의 관계를 나타냅니다.
    16. a) 히스토그램
        히스토그램은 데이터의 분포를 막대 그래프로 나타냅니다.
    17. c) 파이 차트
        파이 차트는 데이터의 비율을 나타냅니다.

window.ReactionButtonType = 'reaction'; window.ReactionApiUrl = '//eunmastudio.tistory.com/reaction'; window.ReactionReqBody = { entryId: 5 }

공유하기

게시글 관리

**EunmaStudio**

#### '[\[네이버부스트코스\]](/category/%5B%EB%84%A4%EC%9D%B4%EB%B2%84%EB%B6%80%EC%8A%A4%ED%8A%B8%EC%BD%94%EC%8A%A4%5D) > [\[데이터 사이언스\]이론](/category/%5B%EB%84%A4%EC%9D%B4%EB%B2%84%EB%B6%80%EC%8A%A4%ED%8A%B8%EC%BD%94%EC%8A%A4%5D/%5B%EB%8D%B0%EC%9D%B4%ED%84%B0%20%EC%82%AC%EC%9D%B4%EC%96%B8%EC%8A%A4%5D%EC%9D%B4%EB%A1%A0)' 카테고리의 다른 글

[공공데이터 사용](/9)  (0)

2024.08.03

[아나콘다 파일 경로 설정](/7)  (0)

2024.08.02
            