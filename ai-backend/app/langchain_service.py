import os
from langchain.llms import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize the OpenAI API key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OpenAI API key not found. Please set it in .env file.")

# Create the OpenAI language model
llm = OpenAI(temperature=0.7, openai_api_key=OPENAI_API_KEY)

def generate_response(user_input: str) -> str:
    """
    Generates a response from the LLM based on user input.
    """
    return llm(user_input)
