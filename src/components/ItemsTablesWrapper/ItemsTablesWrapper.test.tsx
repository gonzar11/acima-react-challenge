import { render } from "@testing-library/react";
import ItemsTablesWrapper from "@/components/ItemsTablesWrapper";
import { ContentBlock, TableData } from "@/utils/htmlParser";
import ItemsTable from "@/components/ItemsTable";
import Title from "@/components/Title";
import { cleanup } from "@testing-library/react";

jest.mock("@/components/ItemsTable", () =>
  jest.fn(() => <div>Mock ItemsTable</div>)
);

jest.mock("@/components/Title", () => jest.fn(() => <div>Mock Title</div>));

describe("ItemsTablesWrapper", () => {
  const mockTitles: ContentBlock[] = [
    { content: "Title 1", style: { color: "red" } },
    { content: "Title 2", style: { color: "blue" } },
  ];

  const mockTables: TableData[] = [
    {
      head: [[{ content: "Header 1", style: { fontWeight: "bold" } }]],
      body: [
        {
          itemId: { content: "Item 1", style: { color: "green" } },
          itemPrice: { content: "Price 1", style: { color: "black" } },
        },
      ],
      style: { border: "1px solid black" },
    },
    {
      head: [[{ content: "Header 2", style: { fontWeight: "bold" } }]],
      body: [
        {
          itemId: { content: "Item 2", style: { color: "green" } },
          itemPrice: { content: "Price 2", style: { color: "black" } },
        },
      ],
      style: { border: "1px solid black" },
    },
  ];

  beforeEach(() => {
    (Title as jest.Mock).mockClear();
    (ItemsTable as jest.Mock).mockClear();
  });

  afterEach(cleanup);

  test("renders the correct number of titles and tables", () => {
    render(<ItemsTablesWrapper titles={mockTitles} tables={mockTables} />);

    expect(Title).toHaveBeenCalledTimes(mockTitles.length);
    expect(ItemsTable).toHaveBeenCalledTimes(mockTables.length);
  });

  test("renders titles with correct content and styles", () => {
    render(<ItemsTablesWrapper titles={mockTitles} tables={mockTables} />);

    mockTitles.forEach((title, index) => {
      expect(Title).toHaveBeenNthCalledWith(
        index + 1,
        { text: title.content, style: title.style },
        {}
      );
    });
  });

  test("renders tables with correct props", () => {
    render(<ItemsTablesWrapper titles={mockTitles} tables={mockTables} />);

    mockTables.forEach((table, index) => {
      expect(ItemsTable).toHaveBeenNthCalledWith(
        index + 1,
        { head: table.head, body: table.body, style: table.style },
        {}
      );
    });
  });
});
