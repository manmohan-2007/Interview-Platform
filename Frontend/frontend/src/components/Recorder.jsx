import { useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { submitAnswer, getFeedback } from "../services/api";

const Recorder = ({
  setQuestion,
  setQuestionNumber,
  setInterviewCompleted,
  setFeedback,
setAiStatus,

}) => {
const [error, setError] = useState("");   
const [processing, setProcessing] = useState(false);
const [seconds, setSeconds] = useState(0);
const timerRef = useRef(null);
const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [recording, setRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    streamRef.current = stream;

        setSeconds(0);

        timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
    }, 1000);

      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        clearInterval(timerRef.current);
        setProcessing(true);
        setAiStatus("Processing");
        const audioBlob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        try {
          const data = await submitAnswer(audioBlob);

          // Interview completed
          if (data.completed) {
            const result = await getFeedback();
            console.log("Feedback Response:", result);
            setFeedback(result.feedback);
            console.log("Setting interview completed");
            setInterviewCompleted(true);

            return;
          }

          // Next Question
          setQuestion(data.question);
          setQuestionNumber(data.questionNumber);

          // Audio Playback
          const audio = new Audio(
            `data:audio/mp3;base64,${data.audio}`
          );
          setAiStatus("Speaking");
          audio.play();
          audio.onended = () => {
             setAiStatus("Listening");
          } ;

        } catch (err) {
          console.log(err);
        }
        finally {
          setProcessing(false);

           streamRef.current?.getTracks().forEach((track) => track.stop());
        }
      };

      recorder.start();
      setRecording(true);
      setAiStatus("Recording");
    } catch (err) {
      console.log(err);
      if (err.name === "NotAllowedError") {
         setError("Microphone permission denied. Please allow microphone access.");
       } else if (err.name === "NotFoundError") {
          setError("No microphone detected.");
       } else {
           setError("Unable to access your microphone.");
      }
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setRecording(false);
  };
  return (
  <div className="flex flex-col items-center mt-10 space-y-5">

    {!recording ? (
      <button
        disabled={processing}
        onClick={startRecording}
        className="w-24 h-24 rounded-full
        bg-gradient-to-br
        from-violet-500
        to-indigo-600
        shadow-[0_0_40px_rgba(139,92,246,.5)]
        hover:scale-105
        transition-all
        duration-300
        flex
        items-center
        justify-center
        disabled:opacity-50"
      >
        <Mic size={38} className="text-white" />
      </button>
    ) : (
      <button
        onClick={stopRecording}
        className="w-24 h-24 rounded-full
        bg-gradient-to-br
        from-red-500
        to-red-700
        shadow-[0_0_40px_rgba(239,68,68,.6)]
        animate-pulse
        flex
        items-center
        justify-center"
      >
        <Square size={30} className="text-white" />
      </button>
    )}

    {recording && (
      <>
        <p className="text-red-400 font-semibold text-lg animate-pulse">
          ● Recording...
        </p>
     <div className="flex justify-center items-center gap-15">    

        <div className=" m-5 px-10 py-10 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-lg h-15 ">

          <p className=" text-2xs uppercase tracking-[3px] text-zinc-500 text-center">
            Recording Time
          </p>

          <h2 className=" text-center text-3xl font-bold text-white mt-2">
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:
            {String(seconds % 60).padStart(2, "0")}
          </h2>

        </div>

        {/* Sound Wave */}

        <div className="flex items-end gap-1 h-15 mt-3">

          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-violet-500 animate-pulse"
              style={{
                height: `${12 + (i % 5) * 8}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            ></span>
          ))}

        </div>
    </div>
      </>
    )}

    {!recording && !processing && (

      <p className="text-zinc-400 text-sm">
        Speak naturally. When you're done, press Stop to submit your answer.
      </p>

    )}

    {processing && (

      <div className="mt-3 px-8 py-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">

        <div className="flex items-center gap-3">

          <div className="w-4 h-4 rounded-full bg-yellow-400 animate-ping"></div>

          <p className="text-yellow-400 font-semibold">
            AI is analyzing your answer...
          </p>

        </div>

      </div>

    )}

    {error && (

      <div className="w-full max-w-md rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4">

        <p className="text-red-400 text-sm text-center">
          {error}
        </p>

      </div>

    )}

  </div>
);

  
};

export default Recorder;