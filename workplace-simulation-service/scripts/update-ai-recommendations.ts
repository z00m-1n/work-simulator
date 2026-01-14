import fs from "fs"
import path from "path"

interface Simulation {
  id: string
  category: string | string[]
  title: string
  situation: string
  choices: Array<{ id: string; text: string; votes: number; votesByPosition: any }>
  persona: { position: string; yearsOfExperience: number }
  aiRecommendation: string
  aiReasoning: string
  [key: string]: any
}

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

    const apiEndpoint = "https://hackerthon-gpt120.platform.haiqv.ai/v1/chat/completions"
    
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
      return {
        recommendation: simulation.choices[0].id,
        reasoning: "전문가 추천 답변을 생성하는 중 문제가 발생했습니다.",
      }
    }

    const aiData = await response.json()
    const content = aiData.choices?.[0]?.message?.content || ""
    
    const cleanContent = content
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim()
    
    const parsed = JSON.parse(cleanContent)
    
    const choiceIndex = parseInt(parsed.recommendation) - 1
    const recommendedChoiceId = simulation.choices[choiceIndex]?.id || simulation.choices[0].id
    
    return {
      recommendation: recommendedChoiceId,
      reasoning: parsed.reasoning,
    }
  } catch (error) {
    console.error("Failed to generate AI recommendation:", error)
    return {
      recommendation: simulation.choices[0].id,
      reasoning: "전문가 추천 답변을 생성하는 중 문제가 발생했습니다.",
    }
  }
}

async function updateAllRecommendations() {
  const dbPath = path.join(process.cwd(), "data", "database.json")
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"))

  console.log(`총 ${db.simulations.length}개의 시뮬레이션에 대해 AI 추천을 생성합니다...`)

  for (let i = 0; i < db.simulations.length; i++) {
    const simulation = db.simulations[i]
    console.log(`\n[${i + 1}/${db.simulations.length}] 처리 중: ${simulation.title}`)
    
    const aiResult = await generateAIRecommendation(simulation)
    simulation.aiRecommendation = aiResult.recommendation
    simulation.aiReasoning = aiResult.reasoning
    
    console.log(`  - 추천: ${aiResult.recommendation}`)
    console.log(`  - 이유: ${aiResult.reasoning.substring(0, 50)}...`)
    
    // API 레이트 리밋을 고려하여 1초 대기
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8")
  console.log("\n✅ 모든 AI 추천이 업데이트되었습니다!")
}

updateAllRecommendations().catch(console.error)
