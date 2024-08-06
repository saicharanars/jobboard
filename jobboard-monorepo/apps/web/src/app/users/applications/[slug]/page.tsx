import ViewApplication from "@/components/sharedcomponents/ViewApplication";
import { JobApplicationWithJob } from "@/lib/types/Application";
const url = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getData(id: string): Promise<JobApplicationWithJob> {
  const res = await fetch(`${url}applications/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  console.log("<<<<<<", data);
  return data.job;
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const application = await getData(params.slug);
  return (
    <div className="col-span-5">
      <ViewApplication key={application.id} {...application} />
    </div>
  );
};

export default Page;
