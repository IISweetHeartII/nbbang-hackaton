# 간단한 N빵 - 30분 MVP

## 🎯 제품 한 줄 정의
모임에서 "누가 냈고 누가 먹었는지" 구분해서 공정하게 정산하고 카카오톡으로 바로 공유하는 간단한 도구

## 🚀 30분 목표
- 핵심 기능만으로 실용적인 정산 도구 완성
- Vercel 배포까지 30분 내 완료
- 복잡한 기능 없이 단순하지만 정확한 계산

## ✨ 핵심 기능 (MVP)

### 1. 멤버 관리
- 이름만 입력 (3-8명 권장)
- 추가/삭제 버튼
- 칩 형태로 표시

### 2. 항목 추가
- 항목명 (예: "치킨", "맥주")
- 금액 (원 단위)
- 지불자 선택 (드롭다운)
- 수혜자 선택 (멀티 선택 칩)

### 3. 실시간 계산
- 개인별 지불 금액 vs 부담 금액
- 차액 표시 (받을 돈 / 낼 돈)
- 간단한 송금 지시

### 4. 카카오톡 공유
- "김철수 → 이영희: 5,000원" 형태
- 복사 버튼으로 원클릭 공유
- 총 정산 금액 요약 포함

## 🎨 UI/UX (단일 페이지)

```
┌─────────────────────────────────────┐
│ 🧮 간단한 N빵                        │
│ 공정하게 나눠내자!                    │
└─────────────────────────────────────┘

┌─────────────────┐ ┌─────────────────┐
│ 멤버 & 항목      │ │ 계산 결과        │
│                │ │                │
│ 👥 멤버         │ │ 💰 개인별 정산   │
│ [김철수][이영희] │ │ 김철수: +13,000 │
│ [박민수] [+추가] │ │ 이영희: -8,000  │
│                │ │ 박민수: -5,000  │
│ 📝 항목         │ │                │
│ 치킨 20,000원   │ │ 📱 카톡 메시지   │
│ 김철수→김,이,박  │ │ [────────────]  │
│                │ │ │이영희→김철수:8천│ │
│ 맥주 10,000원   │ │ │박민수→김철수:5천│ │
│ 이영희→이,박     │ │ [복사] 버튼     │
│                │ │                │
│ [+ 항목 추가]    │ │                │
└─────────────────┘ └─────────────────┘
```

## 🔧 기술 스택
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **State**: React useState (복잡한 상태관리 없음)
- **Storage**: LocalStorage (간단 저장)
- **Package Manager**: pnpm
- **Deploy**: Vercel (자동 배포)

## 📱 반응형
- **Desktop (≥768px)**: 좌우 2컬럼
- **Mobile (<768px)**: 세로 스택

## 💻 데이터 구조

```typescript
type Member = {
  id: string;
  name: string;
}

type Item = {
  id: string;
  name: string;
  amount: number;
  payerId: string;
  beneficiaryIds: string[];
}
```

## ⚡ 계산 로직 (간단화)

1. **지불 금액**: 각 멤버가 실제로 낸 돈 합계
2. **부담 금액**: 각 멤버가 먹은/사용한 항목들의 균등분할 합계
3. **차액**: 지불금액 - 부담금액
   - 양수 → 받을 돈 (다른 사람이 갚아야 함)
   - 음수 → 낼 돈 (다른 사람에게 송금해야 함)
4. **송금 지시**: 채무자 → 채권자 순서대로 단순 매칭

## ⏱️ 30분 개발 계획

### 1단계 (5분): 기본 구조 및 레이아웃
- `pnpm install` (이미 설치 완료)
- `src/app/page.tsx` 메인 컴포넌트 생성
- Tailwind로 2컬럼 반응형 레이아웃 구성
- 헤더, 좌측 입력부, 우측 결과부 섹션 나누기
- 기본 상태 변수 설정 (members, items)

### 2단계 (10분): 멤버 관리 시스템
- 멤버 추가 입력창 (이름 입력 + 추가 버튼)
- 멤버 목록을 칩 형태로 표시
- 각 칩에 삭제(X) 버튼 추가
- useState로 멤버 배열 관리
- 중복 이름 방지 로직

### 3단계 (10분): 항목 관리 및 계산 로직
- 항목 추가 폼 (항목명, 금액, 지불자 선택, 수혜자 다중선택)
- 지불자 드롭다운 컴포넌트
- 수혜자 칩 토글 선택 컴포넌트
- 항목 목록 테이블 표시
- 실시간 계산 함수 구현:
  - 개인별 지불금액 계산
  - 개인별 부담금액 계산 (항목별 균등분할)
  - 차액(net) 계산

### 4단계 (5분): 결과 표시 및 카톡 공유
- 개인별 정산 결과 테이블 (이름, 지불, 부담, 차액)
- 송금 지시 목록 생성 (채무자 → 채권자)
- 카톡 메시지 템플릿 자동 생성
- 복사 버튼 및 clipboard API 연동
- LocalStorage 자동 저장 기능

## 🚀 배포 & 테스트

**기본 시나리오**:
1. 멤버 3명 추가: 김철수, 이영희, 박민수
2. 치킨 20,000원 (김철수 지불, 3명 모두 수혜)
3. 맥주 10,000원 (이영희 지불, 이영희+박민수 수혜)
4. 결과: 김철수 +13,333원, 이영희 -8,333원, 박민수 -5,000원
5. 카톡 메시지 복사 성공

**배포**: `vercel deploy` → 즉시 확인

## 🛠️ 상세 구현 가이드

### 멤버 관리 컴포넌트
```typescript
// 멤버 추가 폼
<div className="flex gap-2 mb-4">
  <input 
    type="text" 
    placeholder="이름 입력"
    value={newMemberName}
    onChange={(e) => setNewMemberName(e.target.value)}
    className="flex-1 px-3 py-2 border rounded"
  />
  <button onClick={addMember} className="px-4 py-2 bg-blue-500 text-white rounded">
    추가
  </button>
</div>

// 멤버 칩 목록
<div className="flex flex-wrap gap-2">
  {members.map(member => (
    <div key={member.id} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
      {member.name}
      <button onClick={() => removeMember(member.id)}>×</button>
    </div>
  ))}
</div>
```

### 항목 추가 폼
```typescript
// 항목 입력 폼
<div className="space-y-3">
  <input 
    type="text" 
    placeholder="항목명 (예: 치킨)"
    value={newItem.name}
  />
  <input 
    type="number" 
    placeholder="금액"
    value={newItem.amount}
  />
  <select value={newItem.payerId}>
    <option value="">지불자 선택</option>
    {members.map(member => (
      <option key={member.id} value={member.id}>{member.name}</option>
    ))}
  </select>
  
  // 수혜자 다중선택 칩
  <div className="space-y-2">
    <label>수혜자 선택:</label>
    <div className="flex flex-wrap gap-2">
      {members.map(member => (
        <button
          key={member.id}
          onClick={() => toggleBeneficiary(member.id)}
          className={`px-3 py-1 rounded-full border ${
            newItem.beneficiaryIds.includes(member.id) 
              ? 'bg-blue-500 text-white' 
              : 'bg-white'
          }`}
        >
          {member.name}
        </button>
      ))}
    </div>
  </div>
</div>
```

### 계산 로직 함수
```typescript
function calculateSettlement(members: Member[], items: Item[]) {
  const paid: Record<string, number> = {};
  const owe: Record<string, number> = {};
  
  // 초기화
  members.forEach(member => {
    paid[member.id] = 0;
    owe[member.id] = 0;
  });
  
  // 각 항목별 계산
  items.forEach(item => {
    // 지불자에게 지불금액 추가
    paid[item.payerId] += item.amount;
    
    // 수혜자들에게 부담금액 균등분할
    const share = item.amount / item.beneficiaryIds.length;
    item.beneficiaryIds.forEach(beneficiaryId => {
      owe[beneficiaryId] += share;
    });
  });
  
  // 차액 계산 (받을 돈/낼 돈)
  const net: Record<string, number> = {};
  members.forEach(member => {
    net[member.id] = Math.round(paid[member.id] - owe[member.id]);
  });
  
  return { paid, owe, net };
}
```

### 카톡 메시지 생성
```typescript
function generateKakaoMessage(members: Member[], settlement: any) {
  const { net } = settlement;
  const debtors = members.filter(m => net[m.id] < 0);
  const creditors = members.filter(m => net[m.id] > 0);
  
  let message = "💰 정산 결과\n\n";
  
  // 송금 지시
  debtors.forEach(debtor => {
    const amount = Math.abs(net[debtor.id]);
    const creditor = creditors.find(c => net[c.id] > 0);
    if (creditor) {
      message += `${debtor.name} → ${creditor.name}: ${amount.toLocaleString()}원\n`;
      net[creditor.id] -= amount;
    }
  });
  
  return message;
}
```

### LocalStorage 저장
```typescript
useEffect(() => {
  const data = { members, items };
  localStorage.setItem('nbbang-data', JSON.stringify(data));
}, [members, items]);
```

## 🚀 개발 & 배포 명령어

### 개발 서버 실행
```bash
pnpm dev
```

### 빌드 및 배포
```bash
pnpm build
pnpm start  # 로컬 프로덕션 테스트
npx vercel --prod  # Vercel 배포
```

### 전체 워크플로우 (30분)
```bash
# 1. 개발 시작
pnpm dev

# 2. 실시간 개발 (브라우저에서 확인하며 작업)
# localhost:3000에서 확인

# 3. 완성 후 배포
pnpm build
npx vercel --prod
```