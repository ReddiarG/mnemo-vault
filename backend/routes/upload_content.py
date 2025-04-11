# Content Upload Endpoints
from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from pydantic import BaseModel, HttpUrl

from db import get_db
from models.user import User
from models.content import KnowledgeBase, UploadedContent
from services.auth import get_current_user

from services.extract import extract_md_from_url # TODO: add extract_text_from_file

# Initialize the router
router = APIRouter()

# Content Response Model
class ContentResponse(BaseModel):
    content_id: int
    original_source_name: str
    content_type: str
    content_size: int
    topic_name: str
    topic_summary: str

# URL upload endpoint
class UrlUploadRequest(BaseModel):
    url: HttpUrl

@router.post("/url", response_model=ContentResponse)
async def upload_url(
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
    
    # Extract and chunk text from URL
    extracted_content = extract_md_from_url(str(request.url))

    # TODO: Chunk, Embed, Summarize, and assign Topic
    if extracted_content:
        pass
        
    uploaded_content_obj = UploadedContent(
        user_id=current_user.user_id,
        kb_id=kb.kb_id,
        original_source_name="TODO...",
        content_type="text/html",
        content_size=len(extracted_content["markdown"]),
        content_metadata="TODO...",
        content_text=extracted_content["markdown"],
    )
    db.add(uploaded_content_obj)
    db.commit()
    db.refresh(uploaded_content_obj)

    # Return response
    return ContentResponse(
        content_id=uploaded_content_obj.content_id,
        original_source_name=uploaded_content_obj.original_source_name,
        content_type=uploaded_content_obj.content_type,
        content_size=uploaded_content_obj.content_size,
        topic_name="Processing...",
        topic_summary="Processing...",
    )

# TODO: File upload endpoint
@router.post("/file", response_model=ContentResponse)
async def upload_file(
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
