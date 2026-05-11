from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLMODEL

db_config = f"postgresql+asyncpg://postgres:postgres@localhost:5432/tictactoe"

class AsyncDatabase:
    def __init__(self) -> None:
        self.session = None
        self.engine = None

    def __getattr__(self, name):
        return getattr(self.session, name)
    
    def init(self):
        self.engine = create_async_engine(db_config, future=True, echo=True)
        self.session = sessionmaker(self.engine, expire_on_commit=False, class_=AsyncSession)()

    async def create_all(self):
        async with self.engine.begin() as conn:
            await conn.run_sync(SQLMODEL.metadata.create_all)

db = AsyncDatabase()

async def commit_rollback():
    try:
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise e