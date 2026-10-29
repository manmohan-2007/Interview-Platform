import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";
import LandingPage from "./pages/Landing/LandingPage";
import InterviewPage from "./pages/Interview/InterviewPage";
import CodingPlatform from "./components/Coding Platform/CodingPlatform";
import ProblemDetails from "./components/Coding Platform/ProblemDetails";

function App() {
  return (
    <Routes>

      {/* Public Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Login Required */}
      <Route
        path="/interview"
        element={
          <ProtectedRoute>
            <InterviewPage />
          </ProtectedRoute>
        }
      />

      {/* Login Required */}
      <Route
        path="/coding"
        element={
          <ProtectedRoute>
            <CodingPlatform />
          </ProtectedRoute>
        }
      />

      {/* Login Required */}
      <Route
        path="/coding/problems/:id"
        element={
          <ProtectedRoute>
            <ProblemDetails />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;