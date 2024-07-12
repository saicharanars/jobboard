import Job from "@/components/sharedcomponents/Job";

async function getData(id: string) {
  const res = await fetch(`http:localhost:3001/jobs/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  console.log(res.json);
  return res.json();
}
const page = async ({ params }: { params: { slug: string } }) => {
  const data = await getData(params.slug);
  return (
    <div className="col-span-5">
      
      <Job {...data.job}/>
    </div>
  );
};

export default page;
