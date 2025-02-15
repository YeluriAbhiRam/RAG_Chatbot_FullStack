from langchain.chains import ConversationChain
from langchain.prompts import PromptTemplate
from .memory import setup_memory

def create_chain():
    # Import inside function to avoid circular dependency
    from .llm import load_llm  

    # Load LLM and memory
    llm = load_llm()
    memory = setup_memory()

    # Define a minimal prompt template
    prompt_template = PromptTemplate(
        input_variables=["history", "input"],
        template="""
        You are a helpful AI assistant. Answer the user's question concisely.

        Conversation history:
        {history}

        User: {input}
        AI:
        """
    )

    # Create a conversation chain
    chain = ConversationChain(
        llm=llm,
        memory=memory,
        prompt=prompt_template,
        verbose=False
    )
    return chain
