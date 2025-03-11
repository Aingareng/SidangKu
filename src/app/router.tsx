import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import SchedulePage from "../pages/dashboard/schedule/SchedulePage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/schedules" element={<SchedulePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
