"use client";

import { FC } from "react";
import Image from "next/image";
import { deleteTask } from "@/actions/tasks";

interface Props {
  className?: string;
  taskId: number;
}

export const DeleteButton: FC<Props> = ({ className, taskId }) => {
  return (
    <button
      className={className}
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        await deleteTask(taskId);
      }}
    >
      <Image src="/trash.svg" width={25} height={24} alt="Delete" />
    </button>
  );
};
