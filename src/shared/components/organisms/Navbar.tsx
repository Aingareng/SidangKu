import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

import Menu from "../molecules/Menu";
import { MenuAttributes } from "../../libs/elementAttributes";
import List from "../atoms/List";
import getInitials from "../../utils/initialString";
import roleCheking from "../../../features/schedules/utils/roleCheking";

export default function Navbar() {
  const user = roleCheking();
  return (
    <nav className="navbar bg-base-100 shadow">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <Menu attributes={MenuAttributes}>
            <List>
              <Link to="/">
                <Icon
                  icon="material-symbols:book-5-rounded"
                  width="24"
                  height="24"
                />
                Jadwal Sidang
              </Link>
            </List>
            {user.isAuthority && user.role?.toLowerCase() === "admin" && (
              <List>
                <Link to="/personnel">
                  <Icon icon="material-symbols:person" width="24" height="24" />
                  Data Pihak Terkait
                </Link>
              </List>
            )}

            <List>
              <a href="/login">
                <Icon
                  icon="material-symbols:exit-to-app-rounded"
                  width="24"
                  height="24"
                />
                Keluar
              </a>
            </List>
          </Menu>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">
          Sidangku
        </Link>
      </div>
      <div className="navbar-end">
        <div className="avatar placeholder">
          <div className="bg-primary text-neutral-content w-12 rounded-full">
            <span className="text-xl">{getInitials(user.name as string)}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
