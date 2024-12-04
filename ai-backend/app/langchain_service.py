from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv

load_dotenv()

# Set OpenAI API key
os.environ['OPENAI_API_KEY'] = os.getenv("OPENAI_API_KEY")

# Initialize the Langchain model
llm = ChatOpenAI(
    model="gpt-3.5-turbo",  # Use the desired model
    temperature=0.7
)

def generate_response(prompt: str):
    try:
        # Using the invoke method instead of the deprecated __call__ method
        response = llm.invoke([{"role": "user", "content": prompt}])
        
        # Check if response is an AIMessage and extract the content correctly
        if hasattr(response, 'content'):
            return response.content  # Return the response content from AIMessage
        else:
            return "Error: Unexpected response format."
    except Exception as e:
        raise Exception(f"Error generating response: {str(e)}")
