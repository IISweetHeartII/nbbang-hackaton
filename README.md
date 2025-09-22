# 🧮 간단한 N빵
> 공정하게 나눠내자! 30분 MVP로 시작한 스마트 정산 서비스

## 📋 결과물 제출

**1. 제출 항목**: 프로젝트명, 팀명, 시연 영상·스크린샷·Github/Notion/Drive 링크 등 **자유 양식**

- **프로젝트명**: 간단한 N빵 (Simple Bill Splitting Service)
- **개발자**: 김덕환 ([블로그](https://log8.kr))
- **Github**: [nbbang-hackaton Repository](https://github.com/your-username/nbbang-hackaton)
- **배포 링크**: [https://nbbang.log8.kr](https://nbbang.log8.kr) 🚀

**2. 파일/링크는 반드시 팀명·프로젝트명을 포함해 식별 가능하도록 작성해주세요.**
**3. 1팀(또는 개인)당 1회 제출이 원칙이며, 마감 시간(17:00) 전까지 반드시 제출해주세요.**
**4. 개인정보는 비식별 처리 후 심사에만 사용됩니다.**

---

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.x-ff69b4)](https://www.framer.com/motion/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-nbbang.log8.kr-00C7B7)](https://nbbang.log8.kr)

## 🎯 아이디어 배경

**"모임 후 정산, 왜 이렇게 복잡해야 할까?"**

친구들과 모임 후 정산할 때마다 겪는 불편함에서 시작된 프로젝트입니다.
- 💸 누가 얼마를 냈는지 기억 안 남
- 🤔 계산기 두드리며 복잡한 정산 
- 📱 카카오톡에 정산 내용 정리해서 공유하는 번거로움

**→ "30분 만에 완성하는 직관적인 정산 서비스"**

## ✨ 핵심 기능

### 🎪 **직관적인 UI/UX**
- **컬러코딩 멤버 시스템**: 각 멤버를 색깔로 구분하여 시각적 인식성 극대화
- **실시간 애니메이션**: Framer Motion으로 부드러운 사용자 경험
- **반응형 디자인**: 모바일 우선 설계로 언제 어디서나 편리하게

### 🧠 **스마트 정산 알고리즘**
```typescript
// 그리디 알고리즘 기반 최적 정산 계산
const settlements = useMemo<Settlement[]>(() => {
  const creditors = balances.filter(b => b.net > 0).sort((a, b) => b.net - a.net);
  const debtors = balances.filter(b => b.net < 0).sort((a, b) => a.net - b.net);
  // 최소 송금 횟수로 정산 최적화
}, [balances]);
```
- **그리디 알고리즘**: 최소 송금 횟수로 정산 최적화
- **실시간 계산**: useMemo 최적화로 즉시 반영
- **정확한 분할**: 원 단위까지 정확한 계산

### 📱 **한국형 UX**
- **카카오톡 연동**: 원클릭으로 정산 메시지 복사
- **원화 포맷팅**: 한국 통화 형식 (`toLocaleString('ko-KR')`)
- **문화적 배려**: 3명 이상 권장 등 한국 모임 문화 반영

## 🛠️ 기술 스택

### **Frontend Architecture**
- **Next.js 15.5.3** (App Router) - 최신 React 19 생태계
- **TypeScript** - 완전한 타입 안정성
- **Tailwind CSS v4** - 최신 CSS 프레임워크
- **Framer Motion** - 60fps 부드러운 애니메이션

### **State Management & Performance**
```typescript
// 커스텀 훅 기반 상태 관리
export function useBillSplitter() {
  const [members, setMembers] = useState<Member[]>([]);
  const [items, setItems] = useState<BillItem[]>([]);
  
  // 성능 최적화를 위한 메모이제이션
  const balances = useMemo<MemberBalance[]>(() => {
    // 복잡한 정산 로직
  }, [members, items]);
}
```

### **Data Persistence**
- **localStorage** - 클라이언트 사이드 데이터 영속성
- **자동 저장/복원** - 새로고침해도 데이터 유지
- **에러 핸들링** - 브라우저 호환성 보장

## 🏗️ 시스템 아키텍처

```
📦 src/
├── 🎯 hooks/useBillSplitter.ts    # 핵심 비즈니스 로직
├── 📋 types/index.ts              # TypeScript 타입 정의
├── 🎨 components/
│   ├── forms/                     # 입력 폼 컴포넌트
│   ├── ui/                        # 재사용 UI 컴포넌트
│   └── settlement/                # 정산 결과 컴포넌트
└── 📱 app/page.tsx                # 메인 애플리케이션
```

## 💡 핵심 혁신 포인트

### 1. **30분 MVP → Production Ready**
- 빠른 프로토타이핑으로 시작
- 점진적 기능 확장
- 사용자 피드백 기반 개선

### 2. **성능 최적화**
```typescript
// 메모이제이션으로 불필요한 재계산 방지
const balances = useMemo(() => calculateBalances(), [members, items]);
const settlements = useMemo(() => optimizeSettlements(), [balances]);
```

### 3. **접근성 & 사용성**
- **키보드 네비게이션** 지원
- **명확한 시각적 피드백**
- **직관적인 정보 계층구조**

## 🚀 실행 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (Turbopack 사용)
pnpm run dev

# 프로덕션 빌드
pnpm run build

# 프로덕션 서버 실행
pnpm run start
```

## 📊 사용자 시나리오

1. **멤버 추가**: 모임 참가자들을 컬러칩으로 등록
2. **항목 입력**: 누가 뭘 얼마에 샀는지, 누가 혜택받는지 선택
3. **실시간 정산**: 개인별 지출/수입 실시간 확인
4. **최적 송금**: 최소 횟수 송금 방법 자동 계산
5. **카톡 공유**: 원클릭으로 정산 결과 카카오톡 공유

## 🎯 바이브 코딩 챔피언십 2025 핵심 어필

### ✅ **운영진 평가**
- **빠른 MVP 구현**: 30분 내 핵심 기능 완성
- **실용적 아이디어**: 모든 사람이 공감하는 실생활 문제 해결

### ✅ **참가자 상호 평가**  
- **독창성**: 기존 정산 앱과 차별화된 UX
- **완성도**: 프로덕션 레디 코드 품질
- **임팩트**: 즉시 사용 가능한 실용성

### 💡 **혁신 요소**
- **그리디 알고리즘**: 컴퓨터과학 이론의 실생활 적용
- **한국형 UX**: 카카오톡 연동 등 로컬라이제이션
- **성능 엔지니어링**: React 19 + Next.js 15 최신 생태계 활용

---

**Made with ❤️ for 바이브 코딩 챔피언십 2025**

*"당신이라면 이 서비스를 사용하시겠습니까?"* - 답은 이미 정해져 있습니다. 🎯