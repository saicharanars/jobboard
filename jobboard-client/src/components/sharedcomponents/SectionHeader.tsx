import React, { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  actionElement: ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionElement,
}) => {
  return (
    <div className="flex flex-row items-center justify-between  w-full h-20 px-2  md:px-8">
      <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
      <div>{actionElement}</div>
    </div>
  );
};

export default SectionHeader;
