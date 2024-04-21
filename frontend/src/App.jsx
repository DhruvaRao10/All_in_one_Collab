import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import Blogview from "./pages/Blogview";
import Codeeditor from "./pages/Codeeditor";
import ProtectedRoute from "./pages/ProtectedRoutes";
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Homepage />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="blog"
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route
            path="blog/:id"
            element={
              <ProtectedRoute>
                <Blogview />
              </ProtectedRoute>
            }
          />
          <Route
            path="codeeditor"
            element={
              <ProtectedRoute>
                <Codeeditor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
