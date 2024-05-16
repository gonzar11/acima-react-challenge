import React, { useState } from "react";
import { ContentBlock, TableData } from "@/utils/htmlParser";
import ItemsTable from "@/components/ItemsTable";
import Title from "@/components/Title";

interface ItemsTablesWrapperProps {
  titles: ContentBlock[];
  tables: TableData[];
}

const ItemsTablesWrapper: React.FC<ItemsTablesWrapperProps> = ({
  titles,
  tables,
}) => {
  return (
    <>
      {titles.map((title, index) => (
        <div key={index}>
          <Title text={title.content} style={title.style} />
          <ItemsTable
            head={tables[index].head}
            body={tables[index].body}
            style={tables[index].style}
          />
        </div>
      ))}
    </>
  );
};

export default ItemsTablesWrapper;