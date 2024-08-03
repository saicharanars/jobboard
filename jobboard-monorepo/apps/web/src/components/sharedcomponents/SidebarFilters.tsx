import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterParams } from "./Browsejobs";

// Define the props type for the SidebarFilters component
interface SidebarFiltersProps {
  filterParams: FilterParams;
  setFilterParams: (params: FilterParams) => void;
}
const categories = [
  "python",
  "java",
  "Sales",
  "Design",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human resources",
];

const locations = [
  "Hyderabad",
  "Chennai",
  "Delhi",
  "Bangalore",
  "Mumbai",
  "Ahmedabad",
  "Kolkata",
  "Gurgaon",
  "Mohali",
  "Navi Mumbai",
];

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  filterParams,
  setFilterParams,
}) => {
  const [category, setCategory] = useState(filterParams.category || "all");
  const [location, setLocation] = useState(filterParams.location || "all");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFilterParams({
      ...filterParams,
      category: category === "all" ? undefined : category,
      location: location === "all" ? undefined : location,
      // Ensure sortdate is preserved if it's part of the filterParams
      sortdate: filterParams.sortdate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Filters</h1>
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
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
            {locations.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-900 text-white"
      >
        Apply Filters
      </Button>
    </form>
  );
};

export default SidebarFilters;
