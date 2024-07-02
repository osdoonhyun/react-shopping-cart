<p align="middle" >
   <img src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/3e6c6f30b11d4b098b5a3e81be19ce3a" width="250">
</p>
<h2 align="middle">NEXTSTEP 장바구니 미션</h2>
</p>

<br />

### 👀 [배포 URL](https://react-shopping-cart-payments-five.vercel.app)

> [NEXTSTE TDD, 클린 코드 with React 3기](https://edu.nextstep.camp/c/QoTvUh4y) 에서 진행한 장바구니 미션입니다.

일상생활에서 쉽게 접할 수 있는 식재료를 구매할 수 있는 쇼핑몰입니다.<br/>
사용자들이 원하는 식재료를 손쉽게 장바구니에 담고, 안전하게 결제할 수 있도록 설계했습니다.

<br />

### 🛠️ 기술 스택

<img width="60%"  style="background-color: #f0f0f0; padding-top:10px;"  alt="react-shopping-mall-techstack" src="https://github.com/next-step/react-shopping-cart/assets/87527736/dc57a308-afd7-422c-8548-4df800cc2eb3">

<br /><br />

### 📈 상태 플로우 다이어그램

```mermaid
flowchart TD

A[사용자 페이지 접근] --> B[로컬 스토리지에서 장바구니, 주문 데이터 확인]
B --> C[서버에서 장바구니, 주문 데이터 요청]
C --> D[로컬 데이터와 서버 데이터 통합 및 중복 제거]
D --> E[통합 데이터로 Zustand 스토어 업데이트]
E --> F[로컬 스토리지 업데이트]

E --> G[통합 데이터를 서버에 반영]
G --> H[서버에서 최종 데이터 확인]
H --> I[장바구니 페이지 표시]

I --> J[사용자가 상품 수량 변경 또는 체크박스 클릭]
J --> K[변경 사항 로컬 스토리지에 저장]
K --> L[삭제 버튼 클릭]
L --> M[서버에 장바구니 업데이트 요청]
M --> N[서버에서 업데이트된 데이터로 Zustand 스토어 업데이트]

N --> I
K -- 변경 사항 적용 --> J

I --> O[주문하기 버튼 클릭]
O --> P[주문 데이터를 Zustand 스토어에 추가]
P --> Q[서버에 주문 생성 요청]
Q --> S[결제 완료 시 결제 정보 업데이트]
S --> T[결제 정보를 바탕으로 주문 목록에 표시]
```
