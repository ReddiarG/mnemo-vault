from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
from db import Base

class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer, primary_key=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now())

    # Relationships
    knowledge_base = relationship("KnowledgeBase", back_populates="user", cascade="all, delete")
