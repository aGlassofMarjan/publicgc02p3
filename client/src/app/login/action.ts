"use server";

import { getUserByEmail } from "@/db/models/user";
import { compareTextWithHash } from "@/db/utils/hash";
import { redirect } from "next/navigation";
import { createToken } from "@/lib/jwt";
import { z } from "zod";
import { cookies } from "next/headers";

const url = `http://localhost:3000`;

export const doLogin = async (formData: FormData) => {
  const loginInput = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const email = formData.get("email");
  const password = formData.get("password");

  const parsedData = loginInput.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    const errPath = parsedData.error.issues[0].path[0];
    const errMessage = parsedData.error.issues[0].message;
    const errFinalMessage = `${errPath} - ${errMessage}`;

    return redirect(`${url}/login?error=${errFinalMessage}`);
  }

  const user = await getUserByEmail(parsedData.data.email);

  if (!user || !compareTextWithHash(parsedData.data.password, user.password)) {
    return redirect(`${url}/login?error=Invalid%20credentials`);
  }

  const payload = {
    id: user._id,
    email: user.email,
  };

  const token = createToken(payload);

  if (!token) {
    return redirect(
      `${url}/login?error=${encodeURIComponent("Token creation failed")}`
    );
  }

  cookies().set("token", token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60 * 60),
    sameSite: "strict",
  });

  cookies().set("userId", user._id.toString(), {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60 * 60),
    sameSite: "strict",
  });

  return redirect(`${url}/`);
};
