import getpass
import os
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()  

if "GROQ_API_KEY" not in os.environ:
    os.environ["GROQ_API_KEY"] = getpass.getpass("Enter your Groq API key: ")

llm = ChatGroq(
    model="llama3-70b-8192",
    temperature=0.8,
    max_tokens=400,
    timeout=None,
    max_retries=2,

)

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are a helpful agriculture assistant. The user will provide you a plant issue. "
        "Explain how to solve it in a simple, sarcastic, funny, and kind way."
        "and emojis are also allowed but not excessively"
    ),
    ("user", "{text}"),
])

def call_llm(text):
    """defining a function to call get solutions about the plant's problem"""
    # Filling the prompt
    formatted_prompt = prompt.format_messages(text=text)

    # Call LLM
    ai_msg = llm.invoke(formatted_prompt)

    return str(ai_msg.content)

if __name__ == 'main':
    """testing the function"""
    res = call_llm("help me tomato early bright")
    print(res)