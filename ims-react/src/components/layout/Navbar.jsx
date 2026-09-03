import { NavLink } from "react-router-dom";
import { PackageCheck } from "lucide-react";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-blue-500/15 text-blue-200 ring-1 ring-blue-400/30"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b17]/85 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <NavLink to="/" className="flex min-w-0 items-center gap-3 text-white">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-900/40">
            <PackageCheck size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight">
                IMS Portal
              </span>
              <span className="hidden rounded-full border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-200 sm:inline">
                Enterprise
              </span>
            </div>
            <span className="hidden text-xs text-slate-500 sm:block">
              Inventory & Material Procurement
            </span>
          </div>
        </NavLink>

        <nav className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
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
