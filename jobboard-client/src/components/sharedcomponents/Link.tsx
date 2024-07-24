import Link from "next/link";
import React, { ReactNode } from "react";

interface LinkProps {
  href: string;
  actionElement: ReactNode;
  title: string;
}

const SectionHeader: React.FC<LinkProps> = ({ href, actionElement, title }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg bg-[#CCCCF5] px-4 py-3 text-primary transition-all hover:text-primary"
    >
      <div>{actionElement}</div>
      <span>{title}</span>
    </Link>
  );
};

export default SectionHeader;
