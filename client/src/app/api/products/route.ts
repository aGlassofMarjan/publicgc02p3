import { getProducts, getProductsByName } from "@/db/models/product";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

// GET: /api/products
export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "8", 10);
  const searchQuery = searchParams.get("search") || "";

  let products, total;
  if (searchQuery) {
    // If there's a search query, use the getProductsByName function
    products = await getProductsByName(searchQuery);
    total = products.length;
  } else {
    // Otherwise, use the regular getProducts function with pagination
    const offset = (page - 1) * limit;
    const result = await getProducts({ offset, limit });
    products = result.products;
    total = result.total;
  }

  return NextResponse.json(
    {
      statusCode: 200,
      message: "GET /api/products",
      data: products,
      total,
    },
    {
      status: 200,
    }
  );
};

// GET: /api/products
