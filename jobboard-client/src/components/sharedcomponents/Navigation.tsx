"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { SearchIcon, User2, SquareDashedKanban, FileText } from "lucide-react";
import AuthCheck from "./Authcheck";
import { useRouter } from "next/navigation";

interface LinkProps {
  href: string;
  actionElement: ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const Linkitem: React.FC<LinkProps> = ({
  href,
  actionElement,
  title,
  isActive,
  onClick,
}) => (
  <Link
    href={href}
    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all hover:text-primary ${
      isActive ? "bg-[#CCCCF5] text-primary" : "text-muted-foreground"
    }`}
    onClick={onClick}
  >
    {actionElement}
    <span>{title}</span>
  </Link>
);

const Navigation: React.FC = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string>(router.pathname);
  useEffect(() => {
    setTimeout(() => {
      console.log("statred");
    }, 0);
  }, []);
  const handleItemClick = (href: string) => {
    setActiveItem(href);
  };

  return (
    <nav className="grid items-start px-2 gap-2 text-sm font-medium lg:px-4">
      <AuthCheck redirect={false} role="job_candidate">
        <Linkitem
          href="/jobs"
          actionElement={<SearchIcon className="h-4 w-4 mr-1" />}
          title="Find Jobs"
          isActive={activeItem === "/jobs"}
          onClick={() => handleItemClick("/jobs")}
        />
      </AuthCheck>
      <AuthCheck redirect={false}>
        <Linkitem
          href="/users/profile"
          actionElement={<User2 className="h-4 w-4 mr-1" />}
          title="Profile"
          isActive={activeItem === "/users/profile"}
          onClick={() => handleItemClick("/users/profile")}
        />
      </AuthCheck>
      <AuthCheck redirect={false} role="job_candidate">
        <Linkitem
          href="/users/applications"
          actionElement={<FileText className="h-4 w-4 mr-1" />}
          title="Applications"
          isActive={activeItem === "/users/applications"}
          onClick={() => handleItemClick("/users/applications")}
        />
      </AuthCheck>
      <AuthCheck redirect={false} role="job_employer">
        <Linkitem
          href="/users/dashboard"
          actionElement={<SquareDashedKanban className="h-4 w-4 mr-1" />}
          title="Dashboard"
          isActive={activeItem === "/users/dashboard"}
          onClick={() => handleItemClick("/users/dashboard")}
        />
      </AuthCheck>
    </nav>
  );
};

export default Navigation;
