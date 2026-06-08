#app/model/mixins.py
from pydantic import BaseModel, Field
from datetime import datetime
from sqlalchemy import Column, DateTime
from sqlmodel import Field
class TimeMixin(BaseModel):

    created_at: datetime = Field(default_factory=datetime.now, nullable=False)
    updated_at: datetime = Field(
        sa_column = Column(DateTime, default=datetime.now, 
                           onupdate=datetime.now, nullable=False)
    )  