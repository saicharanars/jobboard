"use client";
import { Suspense, useState } from "react";
import Jobapplycard from "./Jobapplycard";
import store from "@/lib/redux/applyjobs/store";
import { Provider } from "react-redux";
import { useGetJobsForallQuery } from "@/lib/redux/applyjobs/applicationsapi";
import SectionHeader from "./SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import SidebarFilters from "./SidebarFilters";

interface JobCard {
  id: string;
  job_role: string;
  description: string;
  category: string;
  location: string;
  openings: number;
}

interface FilterParams {
  sortdate: string;
  category?: string;
  location?: string;
}

const JobList = ({ filterParams, setFilterParams }) => {
  const {
    data: jobsFromApi,
    isLoading,
    error,
  } = useGetJobsForallQuery(filterParams);

  if (isLoading)
    return (
      <div className="h-full">
        <LoaderCircle
          strokeWidth="3"
          className="text-blue-700 h-8 w-8 m-auto animate-spin"
        />
      </div>
    );
  if (error) return <div>Error loading jobs</div>;
  if (!jobsFromApi) return <div>No jobs found</div>;

  const DialogFilters = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="md:hidden">
          Filter Jobs
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Jobs</DialogTitle>
        </DialogHeader>
        <SidebarFilters
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />
      </DialogContent>
    </Dialog>
  );

  return (
    <div>
      <SectionHeader title="Browse Jobs" actionElement={<DialogFilters />} />
      <div className="flex flex-row flex-wrap items-center justify-center gap-2 px-2 pt-4">
        {jobsFromApi.map((item) => (
          <Jobapplycard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

const Browsejobs = () => {
  const [filterParams, setFilterParams] = useState({
    sortdate: "ASC",
    category: undefined,
    location: undefined,
  });

  return (
    <Provider store={store}>
      {/* Sidebar for md and larger screens */}

      {/* Main content area */}
      <div className="col-span-5 p-1   h-screen my-3 overflow-y-auto ">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="hidden md:block mt-16">
            <SidebarFilters
              filterParams={filterParams}
              setFilterParams={setFilterParams}
            />
          </div>
          <div className="md:col-span-3">
            <Suspense
              fallback={<div className="text-center">Loading jobs...</div>}
            >
              <JobList
                filterParams={filterParams}
                setFilterParams={setFilterParams}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default Browsejobs;
