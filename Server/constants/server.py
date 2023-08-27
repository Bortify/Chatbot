from dotenv import load_dotenv
import os

load_dotenv()

serverConstants = {
    'PORT': int(os.getenv('PORT') if os.getenv('PORT') else '5000')
}
