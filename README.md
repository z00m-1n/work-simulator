# 🐿️ 슬기로운 회사생활 (Wise Company Life)

> **직장인들을 위한 업무 상황 토론 & 집단지성 커뮤니티** > "애매한 업무 상황, 우리 회사의 집단 지성으로 해결합니다."

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![React](https://img.shields.io/badge/React-18.0-61DAFB?logo=react) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)

---

## 🧐 About The Project

**'슬기로운 회사생활'**은 직장 내에서 발생하는 다양한 갈등, 애매한 업무 지시, 인간관계의 고민을 익명으로 털어놓고 동료들의 의견을 듣는 **사내 커뮤니티 플랫폼**입니다.

단순한 익명 게시판(블라인드)의 비방 문화를 지양하고, **구조화된 투표**와 **성향 분석**, 그리고 **AI 기반의 중재**를 통해 실질적인 해결책을 찾는 '건강한 공론장'을 지향합니다.

### 🎯 기획 의도 (Why?)
1.  **공감의 격차 해소:** 같은 상황에서도 직급별(신입 vs 팀장), 성향별로 판단이 다름을 시각화하여 상호 이해를 돕습니다.
2.  **심리적 안전감(Psychological Safety):** 평가에 대한 두려움 없이 자신의 업무 고민을 솔직하게 털어놓을 수 있는 공간을 제공합니다.
3.  **데이터 기반의 조직 문화 진단:** 우리 회사가 '원칙'을 중시하는지, '관계'를 중시하는지 구성원들의 투표 데이터를 통해 파악합니다.

---

## ✨ Key Features

### 1. 밸런스 게임형 상황 투표 (Situation Voting)
- 딜레마 상황에 대해 A vs B를 선택하고 실시간으로 여론을 확인합니다.
- 단순한 정오답이 아닌, **[효율중시], [관계지향]** 등 선택에 담긴 가치를 시각화합니다.

### 2. 성향 태깅 기반 토론 (Tagged Discussion)
- 댓글 작성 시 **[현실적인], [따뜻한 위로], [규정대로]** 등 자신의 의견 성격을 태깅합니다.
- 사용자는 원하는 유형의 조언(팩트 폭격 vs 위로)만 필터링해서 볼 수 있습니다.

### 3. AI 멘토링 & 요약 (AI Moderation)
- 수많은 댓글을 다 읽지 않아도 되도록 AI가 주요 논점을 3줄로 요약합니다. (MVP: Mockup 구현)
- 감정적인 비난을 자제하고 건설적인 토론이 되도록 AI가 중재자 역할을 수행합니다.

### 4. 익명 페르소나 (Anonymous Persona)
- '입사 3일차 병아리', '해탈한 팀장' 등 재미있는 페르소나를 통해 익명성을 보장하면서도 역할극(Role-playing)의 재미를 줍니다.

---

## 🛠️ Tech Stack

본 프로젝트는 **Rapid MVP Development**를 목표로 하여, 백엔드 없이 프론트엔드 중심의 아키텍처로 구성되었습니다.

- **Framework:** React (Vite), TypeScript
- **Styling:** Tailwind CSS
- **UI Component:** Shadcn/UI, Radix UI
- **Data Visualization:** Recharts (투표 결과 시각화)
- **State Management:** React Context API
- **AI Tooling:** v0.app (UI Generative AI), Github Copilot

---

## 🚀 Getting Started

이 프로젝트를 로컬 환경에서 실행하려면 아래 절차를 따르세요.

### Prerequisites
- Node.js (v18 이상 권장)
- npm 또는 yarn

### Installation

1. 레포지토리를 클론합니다.
   ```bash
   git clone [https://github.com/your-username/wise-company-life.git](https://github.com/your-username/wise-company-life.git)
