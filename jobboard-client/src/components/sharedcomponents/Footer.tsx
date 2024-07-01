import { Button } from "../ui/button";



const Footer = () => {
  const about = ["companies", "pricing", "terms", "advice", "privacy policy"];
  const resources = ["help docs", "guide", "updates", "contact us"];
  return (
    <>
      <div className="bg-slate-800 ">
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="flex justify-start flex-col align-middle content-center p-6">
            <h1 className="text-2xl text-bold text-white ">JobHuntly</h1>
            <p className="mt-5 text-slate-400 line-clamp-3 ">
              Great Platform for for job seeker that passionate about startups.
              find your dreamjobs easier{" "}
            </p>
          </div>
          <div className="flex flex-col p-6 gap-2">
            <h1 className="text-xl font-bold text-white">About</h1>
            {about.map((item, index) => (
              <p key={index} className="text-slate-400">
                {item}
              </p>
            ))}
          </div>

          <div className="flex flex-col p-6 gap-2">
            <h1 className="text-xl font-bold text-white">Resources</h1>
            {resources.map((item, index) => (
              <p key={index} className="text-slate-400">
                {item}
              </p>
            ))}
          </div>
          <div className="flex flex-col pt-6 mr-2 gap-2">
            <h1 className="text-xl font-bold text-white">Get Job Notifications</h1>
            <p  className="text-slate-400">
                The latest job news,articles sent to your inbox directly
              </p>
            <div className="flex flex-col md:flex-row gap-1 pt-4 ">
                <input  placeholder="Email Address"></input>
                <Button className=" bg-blue-800 border-r-0 hover:bg-white hover:text-blue-800">Subscribe</Button>

            </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default Footer;
