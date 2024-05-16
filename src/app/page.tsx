import React from "react";
import { encodedHtml } from "@/data/data";
import { decodeBase64ToString } from "@/utils/stringUtils";
import HtmlParser from "@/utils/htmlParser";
import ItemsTablesWrapper from "@/components/ItemsTablesWrapper";
import Calculator from "@/components/Calculator";

const Home: React.FC = () => {
  const parser = HtmlParser(decodeBase64ToString(encodedHtml));
  const [totalA, totalB] = parser.extractTotals();
  const titles = parser.getTitles();
  const tables = parser.getTables();

  return (
    <main className="flex h-screen w-full flex-col">
      <header className="flex h-16 items-center justify-start bg-gray-900 text-white lg:pl-10">
        <h1 className="text-2xl font-bold">Ledger Calculator</h1>
      </header>
      <div className="flex flex-1">
        <div className="flex-col hidden w-72 lg:flex border-r bg-gray-100 p-6">
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
