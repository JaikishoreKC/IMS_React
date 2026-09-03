import { Link } from "react-router-dom";
import {
  ArrowRight,
  ClipboardPlus,
  FileBarChart,
  PackageCheck,
} from "lucide-react";

function Home() {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 text-white shadow-lg sm:px-12">
        {/* Decorative background elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative max-w-2xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <PackageCheck size={28} />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
            Inventory Management System
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Manage purchases with clarity and confidence.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Record material purchases, manage vendor transactions, and access
            purchase reports from one streamlined application.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/purchase"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Add Purchase
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/reports"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Reports
              <FileBarChart size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Quick Actions
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            What would you like to do?
          </h2>

          <p className="mt-2 text-slate-500">
            Choose an action to continue managing your inventory purchases.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Add Purchase Card */}
          <Link
            to="/purchase"
            className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ClipboardPlus size={24} />
              </div>

              <ArrowRight
                size={20}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
              />
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              Add Purchase Detail
            </h3>

            <p className="mt-2 leading-6 text-slate-500">
              Record a new material purchase by selecting a vendor, material
              details, quantity, amount, and purchase date.
            </p>

            <div className="mt-6 text-sm font-semibold text-blue-600">
              Create Purchase →
            </div>
          </Link>

          {/* Reports Card */}
          <Link
            to="/reports"
            className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FileBarChart size={24} />
              </div>

              <ArrowRight
                size={20}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
              />
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              Purchase Reports
            </h3>

            <p className="mt-2 leading-6 text-slate-500">
              View purchase transactions for a selected vendor within a
              specific date range.
            </p>

            <div className="mt-6 text-sm font-semibold text-indigo-600">
              View Reports →
            </div>
          </Link>
        </div>
      </section>

      {/* Footer Info */}
      <section className="rounded-2xl border border-slate-200 bg-white px-6 py-5">
        <p className="text-center text-sm text-slate-500">
          Inventory Management System · Material Purchase Management
        </p>
      </section>
    </div>
  );
}

export default Home;
