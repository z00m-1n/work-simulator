import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { categories, situation, position, yearsOfExperience } = body

    if (!situation || !position || !categories || categories.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // GPT-OSS-120B 모델 호출을 위한 프롬프트 구성
    const prompt = `당신은 업무 상황 시뮬레이션을 만드는 전문가입니다.

사용자 정보:
- 직급: ${position}
- 경력: ${yearsOfExperience}년
- 카테고리: ${categories.join(", ")}

사용자가 제안한 상황:
${situation}

위 상황을 바탕으로 다음을 생성해주세요:
1. 간결하고 명확한 제목 (20자 이내)
2. 구체적이고 현실적인 상황 설명 (100-200자)
3. 4개의 선택지 (각각 다른 대응 방식을 제시)

응답은 반드시 다음 JSON 형식으로만 제공해주세요:
{
  "title": "제목",
  "situation": "상황 설명",
  "choices": [
    {"id": "1", "text": "선택지 1"},
    {"id": "2", "text": "선택지 2"},
    {"id": "3", "text": "선택지 3"},
    {"id": "4", "text": "선택지 4"}
  ]
}`

    // GPT-OSS-120B API 호출
    const apiEndpoint = process.env.AI_API_ENDPOINT || "http://localhost:8000/v1/chat/completions"
    const apiKey = process.env.AI_API_KEY || ""

    const aiResponse = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        model: "GPT-OSS-120B",
        messages: [
          {
            role: "system",
            content: "당신은 업무 상황 시뮬레이션을 생성하는 전문가입니다.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!aiResponse.ok) {
      console.error("AI API error:", await aiResponse.text())
      return NextResponse.json({ error: "AI 생성 실패" }, { status: 500 })
    }

    const aiData = await aiResponse.json()
    
    // API 응답 형식에 따라 파싱 조정 필요
    let generatedContent
    try {
      // OpenAI 스타일 응답 가정
      const content = aiData.choices?.[0]?.message?.content || aiData.content || ""
      generatedContent = JSON.parse(content)
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      return NextResponse.json({ error: "AI 응답 파싱 실패" }, { status: 500 })
    }

    return NextResponse.json(generatedContent)
  } catch (error) {
    console.error("AI refine error:", error)
    return NextResponse.json({ error: "AI 처리 중 오류 발생" }, { status: 500 })
  }
}
