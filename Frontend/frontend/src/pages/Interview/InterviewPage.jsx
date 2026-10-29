import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import Hero from "../../components/Hero";
import InterviewPanel from "../../components/InterviewPanel";
const InterviewPage = () => {
  const [selectedTopic, setSelectedTopic] = useState("");

  const [interviewStarted, setInterviewStarted] = useState(false);

  const [question, setQuestion] = useState("");

  const [questionNumber, setQuestionNumber] = useState(1);

  const [loading, setLoading] = useState(false);

  const [interviewCompleted, setInterviewCompleted] = useState(false);

  const [feedback, setFeedback] = useState(null);
  const [aiStatus, setAiStatus] = useState("Speaking");
  const [sidebarOpen, setSidebarOpen]=useState(false);
  return (
    <div className="flex min-h-screen bg-black text-white">
      <button
        onClick={()=>setSidebarOpen(true)}
        className="lg:hidden fixed top-6 left-6 z-50 w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center">☰</button>
        {sidebarOpen && (
             <div
               className="fixed inset-0 bg-black/50 z-40 lg:hidden"
               onClick={() => setSidebarOpen(false)}
              />
         )}
      <Sidebar
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col px-6 py-6 gap-8">
        <Hero/>

        <InterviewPanel
          selectedTopic={selectedTopic}
          interviewStarted={interviewStarted}
          setInterviewStarted={setInterviewStarted}
          question={question}
          setQuestion={setQuestion}
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
          loading={loading}
          setLoading={setLoading}
          interviewCompleted={interviewCompleted}
          setInterviewCompleted={setInterviewCompleted}
          feedback={feedback}
          setFeedback={setFeedback}
          aiStatus={aiStatus}
          setAiStatus={setAiStatus}
        />
      </div>
    </div>
  );
}

export default InterviewPage;