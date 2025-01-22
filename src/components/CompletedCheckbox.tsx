"use client";

import { FC, useState } from "react";

import Image from "next/image";
import { updateTaskCompleted } from "@/actions/tasks";

interface Props {
  defaultState: boolean;
  className?: string;
  taskId: number;
}

export const CompletedCheckbox: FC<Props> = ({
  defaultState,
  className,
  taskId,
}) => {
  const [checked, setChecked] = useState(!!defaultState);

  return (
    <label
      className={`flex items-center space-x-2 relative ${className}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <input
        type="checkbox"
        name="completed"
        checked={checked}
        onChange={async () => {
          await updateTaskCompleted(taskId, !checked);

          setChecked((prev) => !prev);
        }}
        className="hidden"
      />

      <Image
        src="/checkbox.svg"
        alt="Check icon"
        width={24}
        height={24}
        className="cursor-pointer"
      />

      <Image
        src="/checkbox-checked.svg"
        alt="Check icon"
        width={24}
        height={24}
        className={`cursor-pointer absolute top-0 left-0 ${
          checked ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      />
    </label>
  );
};
