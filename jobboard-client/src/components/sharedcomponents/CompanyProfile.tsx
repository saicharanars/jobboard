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
import { profile, user } from "@/lib/types/user";
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
import { useSelector } from "react-redux";
import {
  Flame,
  GithubIcon,
  Globe,
  Globe2Icon,
  Layers3,
  MapPin,
  Users,
  Users2,
} from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Editresume from "./Editresume";
import EditProfileDialog from "./EditProfileDialog";
import UpdateProfilebutton from "./UpdateProfilebutton";
import EditPhoto from "./EditPhoto";

const CompanyProfile = () => {
  const profile: profile = useSelector((state) => state.profile.profile);
  const user: user = useSelector((state) => state.profile.user);
  return (
    <div className="col-span-5 md:col-span-4 grid grid-cols-1  p-1 md:p-2 gap-3">
      <SectionHeader
        title="My Profile"
        actionElement={<UpdateProfilebutton profile={profile} />}
      />

      <Card className="p-1 md:p-2 grid grid-cols-1 md:grid-cols-6 ">
        <div className="flex flex-row justify-between">
          <img
            src={profile.profile_picture_url}
            alt="stripe"
            className="w-12 h-12 md:w-28 md:h-28 m-2"
          />
          <div className="md:hidden">
            <EditPhoto />
          </div>
        </div>
        <div className=" col-span-5 my-auto">
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle className="text-3xl ">Stripe</CardTitle>
              <CardDescription className="text-blue-500">
                https://stripe.com
              </CardDescription>
            </div>
            <div className="hidden md:block">
              <EditPhoto />
            </div>
          </CardHeader>

          <CardContent className="flex flex-col md:flex-row my-auto  items-start">
            <div className="flex flex-row  items-start gap-1 ">
              <div className="p-1 my-auto   border-blue-500 border-2 rounded-full">
                <Flame className="text-blue-500" />
              </div>
              <div className="flex flex-col items-start my-auto">
                <p className="text-[#515B6F] text-md  font-thin">Founded</p>
                <p className=" text-sm      text-[#25324B] font-semibold   ">
                  {new Date(profile.date_of_birth).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-row  items-start gap-1 ">
              <div className="p-1 my-auto   border-blue-500 border-2 rounded-full">
                <Users2 className="text-blue-500" />
              </div>
              <div className="flex flex-col items-start my-auto">
                <p className="text-[#515B6F] text-md  font-thin">Employees</p>
                <p className=" text-sm      text-[#25324B] font-semibold   ">
                  4000+
                </p>
              </div>
            </div>
            <div className="flex flex-row  items-start gap-1 ">
              <div className="p-1 my-auto   border-blue-500 border-2 rounded-full">
                <MapPin className="text-blue-500" />
              </div>
              <div className="flex flex-col items-start my-auto">
                <p className="text-[#515B6F] text-md  font-thin">Location</p>
                <p className=" text-sm      text-[#25324B] font-semibold   ">
                  20 countries
                </p>
              </div>
            </div>
            <div className="flex flex-row  items-start gap-1 ">
              <div className="p-1 my-auto   border-blue-500 border-2 rounded-full">
                <Layers3 className="text-blue-500" />
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
                <Linkedin />
                <p>linkedin</p>
              </Button>
            </a>
            <a href={profile.sociallinks?.github}>
              <Button
                variant="outline"
                className="  text-blue-500  rounded-sm border-blue-500 gap-2"
              >
                <GitHubLogoIcon className="h-5 w-5 text-blue-700" />
                github
              </Button>
            </a>
            <a href={profile.sociallinks?.website}>
              <Button
                variant="outline"
                className="  text-blue-500  rounded-sm border-blue-500   gap-2"
              >
                <Globe className="h-5 w-5" />
                <p>Website</p>
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
