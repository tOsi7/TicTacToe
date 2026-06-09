#app/model/user.py
from app.model.mixins import TimeMixin
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, String

class Users(SQLModel, TimeMixin, table=True):
    __tablename__ = "Users"

    id: int = Field(default=None, primary_key=True)
    username: str = Field(sa_column=Column(String, unique=True, nullable=False))
    password: str = Field(sa_column=Column(String, nullable=False))
    games_played: int = Field(default=0)
    games_won: int = Field(default=0)
