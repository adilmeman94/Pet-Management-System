import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PetList from "./pages/PetList";
import AdminDashboard from "./pages/AdminDashboard";
import PublicRoute from "./routes/PublicRoute.jsx";
import RoleRoute from "./routes/RoleRoute.jsx";
import "./App.css";

export default function App() {
  return (
    <Box className="container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PetList />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <RoleRoute role="admin">
                <AdminDashboard />
              </RoleRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
