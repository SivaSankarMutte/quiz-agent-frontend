import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import QuizPage from "./pages/QuizPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import MyAttemptsPage from "./pages/MyAttemptsPage";
import AllQuizzesPage from "./pages/AllQuizzesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                <DashboardPage />
                </ProtectedRoute>
            }
        />

        <Route
            path="/quiz/:quizId"
            element={
                <ProtectedRoute>
                <QuizPage />
                </ProtectedRoute>
            }
        />

        <Route
            path="/quiz/:quizId/leaderboard"
            element={
                <ProtectedRoute>
                <LeaderboardPage />
                </ProtectedRoute>
            } 
        />

        <Route
            path="/attempts"
            element={
                <ProtectedRoute>
                <MyAttemptsPage />
                </ProtectedRoute>
            }
        />

        <Route
            path="/quizzes"
            element={
                <ProtectedRoute>
                <AllQuizzesPage />
                </ProtectedRoute>
            }
        />

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;