import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import Checkuser from "./Checkuser";
import Authcheck from "./Authcheck";
// import Link from "next/link"
import {
  Bell,
  BriefcaseBusiness,
  CircleUser,
  FileIcon,
  Home,
  LineChart,
  Menu,
  MessageSquareIcon,
  Package,
  Package2,
  Search,
  SearchIcon,
  ShoppingCart,
  UserIcon,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Sidesheet = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <a href="/" className="flex items-center gap-2 font-semibold">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_265_18736)">
                    <circle cx="16" cy="16" r="16" fill="#4640DE" />
                    <mask id="path-2-inside-1_265_18736" fill="white">
                      <path d="M16 27C18.6652 27 21.3304 24.8953 23.0607 23.179C23.4599 22.7831 22.9792 22.2122 22.4822 22.4749C20.6013 23.469 18.0181 24.6 16 24.6C13.9819 24.6 11.3987 23.469 9.5178 22.4749C9.02076 22.2122 8.54012 22.7831 8.93926 23.179C10.6696 24.8953 13.3348 27 16 27Z" />
                    </mask>
                    <path
                      d="M23.0607 23.179L25.1734 25.3089V25.3089L23.0607 23.179ZM8.93926 23.179L6.82658 25.3089H6.82658L8.93926 23.179ZM9.5178 22.4749L10.9197 19.8226L10.9197 19.8226L9.5178 22.4749ZM22.4822 22.4749L21.0803 19.8226L21.0803 19.8226L22.4822 22.4749ZM20.948 21.0491C20.1783 21.8126 19.2652 22.5953 18.3201 23.1712C17.3491 23.7627 16.5672 24 16 24V30C18.098 30 19.9813 29.1849 21.4419 28.2951C22.9282 27.3895 24.2129 26.2616 25.1734 25.3089L20.948 21.0491ZM16 24C15.4328 24 14.6509 23.7627 13.6799 23.1712C12.7348 22.5953 11.8217 21.8126 11.052 21.0491L6.82658 25.3089C7.78708 26.2616 9.07177 27.3895 10.5581 28.2951C12.0187 29.1849 13.902 30 16 30V24ZM8.11593 25.1272C9.1314 25.6639 10.3827 26.2629 11.6934 26.7336C12.967 27.1911 14.4921 27.6 16 27.6V21.6C15.4899 21.6 14.7143 21.4434 13.7216 21.0868C12.7658 20.7436 11.7851 20.28 10.9197 19.8226L8.11593 25.1272ZM16 27.6C17.5079 27.6 19.033 27.1911 20.3066 26.7336C21.6173 26.2629 22.8686 25.6639 23.8841 25.1272L21.0803 19.8226C20.2149 20.28 19.2342 20.7436 18.2785 21.0868C17.2857 21.4434 16.5101 21.6 16 21.6V27.6ZM25.1734 25.3089C25.7674 24.7197 26.1776 23.8995 26.2071 22.9593C26.2356 22.0551 25.905 21.2526 25.4152 20.663C24.4114 19.4547 22.6321 19.0024 21.0803 19.8226L23.8841 25.1272C22.8293 25.6847 21.5389 25.3865 20.7999 24.4969C20.4425 24.0667 20.1883 23.4648 20.2101 22.7708C20.2331 22.0407 20.5536 21.4403 20.948 21.0491L25.1734 25.3089ZM11.052 21.0491C11.4464 21.4403 11.7669 22.0407 11.7899 22.7708C11.8117 23.4648 11.5575 24.0667 11.2001 24.4969C10.4611 25.3865 9.17068 25.6847 8.11593 25.1272L10.9197 19.8226C9.36787 19.0024 7.5886 19.4547 6.58483 20.663C6.09504 21.2526 5.76443 22.0551 5.79286 22.9593C5.82241 23.8995 6.23259 24.7197 6.82658 25.3089L11.052 21.0491Z"
                      fill="white"
                      mask="url(#path-2-inside-1_265_18736)"
                    />
                    <path
                      d="M21.7119 9.31575C21.3919 8.99365 21.3919 8.47732 21.7119 8.15521L23.4303 6.02632L23.4303 5.98937C23.8656 5.55866 24.5715 5.55866 25.0068 5.98937C25.4421 6.42007 25.4421 7.11837 25.0068 7.54907L22.982 9.31575L22.9064 9.38279C22.7483 9.50768 22.5512 9.57665 22.3469 9.57665C22.1086 9.57665 21.8801 9.48277 21.7119 9.31575ZM8.66663 15.185C8.66663 13.2892 9.42782 11.4711 10.7828 10.1306C12.1377 8.79004 13.9754 8.03694 15.8916 8.03694C19.8818 8.03694 23.1165 11.2372 23.1165 15.185C23.1165 19.1327 19.8818 22.333 15.8916 22.333C11.9013 22.333 8.66663 19.1327 8.66663 15.185Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_265_18736">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="  text-xl md:text-2xl font-bold text-[#202430]">
                  JobHuntly
                </span>
              </a>
            </SheetTitle>
          </SheetHeader>
          <nav className="grid items-start  text-sm font-medium pt-3">
            <Authcheck redirect={false}>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </a>
            </Authcheck>
            <Authcheck redirect={false}>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
              >
                <MessageSquareIcon className="h-4 w-4" />
                Mesages
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </a>
            </Authcheck>
            <Authcheck redirect={false}>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg bg-[#CCCCF5] px-4 py-3 text-primary transition-all hover:text-primary"
              >
                <FileIcon className="h-4 w-4" />
                Applications
              </a>
            </Authcheck>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
            >
              <BriefcaseBusiness className="h-4 w-4" />
              
              Find Jobs
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
            >
              <SearchIcon className="h-4 w-4" />
              Find companies
            </a>
            <Authcheck redirect={false}>
              <a
                href="#"
                className="flex items-center gap-3 border-b rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
              >
                <UserIcon className="h-4 w-4" />
                my Profile
              </a>
            </Authcheck>
            <Authcheck redirect={false}>
              <div className=" px-4 py-3 text-muted-foreground transition-all hover:text-primary ">
                <p className="text-xl">Settings</p>
              </div>
            </Authcheck>
            <Authcheck redirect={false}>
              <a
                href="#"
                className="flex items-center gap-3  rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
              >
                <UserIcon className="h-4 w-4" />
                my Profile
              </a>
            </Authcheck>
            
          </nav>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidesheet;
