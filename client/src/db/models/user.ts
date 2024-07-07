import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { hashText } from "../utils/hash";

export type UserModel = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserModelCreate = Omit<UserModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";
// ?? panggil collection(table)
const COLLECTION_USER = "Users";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

// FUNCTION: MODEL Create User

export const createUser = async (user: UserModelCreate) => {
  console.log("masuk createuser");
  const modifiedUser: UserModelCreate = {
    ...user,
    password: hashText(user.password),
  };

  const db = await getDb();
  const result = await db.collection(COLLECTION_USER).insertOne(modifiedUser);

  return result;
};

// FUNCTION: MODEL Get User Data

export const getUsers = async () => {
  const db = await getDb();
  const users = (await db
    .collection(COLLECTION_USER)
    .find()
    .project({ password: 0 })
    .toArray()) as UserModel[];
  return users;
};

// FUNCTION: MODEL Get User by Id

export const getUserById = async (id: string) => {
  const db = await getDb();
  const objectId = new ObjectId(id);

  const user = (await db.collection(COLLECTION_USER).findOne(
    { _id: objectId },
    {
      projection: {
        password: 0,
      },
    }
  )) as UserModel;

  return user;
};

// FUNCTION: MODEL Get User by Email

export const getUserByEmail = async (email: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ email: email })) as UserModel;

  return user;
};
