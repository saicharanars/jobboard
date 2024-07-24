"use client";

import { ColumnDef } from "@tanstack/react-table";

import Options from "./Options";
import { Badge } from "../ui/badge";
import { Job } from "@/lib/types/job";
import axios from "axios";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
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
    header: ({ column }) => {
      return (
        <div className="text-center   mx-auto">
          <Button
            className="text-center font-medium bg-inherit text-inherit mx-auto"
            variant="outline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p> Openings</p>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
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
