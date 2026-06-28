#app/config.py
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from typing import AsyncGenerator

#db_config = "postgresql+asyncpg://postgresTTT:Tdotosi1!@database-1.cd8qqg0620ns.us-east-2.rds.amazonaws.com:5432/postgres"
#test db
db_config = "postgresql+asyncpg://postgres:Tdotosi0713!@127.0.0.1:5432/TicTacToe"
class AsyncDatabase:
    def __init__(self):
        self.engine = create_async_engine(db_config, future=True, echo=True)
        
        self.session_maker = sessionmaker(
            self.engine, expire_on_commit=False, class_=AsyncSession)

    async def create_all(self):
        async with self.engine.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)

    async def close(self):
        if self.engine:
            await self.engine.dispose()

db = AsyncDatabase()

async def get_session() -> AsyncGenerator[AsyncSession, None]:

    async with db.session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise 
        finally:
            await session.close()