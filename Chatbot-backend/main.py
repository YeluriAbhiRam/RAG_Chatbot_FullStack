from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from rag.rag_chain import create_rag_chain  # Import RAG first to avoid circular import
from models.chain import create_chain
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os
import re

# Load environment variables
load_dotenv()

app = FastAPI()

# Allow CORS
origins = [
    "http://localhost:3000",
    "http://192.168.1.11:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize chains
qa_chain = create_rag_chain()
chain = create_chain()

class ChatRequest(BaseModel):
    user_input: str

@app.post("/chat")
async def chat(chat_request: ChatRequest):
    try:
        user_input = chat_request.user_input
        rag_response = qa_chain.invoke({"query": user_input})

        chatbot_response = rag_response.get("result", "").strip()
        source_documents = rag_response.get("source_documents", [])

        clean_response = re.sub(r"Use the following context to answer the question.*\n", "", chatbot_response)
        clean_response = re.sub(r"Context:\s*", "", clean_response)
        clean_response = re.sub(r"Question:\s*", "", clean_response)
        clean_response = re.sub(r"Answer:\s*", "", clean_response)

        return {
            "user_input": user_input,
            "chatbot_response": clean_response,
            "source_documents": [doc.page_content for doc in source_documents]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
