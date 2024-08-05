
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
interface jobcard {
  id: string;
  job_role: string;
  description: string;
  category: string;
  location: string;
  openings: number;
}

const Jobapplycard: React.FC<jobcard> = (jobcard) => {
  return (
    <>
      <Link className="w-full" href={`/jobs/${jobcard.id}`}>
        <Card className="w-full ">
          <CardContent className="max-h-54 flex flex-col   justify-around items-between py-1 p-2 w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-3 px-1 md:px-5 ">
                <div className="flex flex-col justify-center gap-3 my-2 flex-grow">
                  <h1 className="font-bold sm:text-xl capitalize md:text-2xl">
                    {jobcard.job_role}
                  </h1>
                  <p className="text-sm line-clamp-3 capitalize text-gray-400">
                    {jobcard.description}
                  </p>
                  <p className="text-sm line-clamp-3 capitalize text-gray-400">
                    {jobcard.location}
                  </p>
                  <div className=" flex flex-row items-center gap-2">
                    <Badge
                      variant={"outline"}
                      className="bg-green-100 text-green-400 min-w-[100px] truncate"
                    >
                      <p className="mx-auto">{jobcard.category}</p>
                    </Badge>

                    <Badge
                      variant={"outline"}
                      className="bg-indigo-100 text-indigo-400 min-w-[100px] truncate"
                    >
                      <p className="mx-auto">{jobcard.openings}</p>
                    </Badge>
                  </div>
                </div>
              </div>
              <div className=" col-span-1 flex justify-center items-center w-full">
                <div className="   w-full ">
                  <Link href={`/jobs/${jobcard.id}`}>
                    <Button className="w-full inline-flex items-center justify-center bg-blue-700 hover:bg-blue-900  text-white">
                      Apply
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default Jobapplycard;
