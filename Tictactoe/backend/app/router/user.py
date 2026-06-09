# app/router/user.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select, SQLModel
from app.config import get_session
from app.model.user import Users

class UserRegister(SQLModel):
    username: str
    password: str

router = APIRouter(prefix="/users", tags=["Users"])
@router.post("/register")
async def register(data: UserRegister, session: AsyncSession = Depends(get_session)):
    res = await session.execute(select(Users).where(Users.username == data.username))
    existing = res.first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    user = Users(username=data.username, password=data.password, games_won=0, games_played=0)
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user

@router.post("/login")
async def login(data: UserRegister, session: AsyncSession = Depends(get_session)):
    res = await session.execute(select(Users).where(Users.username == data.username))
    user = res.first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    if user[0].password != data.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    return user[0]

@router.get("/")
async def get_users(session: AsyncSession = Depends(get_session)):
    res = await session.execute(select(Users))
    users = res.scalars().all()
    return users
