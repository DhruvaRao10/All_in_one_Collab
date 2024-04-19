import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import Blogview from "./pages/Blogview";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<Blogview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
