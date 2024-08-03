"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "../ui/button";
import Link from "next/link";
import { JobApplication } from "@/lib/types/Application";
const url = "https://jobboard-4945.onrender.com/";

export const columns: ColumnDef<JobApplication>[] = [
  {
    accessorKey: "job",
    header: () => <div className="text-center">Job Role</div>,
    cell: ({ row }) => {
      const job = row.getValue("job") as { job_role: string };
      return (
        <div className="flex justify-center items-center w-full">
          <p>{job.job_role}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="text-center">location</div>,
    cell: ({ row }) => {
      const job = row.getValue("job") as { location: string };
      return (
        <div className="flex justify-center items-center w-full">
          <p>{job.location}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "category",
    header: () => <div className="text-center">category</div>,
    cell: ({ row }) => {
      const job = row.getValue("job") as { category: string };
      return (
        <div className="flex justify-center items-center w-full">
          <p>{job.category}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">Application</div>,
    cell: ({ row }) => {
      return (
        <div className=" flex justify-center w-full">
          <Link href={`applications/${row.getValue("id")}`}>
            <Button
              variant={"outline"}
              className="text-blue-700 border-blue-500"
            >
              view application
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "resume_url",
    header: () => <div className="text-center">resume_url</div>,
    cell: ({ row }) => {
      return (
        <div className=" flex justify-center w-full">
          <Link href={`${row.getValue("resume_url")}`}>
            <Button
              variant={"outline"}
              className="text-blue-700 border-blue-500"
            >
              view resume
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "createdDate",
    header: () => <div className="text-center">Application Date</div>,
    cell: ({ row }) => {
      const createdDate = row.getValue("createdDate") as string;
      const formattedDate = new Date(createdDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return (
        <div className="flex justify-center items-center w-full">
          <p>{formattedDate}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Application status</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center w-full">
          <p>{row.getValue("status")}</p>
        </div>
      );
    },
  },
];
