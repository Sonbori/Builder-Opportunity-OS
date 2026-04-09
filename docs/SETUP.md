# Setup Guide

## Prerequisites

- Node.js 18+
- Playwright Chromium for PDF generation and robust page capture
- Go 1.21+ if you want the terminal dashboard
- An AI coding CLI such as Claude Code or Codex

## Install

```bash
git clone https://github.com/Sonbori/Builder-Opportunity-OS.git
cd Builder-Opportunity-OS
npm install
npx playwright install chromium
```

## Review the Builder Profile

The repository already includes a first-pass builder profile. Review these
files before using the system:

```bash
cv.md
article-digest.md
config/profile.yml
modes/_profile.md
portals.yml
```

Treat `portals.yml` as a mixed intake config, not only a job-board list.
It should cover:

- full-time role sources
- freelance brief sources
- collaboration communities
- learning sources that can turn into visible proof

## Core Commands

```bash
npm run doctor
npm run verify
```

## Typical Usage

1. Paste a job post, freelance brief, or opportunity URL.
2. Ask the agent to evaluate fit and produce the right artifact.
3. Review the generated output.
4. Track the next action in `data/applications.md`.

## Optional Dashboard

```bash
cd dashboard
go build -o opportunity-dashboard .
./opportunity-dashboard --path ..
```
