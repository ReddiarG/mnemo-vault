# FastAPI Application Entrypoint
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import engine
from models.user import Base as UserBase
from models.content import Base as ContentBase

# Initialize the database
UserBase.metadata.create_all(bind=engine)
ContentBase.metadata.create_all(bind=engine)

# FastAPI application
app = FastAPI(
    title="MnemoVault API",
    description="API for MnemoVault",
    version="0.1.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/", tags=["root"])
async def root():
    return {"message": "Welcome to MnemoVault!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
