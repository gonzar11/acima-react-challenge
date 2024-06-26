import React from "react";
import { TableData } from "@/utils/htmlParser";
import { getClassNames } from "@/utils/styleUtils";

interface ItemsTableProps extends TableData {}

const ItemsTable: React.FC<ItemsTableProps> = ({
  head,
  body,
  style,
  headStyle,
  bodyStyle,
}) => {
  const tableClasses = "mb-8 w-full";
  const theadCellClasses = "p-2 text-left font-semibold text-gray-800";
  const tbodyClasses =
    "&>*:nth-child(even)]:bg-gray-50 [&>*:nth-child(odd)]:bg-white [&>*]:border-b";
  return (
    <table className={getClassNames(tableClasses, style)} style={style}>
      <thead style={headStyle}>
        {head.map((row, rowIndex) => (
          <tr key={`head-row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <th
                key={`head-cell-${cellIndex}`}
                className={getClassNames(theadCellClasses, cell.style)}
                style={cell.style}
              >
                {cell.content}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        className={getClassNames(tbodyClasses, bodyStyle)}
        style={bodyStyle}
      >
        {body.map((tableItemRow, rowIndex) => (
          <tr key={`body-row-${rowIndex}`}>
            {Object.entries(tableItemRow).map(([key, cell]) => (
              <td key={key} style={cell.style}>
                {key === "itemPrice" ? "$ " : ""}
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemsTable;
