import AudioRecorder from "@/components/AudioRecorder";

export default function Index() {
  return (
    <main className="min-h-screen bg-green-200">
      <h1 className="font-sans">Welcome to SpeechMore</h1>
      <AudioRecorder />
    </main>
  );
}
