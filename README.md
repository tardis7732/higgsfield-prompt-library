# Higgsfield Prompt Library

영상 제작 현장에서는 작업자마다 프롬프트 작성 방식과 디테일 수준이 달라 결과물의 품질과 일관성에 편차가 생길 수 있습니다. 이 문제를 줄이기 위해 Higgsfield가 공개한 `adiliada` 영화 프로젝트의 실제 영상 프롬프트를 수집·분석하고, 특정 모델에 종속되지 않고 여러 LLM에서 활용할 수 있는 Markdown 작성 가이드를 제작했습니다.

가이드 제작에 사용한 원본 프롬프트도 함께 크롤링해 원문, 한국어 번역, 영상, 참조 이미지, 제작 정보와 출처를 웹페이지에서 확인할 수 있도록 구성했습니다. 사용자는 완성된 규칙만 내려받는 데 그치지 않고, 각 규칙이 실제 프롬프트에서 어떻게 사용되었는지 사례를 비교하면서 직접 익힐 수 있습니다.

**웹사이트:** [tardis7732.github.io/higgsfield-prompt-library](https://tardis7732.github.io/higgsfield-prompt-library/)

![Higgsfield Prompt Library 웹사이트의 Video Prompt Guide 화면](./assets/screenshots/higgsfield-prompt-library-guide.png)

## 주요 기능

- Higgsfield가 공개한 `adiliada` 영화 프로젝트의 실제 영상 프롬프트 탐색
- 원본 영어 프롬프트와 한국어 번역을 나란히 비교
- 원본 영상, 썸네일, 참조 이미지와 출처 페이지 확인
- 프롬프트별 메타데이터와 제작 정보 열람
- 원문·번역문 개별 복사
- 42개 원본 프롬프트의 작성 패턴을 분석한 범용 LLM용 Markdown 가이드 제공
- 가이드 규칙과 실제 사용 사례를 같은 페이지에서 비교 학습
- 가이드 목차 탐색 및 Markdown 파일 다운로드
- 별도 빌드 과정 없이 GitHub Pages에서 정적 배포

## ChatGPT 또는 다른 AI에서 활용하기

1. [비디오 프롬프트 작성 가이드 MD](./downloads/video_prompt_writing_rules.md)를 다운로드합니다.
2. 새 대화에 가이드 MD와 사용할 참조 이미지·영상을 첨부합니다.
3. 아래 지시문을 붙여 넣고 `My brief:` 아래에 만들고 싶은 장면을 작성합니다.
4. AI가 설명이나 분석 없이 바로 사용할 수 있는 영어 비디오 프롬프트만 출력하도록 합니다.

![가이드 MD를 활용해 구조화된 영어 프롬프트를 만드는 흐름](./assets/prompt-guide-usage.svg)

```text
Use the attached "Cinematic Video Prompt Writing Rules" as the governing style guide.
Turn my brief and attached references into one self-contained English video-generation prompt.
Treat it as a continuity-safe shot plan, not a mood board.
Use uppercase English section headings. Follow only the sections needed for the scene.
Resolve reference scope, first-frame state, shot structure, camera, timing, physics,
lighting, audio, and final locks before writing.
Output only the final English prompt. Do not output workflow notes, patch logs,
analysis, translations, Hide, or unresolved reference tokens.

My brief:
20대 곱슬머리 남성이 밝은 오후 2시의 파리 거리에서 달린다. 검은 양복의 남성이
그를 뒤쫓는다. 10초 안에 그는 쓰레기통을 넘어뜨리고 행인과 어깨를 부딪히지만
멈추지 않고 계속 달린다.
```

참조 자료를 사용할 때는 각 자료의 적용 범위를 짧게 고정하는 것이 좋습니다.

```text
@Image 1: character face only
@Image 2: location and lighting only
@Video 1: camera timing for Shot 3 only
```

## 저장소 구성

```text
.
├─ index.html                         # 웹 인터페이스
├─ style.css                          # 화면 스타일
├─ app.js                             # 탐색, 렌더링, 복사, 가이드 뷰어
├─ config.js                          # 데이터 및 가이드 경로
├─ data/
│  └─ library.json                    # 브라우저용 프롬프트 라이브러리
├─ downloads/
│  └─ video_prompt_writing_rules.md   # 다운로드용 작성 가이드
├─ assets/
│  ├─ prompt-guide-usage.svg          # 가이드 사용 흐름
│  └─ screenshots/                    # README용 실제 웹 화면
└─ .github/workflows/
   └─ deploy-pages.yml                # GitHub Pages 자동 배포
```

공개 저장소에는 웹 뷰어, 정리된 JSON, 다운로드용 가이드와 배포 설정만 포함합니다. 크롤러, 브라우저 프로필, 로컬 원본 서버, 수집 과정의 임시 파일은 포함하지 않습니다.

## 로컬 실행

브라우저에서 JSON과 Markdown을 `fetch`하므로 `index.html`을 직접 여는 대신 간단한 정적 서버를 사용합니다.

```bash
python -m http.server 8000
```

실행 후 [http://localhost:8000](http://localhost:8000)을 엽니다.

## GitHub Pages 배포

`main` 브랜치에 변경 사항을 푸시하면 `.github/workflows/deploy-pages.yml`이 정적 사이트 전체를 자동 배포합니다.

새 저장소에서 사용할 경우:

1. 저장소를 Public으로 생성합니다.
2. 이 프로젝트 파일을 저장소 루트에 올립니다.
3. **Settings → Pages → Source**에서 **GitHub Actions**를 선택합니다.
4. `main` 브랜치에 푸시하면 배포가 실행됩니다.

`Download MD` 버튼은 같은 저장소의 `downloads/video_prompt_writing_rules.md`를 직접 제공하므로 GitHub Pages와 일반 정적 호스팅에서 모두 동작합니다.
