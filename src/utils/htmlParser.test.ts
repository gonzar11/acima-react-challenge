import HtmlParser, { HtmlParserInterface } from "./htmlParser";

describe("HtmlParser", () => {
  let parser: HtmlParserInterface;

  const validHtml = `
    <html>
      <body>
        <h2 style="color: red;">Title 1</h2>
        <table style="border: 1px solid black;">
          <thead>
            <tr><th style="font-weight: bold;">Header 1</th><th>Header 2</th></tr>
          </thead>
          <tbody>
            <tr><td>ID 1</td><td style="font-size: 12px;">10.5</td></tr>
            <tr><td>ID 2</td><td>20.75</td></tr>
          </tbody>
        </table>
        <h2>Title 2</h2>
        <table>
          <tbody>
            <tr><td>ID 3</td><td>30.0</td></tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  beforeAll(() => {
    parser = HtmlParser(validHtml);
  });

  it("should extract totals", () => {
    const totals = parser.extractTotals();
    expect(totals).toEqual([31.25, 30.0]);
  });

  it("should get titles with styles", () => {
    const titles = parser.getTitles();
    expect(titles).toEqual([
      { content: "Title 1", style: { color: "red" } },
      { content: "Title 2", style: undefined },
    ]);
  });

  it("should get table data with styles", () => {
    const tables = parser.getTables();
    expect(tables).toEqual([
      {
        head: [
          [
            { content: "Header 1", style: { fontWeight: "bold" } },
            { content: "Header 2", style: undefined },
          ],
        ],
        body: [
          {
            itemId: { content: "ID 1", style: undefined },
            itemPrice: { content: "10.5", style: { fontSize: "12px" } },
          },
          {
            itemId: { content: "ID 2", style: undefined },
            itemPrice: { content: "20.75", style: undefined },
          },
        ],
        style: { border: "1px solid black" },
      },
      {
        head: [],
        body: [
          {
            itemId: { content: "ID 3", style: undefined },
            itemPrice: { content: "30.0", style: undefined },
          },
        ],
        style: undefined,
      },
    ]);
  });

  describe("when HTML structure is invalid", () => {
    it("should throw error if HTML does not contain exactly two h2 elements", () => {
      const invalidHtml = `
        <html>
          <body>
            <h2>Title 1</h2>
            <p>Some text</p>
          </body>
        </html>
      `;
      expect(() => HtmlParser(invalidHtml)).toThrow(
        "The HTML should contain exactly two h2 elements."
      );
    });

    it("should throw error if an h2 element is not followed by a table", () => {
      const invalidHtml = `
        <html>
          <body>
            <h2>Title 1</h2>
            <p>Some text</p>
            <h2>Title 2</h2>
            <table></table>
          </body>
        </html>
      `;
      expect(() => HtmlParser(invalidHtml)).toThrow(
        "The h2 element at position 1 is not immediately followed by a table."
      );
    });

    it("should throw error if a table header row does not have exactly two cells", () => {
      const invalidHtml = `
        <html>
          <body>
            <h2>Title 1</h2>
            <table>
              <thead>
                <tr><th>Header 1</th></tr>
              </thead>
              <tbody>
                <tr><td>ID 1</td><td>10.5</td></tr>
              </tbody>
            </table>
            <h2>Title 2</h2>
            <table>
              <tbody>
                <tr><td>ID 3</td><td>30.0</td></tr>
              </tbody>
            </table>
          </body>
        </html>
      `;
      expect(() => HtmlParser(invalidHtml)).toThrow(
        "Each header row must have exactly two cells"
      );
    });

    it("should throw error if a table body row does not have exactly two cells", () => {
      const invalidHtml = `
        <html>
          <body>
            <h2>Title 1</h2>
            <table>
              <thead>
                <tr><th>Header 1</th><th>Header 2</th></tr>
              </thead>
              <tbody>
                <tr><td>ID 1</td></tr>
              </tbody>
            </table>
            <h2>Title 2</h2>
            <table>
              <tbody>
                <tr><td>ID 3</td><td>30.0</td></tr>
              </tbody>
            </table>
          </body>
        </html>
      `;
      expect(() => HtmlParser(invalidHtml)).toThrow(
        "Each body row must have exactly two cells"
      );
    });
  });
});
