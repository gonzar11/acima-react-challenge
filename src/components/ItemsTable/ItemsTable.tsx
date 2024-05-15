import React from "react";
import { parseStyle } from "@/utils/styleUtils";
import { TableData } from "@/utils/htmlParser";

interface ItemsTableProps extends TableData {}

const ItemsTable: React.FC<ItemsTableProps> = ({ head, body, style }) => (
  <table style={{ ...parseStyle(style) }}>
    <thead>
      {head.map((row, rowIndex) => (
        <tr key={`head-row-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <th
              key={`head-cell-${cellIndex}`}
              style={{ ...parseStyle(cell.style), padding: "8px" }}
            >
              {cell.content}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody>
      {body.map((row, rowIndex) => (
        <tr key={`body-row-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <td
              key={`body-cell-${cellIndex}`}
              style={{ ...parseStyle(cell.style) }}
            >
              {cell.content}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default ItemsTable;
