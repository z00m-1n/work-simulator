export interface Choice {
  id: string
  text: string
  votes: number
  votesByPosition?: {
    intern: number
    staff: number
    senior: number
    manager: number
    director: number
  }
}

export interface Comment {
  id: string
  author: string
  choiceId: string
  content: string
  timestamp: string
  likes: number
  replies?: Comment[]
}

export interface Persona {
  position: string
  yearsOfExperience: number
}

export interface Simulation {
  id: string
  category: string | string[]
  title: string
  situation: string
  choices: Choice[]
  comments: Comment[]
  aiRecommendation: string
  aiReasoning: string
  totalVotes: number
  status: "active" | "pending" | "closed"
  createdAt: string
  persona: Persona
}

export const positions = [
  { id: "intern", name: "인턴" },
  { id: "staff", name: "사원" },
  { id: "senior", name: "대리" },
  { id: "manager", name: "과장" },
  { id: "director", name: "부장/팀장" },
]

const adjectives = [
  "야근하는",
  "커피 마시는",
  "점심 고민하는",
  "회의 중인",
  "재택하는",
  "출근길의",
  "월요병 걸린",
  "금요일 기다리는",
  "연차 쓴",
  "승진한",
  "퇴근길의",
  "이직 고민하는",
  "연봉 협상하는",
  "발표 떨리는",
  "회의 졸린",
  "칼퇴하는",
  "아침잠 많은",
  "점심 배부른",
  "퇴근 눈치보는",
  "휴가 꿈꾸는",
]
const animals = [
  "곰돌이",
  "고양이",
  "강아지",
  "펭귄",
  "판다",
  "토끼",
  "여우",
  "사자",
  "코알라",
  "햄스터",
  "수달",
  "미어캣",
  "알파카",
  "너구리",
  "다람쥐",
  "고슴도치",
  "북극곰",
  "오리",
  "부엉이",
  "호랑이",
]

export const generateRandomNickname = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const animal = animals[Math.floor(Math.random() * animals.length)]
  return `${adj} ${animal}`
}

export const categories = [
  { id: "project", name: "프로젝트", icon: "📊", description: "프로젝트 진행 중 발생하는 상황들" },
  { id: "boss", name: "상사와의 관계", icon: "👔", description: "상사와의 커뮤니케이션 상황" },
  { id: "colleague", name: "동료와의 관계", icon: "🤝", description: "동료들과의 협업 상황" },
  { id: "client", name: "고객사 대응", icon: "🏢", description: "고객사와의 비즈니스 상황" },
  { id: "personal", name: "사적 대화", icon: "💬", description: "업무 외 개인적인 상황" },
]

export const mockSimulations: Simulation[] = [
  // === 상사와의 관계 (boss) ===
  {
    id: "1",
    category: "boss",
    title: "급한 퇴근 요청에 대한 상사의 추가 업무 지시",
    persona: { position: "대리", yearsOfExperience: 3 },
    situation:
      '오늘 중요한 개인 약속이 있어서 정시 퇴근해야 하는 상황입니다. 퇴근 30분 전, 부장님이 "이거 오늘 중으로 처리해줘"라며 2시간은 걸릴 것 같은 업무를 지시하셨습니다. 어떻게 대응하시겠습니까?',
    choices: [
      {
        id: "a",
        text: "약속을 취소하고 업무를 처리한다",
        votes: 234,
        votesByPosition: { intern: 45, staff: 89, senior: 56, manager: 34, director: 10 },
      },
      {
        id: "b",
        text: "상황을 설명하고 내일 아침 일찍 처리하겠다고 한다",
        votes: 567,
        votesByPosition: { intern: 78, staff: 156, senior: 189, manager: 98, director: 46 },
      },
      {
        id: "c",
        text: "동료에게 부탁할 수 있는지 먼저 알아본다",
        votes: 189,
        votesByPosition: { intern: 34, staff: 67, senior: 45, manager: 28, director: 15 },
      },
      {
        id: "d",
        text: "일단 퇴근하고 집에서 원격으로 처리한다",
        votes: 156,
        votesByPosition: { intern: 23, staff: 45, senior: 38, manager: 35, director: 15 },
      },
    ],
    comments: [
      {
        id: "c1",
        author: "야근하는 곰돌이",
        choiceId: "b",
        content: "솔직하게 말하는 게 장기적으로 더 좋습니다. 매번 참으면 당연시되어요.",
        timestamp: "2시간 전",
        likes: 45,
        replies: [
          {
            id: "c1-1",
            author: "커피 마시는 고양이",
            choiceId: "b",
            content: "맞아요, 저도 처음엔 어려웠는데 한번 말하고 나니까 오히려 편해졌어요.",
            timestamp: "1시간 전",
            likes: 12,
          },
        ],
      },
      {
        id: "c2",
        author: "점심 고민하는 펭귄",
        choiceId: "a",
        content: "상황에 따라 다르겠지만, 정말 급한 건지 확인하는 게 먼저인 것 같아요.",
        timestamp: "1시간 전",
        likes: 23,
      },
    ],
    aiRecommendation: "B. 상황을 설명하고 내일 아침 일찍 처리하겠다고 한다",
    aiReasoning:
      "직장 내에서 개인적인 상황을 솔직하게 전달하는 것은 건강한 커뮤니케이션의 기본입니다. 다만, 단순히 거절하는 것이 아니라 대안(내일 아침 일찍 처리)을 함께 제시함으로써 책임감과 문제 해결 의지를 보여주는 것이 중요합니다.",
    totalVotes: 1146,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "6",
    category: "boss",
    title: "상사의 잘못된 결정에 대한 의견 제시",
    persona: { position: "과장", yearsOfExperience: 8 },
    situation:
      "팀장님이 프로젝트 방향에 대해 결정을 내렸는데, 전문가 입장에서 봤을 때 명백히 문제가 있는 방향입니다. 다른 팀원들은 아무 말 없이 따르고 있습니다.",
    choices: [
      {
        id: "a",
        text: "회의 자리에서 공개적으로 의견을 말한다",
        votes: 156,
        votesByPosition: { intern: 12, staff: 34, senior: 45, manager: 42, director: 23 },
      },
      {
        id: "b",
        text: "회의 후 따로 찾아가 1:1로 의견을 전달한다",
        votes: 523,
        votesByPosition: { intern: 67, staff: 134, senior: 167, manager: 98, director: 57 },
      },
      {
        id: "c",
        text: "일단 따르고 문제가 발생하면 그때 말한다",
        votes: 145,
        votesByPosition: { intern: 34, staff: 56, senior: 32, manager: 15, director: 8 },
      },
      {
        id: "d",
        text: "메일로 우려사항을 정리해서 보낸다",
        votes: 234,
        votesByPosition: { intern: 23, staff: 67, senior: 78, manager: 45, director: 21 },
      },
    ],
    comments: [
      {
        id: "c20",
        author: "발표 떨리는 수달",
        choiceId: "b",
        content: "1:1이 상사 체면도 세워주고 솔직한 대화가 가능해요.",
        timestamp: "3시간 전",
        likes: 67,
      },
    ],
    aiRecommendation: "B. 회의 후 따로 찾아가 1:1로 의견을 전달한다",
    aiReasoning:
      "상사의 체면을 지키면서도 전문적인 의견을 전달할 수 있는 방법입니다. 공개적인 반박은 관계를 해칠 수 있고, 침묵은 책임 회피로 비칠 수 있습니다.",
    totalVotes: 1058,
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "7",
    category: "boss",
    title: "부당한 업무 평가에 대한 대응",
    persona: { position: "대리", yearsOfExperience: 4 },
    situation:
      "연말 평가에서 예상보다 낮은 점수를 받았습니다. 동료들과 비교했을 때 업무 성과는 비슷하거나 더 좋았다고 생각하는데, 평가 기준이 명확하지 않은 것 같습니다.",
    choices: [
      {
        id: "a",
        text: "인사팀에 공식적으로 이의를 제기한다",
        votes: 189,
        votesByPosition: { intern: 23, staff: 45, senior: 56, manager: 45, director: 20 },
      },
      {
        id: "b",
        text: "상사에게 평가 기준과 피드백을 요청한다",
        votes: 456,
        votesByPosition: { intern: 56, staff: 123, senior: 145, manager: 89, director: 43 },
      },
      {
        id: "c",
        text: "받아들이고 내년에 더 노력한다",
        votes: 234,
        votesByPosition: { intern: 45, staff: 78, senior: 67, manager: 32, director: 12 },
      },
      {
        id: "d",
        text: "동료들과 정보를 공유하며 상황을 파악한다",
        votes: 123,
        votesByPosition: { intern: 34, staff: 45, senior: 28, manager: 12, director: 4 },
      },
    ],
    comments: [],
    aiRecommendation: "B. 상사에게 평가 기준과 피드백을 요청한다",
    aiReasoning:
      "구체적인 피드백 없이는 개선의 방향을 잡기 어렵습니다. 성장을 위한 피드백 요청은 적극적인 자세로 긍정적으로 비칠 수 있습니다.",
    totalVotes: 1002,
    status: "active",
    createdAt: "2024-01-08",
  },
  {
    id: "8",
    category: "boss",
    title: "상사가 나의 공을 가로챘을 때",
    persona: { position: "사원", yearsOfExperience: 2 },
    situation:
      "제가 야근까지 하며 준비한 기획안을 상사가 임원 보고 시 자신의 아이디어인 것처럼 발표했습니다. 제 이름은 전혀 언급되지 않았습니다.",
    choices: [
      {
        id: "a",
        text: "회의 후 상사에게 직접 이야기한다",
        votes: 312,
        votesByPosition: { intern: 34, staff: 89, senior: 98, manager: 62, director: 29 },
      },
      {
        id: "b",
        text: "다음부터 기록을 남기고 상사에게 공유하지 않는다",
        votes: 234,
        votesByPosition: { intern: 45, staff: 78, senior: 67, manager: 32, director: 12 },
      },
      {
        id: "c",
        text: "임원에게 직접 알린다",
        votes: 89,
        votesByPosition: { intern: 12, staff: 23, senior: 28, manager: 18, director: 8 },
      },
      {
        id: "d",
        text: "팀 내에서 자연스럽게 알려지도록 한다",
        votes: 178,
        votesByPosition: { intern: 28, staff: 56, senior: 52, manager: 30, director: 12 },
      },
    ],
    comments: [
      {
        id: "c21",
        author: "이직 고민하는 미어캣",
        choiceId: "a",
        content: "조용히 말하되, 다음엔 함께 이름을 올려달라고 요청하는 게 좋아요.",
        timestamp: "1시간 전",
        likes: 89,
      },
    ],
    aiRecommendation: "A. 회의 후 상사에게 직접 이야기한다",
    aiReasoning:
      "감정을 담지 않고 사실에 기반해 대화하는 것이 중요합니다. 앞으로의 협업 방식에 대해 명확히 하는 기회로 삼으세요.",
    totalVotes: 813,
    status: "active",
    createdAt: "2024-01-06",
  },
  {
    id: "9",
    category: "boss",
    title: "재택근무 요청이 거절당했을 때",
    persona: { position: "대리", yearsOfExperience: 3 },
    situation:
      "개인 사정으로 재택근무를 요청했으나, 특별한 이유 없이 거절당했습니다. 다른 팀원들은 자유롭게 재택근무를 하는 상황입니다.",
    choices: [
      {
        id: "a",
        text: "그냥 받아들인다",
        votes: 145,
        votesByPosition: { intern: 34, staff: 56, senior: 32, manager: 15, director: 8 },
      },
      {
        id: "b",
        text: "거절 이유를 정중하게 여쭤본다",
        votes: 423,
        votesByPosition: { intern: 56, staff: 112, senior: 134, manager: 78, director: 43 },
      },
      {
        id: "c",
        text: "HR에 문의한다",
        votes: 156,
        votesByPosition: { intern: 23, staff: 45, senior: 45, manager: 32, director: 11 },
      },
      {
        id: "d",
        text: "다른 날로 다시 요청한다",
        votes: 189,
        votesByPosition: { intern: 28, staff: 56, senior: 58, manager: 35, director: 12 },
      },
    ],
    comments: [],
    aiRecommendation: "B. 거절 이유를 정중하게 여쭤본다",
    aiReasoning: "이유를 알아야 앞으로의 대응이 가능합니다. 감정적이지 않게, 업무적으로 접근하세요.",
    totalVotes: 913,
    status: "active",
    createdAt: "2024-01-04",
  },

  // === 프로젝트 (project) ===
  {
    id: "2",
    category: "project",
    title: "프로젝트 일정 지연에 대한 책임 소재",
    persona: { position: "과장", yearsOfExperience: 7 },
    situation:
      '팀 프로젝트에서 다른 팀원의 지연으로 인해 전체 일정이 늦어졌습니다. 상사가 회의에서 "왜 일정이 지연됐지?"라고 물었을 때, 어떻게 대응하시겠습니까?',
    choices: [
      {
        id: "a",
        text: "솔직하게 해당 팀원의 지연 사실을 말한다",
        votes: 145,
        votesByPosition: { intern: 28, staff: 45, senior: 38, manager: 24, director: 10 },
      },
      {
        id: "b",
        text: "팀 전체의 책임으로 말하고 개선 방안을 제시한다",
        votes: 423,
        votesByPosition: { intern: 56, staff: 112, senior: 134, manager: 78, director: 43 },
      },
      {
        id: "c",
        text: "일단 사과하고 자세한 내용은 따로 보고드리겠다고 한다",
        votes: 287,
        votesByPosition: { intern: 45, staff: 89, senior: 78, manager: 52, director: 23 },
      },
      {
        id: "d",
        text: "예상치 못한 기술적 이슈가 있었다고 둘러댄다",
        votes: 67,
        votesByPosition: { intern: 12, staff: 23, senior: 18, manager: 10, director: 4 },
      },
    ],
    comments: [
      {
        id: "c4",
        author: "출근길의 여우",
        choiceId: "b",
        content: "팀장 입장에서 보면, 팀원을 지목하는 건 리더십 부재로 보일 수 있어요.",
        timestamp: "3시간 전",
        likes: 67,
      },
    ],
    aiRecommendation: "B. 팀 전체의 책임으로 말하고 개선 방안을 제시한다",
    aiReasoning:
      "공개적인 자리에서 특정 팀원을 지목하는 것은 팀 분위기를 해칠 수 있으며, 이는 장기적으로 협업에 부정적인 영향을 미칩니다.",
    totalVotes: 922,
    status: "active",
    createdAt: "2024-01-14",
  },
  {
    id: "10",
    category: "project",
    title: "촉박한 일정에 품질 vs 속도 선택",
    persona: { position: "대리", yearsOfExperience: 5 },
    situation:
      "프로젝트 마감이 일주일 남았는데, 현재 진행 상황으로는 품질을 보장하기 어렵습니다. 품질을 낮추고 일정을 맞출지, 일정을 미루고 품질을 유지할지 결정해야 합니다.",
    choices: [
      {
        id: "a",
        text: "품질을 낮추더라도 일정을 맞춘다",
        votes: 234,
        votesByPosition: { intern: 45, staff: 78, senior: 67, manager: 32, director: 12 },
      },
      {
        id: "b",
        text: "상사에게 상황을 보고하고 일정 연장을 요청한다",
        votes: 456,
        votesByPosition: { intern: 56, staff: 123, senior: 145, manager: 89, director: 43 },
      },
      {
        id: "c",
        text: "야근/주말 근무로 둘 다 맞추려 노력한다",
        votes: 178,
        votesByPosition: { intern: 34, staff: 56, senior: 48, manager: 28, director: 12 },
      },
      {
        id: "d",
        text: "핵심 기능만 완성하고 나머지는 후속 업데이트로 미룬다",
        votes: 312,
        votesByPosition: { intern: 45, staff: 89, senior: 98, manager: 56, director: 24 },
      },
    ],
    comments: [],
    aiRecommendation: "B. 상사에게 상황을 보고하고 일정 연장을 요청한다",
    aiReasoning:
      "품질 저하는 장기적으로 더 큰 비용을 초래합니다. 리스크를 숨기지 않고 투명하게 보고하는 것이 전문가적 태도입니다.",
    totalVotes: 1180,
    status: "active",
    createdAt: "2024-01-09",
  },
  {
    id: "11",
    category: "project",
    title: "팀원 간 역할 분담 갈등",
    persona: { position: "사원", yearsOfExperience: 2 },
    situation:
      "프로젝트에서 역할 분담이 불공평하다고 느껴집니다. 제가 맡은 업무량이 다른 팀원보다 확실히 많은데, 팀장님은 이를 인지하지 못하고 있습니다.",
    choices: [
      {
        id: "a",
        text: "팀장님께 현재 업무량을 객관적으로 공유한다",
        votes: 389,
        votesByPosition: { intern: 45, staff: 112, senior: 123, manager: 72, director: 37 },
      },
      {
        id: "b",
        text: "동료들에게 먼저 협조를 구한다",
        votes: 234,
        votesByPosition: { intern: 34, staff: 78, senior: 67, manager: 38, director: 17 },
      },
      {
        id: "c",
        text: "일단 해내고 평가 시 언급한다",
        votes: 156,
        votesByPosition: { intern: 28, staff: 45, senior: 45, manager: 28, director: 10 },
      },
      {
        id: "d",
        text: "다음 프로젝트에서 역할 조정을 요청한다",
        votes: 178,
        votesByPosition: { intern: 28, staff: 56, senior: 52, manager: 30, director: 12 },
      },
    ],
    comments: [],
    aiRecommendation: "A. 팀장님께 현재 업무량을 객관적으로 공유한다",
    aiReasoning:
      "불만을 참으면 번아웃으로 이어질 수 있습니다. 감정이 아닌 데이터로 접근하면 합리적인 조정이 가능합니다.",
    totalVotes: 957,
    status: "active",
    createdAt: "2024-01-07",
  },
  {
    id: "12",
    category: "project",
    title: "타 부서와의 협업 갈등",
    persona: { position: "과장", yearsOfExperience: 6 },
    situation:
      "협업 중인 다른 부서에서 약속한 자료를 계속 늦게 보내와서 우리 팀 일정에 차질이 생기고 있습니다. 여러 번 요청해도 개선되지 않습니다.",
    choices: [
      {
        id: "a",
        text: "해당 부서 팀장에게 공식적으로 요청한다",
        votes: 345,
        votesByPosition: { intern: 34, staff: 89, senior: 112, manager: 72, director: 38 },
      },
      {
        id: "b",
        text: "우리 팀 상사에게 보고하고 조율을 요청한다",
        votes: 412,
        votesByPosition: { intern: 56, staff: 112, senior: 123, manager: 82, director: 39 },
      },
      {
        id: "c",
        text: "메일로 히스토리를 남기며 공식 요청한다",
        votes: 289,
        votesByPosition: { intern: 45, staff: 78, senior: 89, manager: 52, director: 25 },
      },
      {
        id: "d",
        text: "자료 없이 진행 가능한 방법을 찾는다",
        votes: 123,
        votesByPosition: { intern: 23, staff: 34, senior: 38, manager: 20, director: 8 },
      },
    ],
    comments: [
      {
        id: "c22",
        author: "회의 졸린 알파카",
        choiceId: "b",
        content: "부서 간 갈등은 위에서 조율하는 게 효과적이에요.",
        timestamp: "2시간 전",
        likes: 45,
      },
    ],
    aiRecommendation: "B. 우리 팀 상사에게 보고하고 조율을 요청한다",
    aiReasoning:
      "부서 간 갈등은 개인 레벨에서 해결하기 어려울 수 있습니다. 공식적인 경로를 통해 해결하는 것이 효과적입니다.",
    totalVotes: 1169,
    status: "active",
    createdAt: "2024-01-05",
  },
  {
    id: "13",
    category: "project",
    title: "프로젝트 방향성에 대한 의견 충돌",
    persona: { position: "대리", yearsOfExperience: 4 },
    situation:
      "프로젝트 진행 방향에 대해 팀원 간 의견이 크게 갈리고 있습니다. 양쪽 다 나름의 근거가 있어 결정이 쉽지 않은 상황입니다.",
    choices: [
      {
        id: "a",
        text: "팀장님의 결정을 요청한다",
        votes: 267,
        votesByPosition: { intern: 45, staff: 78, senior: 78, manager: 45, director: 21 },
      },
      {
        id: "b",
        text: "두 방안의 장단점을 정리해 팀 투표로 결정한다",
        votes: 356,
        votesByPosition: { intern: 56, staff: 98, senior: 112, manager: 62, director: 28 },
      },
      {
        id: "c",
        text: "작은 규모로 두 방안을 테스트해본다",
        votes: 234,
        votesByPosition: { intern: 34, staff: 67, senior: 78, manager: 38, director: 17 },
      },
      {
        id: "d",
        text: "외부 전문가의 의견을 구한다",
        votes: 145,
        votesByPosition: { intern: 23, staff: 45, senior: 45, manager: 22, director: 10 },
      },
    ],
    comments: [],
    aiRecommendation: "B. 두 방안의 장단점을 정리해 팀 투표로 결정한다",
    aiReasoning:
      "민주적인 의사결정은 팀원들의 참여감과 책임감을 높입니다. 합리적인 근거를 바탕으로 결정하면 결과에 대한 수용도도 높아집니다.",
    totalVotes: 1002,
    status: "active",
    createdAt: "2024-01-03",
  },

  // === 고객사 대응 (client) ===
  {
    id: "3",
    category: "client",
    title: "고객사의 무리한 요구사항 변경",
    persona: { position: "대리", yearsOfExperience: 4 },
    situation:
      "프로젝트 마감 1주일 전, 고객사에서 갑자기 핵심 기능의 대대적인 변경을 요청했습니다. 이를 수용하면 품질 저하나 일정 지연이 불가피한 상황입니다.",
    choices: [
      {
        id: "a",
        text: "고객 요청이니 어떻게든 수용한다",
        votes: 89,
        votesByPosition: { intern: 18, staff: 34, senior: 22, manager: 10, director: 5 },
      },
      {
        id: "b",
        text: "변경 시 발생하는 리스크를 명확히 설명하고 결정을 요청한다",
        votes: 534,
        votesByPosition: { intern: 67, staff: 145, senior: 178, manager: 98, director: 46 },
      },
      {
        id: "c",
        text: "상사에게 먼저 보고하고 회사 차원의 대응을 요청한다",
        votes: 312,
        votesByPosition: { intern: 56, staff: 98, senior: 89, manager: 48, director: 21 },
      },
      {
        id: "d",
        text: "일정 연장과 추가 비용을 조건으로 협상한다",
        votes: 198,
        votesByPosition: { intern: 23, staff: 56, senior: 67, manager: 38, director: 14 },
      },
    ],
    comments: [
      {
        id: "c6",
        author: "금요일 기다리는 코알라",
        choiceId: "b",
        content: "리스크를 숨기면 나중에 더 큰 문제가 됩니다.",
        timestamp: "5시간 전",
        likes: 89,
      },
    ],
    aiRecommendation: "B. 변경 시 발생하는 리스크를 명확히 설명하고 결정을 요청한다",
    aiReasoning: "전문가로서 발생 가능한 리스크를 명확히 전달하는 것은 책임감 있는 태도입니다.",
    totalVotes: 1133,
    status: "active",
    createdAt: "2024-01-13",
  },
  {
    id: "14",
    category: "client",
    title: "고객사 담당자의 무례한 태도",
    persona: { position: "사원", yearsOfExperience: 2 },
    situation:
      "고객사 담당자가 미팅에서 지속적으로 무례한 언행을 합니다. 업무적인 지적이 아니라 개인적인 비하 발언까지 나오는 상황입니다.",
    choices: [
      {
        id: "a",
        text: "현장에서 정중하게 제지한다",
        votes: 234,
        votesByPosition: { intern: 23, staff: 67, senior: 78, manager: 45, director: 21 },
      },
      {
        id: "b",
        text: "미팅 후 상사에게 보고하고 대응을 논의한다",
        votes: 456,
        votesByPosition: { intern: 67, staff: 123, senior: 145, manager: 82, director: 39 },
      },
      {
        id: "c",
        text: "참고 넘긴다",
        votes: 145,
        votesByPosition: { intern: 34, staff: 45, senior: 38, manager: 20, director: 8 },
      },
      {
        id: "d",
        text: "고객사 상위 담당자에게 별도로 알린다",
        votes: 178,
        votesByPosition: { intern: 23, staff: 45, senior: 58, manager: 38, director: 14 },
      },
    ],
    comments: [
      {
        id: "c23",
        author: "칼퇴하는 너구리",
        choiceId: "b",
        content: "혼자 감당하지 말고 조직 차원에서 대응해야 해요.",
        timestamp: "4시간 전",
        likes: 56,
      },
    ],
    aiRecommendation: "B. 미팅 후 상사에게 보고하고 대응을 논의한다",
    aiReasoning: "개인적인 대응보다 조직 차원의 대응이 효과적입니다. 기록을 남기고 회사의 지원을 받는 것이 중요합니다.",
    totalVotes: 1013,
    status: "active",
    createdAt: "2024-01-11",
  },
  {
    id: "15",
    category: "client",
    title: "고객사의 추가 요청에 대한 비용 청구",
    persona: { position: "과장", yearsOfExperience: 7 },
    situation:
      "계약 범위 외의 추가 작업을 고객사에서 계속 요청합니다. 관계 유지를 위해 지금까지 무상으로 해줬는데, 점점 요청이 커지고 있습니다.",
    choices: [
      {
        id: "a",
        text: "계속 무상으로 해준다",
        votes: 78,
        votesByPosition: { intern: 12, staff: 23, senior: 23, manager: 14, director: 6 },
      },
      {
        id: "b",
        text: "추가 비용이 발생한다고 정중히 안내한다",
        votes: 489,
        votesByPosition: { intern: 56, staff: 134, senior: 156, manager: 98, director: 45 },
      },
      {
        id: "c",
        text: "상사에게 보고하고 회사 방침을 확인한다",
        votes: 312,
        votesByPosition: { intern: 45, staff: 89, senior: 98, manager: 56, director: 24 },
      },
      {
        id: "d",
        text: "이번까지만 하고 다음부터 비용을 청구한다고 한다",
        votes: 234,
        votesByPosition: { intern: 34, staff: 67, senior: 78, manager: 38, director: 17 },
      },
    ],
    comments: [],
    aiRecommendation: "B. 추가 비용이 발생한다고 정중히 안내한다",
    aiReasoning:
      "무상 서비스의 지속은 오히려 서비스 가치를 떨어뜨립니다. 명확한 선을 그으면서도 좋은 관계를 유지할 수 있습니다.",
    totalVotes: 1113,
    status: "active",
    createdAt: "2024-01-09",
  },
  {
    id: "16",
    category: "client",
    title: "고객사 내부 갈등에 휘말렸을 때",
    persona: { position: "대리", yearsOfExperience: 3 },
    situation:
      "고객사의 A팀과 B팀이 서로 다른 요구사항을 전달하며 갈등 중입니다. 양쪽 모두 자신들의 요청을 따르라고 압박하고 있습니다.",
    choices: [
      {
        id: "a",
        text: "고객사에 단일 창구를 지정해달라고 요청한다",
        votes: 378,
        votesByPosition: { intern: 45, staff: 98, senior: 123, manager: 78, director: 34 },
      },
      {
        id: "b",
        text: "양쪽 요구사항을 정리해 상위 결정권자에게 판단을 요청한다",
        votes: 423,
        votesByPosition: { intern: 56, staff: 112, senior: 134, manager: 82, director: 39 },
      },
      {
        id: "c",
        text: "우리 회사 상사에게 보고하고 지시를 따른다",
        votes: 234,
        votesByPosition: { intern: 45, staff: 78, senior: 67, manager: 32, director: 12 },
      },
      {
        id: "d",
        text: "가능한 선에서 양쪽을 모두 만족시키려 노력한다",
        votes: 145,
        votesByPosition: { intern: 28, staff: 45, senior: 42, manager: 22, director: 8 },
      },
    ],
    comments: [],
    aiRecommendation: "B. 양쪽 요구사항을 정리해 상위 결정권자에게 판단을 요청한다",
    aiReasoning: "고객사 내부 갈등에 개입하기보다 객관적인 정보 제공자 역할을 유지하는 것이 좋습니다.",
    totalVotes: 1180,
    status: "active",
    createdAt: "2024-01-07",
  },
  {
    id: "17",
    category: "client",
    title: "계약 종료 후 지속적인 지원 요청",
    persona: { position: "사원", yearsOfExperience: 1 },
    situation:
      "유지보수 계약이 종료된 고객사에서 계속 문의와 지원 요청이 옵니다. 새 계약 논의는 미루면서 무상 지원만 요청하는 상황입니다.",
    choices: [
      {
        id: "a",
        text: "계약 종료를 명확히 안내하고 지원을 중단한다",
        votes: 234,
        votesByPosition: { intern: 34, staff: 67, senior: 78, manager: 38, director: 17 },
      },
      {
        id: "b",
        text: "상사에게 보고하고 회사 방침을 따른다",
        votes: 378,
        votesByPosition: { intern: 56, staff: 98, senior: 112, manager: 78, director: 34 },
      },
      {
        id: "c",
        text: "관계 유지 차원에서 간단한 건은 도와준다",
        votes: 189,
        votesByPosition: { intern: 34, staff: 56, senior: 58, manager: 30, director: 11 },
      },
      {
        id: "d",
        text: "새 계약 논의를 조건으로 제한적 지원을 제안한다",
        votes: 312,
        votesByPosition: { intern: 45, staff: 89, senior: 98, manager: 56, director: 24 },
      },
    ],
    comments: [],
    aiRecommendation: "B. 상사에게 보고하고 회사 방침을 따른다",
    aiReasoning: "개인 판단으로 무상 지원을 결정하기보다 회사 차원의 정책에 따르는 것이 바람직합니다.",
    totalVotes: 1113,
    status: "active",
    createdAt: "2024-01-05",
  },

  // === 동료와의 관계 (colleague) ===
  {
    id: "4",
    category: "colleague",
    title: "동료의 업무 실수를 발견했을 때",
    persona: { position: "사원", yearsOfExperience: 2 },
    situation:
      "중요한 보고서에서 동료의 명백한 실수를 발견했습니다. 이미 상사에게 보고된 상태이고, 동료는 아직 모르는 상황입니다.",
    choices: [
      {
        id: "a",
        text: "동료에게 먼저 조용히 알려준다",
        votes: 456,
        votesByPosition: { intern: 78, staff: 134, senior: 123, manager: 82, director: 39 },
      },
      {
        id: "b",
        text: "상사에게 직접 실수를 보고한다",
        votes: 123,
        votesByPosition: { intern: 23, staff: 38, senior: 32, manager: 20, director: 10 },
      },
      {
        id: "c",
        text: "동료와 함께 상사에게 정정 보고를 드린다",
        votes: 378,
        votesByPosition: { intern: 56, staff: 112, senior: 98, manager: 78, director: 34 },
      },
      {
        id: "d",
        text: "내 담당이 아니니 모른 척한다",
        votes: 45,
        votesByPosition: { intern: 10, staff: 15, senior: 10, manager: 7, director: 3 },
      },
    ],
    comments: [],
    aiRecommendation: "A. 동료에게 먼저 조용히 알려준다",
    aiReasoning: "동료에게 먼저 알려주는 것은 상호 존중의 표현이며, 이후 대응 방법을 함께 논의할 수 있습니다.",
    totalVotes: 1002,
    status: "active",
    createdAt: "2024-01-12",
  },
  {
    id: "18",
    category: "colleague",
    title: "동료가 내 아이디어를 자기 것처럼 발표했을 때",
    persona: { position: "사원", yearsOfExperience: 2 },
    situation: "팀 미팅에서 이전에 동료와 나눈 아이디어를 그 동료가 마치 자기 아이디어인 것처럼 발표하고 있습니다.",
    choices: [
      {
        id: "a",
        text: "미팅 중 바로 정정한다",
        votes: 145,
        votesByPosition: { intern: 23, staff: 45, senior: 42, manager: 25, director: 10 },
      },
      {
        id: "b",
        text: "미팅 후 동료에게 따로 이야기한다",
        votes: 456,
        votesByPosition: { intern: 67, staff: 123, senior: 145, manager: 82, director: 39 },
      },
      {
        id: "c",
        text: "상사에게 따로 말씀드린다",
        votes: 178,
        votesByPosition: { intern: 28, staff: 56, senior: 52, manager: 30, director: 12 },
      },
      {
        id: "d",
        text: "넘어간다",
        votes: 123,
        votesByPosition: { intern: 28, staff: 38, senior: 32, manager: 18, director: 7 },
      },
    ],
    comments: [
      {
        id: "c24",
        author: "휴가 꿈꾸는 다람쥐",
        choiceId: "b",
        content: "미팅 중 정정하면 분위기가 어색해질 수 있어요.",
        timestamp: "1시간 전",
        likes: 34,
      },
    ],
    aiRecommendation: "B. 미팅 후 동료에게 따로 이야기한다",
    aiReasoning: "공개적인 갈등보다 1:1 대화가 관계를 보존하면서 문제를 해결할 수 있습니다.",
    totalVotes: 902,
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "19",
    category: "colleague",
    title: "동료의 지속적인 업무 떠넘기기",
    persona: { position: "대리", yearsOfExperience: 3 },
    situation:
      "같은 직급의 동료가 자꾸 자기 업무를 부탁이라는 명목으로 떠넘깁니다. 거절하기 어려운 분위기에서 계속 수락하다 보니 업무량이 크게 늘었습니다.",
    choices: [
      {
        id: "a",
        text: "정중하게 거절하고 이유를 설명한다",
        votes: 423,
        votesByPosition: { intern: 56, staff: 112, senior: 134, manager: 82, director: 39 },
      },
      {
        id: "b",
        text: "상사에게 현재 상황을 알린다",
        votes: 234,
        votesByPosition: { intern: 34, staff: 67, senior: 78, manager: 38, director: 17 },
      },
      {
        id: "c",
        text: "받은 만큼 나도 부탁해서 균형을 맞춘다",
        votes: 178,
        votesByPosition: { intern: 34, staff: 56, senior: 52, manager: 28, director: 8 },
      },
      {
        id: "d",
        text: "바쁜 척하며 자연스럽게 피한다",
        votes: 145,
        votesByPosition: { intern: 28, staff: 45, senior: 42, manager: 22, director: 8 },
      },
    ],
    comments: [],
    aiRecommendation: "A. 정중하게 거절하고 이유를 설명한다",
    aiReasoning: "명확한 경계 설정이 필요합니다. 회피하거나 상사에게 바로 보고하는 것보다 직접 대화가 우선입니다.",
    totalVotes: 980,
    status: "active",
    createdAt: "2024-01-08",
  },
  {
    id: "20",
    category: "colleague",
    title: "동료와의 업무 스타일 충돌",
    persona: { position: "사원", yearsOfExperience: 1 },
    situation:
      "함께 프로젝트를 진행하는 동료와 업무 스타일이 너무 다릅니다. 저는 꼼꼼하게 계획을 세우고 진행하는 편인데, 동료는 즉흥적으로 처리합니다.",
    choices: [
      {
        id: "a",
        text: "동료와 대화해 중간 지점을 찾는다",
        votes: 456,
        votesByPosition: { intern: 67, staff: 123, senior: 145, manager: 82, director: 39 },
      },
      {
        id: "b",
        text: "역할을 명확히 나눠 각자 스타일대로 진행한다",
        votes: 312,
        votesByPosition: { intern: 45, staff: 89, senior: 98, manager: 56, director: 24 },
      },
      {
        id: "c",
        text: "내 스타일에 맞춰달라고 요청한다",
        votes: 89,
        votesByPosition: { intern: 12, staff: 23, senior: 28, manager: 18, director: 8 },
      },
      {
        id: "d",
        text: "상사에게 조율을 요청한다",
        votes: 145,
        votesByPosition: { intern: 28, staff: 45, senior: 42, manager: 22, director: 8 },
      },
    ],
    comments: [],
    aiRecommendation: "A. 동료와 대화해 중간 지점을 찾는다",
    aiReasoning: "서로 다른 스타일의 장점을 살리면 더 좋은 결과를 낼 수 있습니다. 대화를 통한 조율이 최선입니다.",
    totalVotes: 1002,
    status: "active",
    createdAt: "2024-01-06",
  },
  {
    id: "21",
    category: "colleague",
    title: "동료의 부정적인 소문",
    persona: { position: "대리", yearsOfExperience: 4 },
    situation:
      "회사 내에서 저에 대한 부정적인 소문이 돌고 있다는 것을 알게 됐습니다. 특정 동료가 퍼뜨린 것 같은데, 확실한 증거는 없습니다.",
    choices: [
      {
        id: "a",
        text: "해당 동료에게 직접 물어본다",
        votes: 312,
        votesByPosition: { intern: 34, staff: 89, senior: 98, manager: 62, director: 29 },
      },
      {
        id: "b",
        text: "상사나 HR에 상담한다",
        votes: 234,
        votesByPosition: { intern: 34, staff: 67, senior: 78, manager: 38, director: 17 },
      },
      {
        id: "c",
        text: "무시하고 업무로 증명한다",
        votes: 356,
        votesByPosition: { intern: 56, staff: 98, senior: 112, manager: 62, director: 28 },
      },
      {
        id: "d",
        text: "신뢰하는 동료에게 먼저 상황을 파악한다",
        votes: 189,
        votesByPosition: { intern: 34, staff: 56, senior: 58, manager: 30, director: 11 },
      },
    ],
    comments: [],
    aiRecommendation: "C. 무시하고 업무로 증명한다",
    aiReasoning: "증거 없이 대응하면 오히려 갈등이 커질 수 있습니다. 장기적으로 업무 성과가 가장 좋은 반박입니다.",
    totalVotes: 1091,
    status: "active",
    createdAt: "2024-01-04",
  },

  // === 사적 대화 (personal) ===
  {
    id: "5",
    category: "personal",
    title: "회식 자리에서의 개인적인 질문",
    persona: { position: "사원", yearsOfExperience: 1 },
    situation:
      '회식 자리에서 상사가 "요즘 연애는 하냐?", "결혼은 언제 할 거야?" 같은 개인적인 질문을 합니다. 불편하지만 분위기를 깨고 싶지는 않습니다.',
    choices: [
      {
        id: "a",
        text: "웃으며 적당히 넘긴다",
        votes: 567,
        votesByPosition: { intern: 98, staff: 167, senior: 156, manager: 102, director: 44 },
      },
      {
        id: "b",
        text: "정중하게 개인적인 질문이라 답하기 어렵다고 한다",
        votes: 234,
        votesByPosition: { intern: 34, staff: 67, senior: 68, manager: 45, director: 20 },
      },
      {
        id: "c",
        text: "유머로 화제를 전환한다",
        votes: 345,
        votesByPosition: { intern: 56, staff: 98, senior: 102, manager: 62, director: 27 },
      },
      {
        id: "d",
        text: "솔직하게 대답한다",
        votes: 123,
        votesByPosition: { intern: 23, staff: 38, senior: 32, manager: 20, director: 10 },
      },
    ],
    comments: [],
    aiRecommendation: "C. 유머로 화제를 전환한다",
    aiReasoning: "분위기를 해치지 않으면서도 자신의 경계를 지키는 방법입니다.",
    totalVotes: 1269,
    status: "active",
    createdAt: "2024-01-11",
  },
  {
    id: "22",
    category: "personal",
    title: "동료가 개인적인 고민을 털어놓을 때",
    persona: { position: "대리", yearsOfExperience: 3 },
    situation:
      "평소 친하지 않았던 동료가 갑자기 개인적인 고민(가정, 건강, 재정 문제 등)을 털어놓습니다. 어떻게 반응해야 할지 난감합니다.",
    choices: [
      {
        id: "a",
        text: "진심으로 경청하고 공감해준다",
        votes: 489,
        votesByPosition: { intern: 67, staff: 134, senior: 156, manager: 89, director: 43 },
      },
      {
        id: "b",
        text: "적당히 들어주고 업무 이야기로 전환한다",
        votes: 234,
        votesByPosition: { intern: 34, staff: 67, senior: 78, manager: 38, director: 17 },
      },
      {
        id: "c",
        text: "전문 상담을 권유한다",
        votes: 156,
        votesByPosition: { intern: 23, staff: 45, senior: 48, manager: 28, director: 12 },
      },
      {
        id: "d",
        text: "다른 시간에 더 이야기하자고 한다",
        votes: 123,
        votesByPosition: { intern: 23, staff: 38, senior: 35, manager: 20, director: 7 },
      },
    ],
    comments: [],
    aiRecommendation: "A. 진심으로 경청하고 공감해준다",
    aiReasoning: "때로는 해결책보다 들어주는 것 자체가 도움이 됩니다. 진심어린 경청은 관계 형성에도 긍정적입니다.",
    totalVotes: 1002,
    status: "active",
    createdAt: "2024-01-09",
  },
  {
    id: "23",
    category: "personal",
    title: "회사 동료의 SNS 친구 요청",
    persona: { position: "사원", yearsOfExperience: 1 },
    situation:
      "친하지 않은 회사 동료가 개인 SNS 친구 요청을 보냈습니다. 업무와 사생활을 분리하고 싶은데, 거절하면 어색해질 것 같습니다.",
    choices: [
      {
        id: "a",
        text: "수락한다",
        votes: 267,
        votesByPosition: { intern: 45, staff: 78, senior: 78, manager: 45, director: 21 },
      },
      {
        id: "b",
        text: "무시하고 나중에 못 봤다고 한다",
        votes: 312,
        votesByPosition: { intern: 56, staff: 89, senior: 98, manager: 48, director: 21 },
      },
      {
        id: "c",
        text: "회사 동료는 안 받는다고 솔직히 말한다",
        votes: 234,
        votesByPosition: { intern: 34, staff: 67, senior: 78, manager: 38, director: 17 },
      },
      {
        id: "d",
        text: "수락 후 공개 범위를 제한한다",
        votes: 356,
        votesByPosition: { intern: 56, staff: 98, senior: 112, manager: 62, director: 28 },
      },
    ],
    comments: [
      {
        id: "c25",
        author: "아침잠 많은 고슴도치",
        choiceId: "d",
        content: "요즘 SNS는 공개 범위 설정이 잘 되어 있어서 이게 제일 무난해요.",
        timestamp: "2시간 전",
        likes: 45,
      },
    ],
    aiRecommendation: "D. 수락 후 공개 범위를 제한한다",
    aiReasoning: "관계를 해치지 않으면서 프라이버시도 지킬 수 있는 절충안입니다.",
    totalVotes: 1169,
    status: "active",
    createdAt: "2024-01-07",
  },
  {
    id: "24",
    category: "personal",
    title: "점심 식사 거절의 기술",
    persona: { position: "사원", yearsOfExperience: 2 },
    situation: "매일 점심을 같이 먹자고 하는 동료가 있는데, 가끔은 혼자만의 시간이 필요합니다. 어떻게 거절해야 할까요?",
    choices: [
      {
        id: "a",
        text: "솔직하게 오늘은 혼자 먹고 싶다고 한다",
        votes: 312,
        votesByPosition: { intern: 34, staff: 89, senior: 98, manager: 62, director: 29 },
      },
      {
        id: "b",
        text: "다른 약속이 있다고 핑계를 댄다",
        votes: 345,
        votesByPosition: { intern: 56, staff: 98, senior: 102, manager: 62, director: 27 },
      },
      {
        id: "c",
        text: "일이 밀렸다며 데스크에서 먹겠다고 한다",
        votes: 234,
        votesByPosition: { intern: 45, staff: 67, senior: 68, manager: 38, director: 16 },
      },
      {
        id: "d",
        text: "오늘은 외출이 있다고 한다",
        votes: 178,
        votesByPosition: { intern: 34, staff: 45, senior: 58, manager: 30, director: 11 },
      },
    ],
    comments: [],
    aiRecommendation: "A. 솔직하게 오늘은 혼자 먹고 싶다고 한다",
    aiReasoning: "핑계는 지속 가능하지 않습니다. 솔직하되 상대를 배려하는 표현을 사용하면 관계도 유지됩니다.",
    totalVotes: 1069,
    status: "active",
    createdAt: "2024-01-05",
  },
  {
    id: "25",
    category: "personal",
    title: "경조사비 부담",
    persona: { position: "사원", yearsOfExperience: 1 },
    situation:
      "입사한 지 얼마 안 됐는데, 한 달에 경조사비로 나가는 돈이 월급의 10%가 넘습니다. 친하지도 않은 동료의 경조사까지 참여하기 부담스럽습니다.",
    choices: [
      {
        id: "a",
        text: "친한 동료만 참여한다",
        votes: 389,
        votesByPosition: { intern: 56, staff: 112, senior: 123, manager: 67, director: 31 },
      },
      {
        id: "b",
        text: "팀 공동 부조로 참여를 제안한다",
        votes: 312,
        votesByPosition: { intern: 45, staff: 89, senior: 98, manager: 56, director: 24 },
      },
      {
        id: "c",
        text: "모두 참여하되 금액을 줄인다",
        votes: 234,
        votesByPosition: { intern: 34, staff: 67, senior: 78, manager: 38, director: 17 },
      },
      {
        id: "d",
        text: "일단 다 참여한다",
        votes: 145,
        votesByPosition: { intern: 34, staff: 45, senior: 38, manager: 20, director: 8 },
      },
    ],
    comments: [],
    aiRecommendation: "A. 친한 동료만 참여한다",
    aiReasoning: "경조사는 의무가 아닙니다. 무리하지 않는 선에서 참여하되, 진심이 담긴 참여가 더 의미 있습니다.",
    totalVotes: 1080,
    status: "active",
    createdAt: "2024-01-03",
  },

  // === 중복 카테고리 (5개 이상) ===
  {
    id: "26",
    category: ["project", "boss"],
    title: "상사와 프로젝트 방향성이 다를 때",
    persona: { position: "과장", yearsOfExperience: 6 },
    situation:
      "프로젝트 리더로서 세운 방향과 상사가 생각하는 방향이 다릅니다. 전문가 입장에서는 제 방향이 맞다고 확신하지만, 상사는 자신의 방식을 고집합니다.",
    choices: [
      {
        id: "a",
        text: "상사의 방향을 따른다",
        votes: 178,
        votesByPosition: { intern: 28, staff: 56, senior: 52, manager: 30, director: 12 },
      },
      {
        id: "b",
        text: "데이터와 근거를 들어 설득을 시도한다",
        votes: 456,
        votesByPosition: { intern: 56, staff: 123, senior: 145, manager: 89, director: 43 },
      },
      {
        id: "c",
        text: "더 높은 상사에게 의견을 구한다",
        votes: 145,
        votesByPosition: { intern: 23, staff: 38, senior: 45, manager: 28, director: 11 },
      },
      {
        id: "d",
        text: "절충안을 제시한다",
        votes: 312,
        votesByPosition: { intern: 45, staff: 89, senior: 98, manager: 56, director: 24 },
      },
    ],
    comments: [
      {
        id: "c26",
        author: "점심 배부른 북극곰",
        choiceId: "b",
        content: "감정이 아닌 데이터로 설득하는 게 가장 효과적이에요.",
        timestamp: "3시간 전",
        likes: 78,
      },
    ],
    aiRecommendation: "B. 데이터와 근거를 들어 설득을 시도한다",
    aiReasoning: "전문가로서의 의견을 포기하지 않되, 감정이 아닌 논리로 접근해야 합니다.",
    totalVotes: 1091,
    status: "active",
    createdAt: "2024-01-14",
  },
  {
    id: "27",
    category: ["client", "project"],
    title: "고객사 요청과 프로젝트 리소스 충돌",
    persona: { position: "대리", yearsOfExperience: 4 },
    situation:
      "고객사가 급하게 추가 기능을 요청했는데, 현재 프로젝트 리소스로는 기존 일정에 영향을 줄 수밖에 없습니다. PM은 고객 만족을 강조하고, 팀원들은 이미 과부하 상태입니다.",
    choices: [
      {
        id: "a",
        text: "팀원들에게 양해를 구하고 추가 요청을 수용한다",
        votes: 156,
        votesByPosition: { intern: 23, staff: 45, senior: 48, manager: 28, director: 12 },
      },
      {
        id: "b",
        text: "PM에게 현실적인 리소스 상황을 설명하고 조율을 요청한다",
        votes: 478,
        votesByPosition: { intern: 67, staff: 134, senior: 145, manager: 89, director: 43 },
      },
      {
        id: "c",
        text: "고객사에 일정 연기를 직접 제안한다",
        votes: 178,
        votesByPosition: { intern: 28, staff: 56, senior: 52, manager: 30, director: 12 },
      },
      {
        id: "d",
        text: "추가 인력 투입을 요청한다",
        votes: 234,
        votesByPosition: { intern: 34, staff: 67, senior: 78, manager: 38, director: 17 },
      },
    ],
    comments: [],
    aiRecommendation: "B. PM에게 현실적인 리소스 상황을 설명하고 조율을 요청한다",
    aiReasoning: "팀의 상황을 정확히 전달하는 것이 PM의 합리적 판단을 돕습니다. 무리한 수용은 품질 저하로 이어집니다.",
    totalVotes: 1046,
    status: "active",
    createdAt: "2024-01-12",
  },
  {
    id: "28",
    category: ["colleague", "personal"],
    title: "동료의 개인적인 험담",
    persona: { position: "사원", yearsOfExperience: 2 },
    situation:
      "점심시간에 동료가 다른 팀원에 대한 험담을 합니다. 동조하지 않으면 분위기가 어색해질 것 같고, 동조하자니 그 팀원과도 친하게 지내고 있어 곤란합니다.",
    choices: [
      {
        id: "a",
        text: "적당히 맞장구치고 넘어간다",
        votes: 234,
        votesByPosition: { intern: 45, staff: 67, senior: 68, manager: 38, director: 16 },
      },
      {
        id: "b",
        text: "화제를 다른 쪽으로 돌린다",
        votes: 456,
        votesByPosition: { intern: 67, staff: 123, senior: 145, manager: 82, director: 39 },
      },
      {
        id: "c",
        text: "그 팀원의 좋은 점을 언급한다",
        votes: 178,
        votesByPosition: { intern: 28, staff: 56, senior: 52, manager: 30, director: 12 },
      },
      {
        id: "d",
        text: "험담은 좋지 않다고 직접 말한다",
        votes: 145,
        votesByPosition: { intern: 23, staff: 45, senior: 42, manager: 25, director: 10 },
      },
    ],
    comments: [
      {
        id: "c27",
        author: "퇴근 눈치보는 오리",
        choiceId: "b",
        content: "어느 쪽에도 서지 않으면서 빠져나가는 게 최선이에요.",
        timestamp: "1시간 전",
        likes: 56,
      },
    ],
    aiRecommendation: "B. 화제를 다른 쪽으로 돌린다",
    aiReasoning:
      "험담에 동조하면 나중에 문제가 될 수 있고, 직접 지적하면 관계가 불편해집니다. 자연스러운 화제 전환이 가장 무난합니다.",
    totalVotes: 1013,
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "29",
    category: ["boss", "personal"],
    title: "상사의 사적인 부탁",
    persona: { position: "대리", yearsOfExperience: 3 },
    situation:
      "상사가 업무와 무관한 개인적인 부탁(개인 심부름, 가족 관련 업무 등)을 요청합니다. 거절하기 어려운 분위기이고, 이런 일이 자주 반복됩니다.",
    choices: [
      {
        id: "a",
        text: "그냥 해드린다",
        votes: 178,
        votesByPosition: { intern: 34, staff: 56, senior: 48, manager: 28, director: 12 },
      },
      {
        id: "b",
        text: "정중하게 업무에 집중해야 해서 어렵다고 한다",
        votes: 389,
        votesByPosition: { intern: 45, staff: 112, senior: 123, manager: 72, director: 37 },
      },
      {
        id: "c",
        text: "HR에 상담한다",
        votes: 145,
        votesByPosition: { intern: 23, staff: 38, senior: 45, manager: 28, director: 11 },
      },
      {
        id: "d",
        text: "다른 핑계를 대고 피한다",
        votes: 234,
        votesByPosition: { intern: 45, staff: 67, senior: 68, manager: 38, director: 16 },
      },
    ],
    comments: [],
    aiRecommendation: "B. 정중하게 업무에 집중해야 해서 어렵다고 한다",
    aiReasoning: "명확한 경계 설정이 필요합니다. 정중하되 단호하게 거절하는 연습이 필요합니다.",
    totalVotes: 946,
    status: "active",
    createdAt: "2024-01-08",
  },
  {
    id: "30",
    category: ["project", "colleague"],
    title: "팀 프로젝트에서 무임승차하는 동료",
    persona: { position: "사원", yearsOfExperience: 2 },
    situation:
      "팀 프로젝트에서 한 동료가 계속 자기 역할을 제대로 하지 않고 다른 팀원들이 커버하고 있습니다. 팀장님은 이 상황을 모르는 것 같습니다.",
    choices: [
      {
        id: "a",
        text: "팀장님께 상황을 알린다",
        votes: 234,
        votesByPosition: { intern: 34, staff: 67, senior: 78, manager: 38, director: 17 },
      },
      {
        id: "b",
        text: "해당 동료에게 직접 이야기한다",
        votes: 389,
        votesByPosition: { intern: 56, staff: 112, senior: 123, manager: 67, director: 31 },
      },
      {
        id: "c",
        text: "팀 미팅에서 역할 분담을 다시 논의하자고 제안한다",
        votes: 312,
        votesByPosition: { intern: 45, staff: 89, senior: 98, manager: 56, director: 24 },
      },
      {
        id: "d",
        text: "참고 그냥 진행한다",
        votes: 89,
        votesByPosition: { intern: 18, staff: 28, senior: 25, manager: 13, director: 5 },
      },
    ],
    comments: [
      {
        id: "c28",
        author: "연봉 협상하는 호랑이",
        choiceId: "b",
        content: "먼저 당사자와 대화해보고, 개선이 없으면 그때 팀장님께 말씀드리는 게 순서예요.",
        timestamp: "4시간 전",
        likes: 67,
      },
    ],
    aiRecommendation: "B. 해당 동료에게 직접 이야기한다",
    aiReasoning: "바로 상사에게 보고하기보다 당사자와 먼저 대화하는 것이 건강한 팀 문화입니다.",
    totalVotes: 1024,
    status: "active",
    createdAt: "2024-01-06",
  },
  {
    id: "31",
    category: ["client", "colleague"],
    title: "고객사 미팅에서 동료의 실수",
    persona: { position: "대리", yearsOfExperience: 4 },
    situation:
      "고객사 미팅 중 동료가 잘못된 정보를 전달했습니다. 바로 정정하면 동료 체면이 깎이고, 넘어가면 고객사에 잘못된 인식을 줄 수 있습니다.",
    choices: [
      {
        id: "a",
        text: "미팅 중 자연스럽게 정정한다",
        votes: 312,
        votesByPosition: { intern: 34, staff: 89, senior: 98, manager: 62, director: 29 },
      },
      {
        id: "b",
        text: "미팅 후 고객사에 별도로 정정 연락을 드린다",
        votes: 378,
        votesByPosition: { intern: 56, staff: 98, senior: 112, manager: 78, director: 34 },
      },
      {
        id: "c",
        text: "미팅 후 동료에게 알리고 같이 정정한다",
        votes: 289,
        votesByPosition: { intern: 45, staff: 78, senior: 89, manager: 52, director: 25 },
      },
      {
        id: "d",
        text: "큰 문제가 아니면 넘어간다",
        votes: 123,
        votesByPosition: { intern: 23, staff: 38, senior: 35, manager: 20, director: 7 },
      },
    ],
    comments: [],
    aiRecommendation: "A. 미팅 중 자연스럽게 정정한다",
    aiReasoning:
      "잘못된 정보는 빨리 정정할수록 좋습니다. 동료를 탓하는 뉘앙스 없이 자연스럽게 보완하는 형태로 정정하세요.",
    totalVotes: 1102,
    status: "active",
    createdAt: "2024-01-04",
  },
  {
    id: "32",
    category: ["boss", "colleague"],
    title: "상사가 특정 동료만 편애할 때",
    persona: { position: "사원", yearsOfExperience: 2 },
    situation:
      "팀장님이 특정 동료만 좋은 프로젝트를 주고, 성과도 더 높게 평가하는 것 같습니다. 같은 성과를 내도 저는 인정받지 못하는 느낌입니다.",
    choices: [
      {
        id: "a",
        text: "팀장님께 직접 피드백을 요청한다",
        votes: 312,
        votesByPosition: { intern: 34, staff: 89, senior: 98, manager: 62, director: 29 },
      },
      {
        id: "b",
        text: "더 눈에 띄는 성과를 내려고 노력한다",
        votes: 345,
        votesByPosition: { intern: 56, staff: 98, senior: 102, manager: 62, director: 27 },
      },
      {
        id: "c",
        text: "HR에 상담한다",
        votes: 145,
        votesByPosition: { intern: 23, staff: 45, senior: 42, manager: 25, director: 10 },
      },
      {
        id: "d",
        text: "다른 팀이나 부서로의 이동을 고려한다",
        votes: 178,
        votesByPosition: { intern: 28, staff: 56, senior: 52, manager: 30, director: 12 },
      },
    ],
    comments: [],
    aiRecommendation: "A. 팀장님께 직접 피드백을 요청한다",
    aiReasoning: "추측으로 판단하기보다 직접 대화를 통해 기대와 평가 기준을 확인하는 것이 먼저입니다.",
    totalVotes: 980,
    status: "active",
    createdAt: "2024-01-02",
  },
]

export const pendingSimulations: Simulation[] = [
  {
    id: "p1",
    category: "boss",
    title: "점심시간에 업무 지시를 받았을 때",
    persona: { position: "사원", yearsOfExperience: 1 },
    situation:
      "점심시간에 잠깐 쉬고 있는데, 상사가 급한 업무를 지시합니다. 배도 고프고 쉬고 싶은데 어떻게 해야 할까요?",
    choices: [
      { id: "a", text: "바로 업무를 처리한다", votes: 0 },
      { id: "b", text: "점심 먹고 하겠다고 한다", votes: 0 },
      { id: "c", text: "간단히 먹고 빨리 처리한다", votes: 0 },
      { id: "d", text: "급한 정도를 먼저 확인한다", votes: 0 },
    ],
    comments: [],
    aiRecommendation: "",
    aiReasoning: "",
    totalVotes: 0,
    status: "pending",
    createdAt: "2024-01-16",
  },
  {
    id: "p2",
    category: ["colleague", "personal"],
    title: "동료가 대출을 부탁할 때",
    persona: { position: "대리", yearsOfExperience: 3 },
    situation:
      "평소 친하게 지내던 동료가 급한 사정이 있다며 큰 금액의 대출을 부탁합니다. 거절하면 관계가 어색해질 것 같습니다.",
    choices: [
      { id: "a", text: "빌려준다", votes: 0 },
      { id: "b", text: "정중하게 거절한다", votes: 0 },
      { id: "c", text: "적은 금액만 빌려준다", votes: 0 },
      { id: "d", text: "다른 해결책을 함께 찾아본다", votes: 0 },
    ],
    comments: [],
    aiRecommendation: "",
    aiReasoning: "",
    totalVotes: 0,
    status: "pending",
    createdAt: "2024-01-16",
  },
  {
    id: "p3",
    category: ["project", "client"],
    title: "고객사가 경쟁사 정보를 요청할 때",
    persona: { position: "과장", yearsOfExperience: 7 },
    situation: "오래 거래한 고객사 담당자가 친분을 이유로 경쟁사와의 계약 조건 정보를 슬쩍 물어봅니다.",
    choices: [
      { id: "a", text: "알려줄 수 없다고 명확히 한다", votes: 0 },
      { id: "b", text: "모른다고 둘러댄다", votes: 0 },
      { id: "c", text: "대략적인 정보만 알려준다", votes: 0 },
      { id: "d", text: "상사에게 보고하고 대응을 논의한다", votes: 0 },
    ],
    comments: [],
    aiRecommendation: "",
    aiReasoning: "",
    totalVotes: 0,
    status: "pending",
    createdAt: "2024-01-17",
  },
]

let approvedSimulations: Simulation[] = []

export const getApprovedSimulations = () => approvedSimulations

export const addApprovedSimulation = (simulation: Simulation): Simulation => {
  const newSimulation: Simulation = {
    ...simulation,
    id: `approved-${Date.now()}`,
    status: "active",
    totalVotes: 0,
    comments: [],
    aiRecommendation: "AI 분석 중...",
    aiReasoning: "새로 등록된 상담으로, AI가 최적의 답변을 분석하고 있습니다. 잠시 후 업데이트됩니다.",
    createdAt: new Date().toISOString().split("T")[0],
  }
  approvedSimulations = [newSimulation, ...approvedSimulations]
  return newSimulation
}

export const getAllActiveSimulations = () => {
  return [...approvedSimulations, ...mockSimulations]
}

export const getCategoryArray = (category: string | string[]): string[] => {
  return Array.isArray(category) ? category : [category]
}

export const hasCategory = (simulation: Simulation, categoryId: string): boolean => {
  const cats = getCategoryArray(simulation.category)
  return cats.includes(categoryId)
}

export const hasAnyCategory = (simulation: Simulation, categoryIds: string[]): boolean => {
  if (categoryIds.length === 0) return true
  const cats = getCategoryArray(simulation.category)
  return categoryIds.some((id) => cats.includes(id))
}
