import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, ClipboardPlus, FileBarChart } from "lucide-react";

function PurchaseSuccess() {
  const { state } = useLocation();
  const purchase = state?.purchase;

  if (!purchase) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/70 sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
            <FileBarChart size={38} />
          </div>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
            No purchase result
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Purchase details are unavailable
          </h1>
          <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
            This page is available after a purchase is submitted successfully.
          </p>
          <Link
            to="/purchase"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <ClipboardPlus size={17} />
            Go to purchase entry
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/70 sm:p-12">
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

        <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
          The purchase details have been successfully recorded in the Inventory
          Management System.
        </p>

        {purchase && (
          <dl className="mx-auto mt-8 grid max-w-lg gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Purchase ID
              </dt>
              <dd className="mt-1 font-semibold text-slate-900">
                {purchase.purchaseId ?? "-"}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Transaction ID
              </dt>
              <dd className="mt-1 break-all font-semibold text-slate-900">
                {purchase.transactionId || "-"}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Vendor
              </dt>
              <dd className="mt-1 text-slate-700">
                {purchase.vendorName || "-"}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Purchase Amount
              </dt>
              <dd className="mt-1 text-slate-700">
                {purchase.purchaseAmount ?? "-"}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Purchase Date
              </dt>
              <dd className="mt-1 text-slate-700">
                {purchase.purchaseDate || "-"}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </dt>
              <dd className="mt-1 text-slate-700">{purchase.status || "-"}</dd>
            </div>
          </dl>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/purchase"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
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
