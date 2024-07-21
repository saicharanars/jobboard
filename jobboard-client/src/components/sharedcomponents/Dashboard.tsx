"use client";
import React from "react";
// import Link from "next/link"
import {
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import SectionHeader from "./SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import AddJobForm from "./AddJobForm";
import Jobs from "./Jobs";
import store from "../../lib/redux/store";
import { Provider } from "react-redux";

const AddPostButton = () => {
    return (
      <Dialog >
        <DialogTrigger asChild>
          <Button className="inline-flex flex-row content-around justify-between text-white font-medium px-2 md:px-6 py-2 transition ease-in-out delay-150 bg-blue-700 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-300">
            <Plus className="h-4 w-4" />
            <p className="text-lg">Post a job</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="p-4 h-4/5">
          <AddJobForm/>
        </DialogContent>
      </Dialog>
    );
  };

const Dashboard = () => {
  return (
    <Provider store={store}>
      
            <SectionHeader
              title="Dashboard"
              actionElement={<AddPostButton />}
            />
            <Jobs />
        
    </Provider>
  );
};

export default Dashboard;
