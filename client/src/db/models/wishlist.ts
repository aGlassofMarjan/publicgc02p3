import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { ProductModel } from "./product";

// import { ProductModel } from "./product";

export type WishlistModel = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
};

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";
const COLLECTION_PRODUCTS = "Products";
const COLLECTION_WISHLISTS = "Wishlists";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

// FUNCTION: Get Wishlist
export const getWishlistItems = async (
  userId: string
): Promise<(WishlistModel & { product: ProductModel })[]> => {
  const db = await getDb();

  const wishlistItems = (await db
    .collection(COLLECTION_WISHLISTS)
    .aggregate([
      {
        $match: { userId: new ObjectId(userId) },
      },
      {
        $lookup: {
          from: COLLECTION_PRODUCTS,
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
    ])
    .toArray()) as (WishlistModel & { product: ProductModel })[];

  return wishlistItems;
};

// FUNCTION: Add Product to Wishlist
export const addProductToWishlist = async (
  userId: string,
  productId: string
): Promise<WishlistModel> => {
  const db = await getDb();
  const wishlistItem: WishlistModel = {
    _id: new ObjectId(),
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await db.collection(COLLECTION_WISHLISTS).insertOne(wishlistItem);
  return wishlistItem;
};

// FUNCTION: Delete Wishlist Item

export const deleteWishlistItem = async (_id: ObjectId) => {
  const db = await getDb();
  return await db.collection(COLLECTION_WISHLISTS).deleteOne({ _id });
};
