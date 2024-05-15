import { parse, HTMLElement } from "node-html-parser";

function validateHtmlStructure(root: HTMLElement ) {
  const h2Elements = root.querySelectorAll('h2');

  if (h2Elements.length !== 2) {
      throw new Error('The HTML should contain exactly two h2 elements.');
  }

  for (let i = 0; i < h2Elements.length; i++) {
      const h2Element = h2Elements[i];
      const nextElement = h2Element.nextElementSibling;

      if (!nextElement || nextElement.tagName !== 'TABLE') {
          throw new Error(`The h2 element at position ${i+1} is not immediately followed by a table.`);
      }
  }
}

interface HtmlParserInterface {
  extractBodyContent: () => string;
  extractTotals: () => number[];
}

function HtmlParser(html: string): HtmlParserInterface {
  const root = parse(html);

  validateHtmlStructure(root);

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
