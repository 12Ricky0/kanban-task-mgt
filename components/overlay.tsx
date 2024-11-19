"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function Overlay({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = decodeURIComponent(usePathname());
  function handleClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      if (
        pathname.includes("details") ||
        pathname.includes("create") ||
        pathname.includes("edit") ||
        pathname.includes("update")
      ) {
        router.back();
      }
    }
  }
  return (
    <div
      onClick={handleClick}
      className="overlay min-w-full z-20 flex items-center justify-center"
    >
      {children}
    </div>
  );
}
