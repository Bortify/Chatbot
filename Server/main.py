import os
import uvicorn
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

PORT = int(os.getenv('PORT'))

app = FastAPI(title='Chatbot Api',
              description='This is server for ChatBot.',
              version='0.0.1')

@app.get('/')
def read_root():
    return {
        'message': 'Server is working' 
    }

if __name__ == "__main__":
    uvicorn.run("main:app", port=PORT, log_level="info")