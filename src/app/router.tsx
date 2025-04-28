import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import SchedulePage from "../pages/dashboard/schedule/SchedulePage";
import PersonnelPage from "../pages/dashboard/personnel/PersonnelPage";
import Authenticated from "../features/auth/components/Authenticated";
import RoleProtected from "../features/auth/components/RoleProtected";
import UnauthorizedPage from "../pages/UnauthorizedPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/401" element={<UnauthorizedPage />} />

        <Route element={<Authenticated />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<SchedulePage />} />

            <Route element={<RoleProtected allowedRoles={["admin"]} />}>
              <Route path="/personnel" element={<PersonnelPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
