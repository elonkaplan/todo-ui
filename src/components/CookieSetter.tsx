"use client";

import { FC, useEffect } from "react";

import { createCookie } from "@/actions/auth";

interface Props {
  cookies: { name: string; value: string }[];
}

export const CookieSetter: FC<Props> = ({ cookies }) => {
  useEffect(() => {
    cookies.forEach((cookie) => {
      createCookie(cookie.name, cookie.value);
    });
  }, [cookies]);
  return <></>;
};
