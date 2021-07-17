import axios from "axios";

const apiInstance = axios.create({ baseURL: "http://localhost:3001" });

export function getProductsApi(id?: number) {
  return apiInstance.get(
    id !== undefined ? `/api/products/${id}` : "/api/products/"
  );
}
