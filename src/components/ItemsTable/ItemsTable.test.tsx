import React from "react";
import { render, screen } from "@testing-library/react";
import ItemsTable from "./ItemsTable";
import { ContentBlock, TableData } from "@/utils/htmlParser";

const mockHead: ContentBlock[][] = [
  [{ content: "ID", style: { fontWeight: "bold" } }, { content: "Price" }],
];
const mockBody = [
  {
    itemId: { content: "123", style: { color: "red" } },
    itemPrice: { content: "$10", style: { color: "green" } },
  },
];

const mockData: TableData = {
  head: mockHead,
  body: mockBody,
  headStyle: { backgroundColor: "lightgray" },
  bodyStyle: { backgroundColor: "white" },
  style: { border: "1px solid black" },
};

describe("ItemsTable", () => {
  it("renders table headers correctly", () => {
    render(<ItemsTable {...mockData} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
  });

  it("renders table body correctly", () => {
    render(<ItemsTable {...mockData} />);

    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
  });

  it("applies styles correctly", () => {
    const { container } = render(<ItemsTable {...mockData} />);

    const table = container.querySelector("table");
    const thead = container.querySelector("thead");
    const tbody = container.querySelector("tbody");
    const tdItemId = screen.getByText("123").closest("td");
    const tdItemPrice = screen.getByText("$10").closest("td");

    expect(table).toHaveStyle("border: 1px solid black");
    expect(thead).toHaveStyle("background-color: lightgray");
    expect(tbody).toHaveStyle("background-color: white");
    expect(tdItemId).toHaveStyle("color: red");
    expect(tdItemPrice).toHaveStyle("color: green");
  });
});
