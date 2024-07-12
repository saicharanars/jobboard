import { ReactNode } from "react";
import Footer from "../sharedcomponents/Footer";
import Header from "../sharedcomponents/Header";
import {
  Home,
  MessageSquareIcon,
  Badge,
  FileIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import AuthCheck from "../sharedcomponents/Authcheck";

interface RootProps {
  children: ReactNode;
}

const Root = () => {
  return (
    <>
      <Header />
      <div className="h-screen">
        <div className="grid grid-cols-5 grid-flow-col gap-2 pt-4">
          <AuthCheck redirect={false}>
            <div className="hidden md:block">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
                >
                  <MessageSquareIcon className="h-4 w-4" />
                  Messages
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg bg-[#CCCCF5] px-4 py-3 text-primary transition-all hover:text-primary"
                >
                  <FileIcon className="h-4 w-4" />
                  Applications
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
                >
                  <SearchIcon className="h-4 w-4" />
                  Find Jobs
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
                >
                  <SearchIcon className="h-4 w-4" />
                  Browse Companies
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 border-b rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
                >
                  <UserIcon className="h-4 w-4" />
                  My Profile
                </a>
                <div className="px-4 py-3 text-muted-foreground transition-all hover:text-primary">
                  <p className="text-xl">Settings</p>
                </div>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
                >
                  <UserIcon className="h-4 w-4" />
                  My Profile
                </a>
              </nav>
            </div>
          </AuthCheck>
          
        </div>
        <Footer />
      </div>
      <Footer />
    </>
  );
};

export default Root;
