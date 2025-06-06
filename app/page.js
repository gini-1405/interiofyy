"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="mb-6 text-2xl font-semibold">Welcome</h2>
      {/* <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button> */}
    </div>
  );
}
