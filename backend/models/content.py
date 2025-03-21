from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from db import Base


class KnowledgeBase(Base):
    __tablename__ = "knowledge_base"

    # Columns
    kb_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.user_id"), ondelete="CASCADE", nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    # Relationships
    user = relationship("User", back_populates="knowledge_base")

class UploadedContent(Base):
    __tablename__ = "uploaded_content"

    # Columns
    content_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.user_id"), ondelete="CASCADE", nullable=False)
    kb_id = Column(Integer, ForeignKey("knowledge_base.kb_id"), ondelete="CASCADE", nullable=False)
    original_source_name = Column(String(255), nullable=False)
    content_type = Column(String, nullable=False)
    content_size = Column(Integer, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    content_version = Column(Integer, default=1)
    extracted_text = Column(Text, nullable=True)
    content_metadata = Column(JSON, nullable=True)

    # Relationships
    user = relationship("User")
    knowledge_base = relationship("KnowledgeBase", back_populates="uploaded_content")
    
class ContentChunk(Base):
    __tablename__ = "content_chunk"

    # Columns
    chunk_id = Column(Integer, primary_key=True, index=True)
    content_id = Column(Integer, ForeignKey("uploaded_content.content_id"), ondelete="CASCADE", nullable=False)
    chunk_number = Column(Integer, nullable=False)
    chunk_text = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    chunk_metadata = Column(JSON, nullable=True)

    # Relationships
    content = relationship("UploadedContent", back_populates="content_chunk")

