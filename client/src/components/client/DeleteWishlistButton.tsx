"use client";

import { Button } from "@/components/ui/button";
import { deleteWishlistItem } from "@/app/wishlist/action";
import { useState } from "react";

type DeleteWishlistButtonProps = {
  wishlistItemId: string;
  onDelete: (wishlistItemId: string) => void;
};

const DeleteWishlistButton = ({ wishlistItemId, onDelete }: DeleteWishlistButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteWishlistItem(wishlistItemId);
      onDelete(wishlistItemId);
    } catch (error) {
      console.error("Failed to delete wishlist item", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteWishlistButton;
