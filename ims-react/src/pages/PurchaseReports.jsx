import { useState } from "react";
import {
  CalendarDays,
  FileBarChart,
  Search,
  RotateCcw,
  Building2,
  PackageSearch,
} from "lucide-react";

function PurchaseReports() {
  const [filters, setFilters] = useState({
    vendorName: "",
    fromDate: "",
    toDate: "",
  });

  const [errors, setErrors] = useState({});
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  const validateFilters = () => {
    const newErrors = {};

    if (!filters.vendorName) {
      newErrors.vendorName = "Please select a vendor.";
    }

    if (!filters.fromDate) {
      newErrors.fromDate = "Please select a start date.";
    }

    if (!filters.toDate) {
      newErrors.toDate = "Please select an end date.";
    }

    if (
      filters.fromDate &&
      filters.toDate &&
      new Date(filters.fromDate) > new Date(filters.toDate)
    ) {
      newErrors.toDate =
        "End date must be greater than or equal to the start date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleGenerateReport = (event) => {
    event.preventDefault();

    if (!validateFilters()) {
      return;
    }

    console.log("Report Filters:", filters);

    // API integration will happen later.
    setReportGenerated(true);
  };

  const handleReset = () => {
    setFilters({
      vendorName: "",
      fromDate: "",
      toDate: "",
    });

    setErrors({});
    setReportGenerated(false);
  };

  const inputClass =
    "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-4";

  const getInputClass = (fieldName) =>
    `${inputClass} ${
      errors[fieldName]
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
    }`;

  return (
    <div className="mx-auto max-w-6xl">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Reporting
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Purchase Reports
        </h1>

        <p className="mt-2 text-slate-500">
          View purchase transactions for a selected vendor within a specific
          date range.
        </p>
      </div>

      {/* Filter Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Search size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">Report Filters</h2>

            <p className="text-sm text-slate-500">
              Select a vendor and purchase date range.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleGenerateReport}
          className="mt-6 grid gap-5 md:grid-cols-3"
        >
          {/* Vendor */}
          <div>
            <label
              htmlFor="vendorName"
              className="text-sm font-medium text-slate-700"
            >
              Vendor Name <span className="text-red-500">*</span>
            </label>

            <select
              id="vendorName"
              name="vendorName"
              value={filters.vendorName}
              onChange={handleChange}
              className={getInputClass("vendorName")}
            >
              <option value="">Select vendor</option>
              <option value="demo">Vendor data will load from API</option>
            </select>

            {errors.vendorName && (
              <p className="mt-2 text-sm text-red-600">{errors.vendorName}</p>
            )}
          </div>

          {/* From Date */}
          <div>
            <label
              htmlFor="fromDate"
              className="text-sm font-medium text-slate-700"
            >
              From Date <span className="text-red-500">*</span>
            </label>

            <input
              id="fromDate"
              name="fromDate"
              type="date"
              value={filters.fromDate}
              onChange={handleChange}
              className={getInputClass("fromDate")}
            />

            {errors.fromDate && (
              <p className="mt-2 text-sm text-red-600">{errors.fromDate}</p>
            )}
          </div>

          {/* To Date */}
          <div>
            <label
              htmlFor="toDate"
              className="text-sm font-medium text-slate-700"
            >
              To Date <span className="text-red-500">*</span>
            </label>

            <input
              id="toDate"
              name="toDate"
              type="date"
              value={filters.toDate}
              onChange={handleChange}
              className={getInputClass("toDate")}
            />

            {errors.toDate && (
              <p className="mt-2 text-sm text-red-600">{errors.toDate}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 md:col-span-3 md:justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <RotateCcw size={17} />
              Reset
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <FileBarChart size={17} />
              Generate Report
            </button>
          </div>
        </form>
      </section>

      {/* Report Results */}
      <section className="mt-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Purchase History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Purchase transactions matching the selected filters will appear
              here.
            </p>
          </div>
        </div>

        {!reportGenerated ? (
          /* Initial Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <PackageSearch size={26} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              No report generated yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Select a vendor and date range, then generate a report to view
              purchase transactions.
            </p>
          </div>
        ) : (
          /* Placeholder Result State */
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-212.5 text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Purchase ID</th>
                    <th className="px-6 py-4 font-semibold">Brand Name</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Material Type</th>
                    <th className="px-6 py-4 font-semibold">Quantity</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Purchase Date</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      Report data will be loaded from the IMS API.
                    </td>
                  </tr>
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
