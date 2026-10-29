import { startInterview } from "../services/api";
import QuestionCard from "./QuestionCard";
import Recorder from "./Recorder";
import ProgressBar from "./ProgressBar";
import FeedbackCard from "./FeedbackCard";
import StartScreen from "./StartScreen";
const InterviewPanel = ({
  selectedTopic,
  interviewStarted,
  setInterviewStarted,
  question,
  setQuestion,
  questionNumber,
  setQuestionNumber,
  loading,
  setLoading,
  interviewCompleted,
  setInterviewCompleted,
  feedback,
  setFeedback,
  aiStatus,
  setAiStatus,
}) => {
  const handleStartInterview = async () => {
  console.log("1. Function Called");
  console.log("Selected Topic:", selectedTopic);

  if (!selectedTopic) {
    console.log("2. No Topic Selected");
    return;
  }

  setLoading(true);

  try {
    console.log("3. Before API");

    const data = await startInterview(selectedTopic);

    console.log("4. API Response:", data);

    setInterviewStarted(true);

    setQuestion(data.question);

    const audio = new Audio(
      `data:audio/mp3;base64,${data.audio}`
    );

    setAiStatus("Speaking");

    audio.play();

    audio.onended = () => {
      setAiStatus("Listening");
    };

  } catch (err) {
    console.error("API Error:", err);
  } finally {
    setLoading(false);
  }
};
return (
  <div className="flex-1 flex flex-col px-10 pt-10">

    {loading ? (
      <div className="flex flex-1 flex-col items-center justify-center">

        <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>

        <h2 className="mt-8 text-3xl font-bold">
          Preparing Your Interview...
        </h2>

        <p className="mt-3 text-zinc-400 text-lg">
          AI is generating your first question.
        </p>

      </div>

    ) : !interviewStarted ? (

      <StartScreen
           selectedTopic={selectedTopic}
           onStart={handleStartInterview}
      />

    ) : interviewCompleted ? (

      <FeedbackCard feedback={feedback} />

    ) : (

      <div className="flex flex-col items-center gap-10">

        <QuestionCard
          question={question}
          questionNumber={questionNumber}
          aiStatus={aiStatus}
        />

        <Recorder
          setQuestion={setQuestion}
          setQuestionNumber={setQuestionNumber}
          setInterviewCompleted={setInterviewCompleted}
          setFeedback={setFeedback}
          setAiStatus={setAiStatus}
        />

        <div className="w-full max-w-5xl">
          <ProgressBar questionNumber={questionNumber} />
        </div>

      </div>

    )}

  </div>
);
};

export default InterviewPanel;