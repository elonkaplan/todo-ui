"use server";

import { checkAccessToken } from "./auth";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function updateTaskCompleted(id: number, completed: boolean) {
  const accessToken = await checkAccessToken();

  if (!accessToken) {
    return;
  }

  try {
    await fetch(`${process.env.API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ completed }),
    });

    revalidateTag("tasks");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTask(id: number) {
  const accessToken = await checkAccessToken();

  if (!accessToken) {
    return;
  }

  try {
    await fetch(`${process.env.API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    revalidateTag("tasks");
  } catch (error) {
    console.error(error);
  }
}

export async function createTask({
  title,
  color,
}: {
  title: string;
  color: string | null;
}) {
  const accessToken = await checkAccessToken();

  if (!accessToken) {
    return;
  }

  let isSuccess = false;

  try {
    await fetch(`${process.env.API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title, color }),
    });

    revalidateTag("tasks");

    isSuccess = true;
  } catch (error) {
    console.error(error);
  }

  if (isSuccess) {
    redirect("/");
  }
}

export async function updateTask(
  id: number,
  {
    title,
    color,
  }: {
    title: string;
    color: string | null;
  }
) {
  const accessToken = await checkAccessToken();

  if (!accessToken) {
    return;
  }

  let isSuccess = false;

  try {
    await fetch(`${process.env.API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title, color }),
    });

    revalidateTag("tasks");
    revalidateTag(`tasks/${id}`);

    isSuccess = true;
  } catch (error) {
    console.error(error);
  }

  if (isSuccess) {
    redirect("/");
  }
}
