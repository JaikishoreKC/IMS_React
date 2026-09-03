import { useEffect, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  RotateCcw,
  Search,
  Building2,
  LoaderCircle,
  FileX,
  ReceiptText,
} from "lucide-react";

import ErrorPopup from "../components/ErrorPopup";
import { getVendors, getPurchaseReport } from "../services/purchaseService";

const initialFilters = {
  vendorName: "",
  fromDate: "",
  toDate: "",
};

const formatError = (fieldName, message) => (
  <>
    <b>"{fieldName}"</b> {message}
  </>
);

function SectionHeader({ icon: Icon, title, description, iconClassName }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}
      >
        <Icon size={20} />
      </div>

      <div>
        <h2 className="font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function VendorInfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
        {label}
      </p>
      <p className="mt-1 text-sm text-slate-700">{value || "-"}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const tone =
    status === "SUCCESS"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Pending"
        ? "bg-amber-50 text-amber-700"
        : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}
    >
      {status || "-"}
    </span>
  );
}

function EmptyState({ icon: Icon, title, description, iconClassName }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${iconClassName}`}
      >
        <Icon size={30} />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function PurchaseReports() {
  const [filters, setFilters] = useState(initialFilters);

  const [vendors, setVendors] = useState([]);
  const [reportData, setReportData] = useState([]);

  const [loadingVendors, setLoadingVendors] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);

  const [errorPopup, setErrorPopup] = useState(null);
  const [reportFailed, setReportFailed] = useState(false);

  const [reportGenerated, setReportGenerated] = useState(false);

  const showError = (message) => {
    setErrorPopup(message);
  };

  useEffect(() => {
    const loadVendors = async () => {
      try {
        setLoadingVendors(true);

        const vendorData = await getVendors();

        setVendors(vendorData || []);
      } catch (error) {
        console.error("Failed to load vendors:", error);

        showError(
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
  };

  const validateFilters = () => {
    if (!filters.vendorName) {
      showError(formatError("Vendor Name", "is a required field."));
      return false;
    }

    if (!filters.fromDate) {
      showError(formatError("From Date", "is a required field."));
      return false;
    }

    if (!filters.toDate) {
      showError(formatError("To Date", "is a required field."));
      return false;
    }

    if (new Date(filters.fromDate) > new Date(filters.toDate)) {
      showError(
        <>
          <b>"From Date"</b> cannot be later than <b>"To Date"</b>.
        </>,
      );
      return false;
    }

    return true;
  };

  const handleGenerateReport = async (event) => {
    event.preventDefault();

    setErrorPopup(null);
    setReportFailed(false);

    if (!validateFilters()) {
      return;
    }

    try {
      setLoadingReport(true);
      setReportGenerated(false);

      const response = await getPurchaseReport(filters);

      setReportData(response || []);
      setReportGenerated(true);
      setReportFailed(false);
    } catch (error) {
      console.error("Failed to generate purchase report:", error);

      setReportData([]);
      setReportGenerated(true);
      setReportFailed(true);

      showError(
        error.response?.data?.message ||
          "Unable to load the purchase report. Please try again.",
      );
    } finally {
      setLoadingReport(false);
    }
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setReportData([]);
    setReportGenerated(false);
    setReportFailed(false);
    setErrorPopup(null);
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

  const columns = [
    {
      header: "Purchase ID",
      className: "px-5 py-4 text-sm font-medium text-slate-900",
      render: (purchase) => purchase.purchaseId ?? "-",
    },
    {
      header: "Transaction ID",
      className: "px-5 py-4 text-sm text-slate-600",
      render: (purchase) => purchase.transactionId || "-",
    },
    {
      header: "Vendor",
      className: "px-5 py-4 text-sm text-slate-700",
      render: (purchase) => purchase.vendorName || "-",
    },
    {
      header: "Brand",
      className: "px-5 py-4 text-sm text-slate-700",
      render: (purchase) => purchase.brandName || "-",
    },
    {
      header: "Quantity",
      className: "px-5 py-4 text-sm text-slate-700",
      render: (purchase) => purchase.quantity ?? "-",
    },
    {
      header: "Amount",
      className: "px-5 py-4 text-sm font-medium text-slate-900",
      render: (purchase) => `₹ ${formatAmount(purchase.purchaseAmount)}`,
    },
    {
      header: "Purchase Date",
      className: "px-5 py-4 text-sm text-slate-700",
      render: (purchase) => formatDate(purchase.purchaseDate),
    },
    {
      header: "Status",
      className: "px-5 py-4",
      render: (purchase) => <StatusBadge status={purchase.status} />,
    },
  ];

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";

  return (
    <>
      <ErrorPopup message={errorPopup} onClose={() => setErrorPopup(null)} />

      <div className="mx-auto max-w-7xl">
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

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
          <SectionHeader
            icon={Search}
            title="Report Filters"
            description="Select a vendor and date range to generate the report."
            iconClassName="bg-blue-50 text-blue-600"
          />

          <form
            onSubmit={handleGenerateReport}
            className="mt-6 grid gap-5 lg:grid-cols-3"
          >
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

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end lg:col-span-3">
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
              <VendorInfoItem
                label="Address"
                value={selectedVendor.vendorAddress}
              />

              <VendorInfoItem
                label="Contact Number"
                value={selectedVendor.contactNumber}
              />

              <VendorInfoItem
                label="Contact Person"
                value={selectedVendor.contactPerson}
              />
            </div>
          </section>
        )}

        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Purchase History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Purchase records matching the selected report criteria.
            </p>
          </div>

          {!reportGenerated && !loadingReport && (
            <EmptyState
              icon={BarChart3}
              title="No Report Generated Yet"
              description="Select a vendor and date range, then generate a report to view purchase transactions."
              iconClassName="bg-blue-50 text-blue-600"
            />
          )}

          {loadingReport && (
            <div className="flex min-h-62.5 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white">
              <LoaderCircle size={32} className="animate-spin text-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Generating purchase report...
              </p>
            </div>
          )}

          {reportGenerated &&
            !loadingReport &&
            !reportFailed &&
            reportData.length === 0 && (
              <EmptyState
                icon={FileX}
                title="No Records Found"
                description="No purchase records were found for the selected vendor and date range."
                iconClassName="bg-slate-100 text-slate-500"
              />
            )}

          {reportGenerated &&
            !loadingReport &&
            !reportFailed &&
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
                  <table className="w-full min-w-212.5 text-left">
                    <thead className="border-b border-slate-200 bg-slate-50">
                      <tr>
                        {columns.map((column) => (
                          <th
                            key={column.header}
                            className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500"
                          >
                            {column.header}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {reportData.map((purchase, index) => (
                        <tr
                          key={
                            purchase.purchaseId ||
                            purchase.transactionId ||
                            index
                          }
                          className="transition hover:bg-slate-50"
                        >
                          {columns.map((column) => (
                            <td
                              key={column.header}
                              className={column.className}
                            >
                              {column.render(purchase)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </section>
      </div>
    </>
  );
}

export default PurchaseReports;
