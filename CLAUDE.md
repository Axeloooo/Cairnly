# Cairnly

FastAPI + LangGraph chat agent with a Chroma retriever and SQLAlchemy persistence.

## Setup

```
python -m venv .venv && . .venv/bin/activate
pip install -r apps/api/requirements-dev.txt
npm install                       # commitlint + semantic-release
pre-commit install --install-hooks
```

## Layout

- `apps/api/`: FastAPI service (`app/`, `tests/`, `pyproject.toml`, requirements, `Dockerfile`, `.env.example`)
- `apps/web/`: reserved for the future React/TypeScript UI
- `packages/`: reserved for shared code
- Root: tooling and meta (`.pre-commit-config.yaml`, `.github/`, `package.json`, commitlint, semantic-release, prettier, `docs/`)

## Commands

Python commands run from `apps/api` (`cd apps/api`); prettier runs from the repo root.

- Python format: black (`black .`, check with `black --check .`)
- Python lint: ruff (`ruff check .`, `ruff check . --fix`); ruff's formatter is not used
- TypeScript/JS/JSON/CSS/MD/YAML format: prettier (`npx prettier --write .`, check with
  `npx prettier --check . --ignore-unknown`)
- Types: mypy (`mypy app`)
- Tests: `pytest -q`
- Run: `uvicorn app.main:app --reload`

## Commits (Conventional Commits, enforced by commitlint)

Types: feat, fix, docs, infra, refactor, test, chore (also perf, build, ci, revert).

Authorship: Claude is never the author or co-author of a commit. Commits carry the author's name
and email only, with no `Co-Authored-By` or `Claude-Session` trailers. The author and committer
on this repo are Axel. commitlint rejects messages that name Claude in a trailer.
Examples: `feat: add document upload endpoint`, `fix: return 404 for unknown conversation`,
`infra: add release workflow`. Breaking change: `feat!:` or a `BREAKING CHANGE:` footer.

## Branches

`feature/short-description`, `fix/short-description`, `docs/short-description`,
`infra/short-description`. Branch from `devel`.

## Release flow

Work lands on `devel` via PR. Releases go from `devel` to `main` via a release PR.
semantic-release runs on `main`, tags the version and updates `CHANGELOG.md`. Never commit
to `main` directly.

## Workflow for substantial changes

Plan (opus) -> implement (sonnet) -> review (opus) -> verify (ruff, mypy, pytest all green).
