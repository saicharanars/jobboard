import ViewApplication from "@/components/sharedcomponents/ViewApplication";
import { JobApplicationwithjob } from "@/lib/types/Application";

async function getData(id: string): Promise<JobApplicationwithjob[]> {
  const res = await fetch(`http://localhost:3001/applications/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  console.log(data.job);
  return data.job;
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const applications = await getData(params.slug);
  return (
    <div className="col-span-5">
      <ViewApplication key={applications.id} {...applications} />
    </div>
  );
};

export default Page;
