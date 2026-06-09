#app/main.py
import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.config import db
from fastapi.middleware.cors import CORSMiddleware
from app.router.user import router as user_router

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

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(user_router)
    return app

app = init_app()
def start():
    uvicorn.run("app.main:app", host="localhost", port=8000, reload=True)