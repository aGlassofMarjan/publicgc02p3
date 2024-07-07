"use server";
import { WishlistModel } from "@/db/models/wishlist";
import { ProductModel } from "@/db/models/product";

export type ApiResponse<T> = {
  data: T;
};

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

export const getWishlistItems = async (
  userId: string
): Promise<ApiResponse<(WishlistModel & { product: ProductModel })[]>> => {
  const response = await fetch(
    `http://localhost:3000/api/wishlists?userId=${userId}`
  );
  console.log(response, "di dalem action");

  if (!response.ok) {
    throw new Error(`Error fetching wishlist items: ${response.statusText}`);
  }
  const data: ApiResponse<(WishlistModel & { product: ProductModel })[]> =
    await response.json();
  return data;
};

export const deleteWishlistItem = async (
  wishlistItemId: string
): Promise<void> => {
  const response = await fetch(`/api/wishlists`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ wishlistItemId }),
  });
  if (!response.ok) {
    throw new Error(`Error deleting wishlist item: ${response.statusText}`);
  }
};
