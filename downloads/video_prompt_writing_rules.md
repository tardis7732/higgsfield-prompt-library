# 시네마틱 비디오 프롬프트 작성 규칙

> 대상: `output/higgsfield_generations.md`의 Original 영어 프롬프트 42개를 전수 분석해 만든, 다른 AI에게 전달하는 용도의 작성 가이드입니다.
>
> 이 문서는 특정 서비스의 공식 문법이 아닙니다. ADILIADA 원본들이 실제로 사용하는 **정밀한 촬영·연속성 설계 방식**을 재사용할 수 있도록 정리한 것입니다.

## 이 문서의 사용법

다른 AI에게 이 문서와 함께 장면 브리프, 사용할 참조 이미지/영상, 반드시 지켜야 할 조건을 전달합니다. 그 AI는 최종적으로 **영어 비디오 프롬프트 본문만** 작성해야 합니다. 프롬프트는 짧은 분위기 문장이 아니라, 영상 생성 모델이 헷갈릴 지점을 미리 없애는 촬영 설계서여야 합니다.

권장 요청문:

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
[붙여 넣기]
```

필수 정보가 빠져 결과가 크게 달라질 때에는, AI가 프롬프트를 쓰기 전에 짧고 구체적인 질문을 하게 합니다. 특히 총 길이, 컷 구조, 참조별 역할, 인물 수, 카메라 방식, 마지막 프레임은 확인 가치가 큽니다.

---

## 1. 원본 코퍼스에서 추출한 핵심 원칙

원본 42개는 총 약 646,000자이며, 평균 약 15,400자입니다. 짧은 오브젝트 샷은 약 3,400자, 복잡한 다중 샷은 약 36,000자까지 확장됩니다. 길이가 목적은 아닙니다. **실패 위험이 큰 정보만 충분히 명시하는 것**이 목적입니다.

좋은 프롬프트의 중심은 다음 한 줄로 요약됩니다.

> 좋은 영상 프롬프트는 예쁜 묘사문이 아니라, 참조 범위·첫 프레임·시간별 상태 변화·카메라·물리·조명·제약이 모순 없이 이어지는 촬영 계약서다.

### 반드시 지킬 작성 원칙

1. **한 사실에는 하나의 진실원천만 둔다.**
   인물의 의상, 소품의 손 위치, 광원, 카메라 축, 사건의 방향을 서로 다른 곳에서 다르게 쓰지 않습니다.

2. **시작 상태와 종료 상태를 먼저 잠근다.**
   “무엇이 일어난다”보다 `시작 상태 → 촉발 사건 → 물리적 반응 → 끝 상태`를 명확히 씁니다.

3. **모델이 흔히 틀릴 것만 의도적으로 반복한다.**
   인물 수, 좌우 방향, 소품의 개수·위치, 얼굴 가림, 카메라 축, 빛의 출처, 최종 상태는 `참조`, `타이밍`, `POSITIVE LOCKS`에 다시 확인합니다. 모든 문장을 복사해 반복하지는 않습니다.

4. **분위기 단어를 촬영 사실로 번역한다.**
   `cinematic`, `epic`, `dramatic`만 쓰지 말고, 렌즈·카메라·광원·색·재질·연기·속도로 그것이 왜 그렇게 보이는지를 씁니다.

5. **불변 조건과 변화 조건을 분리한다.**
   예: “검은 시작에는 등에 있고, 한 번만 뽑히며, 이후 손에만 있다.” 이는 검의 정체성, 전이 시점, 금지 상태를 동시에 정합니다.

6. **원인보다 결과가 먼저 발생하지 않게 한다.**
   충돌 → 힘 전달 → 자세 붕괴 → 낙하처럼 인과 순서를 씁니다. 접촉 없는 피 묻음, 순간 이동, 복제 소품, 이유 없는 카메라 이동은 피합니다.

7. **장면 복잡도에 맞춰 길이를 조절한다.**
   단일 물체·단일 동작·단일 광원 샷에 장문을 강요하지 않습니다. 반대로 다인물, 다중 컷, 위험한 물리 이벤트, 여러 참조, 강한 연속성이 있으면 정밀형으로 확장합니다.

---

## 2. 작성 전에 만드는 내부 연속성 장부

AI는 최종 프롬프트를 쓰기 전에 아래 내용을 내부적으로 정리합니다. 이 장부 자체를 최종 프롬프트에 출력할 필요는 없습니다.

| 구분 | 확정할 내용 |
|---|---|
| 불변 요소 | 인물/생물/차량/소품의 수, 정체성, 의상, 시간대, 날씨, 장소, 주 광원, 카메라 축 |
| 시작 상태 | 0초 첫 프레임의 구도, 자세, 시선, 손 위치, 소품 상태, 화면 안/밖 여부 |
| 변화 이벤트 | 무엇이 언제, 어떤 힘·접촉·결정 때문에 바뀌는지 |
| 종료 상태 | 마지막 프레임에서 남아 있는 것, 사라진 것, 움직임이 끝난 상태 |
| 지속 연속성 | 컷을 넘어 유지되는 손, 의상, 상처, 빛, 방향, 위치, 소품, 배경 상태 |
| 금지 상태 | 동시에 존재하면 안 되는 물체, 너무 이른 변화, 추가 인물, 원치 않는 배경/광원/카메라 행동 |
| 참조 범위 | 각 이미지·영상이 무엇만 제어하고 무엇을 절대 가져오지 않는지 |

상태 전이는 아래처럼 문장으로도 분명해야 합니다.

```text
INITIAL STATE: The driver's hands, sleeves, and face are completely clean.
EVENT: At 5.0s his bare hand closes around the wounded passenger's palm.
AFTER STATE: Blood transfers only at that contact; from then on only that hand is smeared.
CONTINUITY: The passenger remains the sole source of blood for the rest of the shot.
```

---

## 3. 참조 이미지·영상 사용 규칙

참조는 “이 이미지처럼 만들어라”가 아닙니다. 각 참조마다 **적용 범위, 비적용 범위, 적용 시간, 우선순위**를 확정합니다. 참조는 정체성·디자인·재질·구조의 출처이고, 최종 카메라 구도는 기본적으로 프롬프트가 새로 설계합니다.

### 참조별 필수 선언

각 `@Image 1`, `@Video 1`, `@CHARACTER_NAME`에 아래 네 가지를 씁니다.

1. 무엇을 제어하는가
2. 무엇을 제어하지 않는가
3. 어느 샷 또는 시간대에만 적용되는가
4. 텍스트와 참조가 충돌하면 무엇이 우선하는가

권장 문장 형식:

```text
@Image 1 — location reference. It controls the architecture, material, layout,
weather, and light quality only. Its original camera angle and framing are not inherited.

@Image 2 — character reference. It controls face identity only. The in-shot wardrobe,
hairstyle, props, and action are defined by this prompt and override incidental details
in the reference.

@Video 1 — depth, screen placement, and timing reference for Shot 3 only. Do not inherit
its colour palette, lighting, texture, subjects, or camera framing.
```

### 참조 오염을 막는 규칙

- 턴어라운드 시트·그리드 이미지는 **디자인만** 가져오고, 여러 패널·그리드·스튜디오 배경은 프레임에 렌더하지 않습니다.
- 장소 참조의 원래 카메라 각도는, 특별히 “첫 프레임을 그대로 재현”하라고 하지 않는 한 상속하지 않습니다.
- 인물 참조에 섞인 수염, 안경, 배경, 포즈, 조명, 의상이 원치 않으면 어떤 요소를 덮어쓸지 명시합니다.
- 참조 이미지의 군중·사람·물체가 실제 장면에 존재한다는 뜻은 아닙니다. 필요하면 “the people visible in the reference do not exist in this scene”처럼 차단합니다.
- 화면 속 모니터 사진, 포스터, 반사에만 인물이 존재할 수 있으면 그 위치와 존재 범위를 고정합니다.
- 시작 이미지를 사용할 때는 아래 둘 중 하나만 명확히 선택합니다.
  - **정확한 첫 프레임 사용:** `The clip opens exactly on the start image, frame for frame.`
  - **분위기/재질만 사용:** `Carry over only its atmosphere, colour, light, and material language; do not copy its composition.`
- 실제 업로드되지 않았거나 이름이 비어 있는 참조 토큰은 최종 프롬프트에 절대 출력하지 않습니다.

---

## 4. 권장 프롬프트 구조

원본에서 가장 자주 쓰이는 순서는 아래와 같습니다. 모든 섹션을 기계적으로 넣을 필요는 없지만, 복잡한 장면은 이 순서를 유지하면 충돌이 크게 줄어듭니다.

```text
SCENE CONTEXT
CONTINUITY                         # 이전 장면과 이어질 때만
ACTIVE REFERENCES
HOW THE START IMAGE IS USED        # 시작 이미지가 있을 때만
LOCATION MAP                       # 공간/동선이 복잡할 때
FIRST FRAME AND SPATIAL BLOCKING
FORMAT MODE
OPTICS
CAMERA
ACTION TIMING
PHYSICS
LIGHTING
AUDIO
POSITIVE LOCKS
```

| 섹션 | 역할 | 반드시 포함할 정보 |
|---|---|---|
| `SCENE CONTEXT` | 한 문단짜리 장면 계약 | 장소·시간·주체·핵심 사건·정서·의도 |
| `CONTINUITY` | 이전 클립과의 연결 | 이전 상태에서 유지되는 인물, 방향, 상처, 소품, 공간 |
| `ACTIVE REFERENCES` | 참조 해석 | 각 참조의 적용·제외·우선순위 |
| `LOCATION MAP` | 실제 3D 지리 | 전경/중경/배경, 거리, 고도, 동선, 광원 방향 |
| `FIRST FRAME AND SPATIAL BLOCKING` | 0초의 화면 계약 | 화면 좌우, 깊이, 시선, 손·소품, 등장 지연 여부 |
| `FORMAT MODE` | 편집과 시간 구조 | 총 길이, 샷 수, 정확한 컷 수/시점, 속도 램프, 전 구간 불변 조건 |
| `OPTICS` | 렌즈와 초점 | FOV, 렌즈 성격, 거리, 심도, 포커스, 줌 여부 |
| `CAMERA` | 카메라의 몸과 이동 | 위치·높이·방향·축·경로·핸드헬드·재프레이밍 |
| `ACTION TIMING` | 시간별 상태 전이 | 초 단위 비트, 사건의 원인→결과, 컷·포커스·속도 변화 |
| `PHYSICS` | 물질과 힘의 행동 | 질량·관성·마찰·접촉·재질·바람·중력/무중력 |
| `LIGHTING` | 광원 계약 | 출처·방향·부드러움·노출 우선순위·팔레트·금지 광원 |
| `AUDIO` | 소리의 세계 | 다이에제틱 여부, 대사, 환경음, 재질 소리, 음악/자막 규칙 |
| `POSITIVE LOCKS` | 최종 오류 방지 | 수량·정체성·위치·상태·카메라·빛의 고위험 조건 재확인 |

`POSITIVE CONSTRAINTS`와 `POSITIVE LOCKS`는 뜻이 같으므로, 한 프롬프트에서는 하나만 사용합니다.

---

## 5. 섹션별 상세 작성법

### SCENE CONTEXT — 무엇을 찍는 장면인가

한두 문단으로 누가, 어디서, 무엇을, 어떤 인과로 하는지 정의합니다. 서사 요약만 하지 말고 영상의 중심 사건과 최종 방향까지 알려야 합니다.

- 좋음: “A wounded passenger sits directly behind the driver; the driver keeps the car moving and reaches back over his own shoulder to grip his hand.”
- 약함: “A sad, emotional car scene.”

장르·질감 선언은 허용되지만, 이후의 카메라·조명·물리와 연결되어야 합니다. `photoreal live-action`, `35mm film grain`, `retro-analog sci-fi` 같은 선언은 장면의 재질과 빛을 바꾸는 경우에만 넣습니다.

### LOCATION MAP — 실제 공간을 먼저 세운다

공간이 복잡하면 화면 구도보다 먼저 **실제 지리**를 설명합니다.

- 카메라와 주체의 거리, 높이, 기울기
- 전경·중경·배경의 순서
- 통로, 문, 창, 도로, 난간, 건물, 우주선의 실제 연결 관계
- 이동 가능한 경로와 들어오고 나가는 방향
- 광원과 주요 배경이 위치한 방향

필요할 때만 `x=`, `y=`, `screen-left`, `screen-right`, 거리, 고도, 각도를 사용합니다. 좌표를 쓰더라도 “화면 기준 왼쪽”, “인물 자신의 왼손”, “카메라 기준 오른쪽”을 혼동하지 않습니다.

### FIRST FRAME AND SPATIAL BLOCKING — 0초를 고정한다

첫 프레임은 생성 모델이 가장 쉽게 임의로 바꾸는 부분입니다. 아래를 분명히 합니다.

- 처음부터 이미 존재하는 것과, 몇 초 뒤 처음 등장하는 것
- 빈 프레임 홀드가 있는지와 그 길이
- 인물·소품의 화면 위치, 화면 밖 여부, 시선·손 위치
- 첫 프레임에 보이면 안 되는 것
- 카메라가 주체를 따라갈지, 고정할지, 어떤 축을 유지할지

예: `The first 1.2 seconds are free of figures.`와 `The first visible frame already contains the subject and target.`은 전혀 다른 지시이므로 함께 쓰지 않습니다.

### FORMAT MODE — 컷과 시간의 법칙을 먼저 정한다

카메라 설명보다 먼저 편집 구조를 정합니다.

#### 단일 테이크

```text
ONE SINGLE CONTINUOUS TAKE, 10 seconds, real time.
No cuts, no jump cuts, no inserts, no fades, no dissolves, no transitions,
no reframes-as-cuts, and no speed ramps.
```

- 한 테이크인데 컷·순간 전환·불가능한 재프레이밍을 넣지 않습니다.
- 카메라가 이동하면 이동은 하나의 연속 경로여야 합니다.
- 속도 램프나 슬로모션이 있으면 어느 시점부터 어느 시점까지인지 명시합니다.

#### 다중 샷

```text
CONTROLLED MULTI-SHOT SEQUENCE, three shots, two HARD CUTS at 3.0s and 10.5s.
Shot 2 is one uninterrupted take. No other transitions.
```

- 원칙적으로 샷이 3개면 하드컷은 2개입니다.
- 각 컷의 시점·컷 직전/직후 상태·컷이 동작 중간인지 끝인지 정합니다.
- `match cut`은 같은 구도라는 뜻이 아닙니다. 포즈·빛·소품 상태만 이어지고 카메라 위치가 달라질 수 있음을 명시합니다.
- 전체 연속성(같은 인물, 의상, 빛, 손상, 이동 방향)을 `FORMAT MODE` 또는 `CONTINUITY`에 한 번 묶어 선언합니다.

### OPTICS와 CAMERA — 렌즈와 몸을 분리한다

`OPTICS`는 렌즈의 시야·심도·포커스이고, `CAMERA`는 카메라의 실제 위치·움직임입니다. 둘을 섞으면 모순이 생기기 쉽습니다.

#### OPTICS에 쓸 것

- 대각 FOV와 렌즈 성격: `84° wide environmental`, `47° standard normal`, `29° short telephoto portrait`, `18° close macro` 등
- 카메라-피사체 거리와 프레임 크기
- 심도, 초점 대상, 랙 포커스 횟수와 시점
- `LENS LOCK`, `no zoom`, `no focal drift`, `rectilinear lines` 여부

위 값은 원본의 공통 언어이며, 광학 계산을 증명하려는 숫자보다 생성 모델에 일관된 렌즈 성격을 주는 데 목적이 있습니다.

#### CAMERA에 쓸 것

- 카메라의 높이, 주체와 거리, 방향, 기울기, 시작 위치
- 실제 이동 경로: 직선 pull-back, 평행 lateral tracking, 고정, 도보 접근 등
- 축 유지: `never crosses the axis`, `never overtakes`, `never circles to the front`
- 핸드헬드의 크기·주기·운영자 호흡·걷는 상하 바운스
- 제한된 재프레이밍, 수동 재센터링, 포커스 행동

핸드헬드의 미세 흔들림과 카메라의 큰 이동 경로는 별도입니다. “강한 핸드헬드 흔들림 + 느리고 매끄러운 도보 접근”은 함께 가능하지만, 흔들림은 미세 운동이고 접근은 부드러운 주 경로라고 분리해서 써야 합니다.

정지 카메라라면 `locked-off`, `dead static`, `not a pixel of movement`처럼 강하게 고정합니다. 반대로 단지 카메라가 움직이지 않을 뿐 미세 호흡은 허용한다면, 어느 정도의 드리프트만 허용되는지 씁니다.

### ACTION TIMING — 동작 목록이 아니라 상태 전이표

초 단위로 쓰고, 모든 핵심 사건을 원인→반응→결과로 씁니다.

```text
0.0–1.2s — The frame holds. The object is intact; only haze moves.
1.2–1.4s — A muffled impact occurs behind it; dust leaves the joints.
1.4–2.2s — The material fails under the impact; fragments travel outward.
2.2s — SPEED RAMP into slow motion.
```

특히 아래를 시간표에 넣습니다.

- 첫 등장, 퇴장, 컷, 속도 변화, 포커스 랙, 대사 시작, 소품 손바꿈
- 타격의 발사 방향과 피격 후 이동 방향
- 한 번만 일어나야 하는 사건(한 번 누르기, 한 번 뽑기, 한 번 전이)
- 빈 프레임, 정지 홀드, 동작 중간에 떨어지는 컷

`fast`만 쓰지 말고 패럴랙스, 바람, 진동, 그림자 스트로브, 상대 속도, 모션 블러, 몸의 관성으로 속도가 보이게 합니다.

### PHYSICS — “리얼하게”를 작동 원리로 바꾼다

원본에서 가장 중요한 차별점 중 하나입니다. `realistic` 하나로 끝내지 말고 재질과 힘의 행동을 분해합니다.

- 인물: 체중 이동, 발 접지, 관절의 지연, 근육 긴장, 피로, 호흡
- 강체: 질량, 관성, 충돌, 마찰, 반동, 바운스 여부
- 천·머리카락·체인: 바람, 장력, 지연, 흔들림의 감쇠
- 유리·돌·눈·먼지: 깨지는 순서, 조각 크기, 퍼지는 방향, 쌓이고 가라앉는 방식
- 액체·피: 원천, 접촉 순간, 표면 장력, 중력, 다른 사람에게 전이되는 조건
- 차량·우주선: 가속, 제동, 서스펜션/관성, 무중력의 직선 운동

좋은 문장은 “팔이 흔들린다”보다 “어깨에서 시작해 상완·전완·손가락으로 지연되는 감쇠 진자 운동이며, 닿거나 튀지 않은 채 중력 아래 정지한다”에 가깝습니다.

다음은 명시적으로 막습니다: 텔레포트, 원인 없는 상태 변화, 소품 복제, 접촉 없는 전이, 떠다니는 무게감, 재질에 맞지 않는 파편·액체·천의 움직임.

### LIGHTING — 분위기가 아니라 광원 계약

조명은 장면 안에 실제로 존재하는 광원으로 작성합니다.

- 광원의 수와 종류: 태양, 창문, 실용등, 모니터, 엔진, 자기발광 물체 등
- 광원의 위치, 방향, 높이, 색온도, 부드러움/단단함
- 노출을 무엇에 맞추는지: 피부, 눈, 눈 덮인 건물, 화면, 하이라이트 등
- 그림자의 성질, 안개/연기/볼류메트릭 효과, 팔레트
- 금지할 광원: 스튜디오 key, softbox, 임의 rim light, beauty light, 원치 않는 빔

예:

```text
One natural source only: a high sun buried in bright winter haze, off-frame upper-left.
Exposure is set for the pale stone and snow. No studio key, fill, rim light,
or added glow exists anywhere in the scene.
```

“자연광만”은 “어둡게”와 다릅니다. 광원·방향·노출·그림자를 함께 써야 모델이 실제 촬영처럼 해석합니다.

### AUDIO — 그림과 같은 시간선을 공유한다

원본의 기본값은 `Diegetic sound only`입니다. 다만 음악이 핵심인 타이틀 시퀀스에서는 음악의 시작점과 컷의 박자까지 지정합니다.

- 공간 톤 → 행동 소리 → 재질 소리 → 호흡/대사 순으로 적습니다.
- 대사가 있으면 화자, 정확한 대사, 말투, 음량, 화면 안/밖 여부, 시간대를 씁니다.
- 대사가 없으면 `No dialogue, no narration, no subtitles.`를 명시합니다.
- 음악이 없으면 `No music`을, 있어야 하면 시작 시점·에너지·컷과의 동기를 명시합니다.
- 슬로모션이 있으면 소리의 늘어남·음정 변화도 영상과 같은 구간에 적용합니다.

### POSITIVE LOCKS — 마지막 오류 방지 계약

이 섹션은 일반적인 네거티브 프롬프트가 아니라 최종 QA입니다. 원하는 상태를 먼저 확정하고, 모델이 만들기 쉬운 잘못된 대안을 뒤에서 차단합니다.

우선순위가 높은 항목만 짧고 직접적으로 반복합니다.

1. 정확한 인물·생물·차량·소품 수
2. 인물 정체성, 의상, 얼굴 가림, 신체 일부의 화면 안/밖 여부
3. 소품의 수, 손, 위치, 전이 시점, 손상 전후 상태
4. 화면 좌우·앞뒤·진입·퇴장·이동 방향
5. 컷 수, 카메라 축, 줌/추월/회전 금지
6. 참조 이미지의 배경·그리드·원래 구도·스튜디오 조명 오염 방지
7. 빛·음악·자막·추가 인물·추가 물체 금지
8. 마지막 프레임의 상태

권장 문장:

```text
Exactly one [subject] appears.
[Prop] stays in the LEFT hand until [time], transfers once to the RIGHT hand,
and never exists in both hands at the same time.
The camera remains behind [subject] and never overtakes, circles, or shows the face.
The reference supplies face identity only; its background, grid, lighting, and framing never appear.
No additional people, duplicate props, spontaneous object creation, or unmotivated state changes.
```

---

## 6. 영상 형태별 선택 규칙

### 단일 테이크를 쓸 때

한 공간에서 한 동작 또는 하나의 연속된 감정·물리 이벤트를 보여 줄 때 적합합니다.

- 첫 프레임, 한 개의 카메라 경로, 끝 프레임을 강하게 고정합니다.
- 원테이크 안에서 여러 장소·시간대·카메라 위치를 갑자기 바꾸지 않습니다.
- 하나의 움직임만 핵심으로 둡니다. 예: 고정 프레임에서 손의 경련, 인물 뒤 1.5m를 유지한 추적, 눈 극단 클로즈업에서 한 축으로 pull-back.

### 다중 샷을 쓸 때

장소 소개, 정보 전달, 감정 클로즈업, 사건 결과처럼 서로 다른 카메라 기능이 필요할 때 적합합니다.

- 각 샷이 왜 필요한지 역할을 나눕니다: anchor / action / reaction / insert / result.
- 컷이 새 장소·새 정보·새 감정으로 넘어가는 실제 이유를 갖게 합니다.
- 모든 샷에 같은 사건을 중복하지 말고, 컷 사이에 유지되는 상태를 명시합니다.

### 시작 이미지가 핵심일 때

시작 프레임을 참조와 똑같이 쓰고 싶다면 `HOW THE START IMAGE IS USED`를 별도 섹션으로 둡니다.

```text
The clip opens exactly on the start image, frame for frame.
For Segment 1, preserve its framing and geometry. After the hard cut, retain only
the atmosphere, colour, light direction, and material language; do not copy its composition.
```

---

## 7. 불량한 표현을 정밀한 지시로 바꾸는 법

| 약한 표현 | 정밀한 표현의 방향 |
|---|---|
| “멋지고 영화 같은 카메라” | 카메라 높이·거리·방향·FOV·이동 축·금지 움직임을 쓴다. |
| “빠르게 난다” | 속도감이 배경 패럴랙스, 바람, 진동, 물체 흐림, 몸의 관성으로 어떻게 보이는지 쓴다. |
| “리얼한 충돌” | 접촉 지점, 압축, 반동, 파편, 힘의 방향, 이후 자세와 소품 상태를 쓴다. |
| “어두운 영화 조명” | 실제 광원, 방향, 노출 대상, 그림자, 허용/금지 조명을 쓴다. |
| “참조와 똑같은 인물” | 얼굴/의상/체형/특징 중 무엇을 가져오고, 무엇을 텍스트가 덮어쓰는지 쓴다. |
| “핸드헬드” | 흔들림의 세기·빈도·호흡·걷는 바운스·거리 유지·큰 이동 경로를 분리해 쓴다. |
| “아무도 없다” | 정확한 인물 수와 화면 속 사진·반사·배경 인물의 예외 여부를 쓴다. |

대문자, `EXACTLY`, `ONLY`, `NEVER`, `LOCK`, `HARD CUT`은 정말 실패하면 안 되는 지점에만 씁니다. 과도하게 모든 문장을 대문자로 만들지 않습니다.

---

## 8. 최종 출력 템플릿

아래는 다른 AI가 실제로 채워야 하는 영어 구조입니다. 장면에 불필요한 섹션은 생략할 수 있습니다.

```text
SCENE CONTEXT

[Who / where / when / central event / intended emotional or visual outcome.]

CONTINUITY

[Only when this continues a prior clip: what state, orientation, wardrobe, props,
damage, light, and geography carry over.]

ACTIVE REFERENCES

@REFERENCE_1 — [what it controls]. [What it does not control]. [Shot/time scope].
@REFERENCE_2 — [what it controls]. [Text override / exclusions].

HOW THE START IMAGE IS USED

[Only when applicable: exact first frame vs. atmosphere/design only.]

LOCATION MAP

[Physical 3D geography, foreground/midground/background, distances, paths,
screen direction, camera position, source direction.]

FIRST FRAME AND SPATIAL BLOCKING

[Exact 0.0s composition; subject/object positions; what is absent; what enters later.]

FORMAT MODE

[Total duration. Single continuous take or numbered shots. Exact hard-cut count and
times. Speed-ramp policy. Conditions shared across all shots.]

OPTICS

[FOV/lens character per shot, subject distance, depth of field, focus behavior,
lens lock, zoom/focal-drift restrictions.]

CAMERA

[Physical position, height, orientation, permitted move, axis rules, handheld behavior,
reframing rules, focus moves.]

ACTION TIMING

0.0–[time] — [initial state and first beat.]
[time]–[time] — [cause -> physical response -> result.]
[time] — [cut / speed ramp / single state change, if any.]

PHYSICS

[Mass, inertia, contact, material behavior, wind/gravity, prop continuity.
Explicitly forbid impossible or duplicate states where relevant.]

LIGHTING

[Every in-world source, direction, softness, exposure priority, palette, shadow behavior,
and prohibited non-diegetic lighting.]

AUDIO

[Diegetic or intentional music. Room tone, material sounds, voice rules, timing,
and no-dialogue/no-subtitles rules where required.]

POSITIVE LOCKS

[Exact counts, identity, prop states, direction, camera limits, reference exclusions,
last-frame state, and only the highest-risk prohibitions.]
```

---

## 9. 최종 검수표

다른 AI가 최종 프롬프트를 출력하기 전, 아래를 내부 검수하게 합니다.

- [ ] 실제 업로드된 참조 토큰만 사용했는가?
- [ ] 모든 참조에 적용 범위와 비적용 범위를 썼는가?
- [ ] 인물 수, 의상, 얼굴, 손, 소품 수가 전 구간 일관적인가?
- [ ] 첫 프레임과 첫 행동의 시점이 모순되지 않는가?
- [ ] 모든 핵심 변화에 전 상태, 이벤트, 후 상태가 있는가?
- [ ] 컷 수가 샷 수와 맞고, 전체 타이밍이 영상 길이 안에 들어가는가?
- [ ] 단일 테이크에 하드컷, 순간 이동, 불가능한 재프레이밍이 섞이지 않았는가?
- [ ] 렌즈, 카메라 위치, 축, 포커스, 속도 지시가 서로 충돌하지 않는가?
- [ ] 핸드헬드의 미세 흔들림과 카메라의 큰 이동 경로를 구분했는가?
- [ ] 물리적으로 불가능한 동작, 소품 복제, 접촉 없는 상태 변화가 없는가?
- [ ] 광원 수·방향·노출·시간대가 전 구간 일관적인가?
- [ ] 대사/음악/자막 금지와 실제 오디오 지시가 충돌하지 않는가?
- [ ] 핵심 실패 지점만 `POSITIVE LOCKS`에 재확인했는가?
- [ ] `Hide`, `WORKFLOW METADATA`, `PATCH LOG`, `FAILURE NOTES`, 중복 헤딩, 깨진 문자, 빈 참조 토큰을 최종 프롬프트에서 제거했는가?

## 마무리 원칙

프롬프트를 길게 만드는 것이 목표가 아닙니다. **생성 모델이 잘못 해석할 가능성이 있는 모든 핵심 결정을, 서로 모순 없이 촬영 가능한 사실로 바꾸는 것**이 목표입니다. 장면이 단순하면 짧게, 장면의 연속성·참조·물리·편집이 복잡하면 이 문서의 전체 구조를 사용합니다.
