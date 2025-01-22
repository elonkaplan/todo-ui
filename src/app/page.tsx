"use server";

import { CookieSetter } from "@/components/CookieSetter";
import { EmptyState } from "@/components/EmptyState";
import { ITask } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { TaskItem } from "@/components/TaskItem";
import { cookies } from "next/headers";
import { isTokenExpired } from "@/helpers/isTokenExpired";
import { redirect } from "next/navigation";
import { refreshTokens } from "@/actions/auth";

export default async function Home() {
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

  const res = await fetch(`${process.env.API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { tags: ["tasks"] },
  });

  const tasks: ITask[] = await res.json();

  return (
    <>
      {!!cookiesToSet.length && <CookieSetter cookies={cookiesToSet} />}

      <Link
        href="/create"
        passHref
        className="w-full bg-accent py-4 font-bold text-sm flex items-center justify-center gap-2 mt-[-26px] mb-[66px] rounded-lg"
      >
        <span>Create Task</span>
        <Image src="/plus.svg" width={16} height={16} alt="Create Task" />
      </Link>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex font-bold items-center gap-2 text-highlighted1">
            <span className="font-bold text-sm">Tasks</span>
            <span className="bg-background3 py-0.5 px-2 text-text3 rounded-full text-xs">
              {tasks.length}
            </span>
          </div>

          <div className="flex font-bold items-center gap-2 text-highlighted2">
            <span className="text-sm">Completed</span>
            <span className="bg-background3 py-0.5 px-2 text-text3 rounded-full text-xs">
              {tasks.length > 0
                ? `${tasks.filter((item) => item.completed).length} de ${
                    tasks.length
                  }`
                : 0}
            </span>
          </div>
        </div>

        {/* tasks */}
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((item, idx, arr) => (
              <TaskItem
                task={item}
                key={item.id}
                className={idx === arr.length - 1 ? "" : "mb-3"}
              />
            ))}
          </ul>
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
}
