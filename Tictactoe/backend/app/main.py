import uvicorn
from fastapi import FastAPI, APIRouter
import app.config as db

webapp = FastAPI()

router = APIRouter()

@router.get("/")
async def home():
    return "Hello, World"
webapp.include_router(router)

def init_webapp():
    db.init()

    webapp = FastAPI()

def start():
    uvicorn.run("app.main:webapp", host="localhost", port=8000, reload=True)