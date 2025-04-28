import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import SchedulePage from "../pages/dashboard/schedule/SchedulePage";
import PersonnelPage from "../pages/dashboard/personnel/PersonnelPage";
import Authenticated from "../features/auth/components/Authenticated";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Authenticated />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<SchedulePage />} />
            <Route path="/personnel" element={<PersonnelPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
