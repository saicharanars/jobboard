"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

import Options from "./Options";
import { Badge } from "../ui/badge";
import { Job } from "@/lib/types/job";
import axios from "axios";
import { headers } from "next/headers";
import { useContext } from "react";
import AuthContext from "@/lib/context/auth";
import { useDispatch } from "react-redux";
import { deletejobslice } from "@/lib/redux/Jobreducer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const url = "http://localhost:3001/";
const edit = () => {
  console.log("ujhh");
};
const Delete = async (item) => {
  console.log(item, "this has to be deleted");
  const deleteitem = await axios.delete(`${url}jobs/${item.id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  console.log(deleteitem);
};

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "job_role",
    header: () => <div className="text-center">Job Role</div>,
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("job_role")}</p>
      );
    },
  },
  {
    accessorKey: "openings",
    header: () => <div className="text-center">Openings</div>,
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("openings")}</p>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center">category</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center w-full">
          <Badge
            variant="outline"
            className="text-center rounded-2xl border-green-500 w-24 h-9 flex items-center justify-center"
          >
            {row.getValue("category")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="text-center">location</div>,
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("location")}</p>
      );
    },
  },
  {
    accessorKey: "edit",
    header: () => <div className="text-center">Edit/Delete</div>,
    cell: ({ row, cell }) => {
      return (
        <div className="flex justify-center w-full">
          <Options item={row.original} />
        </div>
      );
    },
  },
];
