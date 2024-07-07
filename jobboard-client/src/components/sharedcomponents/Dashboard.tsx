"use client";
import React from "react";
import Checkuser from "./Checkuser";
import Authcheck from "./Authcheck";
// import Link from "next/link"
import {
  Bell,
  CircleUser,
  FileIcon,
  Home,
  LineChart,
  Menu,
  MessageSquareIcon,
  Package,
  Package2,
  Plus,
  Search,
  SearchIcon,
  ShoppingCart,
  UserIcon,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SectionHeader from "./SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Authform from "./Authform";
import AddJobForm from "./AddJobForm";
import Jobs from "./Jobs";
import store from "../../lib/redux/store";
import { Provider } from "react-redux";

const AddPostButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className=" inline-flex flex-row content-around  justify-between text-white font-medium px-2 md:px-6 py-2 transition ease-in-out delay-150 bg-blue-700 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-300">
            <Plus h-4 w-4 />
            <p className="text-lg">Post a job</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="p-4 ">
          <AddJobForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

const Dashboard = () => {
  return (
    <Provider store={store}>
      <div>
        <Authcheck>
          <div className="grid grid-cols-5 grid-flow-col gap-2 pt-4">
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
                  Mesages
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
                  className="flex items-center gap-3 border-b rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
                >
                  <UserIcon className="h-4 w-4" />
                  my Profile
                </a>
                <div className=" px-4 py-3 text-muted-foreground transition-all hover:text-primary ">
                  <p className="text-xl">Settings</p>
                </div>
                <a
                  href="#"
                  className="flex items-center gap-3  rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
                >
                  <UserIcon className="h-4 w-4" />
                  my Profile
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3  rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
                >
                  <UserIcon className="h-4 w-4" />
                  my Profile
                </a>
              </nav>
            </div>
            <div className="col-span-5 md:col-span-4">
              <SectionHeader
                title="Dashboard"
                actionElement={<AddPostButton />}
              />
              <Jobs />
            </div>
          </div>
        </Authcheck>
      </div>
    </Provider>
  );
};

export default Dashboard;
