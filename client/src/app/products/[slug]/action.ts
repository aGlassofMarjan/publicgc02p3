"use server";
// import { headers } from "next/headers";
import { ProductModel } from "@/db/models/product";
import { cookies } from "next/headers";

const fetchProduct = async (slug: string): Promise<ProductModel | null> => {
  const response = await fetch(`http://localhost:3000/api/products/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();
  return data.data || null;
};

export const getProductAndUserId = async (slug: string) => {
  const product = await fetchProduct(slug);
  // console.log(product?._id);
  // const productId = product?._id;

  // const requestHeaders = headers();
  const userId = cookies().get("userId")?.value;
  // console.log(userId, "<<<<<<<< id");
  // console.log(productId, "<<<<<<<<< produk");

  return { product, userId };
};
