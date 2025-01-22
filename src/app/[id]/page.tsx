"use server";

import { CookieSetter } from "@/components/CookieSetter";
import { ITask } from "@/types";
import { TaskForm } from "@/components/TaskForm";
import { cookies } from "next/headers";
import { isTokenExpired } from "@/helpers/isTokenExpired";
import { redirect } from "next/navigation";
import { refreshTokens } from "@/actions/auth";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const taskId = (await params).id;

  const cookieStore = await cookies();

  let accessToken = cookieStore.get("access_token")?.value || null;
  let refreshToken = cookieStore.get("refresh_token")?.value || null;
  const cookiesToSet = [];

  if ((!accessToken || isTokenExpired(accessToken)) && refreshToken) {
    const res = await refreshTokens();

    if (!res) {
      redirect("/login");
    }

    accessToken = res.accessToken;
    refreshToken = res.refreshToken;

    cookiesToSet.push({ name: "access_token", value: accessToken });
    cookiesToSet.push({ name: "refresh_token", value: refreshToken });
  }

  if (!accessToken || isTokenExpired(accessToken)) {
    redirect("/login");
  }

  let task: ITask | null = null;

  try {
    const res = await fetch(`${process.env.API_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["tasks"] },
    });

    if (res.ok) {
      task = await res.json();
    }
  } catch (error) {
    console.error(error);
  }

  if (!task) {
    redirect("/");
  }

  return (
    <>
      {!!cookiesToSet.length && <CookieSetter cookies={cookiesToSet} />}{" "}
      <TaskForm task={task} />
    </>
  );
}
