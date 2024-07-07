"use server"
import Store from "@/app/products/page";
import { cookies } from "next/headers";

const ProductsPage = () => {
  const userId = cookies().get("userId")?.value;

  return <Store userId={userId?.toString() || ""} />;
};

export default ProductsPage;
