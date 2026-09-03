import api from "./api";

// Get all vendors
export const getVendors = async () => {
  const response = await api.get("/vendors");
  return response.data;
};

// Get all material categories
export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

// Get material types and units based on category
export const getUnitAndTypeList = async (materialCategoryId) => {
  const response = await api.post("/getUnitAndTypeList", {
    materialCategoryId,
  });

  return response.data;
};

// Add a new purchase
export const addPurchaseDetail = async (purchaseData) => {
  const response = await api.post("/addPurchaseDetail", purchaseData);
  return response.data;
};

// Get vendor-wise purchase report
export const getPurchaseReport = async (reportFilters) => {
  const response = await api.post(
    "/report/controller/getPurchaseDetails",
    reportFilters,
  );

  return response.data;
};
