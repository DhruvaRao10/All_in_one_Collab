from flask import Flask, render_template, request, jsonify
from backend import PDFQASystem
from flask_cors import CORS
from deepgram import (
       DeepgramClient,
       DeepgramClientOptions,
       PrerecordedOptions,
       FileSource,
)
import io 
import base64
from deepgram import Deepgram
import asyncio
from aiohttp import web
import uuid
import ffmpeg
import shutil
# from aiohttp_wsgi import WSGIHandler
from flask_socketio import SocketIO,send,emit
# from audiobot.speech_to_text_streaming import get_transcript
from audiobot.speech_to_text_streaming import transcribe
import httpx





# from audiobot.speech_to_text_streaming import get_transcript
# from audiobot.llm import streaming batch   
from embed import generate_embeddings_and_answer_query
import os
import dotenv

from dotenv import load_dotenv
from typing import Dict, Callable

project_root = os.path.dirname(os.path.abspath(__file__))

# os.environ['CURL_CA_BUNDLE'] = ''



app = Flask(__name__)
CORS(app)
DEEPGRAM_API_KEY = os.getenv('DEEPGRAM_API_KEY')
dg_client = DeepgramClient(DEEPGRAM_API_KEY)


# socketio = SocketIO(app)



app_root = os.path.dirname(os.path.abspath(__file__))  # Get the absolute path of the directory containing the Flask app
pdf_file_path = os.path.join(app_root, "./currdb")  # Construct the absolute path to the PDF file


@app.route('/')
def index():
    return render_template('base.html')


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    message = data.get('message')
    print("received json request")

    try:
        pdf_qa_system = PDFQASystem()
        answer = pdf_qa_system.answer_user_query(message)
        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/live-embeddings', methods=['POST'])
def generate_live_embeddings():
    print("Received a request to generate live embeddings...")

    file = request.files.get('file')
    print("file succesfully sent from the front-end")
    user_query = request.form.get('user_query') 

    # create temp directory 
    temp_dir_path = os.path.join(app_root, 'temp')
    if not os.path.exists(temp_dir_path):
        os.makedirs(temp_dir_path)

    if file and user_query:
        temp_file_path = os.path.join(temp_dir_path, file.filename)
        file.save(temp_file_path)
        print(f"Saved file to: {temp_file_path}")

        try:
            answer = generate_embeddings_and_answer_query(temp_file_path, user_query)
            if answer is not None:
                print(f"Answer: {answer}")
                return jsonify({'answer': answer})
            else:
                return jsonify({'error': 'No answer generated'}), 400
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'error': str(e)} ), 500
        finally:
            if os.path.exists(temp_file_path):
                os.remove(temp_file_path)
                print("Removed the temporary file.")
    else:
        return jsonify({'error': 'No file or user query provided'}), 400
    
@app.route('/transcribe', methods=['POST'])
async def transcribe():
    audio = request.files.get('audio')
    if audio:
        try:
            audio_data = audio.read()

            # Create a FileSource payload
            payload: FileSource = {
                "buffer": audio_data,
            }

            # Set the transcription options
            options: PrerecordedOptions = PrerecordedOptions(
                model="nova",
                smart_format=True,
                utterances=True,
                punctuate=True,
                diarize=True,
            )

            # Transcribe the audio file
            response =  dg_client.listen.prerecorded.v("1").transcribe_file(
                payload, options, timeout=httpx.Timeout(300.0)
            )
            transcribed_text = response['results']['channels'][0]['alternatives'][0]['transcript']

            # Return the transcription
            return {'transcription': transcribed_text}

        except Exception as e:
            return {'error': str(e)}, 500
    else:
        return {'error': 'No audio file provided'}, 400
    

    


if __name__ == '__main__':
    app.run(debug=True)
 
