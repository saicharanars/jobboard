import { Button } from "../ui/button";
import SectionHeader from "./SectionHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { profile } from "@/lib/types/user";
import {
  Fire,
  Dob,
  Loc,
  Coun,
  Twitter,
  Facebook,
  Linkedin,
  Css,
  Js,
  Ruby,
  Html,
} from "./Svg";

const CompanyProfile = (profile: profile) => {
  return (
    <div className="col-span-5 md:col-span-4 grid grid-cols-1  p-1 md:p-2 gap-3">
      <SectionHeader title="My Profile" actionElement={<Button>back</Button>} />

      <Card className="p-1 md:p-1 grid grid-cols-1 md:grid-cols-4 mx-4">
        <div className="flex flex-row justify-between items-center mr-0 my-auto">
          <img
            src="https://github.com/shadcn.png"
            alt="stripe"
            className="w-12 h-12 md:w-36 md:h-36 m-2"
          />
          <Button
            variant="outline"
            className="md:hidden m-2 text-blue-500  rounded-sm border-blue-500"
          >
            43 jobs
          </Button>
        </div>
        <div className=" col-span-3 my-auto">
          <CardHeader>
            <CardTitle className="text-3xl ">Stripe</CardTitle>
            <CardDescription className="text-blue-500">
              https://stripe.com
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col md:flex-row my-auto  items-start">
            <div className="flex flex-row  items-start ">
              <div className="p-3 my-auto">
                <Fire />
              </div>
              <div className="flex flex-col items-start my-auto">
                <p className="text-[#515B6F] text-md  font-thin">Founded</p>
                <p className=" text-sm      text-[#25324B] font-semibold   ">
                {new Date(profile.date_of_birth).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-row  items-start">
              <div className="p-3 my-auto">
                <Dob />
              </div>
              <div className="flex flex-col items-start my-auto">
                <p className="text-[#515B6F] text-md  font-thin">Employees</p>
                <p className=" text-sm      text-[#25324B] font-semibold   ">
                  4000+
                </p>
              </div>
            </div>
            <div className="flex flex-row  items-start">
              <div className="p-3 my-auto">
                <Coun />
              </div>
              <div className="flex flex-col items-start my-auto">
                <p className="text-[#515B6F] text-md  font-thin">Location</p>
                <p className=" text-sm      text-[#25324B] font-semibold   ">
                  20 countries
                </p>
              </div>
            </div>
            <div className="flex flex-row  items-start">
              <div className="p-3 my-auto">
                <Loc />
              </div>
              <div className="flex flex-col items-start my-auto">
                <p className="text-[#515B6F] text-md  font-thin">Industry</p>
                <p className=" text-sm      text-[#25324B] font-semibold   ">
                  It & Services
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-4 px-1 md:px-4 ">
        <div className=" col-span-3 p-2 mx-2">
          <h1 className="text-xl md:text-2xl text-black font-bold line-clamp-1 mb-2">
            Company Profile
          </h1>
          <div>
            <p className="text-[#515B6F] text-md font-medium">
              {profile.description}
            </p>
          </div>
          <h1 className="text-xl md:text-2xl text-black font-bold line-clamp-1 my-2">
            Contact
          </h1>
          <div className="flex flex-row items-center gap-1 p-2">
            <a href={profile.sociallinks?.linkedin}>
              <Button
                variant="outline"
                className="  text-blue-500  rounded-sm border-blue-500 gap-2"
              >
                <Twitter />
                twitter
              </Button>
            </a>
            <a href={profile.sociallinks?.github}>
              <Button
                variant="outline"
                className="  text-blue-500  rounded-sm border-blue-500 gap-2"
              >
                <Facebook />
                facebook
              </Button>
            </a>
            <a href={profile.sociallinks?.website}>
              <Button
                variant="outline"
                className="  text-blue-500  rounded-sm border-blue-500   gap-2"
              >
                <Linkedin />
                <p>linkedin</p>
              </Button>
            </a>
          </div>
          <div className="grid grid-cols-3 grid-rows-3 gap-2 mt-2">
            <div className="row-span-2 col-span-3 md:col-span-2 md:row-span-3  ">
              <img
                src="https://github.com/shadcn.png"
                alt="office image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative md:row-span-1 md:col-span-1">
              <img
                src="https://github.com/shadcn.png"
                alt="office image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:row-span-1 md:col-span-1">
              <img
                src="https://github.com/shadcn.png"
                alt="office image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:row-span-1 md:col-span-1">
              <img
                src="https://github.com/shadcn.png"
                alt="office image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-xl md:text-2xl text-black font-bold line-clamp-1 mb-2">
            Tech Stack
          </h1>
          <p className="text-[#515B6F] text-md font-medium">
            Learn about the technology and tools that Stripe uses.
          </p>
          <div className="grid grid-cols-3 gap-2  items-center p-1 ">
            <div className=" flex flex-col items-center p-2">
              <Html />
              <p className="text-[#515B6F] self-center text-md">HTML</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <Css />
              <p className="text-[#515B6F] self-center text-md">CSS</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <Js />
              <p className="text-[#515B6F] self-center text-md">JavaScript</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <Ruby />
              <p className="text-[#515B6F] self-center text-md">Ruby</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <Html />
              <p className="text-[#515B6F] self-center text-md">HTML</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <Html />
              <p className="text-[#515B6F] self-center text-md">HTML</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
