import { createUser, getUsers } from "@/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

const userInputSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  username: z.string().nonempty({ message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// GET: /api/user

export const GET = async (request: NextRequest) => {
  console.log("masuk model get api/users");
  const users = await getUsers();

  // ?? test request
  console.log("INSIDE GET /api/users");
  console.log("x-user-id", request.headers.get("x-user-id"));
  console.log("x-user-email", request.headers.get("x-user-email"));
  console.log("x-custom-value", request.headers.get("x-custom-value"));

  return Response.json(
    {
      statusCode: 200,
      message: "GET /api/users",
      data: users,
    },
    {
      status: 200,
    }
  );
};

// POST: /api/user

export const POST = async (request: Request) => {
  console.log("masuk model post api/users");
  try {
    const data = await request.json();

    const parsedData = userInputSchema.safeParse(data);

    console.log(parsedData);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const user = await createUser(parsedData.data);

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "POST /api/users !",
        data: user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);

      const errPath = error.issues[0].path[0];
      const errMessage = error.issues[0].message;

      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `${errPath} - ${errMessage}`,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal Server Error !",
      },
      {
        status: 500,
      }
    );
  }
};
