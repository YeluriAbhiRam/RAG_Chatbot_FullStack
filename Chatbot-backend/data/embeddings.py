from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import json

def load_dataset():
    # Load your dataset
    with open("data/dataset.json", "r") as f:
        dataset = json.load(f)
    return dataset

def create_vectorstore():
    # Load dataset
    dataset = load_dataset()

    # Create embeddings using a free Hugging Face model
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # Create a vectorstore
    vectorstore = FAISS.from_texts([d["question"] for d in dataset], embeddings)

    # Add metadata (answers) to the vectorstore
    for i, d in enumerate(dataset):
        vectorstore.add_texts([d["question"]], metadatas=[{"answer": d["answer"]}])

    return vectorstore