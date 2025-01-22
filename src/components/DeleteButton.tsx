"use client";

import { FC, useState } from "react";

import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import Image from "next/image";
import { deleteTask } from "@/actions/tasks";

interface Props {
  className?: string;
  taskId: number;
}

export const DeleteButton: FC<Props> = ({ className, taskId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={className}
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <Image src="/trash.svg" width={25} height={24} alt="Delete" />
      </button>

      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={async () => {
          await deleteTask(taskId);
          setIsOpen(false);
        }}
      />
    </>
  );
};
