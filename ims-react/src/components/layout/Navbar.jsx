import { NavLink } from "react-router-dom";
import { PackageCheck } from "lucide-react";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-900"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
            <PackageCheck size={20} />
          </div>
          <span>IMS</span>
        </NavLink>

        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/purchase" className={navLinkClass}>
            Add Purchase
          </NavLink>

          <NavLink to="/reports" className={navLinkClass}>
            Reports
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
