import {
  Globe2Icon,
  LanguagesIcon,
  Link,
  Linkedin,
  Mail,
  MapPin,
  Pencil,
  PhoneIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import SectionHeader from "./SectionHeader";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { profile } from "@/lib/types/user";
const text =
  "I’m a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I’m passionate about designing digital products that have a positive impact on the world. \n For 10 years, I’ve specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.";
const Backtohome = () => {
  return (
    <Link href="/">
      <Button
        variant="outline"
        className="text-blue-700 capitalize text-lg font-normal"
      >
        Back to Homepage
      </Button>
    </Link>
  );
};
const Profile = (profile: profile) => {
  const [myprofile, setProfile] = useState(profile);
  useEffect(() => {
    console.log(myprofile, myprofile.sociallinks);
  }, [myprofile]);
  return (
    <div className="col-span-5 md:col-span-4 p-1 md:p-2">
      <SectionHeader title="My Profile" actionElement={<Backtohome />} />
      <div className="grid grid-cols-1 md:grid-cols-5 px-2 md:px-8 gap-2">
        <div className="md:col-span-3 grid grid-cols-1 gap-2 ">
          <Card>
            <CardContent>
              <div className="grid grid-cols-5 p-3  border-1 z-50   border-slate-100">
                <div className="p-1 md:p-1 my-auto">
                  <Avatar>
                    <AvatarImage
                      className=" h-18 w-18 md:h-28 md:w-28 overflow-hidden rounded-full cursor-pointer"
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className=" col-span-3 flex flex-col justify-start p-4 gap-2">
                  <h1 className="text-lg md:text-2xl font-bold capitalize">
                    sai charan
                  </h1>
                  <p className="text-md md:text-lg">
                    product manager at
                    <span className="font-bold capitalize"> twitter</span>
                  </p>
                  <p className="text-sm md:text-md my-auto  font-normal capitalize inline-flex flex-row justify-start gap-3">
                    <span>
                      <MapPin className="h-6 w-6 p-1" />
                    </span>
                    {profile.location}
                  </p>
                </div>
                <div className="my-auto">
                  <Button size={"sm"} variant={"outline"}>
                    edit profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <SectionHeader
                title="About Me"
                actionElement={
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                }
              />
              <div className="p-4">
                {/* {text.split("\n").map((i, key) => {
                    return <p className=" whitespace-pre-line relative text-wrap" key={key}>{i}</p>;
                  })} */}
                {profile.description}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 grid grid-cols-1  ">
          <Card className="p-2 max-h-56">
            <CardContent>
              <SectionHeader
                title="Details"
                actionElement={
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                }
              />
              <div className=" mx-auto  px-8">
                <p className="inline-flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>saicharanars@gmail.com</span>
                </p>
              </div>
              <div className=" mx-auto  px-8">
                <p className="inline-flex items-center justify-center space-x-2">
                  <PhoneIcon className="h-4 w-4" />
                  <span>8886330176</span>
                </p>
              </div>
              <div className=" mx-auto  px-8">
                <p className="inline-flex items-center justify-center space-x-2">
                  <LanguagesIcon className="h-4 w-4" />
                  <span>English & Telugu</span>
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="max-h-56 mb-auto">
            <CardContent>
              <SectionHeader
                title="Social links"
                actionElement={
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                }
              />
              <div className=" mx-auto  px-8">
                <p className="inline-flex items-center justify-center space-x-2">
                  <Linkedin className="h-4 w-4" />
                  <span>{profile.sociallinks?.linkedin}</span>
                </p>
              </div>
              <div className=" mx-auto  px-8">
                <p className="inline-flex items-center justify-center space-x-2">
                  <GitHubLogoIcon className="h-4 w-4" />
                  <span>{profile.sociallinks?.github}</span>
                </p>
              </div>
              <div className=" mx-auto  px-8">
                <p className="inline-flex items-center justify-center space-x-2">
                  <Globe2Icon className="h-4 w-4" />
                  <span>{profile.sociallinks?.website}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
