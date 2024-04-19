import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route index path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
