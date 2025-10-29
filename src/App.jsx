import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./components/LandingPage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Header from "./components/Header";
import ControlBar from "./components/ControlBar";
import Home from "./components/ControlBar-components/Home";
import Tasks from "./components/ControlBar-components/Tasks";
import "./App.css";

function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* Public Routes */}
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes - Dashboard */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <div className="h-screen p-2.5 flex flex-col bg-dark-bg gap-2">
                                <Header />
                                <div className="flex-1 w-full flex items-center justify-center">
                                    <Home />
                                </div>
                                <ControlBar />
                            </div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <div className="h-screen p-2.5 flex flex-col bg-dark-bg gap-2">
                                <Header />
                                <div className="flex-1 w-full overflow-hidden">
                                    <Tasks />
                                </div>
                                <ControlBar />
                            </div>
                        </ProtectedRoute>
                    }
                />

                {/* Default redirect to landing page */}
                <Route path="*" element={<Navigate to="/landing" replace />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
