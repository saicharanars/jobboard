"use client";
import React, { useCallback, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import Jobapplycard from "./Jobapplycard";
import { useGetJobsForAllQuery } from "@/lib/redux/applyjobs/applicationsapi";
import InfiniteScroll from "@/components/ui/infinitescroll";
import SidebarFilters from "./SidebarFilters";
import SectionHeader from "./SectionHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [jobList, setJobList] = React.useState<JobCard[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const {
    data: jobsFromApi,
    isLoading,
    error,
  } = useGetJobsForAllQuery(filterParams);

  const loadMoreJobs = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    const newSkip = (filterParams.skip || 0) + (filterParams.take || 10);

    setFilterParams((prevParams) => ({
      ...prevParams,
      skip: newSkip,
    }));
  }, [filterParams, loading, hasMore, setFilterParams]);

  useEffect(() => {
    if (jobsFromApi) {
      setJobList((prev) => [...prev, ...jobsFromApi]);
      setHasMore(jobsFromApi.length === filterParams.take);
      setLoading(false);
    }
  }, [jobsFromApi, filterParams.take]);

  if (isLoading && jobList.length === 0)
    return (
      <div className="h-full">
        <LoaderCircle
          strokeWidth="3"
          className="text-blue-700 h-8 w-8 m-auto animate-spin"
        />
      </div>
    );
  if (error) return <div>Error loading jobs</div>;
  if (jobList.length === 0) return <div>No jobs found</div>;

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
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={loadMoreJobs}
          threshold={1}
        >
          {jobList.map((item: JobCard) => (
            <Jobapplycard key={item.id} {...item} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default JobList;
