"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function ErrorAlert({ error }: { error: string }) {
  const [show, setShow] = useState(true);

  return show ? (
    <div className="fixed flex gap-2 bottom-4 right-4 bg-red-500 text-white rounded-xl py-3 pl-5 pr-3 border-2 border-white">
      <div className="flex-col flex gap-1">
        {error.split(",").map((err, index) => (
          <>
            <p key={index}>{err}</p>
          </>
        ))}
      </div>
      <button onClick={() => setShow(false)} className="self-start">
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  ) : null;
}
