"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/") {
    router.push("/login");
  }

  return (
    <div>
      <h1>M-Knows AI Scoring Website</h1>
    </div>
  );
}
