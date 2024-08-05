"use client";
import React, { Suspense, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { LoaderCircle } from "lucide-react";
import Jobapplycard from "./Jobapplycard";
import store from "@/lib/redux/applyjobs/store";
import { useGetJobsForAllQuery } from "@/lib/redux/applyjobs/applicationsapi";
import SectionHeader from "./SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SidebarFilters from "./SidebarFilters";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface JobCard {
  id: string;
  job_role: string;
  description: string;
  category: string;
  location: string;
  openings: number;
}

export interface FilterParams {
  sortdate: string;
  category?: string;
  location?: string;
  skip?: number;
  take?: number;
}

interface JobListProps {
  filterParams: FilterParams;
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}

const JobList: React.FC<JobListProps> = ({ filterParams, setFilterParams }) => {
  const {
    data: jobsFromApi,
    isLoading,
    error,
  } = useGetJobsForAllQuery(filterParams);

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
  if (!jobsFromApi || jobsFromApi.data.jobs.length === 0)
    return <div>No jobs found</div>;

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
        {jobsFromApi.data.jobs.map((item: JobCard) => (
          <Jobapplycard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

const BrowsejobsContent: React.FC = () => {
  const [filterParams, setFilterParams] = useState<FilterParams>({
    sortdate: "ASC",
    category: undefined,
    location: undefined,
    skip: 0,
    take: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data: jobsFromApi } = useGetJobsForAllQuery(filterParams);

  useEffect(() => {
    if (jobsFromApi) {
      // Assuming the API returns a total count of jobs
      console.log(jobsFromApi.data);
      const totalJobs = jobsFromApi.data.totaljobs;
      setTotalPages(Math.ceil(totalJobs / filterParams.take!));
    }
  }, [jobsFromApi, filterParams.take]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilterParams((prev) => ({
      ...prev,
      skip: (page - 1) * prev.take!,
    }));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="col-span-5 p-1 h-screen my-3 ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-white rounded-lg">
        <div className="hidden md:block mt-16 p-4">
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
          <div className="w-full mt-4 p-4 m-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePrevious();
                    }}
                  />
                </PaginationItem>
                {renderPageNumbers()}
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNext();
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

const Browsejobs: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowsejobsContent />
    </Provider>
  );
};

export default Browsejobs;
