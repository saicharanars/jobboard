"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
interface filterProps{
    filter: string,
    options: string[]
}
const Filters: React.FC<filterProps> = ({ filter, options }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">{filter}</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-2 mx-2">
          {options.map((option, index) => (
            <div
              key={index}
              className="rounded-md border px-4 py-3 font-mono text-sm"
            >
              <Checkbox id={option} />
              <label
                htmlFor={option}
                className="text-sm font-medium ml-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
export default Filters;
