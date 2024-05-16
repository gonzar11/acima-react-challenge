import React from "react";
import { encodedHtml } from "@/data/data";
import { decodeBase64ToString } from "@/utils/stringUtils";
import HtmlParser from "@/utils/htmlParser";
import ItemsTablesWrapper from "@/components/ItemsTablesWrapper";
import Calculator from "@/components/Calculator";
import Header from "@/components/Header";

const Home: React.FC = () => {
  const parser = HtmlParser(decodeBase64ToString(encodedHtml));
  const [totalA, totalB] = parser.extractTotals();
  const titles = parser.getTitles();
  const tables = parser.getTables();

  return (
    <main className="flex h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1">
        <div
          data-testid="items-tables-wrapper-container"
          className="flex-col hidden w-72 lg:flex border-r bg-gray-100 p-6"
        >
          <ItemsTablesWrapper titles={titles} tables={tables} />
        </div>
        <div className="relative flex w-full flex-grow overflow-x-hidden bg-white flex-col items-center justify-center">
          <Calculator itemsPriceTotalA={totalA} itemsPriceTotalB={totalB}>
            <ItemsTablesWrapper titles={titles} tables={tables} />
          </Calculator>
        </div>
      </div>
    </main>
  );
};

export default Home;
