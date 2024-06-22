from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/feedback")
async def receive_feedback(file: UploadFile = File(...)):
    return {"filename": file.filename, "content_type": file.content_type}

    # if file.content_type != "audio/flac":
    #         return JSONResponse(status_code=400, content={"message": "Invalid file type. Only FLAC files are accepted."})

    # # Process the file (e.g., save it, analyze it, etc.)
    # # For demonstration, we'll just read the content
    # content = await file.read()
    
    # with open("received_audio.flac", "wb") as f:
    #     f.write(content)

    # return {"message": "File received successfully", "filename": file.filename}