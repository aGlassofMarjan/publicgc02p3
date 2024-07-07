"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
// import { addProductToWishlist } from "@/db/models/wishlist"

type AddToWishlistButtonProps = {
  userId: string;
  productId: string;
};

const AddToWishlistButton = ({ userId, productId }: AddToWishlistButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToWishlist = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/wishlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, productId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add to wishlist');
      }

      const data = await response.json();
      console.log('Wishlist item added:', data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white" onClick={addToWishlist} disabled={loading}>
        <Heart className="mr-1" />{loading ? "Adding..." : "Add to Wishlist"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default AddToWishlistButton;
