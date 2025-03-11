import Navbar from "../../shared/components/organisms/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="p-9">
        <Outlet />
      </main>
    </>
  );
}
