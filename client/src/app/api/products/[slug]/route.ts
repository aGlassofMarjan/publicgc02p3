import { getProductBySlug } from "@/db/models/product";
import { ProductModel } from "@/db/models/product";
import { NextRequest, NextResponse } from "next/server";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T | null;
  error?: string;
};

// FUNCTION: Get Slug
export const GET = async (
  _request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const slug = params.slug;

  const product = await getProductBySlug(slug);

  if (product === null) {
    return NextResponse.json<MyResponse<ProductModel>>({
      statusCode: 404,
      message: `Product not found with slug: ${slug}`,
      data: null,
    });
  }

  return NextResponse.json<MyResponse<ProductModel>>({
    statusCode: 200,
    message: `Puing! from GET /api/products/${slug} !`,
    data: product,
  });
};
