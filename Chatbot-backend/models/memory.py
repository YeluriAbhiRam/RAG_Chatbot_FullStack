from langchain.memory import ConversationBufferMemory

def setup_memory():
    # Set up memory with a limited buffer size
    memory = ConversationBufferMemory(
        max_token_limit=200  # Adjust this value as needed
    )
    return memory