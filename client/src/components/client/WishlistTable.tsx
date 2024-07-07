// components/WishlistTable.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getWishlistItems } from "@/app/wishlist/action";
import { WishlistModel } from "@/db/models/wishlist";
import { ProductModel } from "@/db/models/product";
import DeleteWishlistButton from "@/components/client/DeleteWishlistButton";

type WishlistTableProps = {
  userId: string;
};

const WishlistTable = ({ userId }: WishlistTableProps) => {
  const [wishlistItems, setWishlistItems] = useState<(WishlistModel & { product: ProductModel })[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlistItems = async () => {
    try {
      const response = await getWishlistItems(userId);
      console.log(response, userId, "response");

      if (response && response.data) {
        setWishlistItems(response.data);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.log("Failed to fetch wishlist items:", err.message);
      } else {
        setError("An unknown error occurred");
        console.log("Failed to fetch wishlist items:", err);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchWishlistItems();
    }
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
          <TableHead><span className="sr-only">Actions</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {wishlistItems.map((item) => (
          <TableRow key={item._id.toString()}>
            <TableCell className="hidden sm:table-cell">
              <Image
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height="72"
                src={item.product.thumbnail}
                width="72"
              />
            </TableCell>
            <TableCell className="font-medium">{item.product.name}</TableCell>
            <TableCell>${item.product.price.toFixed(2)}</TableCell>
            <TableCell className="hidden md:table-cell">{item.product.description}</TableCell>
            <TableCell>
              <DeleteWishlistButton wishlistItemId={item._id.toString()} onDelete={() => setWishlistItems(wishlistItems.filter(w => w._id.toString() !== item._id.toString()))} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WishlistTable;
