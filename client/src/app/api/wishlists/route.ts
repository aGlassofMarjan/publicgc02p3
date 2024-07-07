import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  addProductToWishlist,
  deleteWishlistItem,
  getWishlistItems,
} from "@/db/models/wishlist";
import { z } from "zod";

const AddToWishlistSchema = z.object({
  userId: z.string(),
  productId: z.string(),
});

const DeleteWishlistItemSchema = z.object({
  wishlistItemId: z.string(),
});

// POST: /api/wishlists
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const result = AddToWishlistSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "Invalid request body",
          error: result.error.errors,
        },
        {
          status: 400,
        }
      );
    }

    const { userId, productId } = result.data;
    const wishlistItem = await addProductToWishlist(userId, productId);
    return NextResponse.json(
      {
        statusCode: 200,
        message: "Product added to wishlist",
        data: wishlistItem,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Error adding product to wishlist",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

// DELETE: /api/wishlists
export const DELETE = async (request: NextRequest) => {
  const body = await request.json();
  const result = DeleteWishlistItemSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        statusCode: 400,
        message: "Invalid request body",
        error: result.error.errors,
      },
      {
        status: 400,
      }
    );
  }

  const { wishlistItemId } = result.data;

  try {
    const objectId = new ObjectId(wishlistItemId);
    await deleteWishlistItem(objectId);
    return NextResponse.json(
      {
        statusCode: 200,
        message: "Wishlist item deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Error deleting wishlist item",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

// GET: /api/wishlists
export const GET = async (request: NextRequest) => {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      {
        statusCode: 400,
        message: "Missing userId query parameter",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const wishlistItems = await getWishlistItems(userId);
    console.log(wishlistItems, "data get dari route");

    return NextResponse.json(
      {
        statusCode: 200,
        message: "Wishlist items fetched successfully",
        data: wishlistItems,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Error fetching wishlist items",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
