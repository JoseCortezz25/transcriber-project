from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
import pytube
import whisper
import os

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {
        'welcome': "Hola Mundo. This is a simple API."
    }

def transcribe_youtube_video(url: str, model: str = "small"):
    if not url:
        raise HTTPException(
            status_code=400, detail="Please provide a YouTube url to transcribe")

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[
            logging.StreamHandler()
        ]
    )

    logging.info("Downloading Whisper model")
    model = whisper.load_model(model)

    logging.info("Downloading the video from YouTube...")
    youtube_video = pytube.YouTube(url)

    logging.info("Getting only the audio from the video")
    audio = youtube_video.streams.get_audio_only()
    audio.download(filename='tmp.mp4')

    logging.info("Transcribing the audio")
    result = model.transcribe('tmp.mp4')
    print(result["text"])
    os.remove('tmp.mp4')
    return result["text"]

@app.get("/transcribe")
def transcribe(url: str, model: str = "small"):
    return {"text": transcribe_youtube_video(url, model)}
