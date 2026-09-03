import { useEffect, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  RotateCcw,
  Search,
  Building2,
  LoaderCircle,
  AlertCircle,
  FileX,
  ReceiptText,
} from "lucide-react";

import { getVendors, getPurchaseReport } from "../services/purchaseService";

const initialFilters = {
  vendorName: "",
  fromDate: "",
  toDate: "",
};

function PurchaseReports() {
  const [filters, setFilters] = useState(initialFilters);

  const [vendors, setVendors] = useState([]);
  const [reportData, setReportData] = useState([]);

  const [loadingVendors, setLoadingVendors] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);

  const [apiError, setApiError] = useState("");
  const [validationError, setValidationError] = useState("");

  const [reportGenerated, setReportGenerated] = useState(false);

  useEffect(() => {
    const loadVendors = async () => {
      try {
        setLoadingVendors(true);
        setApiError("");

        const vendorData = await getVendors();

        setVendors(vendorData || []);
      } catch (error) {
        console.error("Failed to load vendors:", error);

        setApiError(
          error.response?.data?.message ||
            "Unable to load vendors. Please ensure the IMS backend is running.",
        );
      } finally {
        setLoadingVendors(false);
      }
    };

    loadVendors();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }));

    setValidationError("");
    setApiError("");
  };

  const validateFilters = () => {
    if (!filters.vendorName) {
      setValidationError("Please select a vendor.");
      return false;
    }

    if (!filters.fromDate) {
      setValidationError("Please select a From Date.");
      return false;
    }

    if (!filters.toDate) {
      setValidationError("Please select a To Date.");
      return false;
    }

    if (new Date(filters.fromDate) > new Date(filters.toDate)) {
      setValidationError("From Date cannot be later than To Date.");
      return false;
    }

    return true;
  };

  const handleGenerateReport = async (event) => {
    event.preventDefault();

    setValidationError("");
    setApiError("");

    if (!validateFilters()) {
      return;
    }

    try {
      setLoadingReport(true);
      setReportGenerated(false);

      const response = await getPurchaseReport(filters);

      setReportData(response || []);
      setReportGenerated(true);
    } catch (error) {
      console.error("Failed to generate purchase report:", error);

      setReportData([]);

      setApiError(
        error.response?.data?.message ||
          "Unable to load the purchase report. Please try again.",
      );

      setReportGenerated(true);
    } finally {
      setLoadingReport(false);
    }
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setReportData([]);
    setReportGenerated(false);
    setValidationError("");
    setApiError("");
  };

  const selectedVendor = vendors.find(
    (vendor) => vendor.vendorName === filters.vendorName,
  );

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount) => {
    if (amount === null || amount === undefined) {
      return "-";
    }

    return Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Reporting & Analytics
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Purchase Reports
        </h1>

        <p className="mt-2 text-slate-600">
          View purchase transactions by vendor and selected date range.
        </p>
      </div>

      {/* Error Message */}
      {(apiError || validationError) && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />

          <div>
            <p className="font-semibold">
              {validationError
                ? "Please check the report filters"
                : "Unable to generate report"}
            </p>

            <p className="mt-1 text-sm">{validationError || apiError}</p>
          </div>
        </div>
      )}

      {/* Report Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Search size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">Report Filters</h2>

            <p className="text-sm text-slate-500">
              Select a vendor and date range to generate the report.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleGenerateReport}
          className="mt-6 grid gap-5 lg:grid-cols-3"
        >
          {/* Vendor */}
          <div>
            <label
              htmlFor="vendorName"
              className="flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <Building2 size={16} />
              Vendor Name
            </label>

            <select
              id="vendorName"
              name="vendorName"
              value={filters.vendorName}
              onChange={handleChange}
              disabled={loadingVendors}
              className={inputClass}
            >
              <option value="">
                {loadingVendors ? "Loading vendors..." : "Select vendor"}
              </option>

              {vendors.map((vendor) => (
                <option key={vendor.vendorId} value={vendor.vendorName}>
                  {vendor.vendorName}
                </option>
              ))}
            </select>
          </div>

          {/* From Date */}
          <div>
            <label
              htmlFor="fromDate"
              className="flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <CalendarDays size={16} />
              From Date
            </label>

            <input
              id="fromDate"
              name="fromDate"
              type="date"
              value={filters.fromDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* To Date */}
          <div>
            <label
              htmlFor="toDate"
              className="flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <CalendarDays size={16} />
              To Date
            </label>

            <input
              id="toDate"
              name="toDate"
              type="date"
              value={filters.toDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 lg:col-span-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleReset}
              disabled={loadingReport}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RotateCcw size={17} />
              Reset
            </button>

            <button
              type="submit"
              disabled={loadingReport || loadingVendors}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loadingReport ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <BarChart3 size={17} />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </form>
      </section>

      {selectedVendor && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Address
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {selectedVendor.vendorAddress || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Contact Number
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {selectedVendor.contactNumber || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Contact Person
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {selectedVendor.contactPerson || "-"}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Report Results */}
      <section className="mt-8">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">Purchase History</h2>

          <p className="mt-1 text-sm text-slate-500">
            Purchase records matching the selected report criteria.
          </p>
        </div>

        {/* Initial State */}
        {!reportGenerated && !loadingReport && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <BarChart3 size={30} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              No Report Generated Yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Select a vendor and date range, then generate a report to view
              purchase transactions.
            </p>
          </div>
        )}

        {/* Loading State */}
        {loadingReport && (
          <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <LoaderCircle size={32} className="animate-spin text-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Generating purchase report...
            </p>
          </div>
        )}

        {/* No Records */}
        {reportGenerated &&
          !loadingReport &&
          !apiError &&
          reportData.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <FileX size={30} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                No Records Found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                No purchase records were found for the selected vendor and date
                range.
              </p>
            </div>
          )}

        {/* Report Table */}
        {reportGenerated &&
          !loadingReport &&
          !apiError &&
          reportData.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
              <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ReceiptText size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      Report Results
                    </p>

                    <p className="text-sm text-slate-500">
                      {reportData.length} purchase record
                      {reportData.length !== 1 ? "s" : ""} found
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Purchase ID
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Transaction ID
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Vendor
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Brand
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Quantity
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Amount
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Purchase Date
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {reportData.map((purchase, index) => (
                      <tr
                        key={
                          purchase.purchaseId || purchase.transactionId || index
                        }
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 text-sm font-medium text-slate-900">
                          {purchase.purchaseId ?? "-"}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {purchase.transactionId || "-"}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-700">
                          {purchase.vendorName || "-"}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-700">
                          {purchase.brandName || "-"}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-700">
                          {purchase.quantity ?? "-"}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-slate-900">
                          ₹ {formatAmount(purchase.purchaseAmount)}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-700">
                          {formatDate(purchase.purchaseDate)}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                              purchase.status === "SUCCESS"
                                ? "bg-emerald-50 text-emerald-700"
                                : purchase.status === "Pending"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {purchase.status || "-"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </section>
    </div>
  );
}

export default PurchaseReports;
