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
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-8 text-slate-900 shadow-xl shadow-slate-200/70 sm:px-10 sm:py-10">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-blue-100/80 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-40 w-40 rounded-full bg-teal-100/70 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <PackageCheck size={14} />
              Procurement workspace
            </div>
            <h1 className="max-w-xl text-3xl font-bold tracking-tight sm:text-5xl">
              Inventory decisions, kept simple.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Record material purchases, connect vendor and material services,
              and inspect transaction history from one focused workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/purchase"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              <ClipboardPlus size={17} />
              Add purchase
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/reports"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <FileBarChart size={17} />
              View reports
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ClipboardPlus size={19} />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-blue-600">
            01 / Entry
          </p>
          <h2 className="mt-2 text-lg font-bold text-slate-900">
            Record purchases
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Capture vendor, material, quantity, amount, and date details.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Layers3 size={19} />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-indigo-600">
            02 / Connect
          </p>
          <h2 className="mt-2 text-lg font-bold text-slate-900">
            Use live references
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Choose vendors and category-specific materials from connected
            services.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Workflow size={19} />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-emerald-600">
            03 / Review
          </p>
          <h2 className="mt-2 text-lg font-bold text-slate-900">
            Inspect history
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Filter purchase records by vendor and date range when you need
            context.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
