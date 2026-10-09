# Cairnly

A ChatGPT-style agent built with LangGraph, FastAPI, LangSmith, ChromaDB and SQLAlchemy.
Based on the "Build Your Own ChatGPT Agent" project from YouTube video `Zy7EXDONlTY`.

## Stack

- **FastAPI** for the HTTP API (`app/main.py`)
- **LangGraph** agent: retrieve from Chroma, then respond with the LLM (`app/agent.py`)
- **ChromaDB** knowledge base (`app/rag.py`)
- **SQLAlchemy** storage for conversations and messages (`app/models.py`)
- **LangSmith** tracing, enabled through environment variables

## Run locally

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env            # optional: add OPENAI_API_KEY
uvicorn app.main:app --reload
```

Without `OPENAI_API_KEY` the app uses an offline echo model, so everything still runs end to end.

## API

| Method | Path                           | Purpose                                                            |
| ------ | ------------------------------ | ------------------------------------------------------------------ |
| GET    | `/health`                      | Liveness check                                                     |
| POST   | `/documents`                   | Add texts to the Chroma knowledge base                             |
| POST   | `/chat`                        | Send a message; omit `conversation_id` to start a new conversation |
| GET    | `/conversations/{id}/messages` | Read a conversation's history                                      |

```bash
curl -X POST localhost:8000/documents -H 'content-type: application/json' \
  -d '{"texts": ["Cairnly keeps conversations in SQLite by default."]}'
curl -X POST localhost:8000/chat -H 'content-type: application/json' \
  -d '{"message": "Where are conversations kept?"}'
```

## Tests

```bash
pytest
```

Tests use a file-based SQLite database and a deterministic embedding function, so they make no network calls.

## LangSmith tracing

Set these in `.env` and every agent run is traced:

```
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=...
LANGSMITH_PROJECT=cairnly
```

## AWS deployment

See [docs/AWS_DEPLOYMENT.md](docs/AWS_DEPLOYMENT.md).
