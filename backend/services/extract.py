# Content Extraction Services
import os
import requests
from typing import List, Dict, Any, Tuple,Optional
from bs4 import BeautifulSoup
import markdown
from sqlalchemy.orm import Session

from models.content import UploadedContent, ContentChunk
# TODO: from services.chunking import chunk_text


# Extract and chunk text from a URL
async def extract_text_from_url(url: str, user_id: int, kb_id: int, db: Session) -> Tuple[UploadedContent, List[ContentChunk]]:
    try:
        response = requests.get(url)
        response.raise_for_status()

        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract text from the HTML body
        paragraphs = soup.find_all('p')
        extracted_text = "\n".join([p.text.strip() for p in paragraphs])
        
        # Extract metadata
        title = soup.title.string if soup.title else f"Untitled: {url}"
        links = [link.get('href') for link in soup.find_all('a') if link.get('href')]
        content_metadata = {
            "title": title,
            "source_url": url,
            "links": links,
            # TODO: add more metadata e.g. author, date, images, etc.
        }

        # Create uploaded content object
        uploaded_content = UploadedContent(
            user_id=user_id,
            kb_id=kb_id,
            original_source_name=title,
            content_type="text/html",
            content_size=len(response.text),
            content_metadata=content_metadata,
            content_text=extracted_text,
        )
        db.add(uploaded_content)
        db.commit()
        db.refresh(uploaded_content)

        # TODO: Implement chunking
        chunks = []

        return uploaded_content, chunks
    
    except Exception as e:
        # Create uploaded content object with error message
        uploaded_content = UploadedContent(
            user_id=user_id,
            kb_id=kb_id,
            original_source_name=f"Error: {title}",
            content_type="text/html",
            content_size=len(str(e)),
        )
        db.add(uploaded_content)
        db.commit()
        db.refresh(uploaded_content)
        
        return uploaded_content, []
