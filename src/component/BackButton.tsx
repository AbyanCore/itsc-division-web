"use client";

import { useRouter } from "next/navigation";

const BackButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <button type="button" className={className} onClick={() => router.back()}>
      {children}
    </button>
  );
};

export default BackButton;
