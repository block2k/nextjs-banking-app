"use server";

import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { parseStringify } from "../utils";

export async function signIn({ email, password }: signInProps) {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
}

export async function signUp(params: SignUpParams) {
  const { email, password, firstName, lastName } = params;

  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error(error);
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    console.error(error);
  }
}
export async function logoutAccount() {
  try {
    const { account } = await createSessionClient();
    (await cookies()).delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    return error;
  }
}
