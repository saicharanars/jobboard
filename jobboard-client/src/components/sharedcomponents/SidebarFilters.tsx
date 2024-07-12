import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SidebarFilters = ({ filterParams, setFilterParams }) => {
  const [category, setCategory] = useState(filterParams.category || "all");
  const [location, setLocation] = useState(filterParams.location || "all");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterParams({
      ...filterParams,
      category: category === "all" ? undefined : category,
      location: location === "all" ? undefined : location,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold ">Filters</h1>
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Select onValueChange={setLocation} value={location}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            <SelectItem value="hyderabad">Hyderabad</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-900 text-white">Apply Filters</Button>
    </form>
  );
};
export default SidebarFilters