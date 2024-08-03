import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { editprofile } from "@/lib/types/user";
import { Button } from "../ui/button";
import Editresume from "./Editresume";

const Aboutme: React.FC<{ description: string; resume: string }> = ({
  description,
  resume,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row  items-center justify-between">
        <CardTitle className="p-1 mx-3">
          <h1 className="text-lg md:text-xl font-bold"> About you </h1>
        </CardTitle>
        <div className="my-auto ">
          <a href={resume}>
            <Button variant={"secondary"}>Resume</Button>
          </a>
          <Editresume />
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-4">{description}</div>
      </CardContent>
    </Card>
  );
};

export default Aboutme;
