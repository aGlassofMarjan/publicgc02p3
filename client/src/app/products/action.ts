// actions.ts
import { ProductModel } from "@/db/models/product";
// import { ApiResponse } from "@/interfaces/ApiResponse";

export interface ApiResponse<T> {
  data: T;
}

export const fetchProducts = async (
  page: number,
  limit: number = 8
): Promise<ApiResponse<ProductModel[]>> => {
  const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
  const data: ApiResponse<ProductModel[]> = await response.json();
  return data;
};

export const fetchSuggestions = async (
  query: string
): Promise<ApiResponse<ProductModel[]>> => {
  const response = await fetch(`/api/suggestions?query=${query}`);
  const data: ApiResponse<ProductModel[]> = await response.json();
  return data;
};
