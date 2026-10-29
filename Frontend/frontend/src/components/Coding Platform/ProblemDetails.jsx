import React from 'react'
import { useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Play,
  Send,
  Code2,
} from 'lucide-react';

const difficultyStyle = {
  Easy: "text-emerald-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};

const ProblemDetails = () => {
  const [code, setCode] = useState();
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/problems");
        if (!response.ok) {
          throw new Error("Failed to fetch problems")
        }
        const data = await response.json();
        setProblems(data);
      }
      catch (error) {
        console.error("Problems fetch error:", error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const handleRun = async () => {
    if (!problem) {
      setOutput("Problem context not loaded yet.");
      return;
    }
    setIsRunning(true);
    setOutput("");
    try {
      const response = await fetch("http://127.0.0.1:5001/run_code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
            language: language,
            problem_id: problem.problem_id.toString(),
            stdin: "",
          })
        }
      );

      if (response.status === 404) {
        setOutput("Error 404: Problem ID not found in database or route mismatch.");
        setIsRunning(false);
        return;
      }

      const result = await response.json();
      if (result.error) {
        setOutput(result.error);
      }
      else if (result.stderr) {
        setOutput(result.stderr);
      }
      else if (result.compile_output) {
        setOutput(result.compile_output);
      }
      else {
        let displayOutput = `Status: ${result.status}\n\n`;
        if (result.test_results) {
          result.test_results.forEach((tc) => {
            displayOutput += `Test Case ${tc.test_case}: ${tc.passed ? "🟢 PASSED" : "🔴 FAILED"}\n`;
            displayOutput += `Input: ${tc.stdin}\n`;
            displayOutput += `Expected: ${tc.expected}\n`;
            displayOutput += `Actual: ${tc.actual}\n`;
            displayOutput += `Status Description: ${tc.status}\n`;
            displayOutput += `-------------------------\n`;
          });
        }
        setOutput(displayOutput);
      }

    }
    catch (error) {
      setOutput("Failed to run code.");
      console.error(error);
    }
    finally {
      setIsRunning(false);
    }
  }

  const { id } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("java");

  const problem = problems.find(
    (item) => item.problem_id == Number(id)
  );

    useEffect(() => {
    // HackerRank Style Default Templates Setup
    const templates = {
      java: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Write your code here to read from stdin and print to stdout\n        \n    }\n}`,
      python: `import sys\n\ndef main():\n    # Read all lines from standard input\n    # lines = sys.stdin.read().splitlines()\n    pass\n\nif __name__ == "__main__":\n    main()`,
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}`,
      javascript: `const fs = require('fs');\n\nfunction main() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8');\n    // Process input\n}\n\nmain();`
    };

    setCode(templates[language] || "");
  }, [problem, language]);


  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Problem Not Found</h1>
          <button
            onClick={() => navigate('/coding')}
            className="mt-5 rounded-xl bg-violet-600 px-5 py-2 text-sm"
          >Back to Problem</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <button
          onClick={() => navigate("/coding")}
          className="flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Problems
        </button>
        <div className="flex items-center gap-2">
          <Code2 size={20} className="text-violet-400" />
          <span className="font-semibold">Stuf Coding</span>
        </div>
        <div className="text-sm text-white/40">
          Problem {problem.problem_id}
        </div>
      </header>

      {/* Work Space */}
      <main className="grid min-h-[calc(100vh-73px)] lg:grid-cols-2">
        {/* Left Side: Details */}
        <section className="overflow-y-auto border-r border-white/10 p-6 lg:p-8">
          <div className="mb-6 flex items-center gap-3">
            <h1 className="text-2xl font-bold">
              {problem.problem_id}.{problem.title}
            </h1>
            <span className={`text-sm font-medium ${difficultyStyle[problem.difficulty]}`}>
              {problem.difficulty}
            </span>
          </div>

          {/* Topics */}
          <div className="mb-7 flex flex-wrap gap-2">
            {problem.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">Description</h2>
            <p className="text-sm leading-7 text-white/60">{problem.description}</p>
          </div>

          {/* Examples */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold">Examples</h2>
            <div className="space-y-4">
              {problem.examples.map((example) => (
                <div
                  key={example.example_num}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                >
                  <p className="mb-3 text-sm font-medium">
                    Example {example.example_num}
                  </p>
                  <p className="whitespace-pre-wrap font-mono text-xs text-white/60">
                    {example.example_text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Constraints */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Constraints</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-white/60">
              {problem.constraints.map((constraint, index) => (
                <li key={index}>
                  <span>{constraint}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Right Side: Monaco Editor */}
        <section className="flex flex-col bg-[#08080b]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/70 outline-none"
            >
              <option value="cpp" className="bg-[#111116]">C++</option>
              <option value="python" className="bg-[#111116]">Python</option>
              <option value="java" className="bg-[#111116]">Java</option>
              <option value="javascript" className="bg-[#111116]">JavaScript</option>
            </select>
            <span className="text-xs text-white/30 font-mono">Editor</span>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 min-h-[400px]">
            <Editor
              height="100%"
              theme="vs-dark"
              language={language === "javascript" ? "javascript" : language === "cpp" ? "cpp" : language}
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
                scrollBeyondLastLine: false,
              }}
            />
          </div>

          {/* Action Bar & Output Panel */}
          <div className="border-t border-white/10 bg-[#0c0c12] p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white/40">Console Output</span>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-violet-500 disabled:opacity-50"
              >
                {isRunning ? (
                  "Running..."
                ) : (
                  <>
                    <Play size={16} fill="currentColor" />
                    Run Code
                  </>
                )}
              </button>
            </div>

            {/* Terminal Display Panel */}
            <div className="h-48 overflow-y-auto rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs leading-5">
              {output ? (
                <pre className="whitespace-pre-wrap text-white/80">{output}</pre>
              ) : (
                <span className="text-white/20">Click "Run Code" to execute test cases against the judge server.</span>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProblemDetails;
