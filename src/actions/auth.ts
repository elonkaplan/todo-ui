"use server";

import { cookies } from "next/headers";
import { isTokenExpired } from "@/helpers/isTokenExpired";
import { redirect } from "next/navigation";
import { z } from "zod";

const authSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export async function refreshTokens() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    const data: { accessToken: string; refreshToken: string } =
      await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createCookie(name: string, value: string) {
  if (value === "") return;
  const cookieStore = await cookies();

  cookieStore.set(name, value);
}

export async function checkAccessToken() {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get("access_token")?.value || null;
  let refreshToken = cookieStore.get("refresh_token")?.value || null;

  if ((!accessToken || isTokenExpired(accessToken)) && refreshToken) {
    const res = await refreshTokens();

    if (!res) {
      redirect("/login");
    }

    accessToken = res.accessToken;
    refreshToken = res.refreshToken;

    cookieStore.set("access_token", accessToken);
    cookieStore.set("refresh_token", refreshToken);
  }

  if (!accessToken || isTokenExpired(accessToken)) {
    redirect("/login");
  }

  return accessToken;
}

export async function login(formData: FormData) {
  let redirectPath = "/";

  try {
    const result = authSchema.safeParse({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    });

    if (!result.success) {
      throw new Error(
        result.error.errors.map((error) => error.message).join(", ")
      );
    }

    const res = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    });

    if (!res.ok) {
      throw new Error((await res.json()).message);
    }

    const data: { accessToken: string; refreshToken: string } =
      await res.json();

    const cookieStore = await cookies();

    cookieStore.set("access_token", data.accessToken);
    cookieStore.set("refresh_token", data.refreshToken);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);

      redirectPath = `/login?error=${encodeURIComponent(error.message)}`;
    } else {
      console.error(error);

      redirectPath = `/login?error=${encodeURIComponent(
        "Unknown error occurred"
      )}`;
    }
  }

  redirect(redirectPath);
}

export async function register(formData: FormData) {
  let redirectPath = "/";

  try {
    const result = authSchema.safeParse({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    });

    if (!result.success) {
      throw new Error(
        result.error.errors.map((error) => error.message).join(", ")
      );
    }

    const res = await fetch(`${process.env.API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    });

    if (!res.ok) {
      throw new Error((await res.json()).message);
    }

    const data: { accessToken: string; refreshToken: string } =
      await res.json();

    const cookieStore = await cookies();

    cookieStore.set("access_token", data.accessToken);
    cookieStore.set("refresh_token", data.refreshToken);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);

      redirectPath = `/register?error=${encodeURIComponent(error.message)}`;
    } else {
      console.error(error);

      redirectPath = `/login?error=${encodeURIComponent(
        "Unknown error occurred"
      )}`;
    }
  }

  redirect(redirectPath);
}

export async function logout() {
  try {
    const accessToken = await checkAccessToken();

    await fetch(`${process.env.API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
  }

  const cookieStore = await cookies();

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  redirect("/login");
}
