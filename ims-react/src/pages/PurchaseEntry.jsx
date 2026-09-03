import { useState } from "react";
import { Building2, Boxes, ClipboardList, RotateCcw, Save } from "lucide-react";

function PurchaseEntry() {
  const [formData, setFormData] = useState({
    vendorName: "",
    materialCategoryId: "",
    materialTypeId: "",
    unitId: "",
    brandName: "",
    quantity: "",
    purchaseAmount: "",
    purchaseDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
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
        "Please enter only numbers with two decimal places for Purchase Amount.";
    }

    if (!formData.purchaseDate) {
      newErrors.purchaseDate = "Purchase date is a required field.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Purchase Form Data:", formData);
  };

  const handleReset = () => {
    setFormData({
      vendorName: "",
      materialCategoryId: "",
      materialTypeId: "",
      unitId: "",
      brandName: "",
      quantity: "",
      purchaseAmount: "",
      purchaseDate: "",
    });

    setErrors({});
  };

  const inputClass =
    "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4";

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
              <option value="demo">Vendor data will load from API</option>
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
                <option value="demo">Category data will load from API</option>
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
                className={getInputClass("materialTypeId")}
              >
                <option value="">Select material type</option>
                <option value="demo">Type data will load from API</option>
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
                className={getInputClass("unitId")}
              >
                <option value="">Select unit</option>
                <option value="demo">Unit data will load from API</option>
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
              <h2 className="font-semibold text-slate-900">Purchase Details</h2>
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
                <p className="mt-2 text-sm text-red-600">{errors.brandName}</p>
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
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw size={17} />
            Reset
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Save size={17} />
            Submit Purchase
          </button>
        </div>
      </form>
    </div>
  );
}

export default PurchaseEntry;
