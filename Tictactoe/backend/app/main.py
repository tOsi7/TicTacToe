import uvicorn
from fastapi import FastAPI, APIRouter

webapp = FastAPI()

router = APIRouter()

@router.get("/")
async def home():
    return "Hello, World"
webapp.include_router(router)

def start():
    uvicorn.run("app.main:webapp", host="localhost", port=8000, reload=True)