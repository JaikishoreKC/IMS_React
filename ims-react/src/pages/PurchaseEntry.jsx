import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const baseInputClass =
  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";

const getInputClass = (hasError) =>
  `${baseInputClass} ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
  }`;

function SectionHeader({ icon: Icon, iconClassName, title, description }) {
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

function FieldLabel({ htmlFor, label, required = false }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function SelectField({
  id,
  name,
  value,
  label,
  required,
  options,
  placeholder,
  disabled,
  onChange,
  error,
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} />

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={getInputClass(Boolean(error))}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function TextField({
  id,
  name,
  type,
  value,
  label,
  placeholder,
  required,
  onChange,
  error,
  inputMode,
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} />

      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={getInputClass(Boolean(error))}
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function PurchaseEntry() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);

  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [materialTypes, setMaterialTypes] = useState([]);
  const [units, setUnits] = useState([]);

  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [loadingMaterialData, setLoadingMaterialData] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({});

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
      newErrors.quantity = "Please enter only whole numbers for Quantity.";
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setApiError("");

      const purchasePayload = {
        ...formData,
        quantity: Number(formData.quantity),
        purchaseAmount: Number(formData.purchaseAmount),
      };

      const response = await addPurchaseDetail(purchasePayload);

      navigate("/purchase/success", {
        state: { purchase: response?.purchase || response },
      });
    } catch (error) {
      console.error("Failed to add purchase:", error);

      setApiError(
        error.response?.data?.message ||
          "Unable to add purchase details. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setMaterialTypes([]);
    setUnits([]);
    setErrors({});
    setApiError("");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Purchase Management
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Add Purchase Detail
        </h1>

        <p className="mt-2 text-slate-600">
          Enter the vendor, material, and purchase information to record a new
          purchase.
        </p>
      </div>

      {apiError && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />

          <div>
            <p className="font-semibold">Unable to complete the request</p>

            <p className="mt-1 text-sm">{apiError}</p>
          </div>
        </div>
      )}

      {loadingInitialData ? (
        <div className="flex min-h-100 flex-col items-center justify-center">
          <LoaderCircle size={32} className="animate-spin text-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading purchase information...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <SectionHeader
              icon={Building2}
              iconClassName="bg-blue-50 text-blue-600"
              title="Vendor Information"
              description="Select the vendor for this purchase."
            />

            <div className="mt-6">
              <SelectField
                id="vendorName"
                name="vendorName"
                value={formData.vendorName}
                label="Vendor Name"
                required
                placeholder="Select vendor"
                options={vendors.map((vendor) => ({
                  value: vendor.vendorName,
                  label: vendor.vendorName,
                }))}
                onChange={handleChange}
                error={errors.vendorName}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <SectionHeader
              icon={Boxes}
              iconClassName="bg-indigo-50 text-indigo-600"
              title="Material Information"
              description="Select the material category, type, and unit."
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <SelectField
                id="materialCategoryId"
                name="materialCategoryId"
                value={formData.materialCategoryId}
                label="Material Category"
                required
                placeholder="Select material category"
                options={categories.map((category) => ({
                  value: category.categoryId,
                  label: category.categoryName,
                }))}
                onChange={handleChange}
                error={errors.materialCategoryId}
              />

              <SelectField
                id="materialTypeId"
                name="materialTypeId"
                value={formData.materialTypeId}
                label="Material Type"
                required
                placeholder={
                  loadingMaterialData
                    ? "Loading material types..."
                    : "Select material type"
                }
                disabled={!formData.materialCategoryId || loadingMaterialData}
                options={materialTypes.map((materialType) => ({
                  value: materialType.typeId,
                  label: materialType.typeName,
                }))}
                onChange={handleChange}
                error={errors.materialTypeId}
              />

              <SelectField
                id="unitId"
                name="unitId"
                value={formData.unitId}
                label="Unit"
                required
                placeholder={
                  loadingMaterialData ? "Loading units..." : "Select unit"
                }
                disabled={!formData.materialCategoryId || loadingMaterialData}
                options={units.map((unit) => ({
                  value: unit.unitId,
                  label: unit.unitName,
                }))}
                onChange={handleChange}
                error={errors.unitId}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <SectionHeader
              icon={ClipboardList}
              iconClassName="bg-emerald-50 text-emerald-600"
              title="Purchase Details"
              description="Enter the details of the material purchase."
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <TextField
                id="brandName"
                name="brandName"
                type="text"
                value={formData.brandName}
                label="Brand Name"
                placeholder="Enter brand name"
                required
                onChange={handleChange}
                error={errors.brandName}
              />

              <TextField
                id="quantity"
                name="quantity"
                type="text"
                inputMode="numeric"
                value={formData.quantity}
                label="Quantity"
                placeholder="Enter quantity"
                required
                onChange={handleChange}
                error={errors.quantity}
              />

              <TextField
                id="purchaseAmount"
                name="purchaseAmount"
                type="text"
                inputMode="decimal"
                value={formData.purchaseAmount}
                label="Purchase Amount"
                placeholder="Enter purchase amount"
                required
                onChange={handleChange}
                error={errors.purchaseAmount}
              />

              <TextField
                id="purchaseDate"
                name="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                label="Purchase Date"
                required
                onChange={handleChange}
                error={errors.purchaseDate}
              />
            </div>
          </section>

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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
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
