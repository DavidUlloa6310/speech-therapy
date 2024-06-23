import React, { useState, useRef, FC } from "react";

const AudioRecorder: FC = () => {
  const [permission, setPermission] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert((err as Error).message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = () => {
    if (stream) {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);

      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm; codecs=opus" });
        // const formData = new FormData();
        // formData.append("audioFile", audioBlob, "recording.webm");
        console.log(await audioBlob.text());
        const response = await fetch(
          process.env.NEXT_PUBLIC_GROK_ENDPOINT || "",
          {
            method: "POST",
            body: audioBlob,
            headers: {
              "Content-Type": "audio/webm; codecs=opus",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch feedback: ${response.statusText}`);
        }
        console.log(response);
        setIsRecording(false);
      };
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const playAudio = () => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play();
    }
  };

  return (
    <div>
      <h2>Audio Recorder</h2>
      <main>
        <div className="audio-controls">
          {!permission ? (
            <button onClick={getMicrophonePermission} type="button">
              Get Microphone
            </button>
          ) : null}
          {permission ? (
            <button
              onMouseDown={startRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              onMouseUp={stopRecording}
              onMouseLeave={stopRecording}
              type="button"
            >
              Hold to Record
            </button>
          ) : null}
          {audioURL ? (
            <button onClick={playAudio} type="button">
              Play
            </button>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default AudioRecorder;
