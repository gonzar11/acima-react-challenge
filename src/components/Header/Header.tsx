import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex h-16 items-center justify-start bg-gray-900 text-white lg:pl-10">
      <h1 className="text-2xl font-bold">Ledger Calculator</h1>
    </header>
  );
};

export default Header;
