import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
function EmptyState() {
  return (
    <div className="flex items-center justify-center mt-10 flex-col">
      <Image src={"/placeholder.png"} width={200} height={200} alt="alt"/>
      <h2 className="font-medium text-lg text-gray-500">
        Create New AI Interior Design for your room
      </h2>
      <Link href={"/dashboard/create-new"}>
        <Button className="mt-5">+ Redesign Room</Button>
      </Link>
    </div>
  );
}

export default EmptyState;
