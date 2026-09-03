import { Link } from "react-router-dom";
import { CheckCircle2, ClipboardPlus, FileBarChart } from "lucide-react";

function PurchaseSuccess() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={42} strokeWidth={2.2} />
        </div>

        {/* Content */}
        <p className="mt-7 text-sm font-semibold uppercase tracking-wider text-emerald-600">
          Purchase Management
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Purchase Added Successfully
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-7 text-slate-500">
          The purchase details have been successfully recorded in the
          Inventory Management System.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/purchase"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <ClipboardPlus size={17} />
            Add Another Purchase
          </Link>

          <Link
            to="/reports"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <FileBarChart size={17} />
            View Reports
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSuccess;
