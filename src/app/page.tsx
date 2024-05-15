import React from "react";
import { encodedHtml } from "@/data/data";
import { decodeBase64ToString } from "@/utils/stringUtils";
import HtmlParser from "@/utils/htmlParser";

interface HtmlContentComponentProps {
  encodedHtml: string;
}

const HtmlContentComponent: React.FC<HtmlContentComponentProps> = ({
  encodedHtml,
}) => {
  const parser = HtmlParser(decodeBase64ToString(encodedHtml));

  const bodyContent = parser.extractBodyContent();
  console.log(parser.extractTotals()); // You had this console.log storing into a constant which isn't used.

  const createMarkup = () => ({ __html: bodyContent });

  return <div dangerouslySetInnerHTML={createMarkup()} />;
};

const Home: React.FC = () => (
  <main className="flex h-screen w-full flex-col">
    <header className="flex h-16 items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Ledger Calculator</h1>
    </header>
    <div className="flex flex-1">
      <div className="w-64 border-r bg-gray-100 p-6">
        <HtmlContentComponent encodedHtml={encodedHtml} />
      </div>

      <div className="flex-1 p-8">
        <h1>Main content here</h1>
      </div>
    </div>
  </main>
);

export default Home;
