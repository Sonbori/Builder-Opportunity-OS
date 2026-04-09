# Codex Setup

Builder Opportunity OS supports Codex through `AGENTS.md` and `CLAUDE.md`.

## Suggested Prompts

- `Evaluate this opportunity and tell me if it is worth pursuing.`
- `Turn this client brief into a proposal and tracker entry.`
- `Scan my configured sources for data engineering and automation roles.`
- `Generate the right artifact for this opportunity.`
- `Create a short outreach DM for this collaboration lead.`

## Routing

| User intent | Files to read |
|-------------|---------------|
| raw opportunity text or URL | `modes/_shared.md` + `modes/auto-pipeline.md` |
| evaluation only | `modes/_shared.md` + `modes/oferta.md` |
| multiple opportunities | `modes/_shared.md` + `modes/ofertas.md` |
| scan sources | `modes/_shared.md` + `modes/scan.md` |
| artifact output | `modes/_shared.md` + `modes/pdf.md` |
| application help | `modes/_shared.md` + `modes/apply.md` |
| project evaluation | `modes/project.md` |
| training evaluation | `modes/training.md` |
| tracker view | `modes/tracker.md` |
