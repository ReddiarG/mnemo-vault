# Content Upload Endpoints
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status, Form, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel, HttpUrl

from db import get_db
from models.user import User
from models.content import KnowledgeBase, UploadedContent, ContentChunk
from services.auth import get_current_user

from services.extract import extract_text_from_url # TODO: add extract_text_from_file

# Initialize the router
router = APIRouter()

# Content Response Model
class ContentResponse(BaseModel):
    content_id: int
    original_source_name: str
    content_type: str
    content_size: int

# URL upload endpoint
class UrlUploadRequest(BaseModel):
    url: HttpUrl

@router.post("/url", response_model=ContentResponse)
async def upload_url(
    background_tasks: BackgroundTasks,
    request: UrlUploadRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Add a URL to the user's knowledge base"""
    # Get the user's knowledge base
    kb = db.query(KnowledgeBase).filter(KnowledgeBase.user_id == current_user.user_id).first()
    if not kb:
        # Create a new knowledge base
        kb = KnowledgeBase(user_id=current_user.user_id)
        db.add(kb)
        db.commit()
        db.refresh(kb)
    
    # TODO: Implement content extraction from URL
    uploaded_content, chunks = await extract_text_from_url(str(request.url), current_user.user_id, kb.kb_id, db)
    return uploaded_content

# File upload endpoint
@router.post("/file", response_model=ContentResponse)
async def upload_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Add a file to the user's knowledge base"""
    # Get the user's knowledge base
    kb = db.query(KnowledgeBase).filter(KnowledgeBase.user_id == current_user.user_id).first()
    if not kb:
        # Create a new knowledge base
        kb = KnowledgeBase(user_id=current_user.user_id)
        db.add(kb)
        db.commit()
        db.refresh(kb)

    # TODO: Implement content extraction from file
    pass
