# AI API 설정 가이드

## GPT-OSS-120B 모델 연동

상황 제안 탭에서 AI 다듬기 기능을 사용하려면 다음과 같이 설정되어 있습니다.

### API 정보

- **엔드포인트**: `https://hackerthon-gpt120.platform.haiqv.ai/v1/chat/completions`
- **모델**: `GPT-OSS-120B`
- **인증**: 불필요

### API 요청 형식

```json
{
  "model": "GPT-OSS-120B",
  "messages": [
    {
      "role": "user",
      "content": "사용자 프롬프트"
    }
  ]
}
```

### API 응답 형식

```json
{
  "choices": [
    {
      "message": {
        "content": "AI 생성 내용 (JSON 형식)"
      }
    }
  ]
}
```

AI는 다음 형식의 JSON을 생성합니다:

```json
{
  "title": "상황 제목",
  "situation": "상황 설명",
  "choices": [
    {"id": "1", "text": "선택지 1"},
    {"id": "2", "text": "선택지 2"},
    {"id": "3", "text": "선택지 3"},
    {"id": "4", "text": "선택지 4"}
  ]
}
```

### 사용 방법

1. "상황 제안" 탭으로 이동
2. 카테고리, 직급, 경력 선택
3. 상황 입력 후 "AI로 다듬기" 버튼 클릭
4. AI가 생성한 내용 확인 및 수정
5. 제출하여 관리자 승인 대기

### 주의사항

- API는 코드 블록(```json ... ```)으로 감싸진 응답을 반환할 수 있으며, 자동으로 파싱됩니다
- 네트워크 오류 발생 시 다시 시도해주세요
