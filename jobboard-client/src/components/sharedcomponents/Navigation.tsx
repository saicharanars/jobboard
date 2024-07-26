"use client";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  SearchIcon,
  User2,
  SquareDashedKanban,
  FileText,
  Power,
  Briefcase,
  HomeIcon,
} from "lucide-react";
import AuthCheck from "./Authcheck";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import AuthContext from "@/lib/context/auth";

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
  const { logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState<string>(router.pathname);
  useEffect(() => {
    setTimeout(() => {
      console.log("statred");
    }, 0);
  }, []);
  const handleItemClick = (href: string) => {
    setActiveItem(href);
  };
  const logouthandler = () => {
    logout();
    router.push("/auth");
  };

  return (
    <nav className="grid items-start px-2 gap-2 text-sm font-medium lg:px-4">
      <Linkitem
        href="/"
        actionElement={<HomeIcon className="h-4 w-4 mr-1" />}
        title="Home"
        isActive={activeItem === "/"}
        onClick={() => handleItemClick("/")}
      />
      <AuthCheck>
        <Linkitem
          href="/users/dashboard"
          actionElement={<SquareDashedKanban className="h-4 w-4 mr-1" />}
          title="Dashboard"
          isActive={activeItem === "/users/dashboard"}
          onClick={() => handleItemClick("/users/dashboard")}
        />
      </AuthCheck>
      <AuthCheck>
        <Linkitem
          href="/users/applications"
          actionElement={<FileText className="h-4 w-4 mr-1" />}
          title="My Applications"
          isActive={activeItem === "/users/applications"}
          onClick={() => handleItemClick("/users/applications")}
        />
      </AuthCheck>
      <AuthCheck requiredRole="job_candidate">
        <Linkitem
          href="/jobs"
          actionElement={<SearchIcon className="h-4 w-4 mr-1" />}
          title="Find Jobs"
          isActive={activeItem === "/jobs"}
          onClick={() => handleItemClick("/jobs")}
        />
      </AuthCheck>
      <AuthCheck requiredRole="job_employer">
        <Linkitem
          href="/users/joblisting"
          actionElement={<Briefcase className="h-4 w-4 mr-1" />}
          title="Job Listing"
          isActive={activeItem === "/users/joblisting"}
          onClick={() => handleItemClick("/users/joblisting")}
        />
      </AuthCheck>
      <AuthCheck>
        <Linkitem
          href="/users/profile"
          actionElement={<User2 className="h-4 w-4 mr-1" />}
          title="My Profile"
          isActive={activeItem === "/users/profile"}
          onClick={() => handleItemClick("/users/profile")}
        />
      </AuthCheck>
      <Separator />
      <AuthCheck>
        <Linkitem
          href="/auth"
          actionElement={<Power className="h-4 w-4 mr-1" />}
          title="Logout"
          isActive={activeItem === "/auth"}
          onClick={() => logouthandler()}
        />
      </AuthCheck>
    </nav>
  );
};

export default Navigation;
