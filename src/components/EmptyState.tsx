"use server";

import Image from "next/image";

export const EmptyState = async () => (
  <div className="rounded-lg border-t border-t-background3 flex items-center justify-center flex-col py-16 px-6">
    <Image
      src="/clipboard.png"
      width={56}
      height={56}
      alt="Empty"
      className="mb-4"
    />

    <p className="text-center text-text2 text-base">
      <span className="font-bold">
        You don&apos;t have any tasks registered yet.
      </span>
      <br />
      <br />
      <span>Create tasks and organize your to-do items.</span>
    </p>
  </div>
);
