import React from "react";
import { encodedHtml } from "@/data/data";
import { decodeBase64ToString } from "@/utils/stringUtils";
import HtmlParser from "@/utils/htmlParser";
import Sidebar from "@/components/Sidebar";
import Calculator from "@/components/Calculator";

const Home: React.FC = () => {
  const parser = HtmlParser(decodeBase64ToString(encodedHtml));
  const [totalA, totalB] = parser.extractTotals();

  return (
    <main className="flex h-screen w-full flex-col">
      <header className="flex h-16 items-center justify-center bg-gray-900 text-white">
        <h1 className="text-2xl font-bold">Ledger Calculator</h1>
      </header>
      <div className="flex flex-1">
        <Sidebar htmlParser={parser} />
        <div className="flex-1 p-8">
          <Calculator itemsPriceTotalA={totalA} itemsPriceTotalB={totalB} />
        </div>
      </div>
    </main>
  );
};

export default Home;
