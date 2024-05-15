import { parse } from "node-html-parser";

interface HtmlParserInterface {
  extractBodyContent: () => string;
  extractTotals: () => number[];
}

function HtmlParser(html: string): HtmlParserInterface {
  const root = parse(html); // Parse the HTML into a document-like structure.

  return {
    extractBodyContent: function(): string {
      const body = root.querySelector("body");
      return body ? body.innerHTML : '';
    },
    extractTotals: function(): number[] {
      const tables = root.querySelectorAll("table");
      const totals = tables.map((table): number => {
        const rows = table.querySelectorAll("tbody tr");
        const total = rows.reduce((sum, row): number => {
          const priceCell = row.querySelectorAll("td")[1];
          const price = parseFloat(priceCell ? priceCell.textContent : '0');
          return sum + price;
        }, 0);
        return total;
      });
      return totals;
    },
    // More methods can be added here
  };
}

export default HtmlParser;
