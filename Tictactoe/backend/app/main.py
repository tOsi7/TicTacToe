#app/main.py
import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.config import db

@asynccontextmanager
async def lifespan(app: FastAPI):
    #startup
    await db.create_all()
    yield
    #shutdown
    await db.close()


def init_app():
    db.init()

    app = FastAPI(
        title="Tic Tac Toe API",
        description="API for Tic Tac Toe game",
        version="1.0.0",
        lifespan=lifespan,
    )
    return app

app = init_app()
def start():
    uvicorn.run("app.main:app", host="localhost", port=8000, reload=True)