#app/config.py
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from typing import AsyncGenerator

db_config = "postgresql+asyncpg://postgres:Tdotosi1!@127.0.0.1:5000/TicTacToe"

class AsyncDatabase:
    def __init__(self) -> None:
        self.session = None
        self.engine = None
    
    def init(self):
        self.engine = create_async_engine(db_config, future=True, echo=True)
        self.session_maker = sessionmaker(
            self.engine, expire_on_commit=False, class_=AsyncSession)

    async def create_all(self):
        async with self.engine.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)

db = AsyncDatabase()

async def get_session() -> AsyncGenerator[AsyncSession, None]:

    async with db.session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise 