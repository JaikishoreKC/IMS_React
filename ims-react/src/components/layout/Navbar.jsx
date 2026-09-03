import { NavLink } from "react-router-dom";
import { PackageCheck } from "lucide-react";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <NavLink
          to="/"
          className="flex min-w-0 items-center gap-3 text-slate-900"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <PackageCheck size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight">
                IMS Portal
              </span>
            </div>
            <span className="hidden text-xs text-slate-500 sm:block">
              Inventory & Material Procurement
            </span>
          </div>
        </NavLink>

        <nav className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
          <NavLink to="/" end className={navLinkClass}>
            Overview
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
