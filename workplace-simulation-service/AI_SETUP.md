# AI API 설정 가이드

## GPT-OSS-120B 모델 연동

상황 제안 탭에서 AI 다듬기 기능을 사용하려면 다음 환경 변수를 설정해야 합니다.

### 1. 환경 변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
AI_API_ENDPOINT=http://your-ai-api-endpoint.com/v1/chat/completions
AI_API_KEY=your-api-key-here
```

### 2. 설정 값

- **AI_API_ENDPOINT**: GPT-OSS-120B 모델 API 엔드포인트
  - 기본값: `http://localhost:8000/v1/chat/completions`
  - OpenAI 호환 API 형식을 사용합니다

- **AI_API_KEY**: API 인증 키 (선택사항)
  - API 키가 필요한 경우에만 설정하세요

### 3. API 형식

API는 OpenAI 호환 형식을 따릅니다:

```json
{
  "model": "GPT-OSS-120B",
  "messages": [
    {
      "role": "system",
      "content": "시스템 프롬프트"
    },
    {
      "role": "user",
      "content": "사용자 입력"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1000
}
```

응답 형식:

```json
{
  "choices": [
    {
      "message": {
        "content": "{\"title\": \"...\", \"situation\": \"...\", \"choices\": [...]}"
      }
    }
  ]
}
```

### 4. 테스트

1. 환경 변수 설정 후 개발 서버 재시작
2. "상황 제안" 탭으로 이동
3. 상황 입력 후 "AI로 다듬기" 버튼 클릭
4. AI가 생성한 내용 확인

### 문제 해결

- **API 호출 실패**: AI_API_ENDPOINT가 올바른지 확인
- **인증 오류**: AI_API_KEY 확인
- **응답 파싱 오류**: AI 응답이 JSON 형식인지 확인
