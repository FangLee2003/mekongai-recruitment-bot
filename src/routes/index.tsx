import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Landing from "../pages/Landing";
import Demo from "../pages/Demo";
import LandingPage from "../pages/LandingPage";

// import Login from "../pages/Auth/Login";
// import Register from "../pages/Auth/Register";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* <Route path="/login" element={<Login />} />  */}
                {/* <Route path="/register" element={<Register />} /> */}
                <Route path="/demo" element={<Demo />} />
            </Routes>
        </BrowserRouter>
    );
}
