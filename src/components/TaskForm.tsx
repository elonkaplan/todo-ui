"use client";

import { FC, useState } from "react";
import { createTask, updateTask } from "@/actions/tasks";

import { ITask } from "@/types";
import Image from "next/image";
import Link from "next/link";

const COLORS = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#007AFF",
  "#5856D6",
  "#AF52DE",
  "#FF2D55",
  "#A2845E",
];

interface Props {
  task?: ITask;
}

export const TaskForm: FC<Props> = ({ task }) => {
  const [title, setTitle] = useState<string>(task?.title || "");
  const [color, setColor] = useState<string | null>(task?.color || null);
  const [isError, setIsError] = useState<boolean>(false);

  return (
    <div className="pt-[91px]">
      <Link href="/" passHref className="mb-12 block">
        <Image src="/back.svg" width={25} height={24} alt="Back" />
      </Link>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (!title) {
            setIsError(true);
            return;
          }

          if (task) {
            await updateTask(task.id, {
              title: title,
              color: color,
            });
          } else {
            await createTask({
              title: title,
              color: color,
            });
          }
        }}
      >
        <label className="block mb-6">
          <span className="block text-logo1 font-bold text-sm mb-3">Title</span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsError(!e.target.value);
            }}
            onBlur={() => setIsError(!title)}
            placeholder="Ex. Brush you teeth"
            className={`p-4 border rounded-lg w-full bg-background4 outline-none font-normal text-sm ${
              isError ? "border-[#FF3B30]" : "border-background3"
            }`}
          />
        </label>

        <div className="mb-12">
          <span className="block text-logo1 font-bold text-sm mb-3">Color</span>

          <ul className="flex gap-4 flex-wrap">
            {COLORS.map((item) => (
              <li
                key={item}
                onClick={() =>
                  setColor((prev) => (prev === item ? null : item))
                }
                className={`w-[52px] h-[52px] rounded-full cursor-pointer ${
                  color === item ? "border-2 border-white" : ""
                }`}
                style={{ backgroundColor: item }}
              />
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full bg-accent py-4 font-bold text-sm flex items-center justify-center gap-2 rounded-lg"
        >
          <span>{task ? "Save" : "Add Task"}</span>
          {task ? (
            <Image src="/check.svg" width={20} height={20} alt="Update Task" />
          ) : (
            <Image src="/plus.svg" width={16} height={16} alt="Create Task" />
          )}
        </button>
      </form>
    </div>
  );
};
