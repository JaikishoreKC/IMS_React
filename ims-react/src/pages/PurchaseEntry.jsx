import { useEffect, useState } from "react";
import {
  Building2,
  Boxes,
  ClipboardList,
  RotateCcw,
  Save,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

import {
  getVendors,
  getCategories,
  getUnitAndTypeList,
  addPurchaseDetail,
} from "../services/purchaseService";

const initialFormData = {
  vendorName: "",
  materialCategoryId: "",
  materialTypeId: "",
  unitId: "",
  brandName: "",
  quantity: "",
  purchaseAmount: "",
  purchaseDate: "",
};

function PurchaseEntry() {
  const [formData, setFormData] = useState(initialFormData);

  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [materialTypes, setMaterialTypes] = useState([]);
  const [units, setUnits] = useState([]);

  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [loadingMaterialData, setLoadingMaterialData] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [apiError, setApiError] = useState("");
  const [submitResult, setSubmitResult] = useState(null);
  const [errors, setErrors] = useState({});

  /*
   * Load vendors and material categories when the page opens.
   */
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoadingInitialData(true);
        setApiError("");

        const [vendorData, categoryData] = await Promise.all([
          getVendors(),
          getCategories(),
        ]);

        setVendors(vendorData);
        setCategories(categoryData);
      } catch (error) {
        console.error("Failed to load initial data:", error);

        setApiError(
          error.response?.data?.message ||
            "Unable to load vendors and material categories. Please ensure the IMS backend is running.",
        );
      } finally {
        setLoadingInitialData(false);
      }
    };

    loadInitialData();
  }, []);

  /*
   * Load material types and units whenever the material category changes.
   */
  useEffect(() => {
    const loadMaterialData = async () => {
      if (!formData.materialCategoryId) {
        setMaterialTypes([]);
        setUnits([]);
        return;
      }

      try {
        setLoadingMaterialData(true);
        setApiError("");

        const data = await getUnitAndTypeList(formData.materialCategoryId);

        setMaterialTypes(data.materialTypeList || []);
        setUnits(data.unitList || []);
      } catch (error) {
        console.error("Failed to load material details:", error);

        setMaterialTypes([]);
        setUnits([]);

        setApiError(
          error.response?.data?.message ||
            "Unable to load material types and units.",
        );
      } finally {
        setLoadingMaterialData(false);
      }
    };

    loadMaterialData();
  }, [formData.materialCategoryId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => {
      const updatedData = {
        ...previousData,
        [name]: value,
      };

      /*
       * Reset dependent fields when category changes.
       */
      if (name === "materialCategoryId") {
        updatedData.materialTypeId = "";
        updatedData.unitId = "";
      }

      return updatedData;
    });

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    setSubmitResult(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.vendorName) {
      newErrors.vendorName = "Vendor name is a required field.";
    }

    if (!formData.materialCategoryId) {
      newErrors.materialCategoryId = "Material category is a required field.";
    }

    if (!formData.materialTypeId) {
      newErrors.materialTypeId = "Material type is a required field.";
    }

    if (!formData.unitId) {
      newErrors.unitId = "Unit is a required field.";
    }

    if (!formData.brandName.trim()) {
      newErrors.brandName = "Brand name is a required field.";
    }

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is a required field.";
    } else if (!/^\d+$/.test(formData.quantity)) {
      newErrors.quantity = "Please enter only numbers for Quantity.";
    }

    if (!formData.purchaseAmount) {
      newErrors.purchaseAmount = "Purchase amount is a required field.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.purchaseAmount)) {
      newErrors.purchaseAmount =
        "Please enter only numbers with up to two decimal places for Purchase Amount.";
    }

    if (!formData.purchaseDate) {
      newErrors.purchaseDate = "Purchase date is a required field.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*
   * Submit purchase details to IMS backend.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setApiError("");
      setSubmitResult(null);

      const purchasePayload = {
        ...formData,
        quantity: Number(formData.quantity),
        purchaseAmount: Number(formData.purchaseAmount),
      };

      const response = await addPurchaseDetail(purchasePayload);

      setSubmitResult({
        type: "success",
        message: response.message || "Purchase details added successfully.",
      });

      setFormData(initialFormData);
      setMaterialTypes([]);
      setUnits([]);
      setErrors({});
    } catch (error) {
      console.error("Failed to add purchase:", error);

      setSubmitResult({
        type: "failure",
        message:
          error.response?.data?.message ||
          "Unable to add purchase details. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /*
   * Reset the complete form.
   */
  const handleReset = () => {
    setFormData(initialFormData);
    setMaterialTypes([]);
    setUnits([]);
    setErrors({});
    setApiError("");
    setSubmitResult(null);
  };

  const inputClass =
    "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";

  const getInputClass = (fieldName) =>
    `${inputClass} ${
      errors[fieldName]
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
    }`;

  return (
    <div className="mx-auto max-w-5xl">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Purchase Management
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Add Purchase Detail
        </h1>

        <p className="mt-2 text-slate-500">
          Enter the vendor, material, and purchase information to record a new
          purchase.
        </p>
      </div>

      {/* Submission Result */}
      {submitResult && (
        <div
          className={`mb-6 flex items-start justify-between gap-4 rounded-xl border p-4 ${
            submitResult.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          <div>
            <p className="font-semibold">
              {submitResult.type === "success"
                ? "Purchase Added Successfully"
                : "Purchase Submission Failed"}
            </p>

            <p className="mt-1 text-sm">{submitResult.message}</p>
          </div>

          <button
            type="button"
            onClick={() => setSubmitResult(null)}
            className="text-lg font-semibold opacity-60 transition hover:opacity-100"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}

      {/* API Error */}
      {apiError && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />

          <div>
            <p className="font-semibold">Unable to load data</p>

            <p className="mt-1 text-sm">{apiError}</p>
          </div>
        </div>
      )}

      {/* Initial Loading */}
      {loadingInitialData ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center">
          <LoaderCircle size={32} className="animate-spin text-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading purchase information...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vendor Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Building2 size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Vendor Information
                </h2>

                <p className="text-sm text-slate-500">
                  Select the vendor for this purchase.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="vendorName"
                className="text-sm font-medium text-slate-700"
              >
                Vendor Name <span className="text-red-500">*</span>
              </label>

              <select
                id="vendorName"
                name="vendorName"
                value={formData.vendorName}
                onChange={handleChange}
                className={getInputClass("vendorName")}
              >
                <option value="">Select vendor</option>

                {vendors.map((vendor) => (
                  <option key={vendor.vendorId} value={vendor.vendorName}>
                    {vendor.vendorName}
                  </option>
                ))}
              </select>

              {errors.vendorName && (
                <p className="mt-2 text-sm text-red-600">{errors.vendorName}</p>
              )}
            </div>
          </section>

          {/* Material Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Boxes size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Material Information
                </h2>

                <p className="text-sm text-slate-500">
                  Select the material category, type, and unit.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {/* Material Category */}
              <div>
                <label
                  htmlFor="materialCategoryId"
                  className="text-sm font-medium text-slate-700"
                >
                  Material Category <span className="text-red-500">*</span>
                </label>

                <select
                  id="materialCategoryId"
                  name="materialCategoryId"
                  value={formData.materialCategoryId}
                  onChange={handleChange}
                  className={getInputClass("materialCategoryId")}
                >
                  <option value="">Select material category</option>

                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>

                {errors.materialCategoryId && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.materialCategoryId}
                  </p>
                )}
              </div>

              {/* Material Type */}
              <div>
                <label
                  htmlFor="materialTypeId"
                  className="text-sm font-medium text-slate-700"
                >
                  Material Type <span className="text-red-500">*</span>
                </label>

                <select
                  id="materialTypeId"
                  name="materialTypeId"
                  value={formData.materialTypeId}
                  onChange={handleChange}
                  disabled={!formData.materialCategoryId || loadingMaterialData}
                  className={getInputClass("materialTypeId")}
                >
                  <option value="">
                    {loadingMaterialData
                      ? "Loading material types..."
                      : "Select material type"}
                  </option>

                  {materialTypes.map((materialType) => (
                    <option
                      key={materialType.typeId}
                      value={materialType.typeId}
                    >
                      {materialType.typeName}
                    </option>
                  ))}
                </select>

                {errors.materialTypeId && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.materialTypeId}
                  </p>
                )}
              </div>

              {/* Unit */}
              <div>
                <label
                  htmlFor="unitId"
                  className="text-sm font-medium text-slate-700"
                >
                  Unit <span className="text-red-500">*</span>
                </label>

                <select
                  id="unitId"
                  name="unitId"
                  value={formData.unitId}
                  onChange={handleChange}
                  disabled={!formData.materialCategoryId || loadingMaterialData}
                  className={getInputClass("unitId")}
                >
                  <option value="">
                    {loadingMaterialData ? "Loading units..." : "Select unit"}
                  </option>

                  {units.map((unit) => (
                    <option key={unit.unitId} value={unit.unitId}>
                      {unit.unitName}
                    </option>
                  ))}
                </select>

                {errors.unitId && (
                  <p className="mt-2 text-sm text-red-600">{errors.unitId}</p>
                )}
              </div>
            </div>
          </section>

          {/* Purchase Details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ClipboardList size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Purchase Details
                </h2>

                <p className="text-sm text-slate-500">
                  Enter the details of the material purchase.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {/* Brand Name */}
              <div>
                <label
                  htmlFor="brandName"
                  className="text-sm font-medium text-slate-700"
                >
                  Brand Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="brandName"
                  name="brandName"
                  type="text"
                  placeholder="Enter brand name"
                  value={formData.brandName}
                  onChange={handleChange}
                  className={getInputClass("brandName")}
                />

                {errors.brandName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.brandName}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label
                  htmlFor="quantity"
                  className="text-sm font-medium text-slate-700"
                >
                  Quantity <span className="text-red-500">*</span>
                </label>

                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={getInputClass("quantity")}
                />

                {errors.quantity && (
                  <p className="mt-2 text-sm text-red-600">{errors.quantity}</p>
                )}
              </div>

              {/* Purchase Amount */}
              <div>
                <label
                  htmlFor="purchaseAmount"
                  className="text-sm font-medium text-slate-700"
                >
                  Purchase Amount <span className="text-red-500">*</span>
                </label>

                <input
                  id="purchaseAmount"
                  name="purchaseAmount"
                  type="text"
                  inputMode="decimal"
                  placeholder="Enter purchase amount"
                  value={formData.purchaseAmount}
                  onChange={handleChange}
                  className={getInputClass("purchaseAmount")}
                />

                {errors.purchaseAmount && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.purchaseAmount}
                  </p>
                )}
              </div>

              {/* Purchase Date */}
              <div>
                <label
                  htmlFor="purchaseDate"
                  className="text-sm font-medium text-slate-700"
                >
                  Purchase Date <span className="text-red-500">*</span>
                </label>

                <input
                  id="purchaseDate"
                  name="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className={getInputClass("purchaseDate")}
                />

                {errors.purchaseDate && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.purchaseDate}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={handleReset}
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RotateCcw size={17} />
              Reset
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Submit Purchase
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PurchaseEntry;
