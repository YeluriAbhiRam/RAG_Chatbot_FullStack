from langchain.chains import RetrievalQA
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import data.embeddings  # Import the module instead of the function

def create_rag_chain():
    from models.llm import load_llm  # Lazy import inside function to avoid circular import

    llm = load_llm()
    vectorstore = data.embeddings.create_vectorstore()

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever(search_type="mmr", search_kwargs={"k": 3}),
        return_source_documents=True
    )
    return qa_chain
