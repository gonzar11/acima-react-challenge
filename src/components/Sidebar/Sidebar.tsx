import React from "react";
import { HtmlParserInterface } from "@/utils/htmlParser";
import ItemsTable from "@/components/ItemsTable";
import Title from "@/components/Title";

interface SidebarProps {
  htmlParser: HtmlParserInterface;
}

const Sidebar: React.FC<SidebarProps> = ({ htmlParser }) => {
  const titles = htmlParser.getTitles();
  const tables = htmlParser.getTables();
  return (
    <div className="flex-col hidden w-72 lg:flex border-r bg-gray-100 p-6">
      {titles.map((title, index) => (
        <div key={index}>
          <Title text={title.text} style={title.style} />
          <ItemsTable
            head={tables[index].head}
            body={tables[index].body}
            style={tables[index].style}
          />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
