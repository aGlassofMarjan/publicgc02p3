import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { hashText } from "../utils/hash";

export type ProductModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt?: string;
  price: number;
  tags?: [];
  thumbnail: string;
  images?: [];
  createdAt: string;
  updatedAt: string;
};

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";
const COLLECTION_PRODUCTS = "Products";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

// FUNCTION: MODEL Get Products
export const getProducts = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) => {
  const db = await getDb();

  const products = (await db
    .collection(COLLECTION_PRODUCTS)
    .find()
    .skip(offset)
    .limit(limit)
    .toArray()) as ProductModel[];

  const total = await db.collection(COLLECTION_PRODUCTS).countDocuments();

  return { products, total };
};

// FUNCTION: MODEL Get Products By Name
export const getProductsByName = async (name: string) => {
  const db = await getDb();

  const products = (await db
    .collection(COLLECTION_PRODUCTS)
    .find({ name: { $regex: new RegExp(name, "i") } }) // case-insensitive search
    .toArray()) as ProductModel[];

  return products;
};

// FUNCTION: MODEL Get Random Products
export const getRandomProducts = async (limit: number = 10) => {
  const db = await getDb();

  const products = (await db
    .collection(COLLECTION_PRODUCTS)
    .aggregate([{ $sample: { size: limit } }])
    .toArray()) as ProductModel[];

  return products;
};

// FUNCTION: MODEL Get Product By Slug
export const getProductBySlug = async (
  slug: string
): Promise<ProductModel | null> => {
  const db = await getDb();
  const product = await db.collection(COLLECTION_PRODUCTS).findOne({ slug });
  return product as ProductModel | null;
};
