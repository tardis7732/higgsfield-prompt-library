# Higgsfield Prompt Library — public site

This folder is the complete static public build. It intentionally contains only:

- the viewer interface;
- a sanitized, browser-ready prompt library JSON file;
- the downloadable `video_prompt_writing_rules.md` guide; and
- a GitHub Pages workflow.

It does **not** contain the crawler, browser profiles, raw local server, videos,
screenshots, or collection artifacts.

## Publish with GitHub Pages

1. Create an empty public GitHub repository.
2. Copy the *contents* of this folder into that repository's root.
3. Push to the `main` branch.
4. In **Settings → Pages**, choose **GitHub Actions** as the source once.
5. Each push to `main` deploys the site automatically.

The `Download MD` control serves `downloads/video_prompt_writing_rules.md` from the
same origin, so it works on GitHub Pages and other static hosts.
