import fs from "fs"
import path from "path"

// AI 추천 생성 함수
async function generateAIRecommendation(simulation: Simulation): Promise<{ recommendation: string; reasoning: string }> {
  try {
    const categoryNames = Array.isArray(simulation.category) 
      ? simulation.category.join(", ") 
      : simulation.category

    const choicesText = simulation.choices.map((choice, idx) => 
      `${idx + 1}. ${choice.text}`
    ).join("\n")

    const prompt = `당신은 업무 상황 전문 컨설턴트입니다. 다음 상황에서 가장 적절한 선택지를 추천하고 그 이유를 설명해주세요.

상황 정보:
- 카테고리: ${categoryNames}
- 직급: ${simulation.persona.position}
- 경력: ${simulation.persona.yearsOfExperience}년

상황:
${simulation.situation}

선택지:
${choicesText}

응답은 반드시 다음 JSON 형식으로만 제공해주세요:
{
  "recommendation": "추천 선택지 번호 (예: 1, 2, 3, 4)",
  "reasoning": "추천 이유 (2-3문장, 150자 이내)"
}`

    const apiEndpoint = process.env.AI_API_ENDPOINT || "https://hackerthon-gpt120.platform.haiqv.ai/v1/chat/completions"
    
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "GPT-OSS-120B",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      console.error("AI API error:", await response.text())
      // 기본값 반환
      return {
        recommendation: simulation.choices[0].id,
        reasoning: "전문가 추천 답변을 생성하는 중 문제가 발생했습니다.",
      }
    }

    const aiData = await response.json()
    const content = aiData.choices?.[0]?.message?.content || ""
    
    // 코드 블록 제거
    const cleanContent = content
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim()
    
    const parsed = JSON.parse(cleanContent)
    
    // 선택지 번호를 ID로 변환
    const choiceIndex = parseInt(parsed.recommendation) - 1
    const recommendedChoiceId = simulation.choices[choiceIndex]?.id || simulation.choices[0].id
    
    return {
      recommendation: recommendedChoiceId,
      reasoning: parsed.reasoning,
    }
  } catch (error) {
    console.error("Failed to generate AI recommendation:", error)
    // 기본값 반환
    return {
      recommendation: simulation.choices[0].id,
      reasoning: "전문가 추천 답변을 생성하는 중 문제가 발생했습니다.",
    }
  }
}

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
  approvedAt?: string
  persona: Persona
}

export interface Database {
  simulations: Simulation[]
  pendingSimulations: Simulation[]
}

const DB_PATH = path.join(process.cwd(), "data", "database.json")

// 데이터베이스 디렉토리가 없으면 생성
function ensureDataDir() {
  const dataDir = path.dirname(DB_PATH)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// 데이터베이스 읽기
export function readDB(): Database {
  ensureDataDir()
  
  if (!fs.existsSync(DB_PATH)) {
    // 초기 데이터베이스 생성
    const initialDB: Database = {
      simulations: [],
      pendingSimulations: [],
    }
    writeDB(initialDB)
    return initialDB
  }

  const data = fs.readFileSync(DB_PATH, "utf-8")
  return JSON.parse(data)
}

// 데이터베이스 쓰기
export function writeDB(data: Database) {
  ensureDataDir()
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8")
}

// 승인된 시뮬레이션 가져오기
export function getApprovedSimulations(): Simulation[] {
  const db = readDB()
  return db.simulations.filter((s) => s.status === "active")
}

// 대기 중인 시뮬레이션 가져오기
export function getPendingSimulations(): Simulation[] {
  const db = readDB()
  return db.pendingSimulations
}

// 시뮬레이션 ID로 가져오기
export function getSimulationById(id: string): Simulation | null {
  const db = readDB()
  const sim = db.simulations.find((s) => s.id === id)
  if (sim) return sim
  
  return db.pendingSimulations.find((s) => s.id === id) || null
}

// 새 시뮬레이션 제안
export function createPendingSimulation(simulation: Omit<Simulation, "id" | "status" | "createdAt" | "totalVotes" | "comments">): Simulation {
  const db = readDB()
  
  const newSim: Simulation = {
    ...simulation,
    id: Date.now().toString(),
    status: "pending",
    createdAt: new Date().toISOString(),
    totalVotes: 0,
    comments: [],
  }
  
  db.pendingSimulations.push(newSim)
  writeDB(db)
  
  return newSim
}

// 시뮬레이션 승인
export async function approveSimulation(id: string): Promise<boolean> {
  const db = readDB()
  const index = db.pendingSimulations.findIndex((s) => s.id === id)
  
  if (index === -1) return false
  
  const simulation = db.pendingSimulations[index]
  simulation.status = "active"
  simulation.approvedAt = new Date().toISOString()
  
  // AI 추천 생성
  const aiResult = await generateAIRecommendation(simulation)
  simulation.aiRecommendation = aiResult.recommendation
  simulation.aiReasoning = aiResult.reasoning
  
  db.simulations.push(simulation)
  db.pendingSimulations.splice(index, 1)
  
  writeDB(db)
  return true
}

// 시뮬레이션 거절
export function rejectSimulation(id: string): boolean {
  const db = readDB()
  const index = db.pendingSimulations.findIndex((s) => s.id === id)
  
  if (index === -1) return false
  
  db.pendingSimulations.splice(index, 1)
  writeDB(db)
  
  return true
}

// 투표
export function voteOnChoice(simulationId: string, choiceId: string, position?: string): boolean {
  const db = readDB()
  const simulation = db.simulations.find((s) => s.id === simulationId)
  
  if (!simulation) return false
  
  const choice = simulation.choices.find((c) => c.id === choiceId)
  if (!choice) return false
  
  choice.votes += 1
  simulation.totalVotes += 1
  
  if (position && choice.votesByPosition) {
    const posKey = position as keyof typeof choice.votesByPosition
    if (posKey in choice.votesByPosition) {
      choice.votesByPosition[posKey] += 1
    }
  }
  
  writeDB(db)
  return true
}

// 댓글 추가
export function addComment(
  simulationId: string,
  choiceId: string,
  author: string,
  content: string
): Comment | null {
  const db = readDB()
  const simulation = db.simulations.find((s) => s.id === simulationId)
  
  if (!simulation) return null
  
  const newComment: Comment = {
    id: Date.now().toString(),
    author,
    choiceId,
    content,
    timestamp: new Date().toISOString(),
    likes: 0,
    replies: [],
  }
  
  simulation.comments.push(newComment)
  writeDB(db)
  
  return newComment
}
