import axios from "axios";

const apiInstance = axios.create({ baseURL: "http://localhost:3001" });

export function getProductsApi(id?: number) {
  return apiInstance.get(
    id !== undefined ? `/api/products/${id}` : "/api/products/"
  );
}

export function getInvoicesApi(id?: number) {
  return apiInstance.get(
    id !== undefined ? `/api/invoices/${id}` : "/api/invoices"
  );
}

export function getBestCustomersApi(id?: number) {
  return apiInstance.get(
    id !== undefined
      ? `/api/customers/revenues/${id}`
      : "/api/customers/revenues"
  );
}

export function getProductsCategoriesWithRevenuesApi(id?: number) {
  return apiInstance.get(
    id !== undefined
      ? `/api/categories/revenues/${id}`
      : "/api/categories/revenues"
  );
}

export function getRevenuesByPeriodApi(period: "monthly" | "weekly") {
  return apiInstance.get(`/api/revenues/${period}`);
}
