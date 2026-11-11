# 경복궁 한바퀴 (단독 실행 버전)

곤룡포 입은 임금 캐릭터로 3D 경복궁을 걷고, 12곳 해설을 들으며 도장을 모으는 웹앱입니다.
Claude 없이 Vercel에 올려 누구나 주소로 접속할 수 있고, 휴대폰 홈 화면에 추가하면 앱처럼 실행됩니다.

## 폴더 구성

| 파일 | 역할 |
|---|---|
| `index.html` | 게임 본체 (3D 화면, 조작, 해설, 도장, 지도) |
| `config.js` | 함께 걷기(Supabase) 설정 — 비워 두면 혼자 걷기 모드 |
| `lib/three.min.js` | 3D 엔진 Three.js r128 (외부 CDN 없이 동작하도록 포함) |
| `lib/supabase.js` | Supabase 실시간 연결 라이브러리 v2.45.4 |
| `manifest.webmanifest`, `icons/` | 홈 화면 설치용 앱 정보와 아이콘 |
| `sw.js` | 오프라인 실행용 캐시 (한 번 접속하면 인터넷 없이도 열림) |
| `vercel.json` | 설정 파일이 바로 갱신되도록 하는 캐시 규칙 |

빌드 과정이 없는 정적 사이트라서 업로드만 하면 됩니다.

## 1단계. GitHub에 올리기

1. GitHub에서 **New repository** → 이름 예: `gyeongbokgung-walk` → Public 또는 Private → **Create repository**
2. 새 저장소 화면에서 **uploading an existing file** 클릭
3. 이 폴더 **안의 파일과 폴더 전부**(index.html, config.js, lib, icons …)를 끌어다 놓고 **Commit changes**
   - 폴더째 넣으면 한 단계 깊어지니, 반드시 폴더 안의 내용을 올려 주세요.

## 2단계. Vercel로 배포하기

1. vercel.com 로그인 → **Add New… → Project**
2. 방금 만든 GitHub 저장소 **Import**
3. Framework Preset: **Other**, Build Command·Output Directory는 비워 둔 채 **Deploy**
4. 1분 정도 뒤 `https://gyeongbokgung-walk.vercel.app` 같은 주소가 생깁니다.

여기까지만 해도 **혼자 걷기 모드**로 모두 동작합니다.

## 3단계. (선택) 함께 걷기 켜기 — Supabase 무료

같은 주소로 접속한 사람끼리 서로의 캐릭터·이름·인사가 실시간으로 보이게 합니다. DB 테이블은 필요 없습니다.

1. supabase.com 가입 → **New project** (지역: Northeast Asia (Seoul) 권장)
2. 프로젝트 화면 **Project Settings → API**(또는 **Data API / API Keys**)에서 두 값을 복사
   - **Project URL** (예: `https://abcdefgh.supabase.co`)
   - **anon public** 키 (`eyJ…`로 시작). **service_role 키는 절대 쓰지 마세요.**
3. GitHub 저장소에서 `config.js` 열기 → 연필(편집) 아이콘 → 두 값을 따옴표 안에 붙여넣기 → **Commit changes**
4. Vercel이 자동으로 다시 배포합니다. 화면 오른쪽 위 "N명 접속 중"이 보이면 성공입니다.

참고
- anon public 키는 원래 브라우저에 공개되는 용도의 키라 `config.js`에 넣어도 됩니다.
- Supabase 무료 프로젝트는 **1주일 동안 접속이 없으면 일시정지**됩니다. 대시보드에서 Restore를 누르면 다시 켜집니다.
- 무료 요금제의 실시간 동시 접속 한도(약 200명)면 사내 행사 규모는 충분합니다.
- 방을 나누고 싶으면 `roomName`을 바꾸세요 (예: 팀별로 다른 이름 → 다른 배포 주소).

## 4단계. 휴대폰에 앱처럼 설치하기

- **아이폰(사파리)**: 주소 접속 → 아래 공유 버튼 → **홈 화면에 추가**
- **안드로이드(크롬)**: 주소 접속 → 오른쪽 위 ⋮ → **앱 설치** 또는 **홈 화면에 추가**
- **PC(크롬·엣지)**: 주소창 오른쪽 설치 아이콘 → 설치

## 조작법

| 동작 | PC | 휴대폰 |
|---|---|---|
| 걷기 | ↑ ↓ (W S) | 화면 왼쪽을 위아래로 끌기 |
| 방향 전환 (시야도 함께) | ← → (A D) | 화면 왼쪽을 좌우로 끌기 |
| 둘러보기 | 마우스 끌기, 휠로 확대 | 화면 오른쪽 끌기 |
| 점프 | Space | 점프 버튼 |
| 달리기 | Shift | 달리기 버튼 |
| 살펴보기(해설·도장) | E 또는 Enter | 빨간 버튼 |
| 1인칭/3인칭 | V | 1인칭 버튼 |
| 인사하기 | F | 인사하기 버튼 |

## 수정해서 다시 올릴 때

1. 바뀐 파일을 GitHub 저장소에 같은 이름으로 다시 업로드(덮어쓰기) → Commit
2. `sw.js` 첫 줄의 `VERSION = 'gbg-v1'` 숫자를 올려 함께 올리면(예: `gbg-v2`), 이미 설치한 휴대폰에도 새 버전이 반영됩니다.

## 알아 둘 점

- 건물 배치는 실제 경복궁을 약 70% 크기로 줄여 단순화한 그림입니다. 국가유산청 3D 스캔 데이터는 쓰지 않았습니다.
- 해설은 공개된 역사 정보를 짧게 정리한 것입니다. 외부 공개 전에는 국가유산청 안내문과 대조해 보세요.
- 도장 기록과 닉네임은 각자의 기기(브라우저)에만 저장됩니다.
- 글꼴은 Google Fonts에서 불러오며, 오프라인일 때는 기기 기본 글꼴로 표시됩니다.
