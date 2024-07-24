"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { Button } from "../ui/button";

interface LinkProps {
  href: string;
  actionElement: ReactNode;
  title: string;
}

const Linkitem: React.FC<LinkProps> = ({ href, actionElement, title }) => {
  const router = useRouter();
  return (
    <Button
      type="button"
      onClick={() => router.push(`${href}`)}
      className="flex items-center gap-3 rounded-lg bg-white capitalize px-2 py-1  text-white transition-all hover:text-white hover:bg-[#CCCCF5]"
    >
      {actionElement}
      {title}
    </Button>
  );
};

export default Linkitem;
