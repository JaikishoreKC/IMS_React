import { Link } from "react-router-dom";
import {
  ArrowRight,
  ClipboardPlus,
  FileBarChart,
  Layers3,
  PackageCheck,
  Workflow,
} from "lucide-react";

function Home() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#121b3a] via-[#17143d] to-[#10172a] px-6 py-8 text-white shadow-2xl shadow-black/20 sm:px-10 sm:py-10">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/10 px-3 py-1.5 text-xs font-semibold text-blue-200">
              <PackageCheck size={14} />
              Procurement workspace
            </div>
            <h1 className="max-w-xl text-3xl font-bold tracking-tight sm:text-5xl">
              Inventory decisions, kept simple.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Record material purchases, connect vendor and material services,
              and inspect transaction history from one focused workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/purchase"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-400"
            >
              <ClipboardPlus size={17} />
              Add purchase
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/reports"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-slate-100 transition hover:bg-white/10"
            >
              <FileBarChart size={17} />
              View reports
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#0d1427]/85 p-5 shadow-xl shadow-black/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
            <ClipboardPlus size={19} />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-blue-300">
            01 / Entry
          </p>
          <h2 className="mt-2 text-lg font-bold text-white">
            Record purchases
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Capture vendor, material, quantity, amount, and date details.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0d1427]/85 p-5 shadow-xl shadow-black/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
            <Layers3 size={19} />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-violet-300">
            02 / Connect
          </p>
          <h2 className="mt-2 text-lg font-bold text-white">
            Use live references
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Choose vendors and category-specific materials from connected
            services.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0d1427]/85 p-5 shadow-xl shadow-black/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
            <Workflow size={19} />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-emerald-300">
            03 / Review
          </p>
          <h2 className="mt-2 text-lg font-bold text-white">Inspect history</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Filter purchase records by vendor and date range when you need
            context.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
