import { writeDB, type Database } from "./db"

// 초기 데이터베이스 생성 (3개의 더미 상황, 각각 약 100표로 분산)
const initialDatabase: Database = {
  simulations: [
    {
      id: "1",
      category: "communication",
      title: "팀 미팅에서 상사의 의견에 반대할 때",
      situation:
        "팀 미팅에서 상사가 제안한 프로젝트 방향이 기술적으로 실현 불가능해 보입니다. 하지만 상사는 이미 경영진에게 약속한 상태입니다. 어떻게 대응하시겠습니까?",
      choices: [
        {
          id: "1-1",
          text: "미팅 중에 바로 기술적 문제점을 지적하고 대안을 제시한다",
          votes: 28,
          votesByPosition: {
            intern: 3,
            staff: 8,
            senior: 10,
            manager: 5,
            director: 2,
          },
        },
        {
          id: "1-2",
          text: "미팅 후 1:1로 상사를 찾아가 우려사항을 전달한다",
          votes: 45,
          votesByPosition: {
            intern: 5,
            staff: 12,
            senior: 15,
            manager: 10,
            director: 3,
          },
        },
        {
          id: "1-3",
          text: "일단 진행해보고 문제가 생기면 그때 보고한다",
          votes: 12,
          votesByPosition: {
            intern: 6,
            staff: 4,
            senior: 1,
            manager: 1,
            director: 0,
          },
        },
        {
          id: "1-4",
          text: "동료들과 먼저 상의하여 팀의 의견을 모은 후 전달한다",
          votes: 18,
          votesByPosition: {
            intern: 2,
            staff: 5,
            senior: 6,
            manager: 3,
            director: 2,
          },
        },
      ],
      comments: [],
      aiRecommendation: "1-2",
      aiReasoning:
        "미팅 후 개별적으로 상사와 대화하는 것이 가장 효과적입니다. 공개적으로 반대하면 상사의 체면을 손상시킬 수 있지만, 1:1 대화는 건설적인 피드백을 전달하면서도 관계를 유지할 수 있습니다.",
      totalVotes: 103,
      status: "active",
      createdAt: "2026-01-10T09:00:00.000Z",
      persona: {
        position: "사원",
        yearsOfExperience: 2,
      },
    },
    {
      id: "2",
      category: "conflict",
      title: "동료가 자신의 업무를 떠넘길 때",
      situation:
        "같은 팀 동료가 자주 자신의 업무를 마감일 직전에 도움을 요청하며 사실상 떠넘기고 있습니다. 이미 3번째입니다. 어떻게 대응하시겠습니까?",
      choices: [
        {
          id: "2-1",
          text: "거절하고 각자 맡은 업무에 집중하자고 말한다",
          votes: 35,
          votesByPosition: {
            intern: 4,
            staff: 10,
            senior: 12,
            manager: 7,
            director: 2,
          },
        },
        {
          id: "2-2",
          text: "이번에는 도와주되, 다음부터는 미리 계획을 세우자고 제안한다",
          votes: 42,
          votesByPosition: {
            intern: 6,
            staff: 13,
            senior: 14,
            manager: 7,
            director: 2,
          },
        },
        {
          id: "2-3",
          text: "상사에게 상황을 보고하고 업무 재분배를 요청한다",
          votes: 18,
          votesByPosition: {
            intern: 2,
            staff: 4,
            senior: 5,
            manager: 5,
            director: 2,
          },
        },
        {
          id: "2-4",
          text: "묵묵히 도와주면서 나중에 보답받을 것을 기대한다",
          votes: 8,
          votesByPosition: {
            intern: 4,
            staff: 3,
            senior: 1,
            manager: 0,
            director: 0,
          },
        },
      ],
      comments: [],
      aiRecommendation: "2-2",
      aiReasoning:
        "협력적이면서도 경계를 설정하는 접근이 중요합니다. 이번에 도와주면서 신뢰를 유지하되, 앞으로의 기대치를 명확히 하여 반복을 방지할 수 있습니다.",
      totalVotes: 103,
      status: "active",
      createdAt: "2026-01-11T10:30:00.000Z",
      persona: {
        position: "대리",
        yearsOfExperience: 4,
      },
    },
    {
      id: "3",
      category: "ethics",
      title: "상사가 부적절한 지시를 할 때",
      situation:
        "상사가 경쟁사의 기밀 정보를 확보하라는 지시를 했습니다. 합법적인 방법이 아닌 것 같은데, 거절하면 평가에 불이익이 있을 것 같습니다.",
      choices: [
        {
          id: "3-1",
          text: "윤리적 문제를 지적하고 명확히 거절한다",
          votes: 58,
          votesByPosition: {
            intern: 8,
            staff: 18,
            senior: 20,
            manager: 10,
            director: 2,
          },
        },
        {
          id: "3-2",
          text: "HR팀이나 컴플라이언스 팀에 익명으로 상담한다",
          votes: 32,
          votesByPosition: {
            intern: 5,
            staff: 10,
            senior: 10,
            manager: 5,
            director: 2,
          },
        },
        {
          id: "3-3",
          text: "합법적인 방법으로 정보를 수집할 수 있는지 물어본다",
          votes: 12,
          votesByPosition: {
            intern: 3,
            staff: 4,
            senior: 3,
            manager: 2,
            director: 0,
          },
        },
        {
          id: "3-4",
          text: "시간을 끌면서 상황이 바뀌기를 기다린다",
          votes: 5,
          votesByPosition: {
            intern: 2,
            staff: 2,
            senior: 1,
            manager: 0,
            director: 0,
          },
        },
      ],
      comments: [],
      aiRecommendation: "3-1",
      aiReasoning:
        "윤리적 문제는 타협할 수 없는 영역입니다. 명확한 거절은 개인의 커리어와 회사의 리스크 모두를 보호하는 최선의 선택입니다. 필요시 HR이나 컴플라이언스 팀의 지원을 받을 수 있습니다.",
      totalVotes: 107,
      status: "active",
      createdAt: "2026-01-12T14:20:00.000Z",
      persona: {
        position: "과장",
        yearsOfExperience: 7,
      },
    },
  ],
  pendingSimulations: [],
}

export function initializeDatabase() {
  writeDB(initialDatabase)
  console.log("Database initialized with seed data")
}

// 직접 실행시 초기화
if (require.main === module) {
  initializeDatabase()
}
