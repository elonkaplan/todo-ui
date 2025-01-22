"use client";

import { FC } from "react";
import Image from "next/image";
import { logout } from "@/actions/auth";

interface Props {
  className?: string;
}

export const LogoutButton: FC<Props> = ({ className }) => {
  return (
    <button className={className} onClick={logout}>
      <Image src="/logout.svg" width={20} height={20} alt="Logout" />
    </button>
  );
};
