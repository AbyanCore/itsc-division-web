"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const sPage = () => {
  const router = useRouter();

  useEffect(() => {
    // delay for 3 seconds and redirect to /s/dashboard
    const redtimeout = setTimeout(() => {
      router.replace("/s/dashboard");
    }, 3000);

    return () => {
      clearTimeout(redtimeout);
    };
  });
  return (
    <div className="h-screen">
      <h1 className="animate-pulse">
        Redirecting to <a href="/s/dashboard">/s/dashboard</a> in 2 seconds
      </h1>
    </div>
  );
};

export default sPage;
