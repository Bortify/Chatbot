import os
import uvicorn
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.gzip import GZipMiddleware
from database.prisma import prisma

load_dotenv()

PORT = int(os.getenv('PORT'))

app = FastAPI(title='Chatbot Api',
              description='This is server for ChatBot.',
              version='0.0.1')

app.add_middleware(GZipMiddleware)

@app.on_event('startup')
async def startup():
    try:
        await prisma.connect()
        print('Database Connected Succesfully')
    except:
        print('Database Not Connected')

@app.on_event('shutdown')
async def shutdown():
    try:
        await prisma.disconnect()
        print('database disconnected successfully')
    except:
        print('database not disconnected')

@app.get('/')
def read_root():
    return {
        'message': 'Server is working' 
    }

if __name__ == "__main__":
    uvicorn.run("main:app", port=PORT, log_level="info")