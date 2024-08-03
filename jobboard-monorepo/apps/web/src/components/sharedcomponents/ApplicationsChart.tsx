"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface JobApplicationStatusProps {
  shortlisted: number;
  totalApplications: number;
}

const JobApplicationStatus: React.FC<JobApplicationStatusProps> = ({
  shortlisted,
  totalApplications,
}) => {
  const shortlistedPercentage = (shortlisted / totalApplications) * 100 || 0;

  const data = [
    {
      name: "Shortlisted",
      applications: shortlisted,
      fill: "#22c55e", // green-500
    },
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="p-2">
        <CardTitle className="text-center">Job Application Status</CardTitle>
        <CardDescription className="text-center">
          Shortlisted Applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              barSize={20}
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, totalApplications]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background
                dataKey="applications"
                cornerRadius={30}
                fill="#22c55e"
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-4xl font-bold">
              {shortlistedPercentage.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">Shortlisted</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm text-center">
        <div className="flex items-center gap-2 font-medium text-center">
          <TrendingUp className="h-4 w-4" />
          {shortlisted} out of {totalApplications} applications shortlisted
        </div>
        <div className="text-muted-foreground text-center">
          {totalApplications - shortlisted} applications not shortlisted
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobApplicationStatus;
