# Chunking Services
from typing import List
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Placeholder chunking strategy
def chunk_text(text: str, chunk_size: int = 1000, chunk_overlap: int = 200) -> List[str]:
    """
    Chunk extracted text into smaller pieces
    """
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return splitter.split_text(text)