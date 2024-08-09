"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "../ui/button";
import Link from "next/link";
import { EmployerApplications, JobApplication } from "@/lib/types/Application";
import { Download } from "lucide-react";
import EmployerApplicationUpdate from "./EmployerApplicationUpdate";

// const changestatus = (value) => {
//   console.log(value);
// };

export const columns: ColumnDef<EmployerApplications>[] = [
  {
    accessorKey: "job_role",
    header: () => <div className="text-center">job_role</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center w-full">
          <p>{row.original.job.job_role}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: () => <div className="text-center">user</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center w-full">
          <p>{row.original.user.name}</p>
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

  {
    accessorKey: "category",
    header: () => <div className="text-center">category</div>,
    cell: ({ row }) => {
      //   const job = row.getValue("job") as { category: string };
      return (
        <div className="flex justify-center items-center w-full">
          <p>{row.original.job.category}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: () => <div className="text-center">email</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center w-full">
          <p>{row.original.user.email}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "mobile_number",
    header: () => <div className="text-center">mobile number</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center w-full">
          <p>{row.original.user.mobile_number}</p>
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
    accessorKey: "resume_url",
    header: () => <div className="text-center">Resume</div>,
    cell: ({ row }) => {
      //   const application = row.getValue("resume_url") as { resume_url: string };
      return (
        <div className="flex justify-center items-center w-full">
          <a href={row.getValue("resume_url")}>
            <Download className="h-3 w-3" />
          </a>
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
          <Link href={`applications/${row.original.id}`}>
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
    accessorKey: "jobid",
    header: () => <div className="text-center">job</div>,
    cell: ({ row }) => {
      return (
        <div className=" flex justify-center w-full">
          <Link href={`jobs/${row.original.job.id}`}>
            <Button
              variant={"outline"}
              className="text-blue-700 border-blue-500"
            >
              view job
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">update application</div>,
    cell: ({ row }) => {
      return (
        <div className=" flex justify-center w-full">
          <EmployerApplicationUpdate
            update={row.getValue("status")}
            applicationId={row.original.id}
          />
        </div>
      );
    },
  },

  //
];
