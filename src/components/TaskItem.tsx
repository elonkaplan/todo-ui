"use server";

import { CompletedCheckbox } from "./CompletedCheckbox";
import { DeleteButton } from "./DeleteButton";
import { FC } from "react";
import { ITask } from "@/types";
import Link from "next/link";

interface Props {
  task: ITask;
  className?: string;
}

export const TaskItem: FC<Props> = async ({ task, className }) => {
  return (
    <li>
      <Link
        href={`/${task.id}`}
        passHref
        className={`p-4 bg-background4 rounded-lg flex items-start ${className}`}
      >
        <CompletedCheckbox defaultState={task.completed} taskId={task.id} />

        <h3
          className={`max-w-[calc(100%-16px*2-24px*2-12px*2)] ml-3 font-normal text-sm ${
            task.completed ? `line-through text-text2` : ""
          }`}
          style={{
            color: !task.completed && task.color ? task.color : undefined,
          }}
        >
          {task.title}
        </h3>

        <DeleteButton className="ml-auto" taskId={task.id} />
      </Link>
    </li>
  );
};
