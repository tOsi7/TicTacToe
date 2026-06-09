#app/model/mixins.py

from datetime import datetime
from sqlalchemy import Column, DateTime
from sqlmodel import Field
class TimeMixin:

    created_at: datetime = Field(
        sa_column=Column(DateTime, default=datetime.now, nullable=False)
    )
    updated_at: datetime = Field(
        sa_column = Column(DateTime, default=datetime.now, 
                           onupdate=datetime.now, nullable=False)
    )  