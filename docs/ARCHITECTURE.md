# Architecture

## System Shape

Builder Opportunity OS keeps the original pipeline shape from `career-ops`,
but broadens the object being processed from only "job offers" to
"opportunities".

```text
input -> evaluation -> artifact generation -> tracker -> dashboard
```

## Inputs

Supported input types:

- role description or hiring page
- freelance brief or client message
- side project idea
- course or certification
- collaboration lead

## Core Data Flow

```text
config/profile.yml
cv.md
article-digest.md
modes/_profile.md
          |
          v
    opportunity evaluation
          |
          +--> report in reports/
          +--> PDF or proposal output in output/
          +--> tracker update in data/applications.md
```

## Opportunity Lifecycle

- `Evaluated`
- `Pursuing`
- `Proposed`
- `Applied`
- `Interviewing`
- `Won`
- `Parked`
- `Rejected`
- `SKIP`
