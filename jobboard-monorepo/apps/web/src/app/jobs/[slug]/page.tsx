import Job from "@/components/sharedcomponents/Job";
const url = "https://jobboard-4945.onrender.com/";

async function getData(id: string) {
  const res = await fetch(`${url}jobs/${id}`);

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
      <Job {...data.job} />
    </div>
  );
};

export default page;
