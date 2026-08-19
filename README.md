# Higgsfield Prompt Library — public site

A browser-ready prompt reference library and an MD playbook for producing
continuity-safe video prompts.

This folder intentionally contains only:

- the viewer interface;
- a sanitized, browser-ready prompt library JSON file;
- the downloadable `video_prompt_writing_rules.md` guide; and
- a GitHub Pages workflow.

It does **not** contain the crawler, browser profiles, raw local server, videos,
screenshots, or collection artifacts.

## Use this library with ChatGPT or another AI

1. [Download the guide MD](./downloads/video_prompt_writing_rules.md).
2. Start a new conversation, attach the MD, and attach any reference images or videos.
3. Paste the instruction below, then replace the text below `My brief:` with your scene.
4. The AI should return only a ready-to-use **English video prompt**.

![Attach the guide MD, paste the instruction, add a Korean brief, and receive a structured prompt](./assets/prompt-guide-usage.svg)

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

If references are attached, state each one’s scope in one short line — for example:
`@Image 1: character face only`, `@Image 2: location and lighting only`, or
`@Video 1: camera timing for Shot 3 only`.

## Publish with GitHub Pages

1. Create an empty public GitHub repository.
2. Copy the *contents* of this folder into that repository's root.
3. Push to the `main` branch.
4. In **Settings → Pages**, choose **GitHub Actions** as the source once.
5. Each push to `main` deploys the site automatically.

The `Download MD` control serves `downloads/video_prompt_writing_rules.md` from the
same origin, so it works on GitHub Pages and other static hosts.
