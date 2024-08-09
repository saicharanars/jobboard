"use client";
import AuthContext from "@/lib/context/auth";
import { connectSocket, disconnectSocket } from "@/lib/realtime/sockets";
import { useContext, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Bell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

interface UpdateApplication {
  name: string;
  message: string;
}

const Mysocket = () => {
  const authctx = useContext(AuthContext);
  const [updatedApplications, setUpdatedApplications] = useState<
    UpdateApplication[]
  >([]);

  useEffect(() => {
    const token = authctx.token;
    console.log(authctx.token);

    if (token) {
      console.log(token);
      const socket = connectSocket(token);

      socket.on("application:created", (application) => {
        console.log("New application created:", application);
      });

      socket.on("application:updated", (application: UpdateApplication) => {
        console.log("Application updated:", application);
        setUpdatedApplications((prev) => {
          const newApplications = [application, ...prev];
          return newApplications.slice(0, 5); // Keep only the latest 5 applications
        });
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [authctx.token]);

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Bell />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          <h1 className="text-xl font-bold ">Notifications</h1>
          {updatedApplications.map((application, index) => (
            <div key={index}>
              <Card className="w-full">
                <CardHeader className="pb-3">
                  <CardTitle>{application.name}</CardTitle>
                  <CardDescription className="text-balance max-w-sm leading-tight">
                    {application.message}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Mysocket;
