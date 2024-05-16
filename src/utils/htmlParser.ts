import { parse, HTMLElement } from "node-html-parser";
import {parseStyle} from "./styleUtils";

function validateHtmlStructure(root: HTMLElement) {
  const h2Elements = root.querySelectorAll("h2");

  if (h2Elements.length !== 2) {
    throw new Error("The HTML should contain exactly two h2 elements.");
  }

  for (let i = 0; i < h2Elements.length; i++) {
    const h2Element = h2Elements[i];
    const nextElement = h2Element.nextElementSibling;

    if (!nextElement || nextElement.tagName !== "TABLE") {
      throw new Error(
        `The h2 element at position ${
          i + 1
        } is not immediately followed by a table.`
      );
    }

    const table = nextElement;
    const headerRows = table.querySelectorAll("thead tr");
    const bodyRows = table.querySelectorAll("tbody tr");

    for (let j = 0; j < headerRows.length; j++) {
      const headerCells = headerRows[j].querySelectorAll("th");
      if (headerCells.length !== 2) {
        throw new Error("Each header row must have exactly two cells.");
      }
    }

    for (let k = 0; k < bodyRows.length; k++) {
      const bodyCells = bodyRows[k].querySelectorAll("td");
      if (bodyCells.length !== 2) {
        throw new Error("Each body row must have exactly two cells.");
      }
    }
  }
}

function parseHeaderRows(rows: HTMLElement[]): ContentBlock[][] {
  return rows.map((row) => {
    const cells = row.querySelectorAll("th");
    if (cells.length !== 2) {
      throw new Error("Each header row must have exactly two cells");
    }
    return cells.map(cell => ({
      content: cell.textContent,
      style: parseStyle(cell.getAttribute("style")),
    }));
  });
}

function parseBodyRows(rows: HTMLElement[]): { itemId: ContentBlock, itemPrice: ContentBlock }[] {
  return rows.map((row) => {
    const cells = row.querySelectorAll("td");

    return {
      itemId: {
        content: cells[0].textContent,
        style: parseStyle(cells[0].getAttribute("style"))
      },
      itemPrice: {
        content: cells[1].textContent,
        style: parseStyle(cells[1].getAttribute("style")),
      }
    };
  });
}

export interface HtmlParserInterface {
  extractBodyContent: () => string;
  extractTotals: () => number[];
  getTitles: () => ContentBlock[];
  getTables: () => TableData[];
}

export interface ContentBlock {
  content: string;
  style?: React.CSSProperties;
}

interface TableItemRow {
  itemId: ContentBlock;
  itemPrice: ContentBlock;
}

export interface TableData {
  head: ContentBlock[][];
  body: TableItemRow[];
  headStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}

function HtmlParser(html: string): HtmlParserInterface {
  const root = parse(html);

  validateHtmlStructure(root);

  return {
    extractBodyContent: function (): string {
      const body = root.querySelector("body");
      return body ? body.innerHTML : "";
    },
    extractTotals: function (): number[] {
      const tables = root.querySelectorAll("table");
      const totals = tables.map((table): number => {
        const rows = table.querySelectorAll("tbody tr");
        const total = rows.reduce((sum, row): number => {
          const priceCell = row.querySelectorAll("td")[1];
          const price = parseFloat(priceCell ? priceCell.textContent : "0");
          return sum + price;
        }, 0);
        return total;
      });
      return totals;
    },
    getTitles: function (): ContentBlock[] {
      const h2Elements = root.querySelectorAll("h2");
      const titles = h2Elements.map((h2) => ({
        content: h2.textContent,
        style: parseStyle(h2.getAttribute("style"))
      }));
      return titles;
    },
    getTables: function (): TableData[] {
      const tables = root.querySelectorAll("table");

      const tableData = tables.map((table) => {
        const thead = table.querySelector("thead");
        const tbody = table.querySelector("tbody") || table;
        const headRows = thead
          ? parseHeaderRows(thead.querySelectorAll("tr"))
          : [];
        const bodyRows = parseBodyRows(tbody.querySelectorAll("tr"));

        return {
          head: headRows,
          body: bodyRows,
          headStyle: parseStyle(thead?.getAttribute("style")),
          bodyStyle: parseStyle(tbody.getAttribute("style")),
          style: parseStyle(table.getAttribute("style"))
        };
      });

      return tableData;
    },
  };
}

export default HtmlParser;
