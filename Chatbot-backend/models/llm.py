from langchain_community.llms import HuggingFaceHub
import os

def load_llm():
    llm = HuggingFaceHub(
        repo_id="meta-llama/Llama-2-7b",
        task="text-generation",
        huggingfacehub_api_token=os.getenv("HUGGINGFACEHUB_API_TOKEN"),
        model_kwargs={"max_length": 256}
    )
    return llm
