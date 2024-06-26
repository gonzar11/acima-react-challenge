"use client";

import React, { ChangeEvent, FormEvent } from "react";
import useCalculator from "@/hooks/useCalculator";

interface CalculatorProps {
  itemsPriceTotalA: number;
  itemsPriceTotalB: number;
  children: React.ReactNode;
}

const Calculator: React.FC<CalculatorProps> = ({
  itemsPriceTotalA,
  itemsPriceTotalB,
  children,
}) => {
  const { input, setInput, result, error, calculate } = useCalculator({
    itemsPriceTotalA,
    itemsPriceTotalB,
  });

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    calculate();
  };

  return (
    <div data-testid="calculator" className="w-full max-w-96 mx-auto">
      <div
        data-testid="children-container"
        className="flex-col block w-full max-w-96 lg:hidden p-6"
      >
        {children}
      </div>
      <div className="flex flex-col items-center justify-center text-center w-full max-w-96">
        <div data-testid="result" className="text-6xl font-bold">
          {result ? `$ ${result}` : ""}
        </div>
        <input
          data-testid="input"
          className={`mt-4 w-full rounded-md border px-4 py-2 text-lg focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-gray-500"
          }`}
          placeholder="Enter operation (e.g., A+B, A, B)"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
        <button
          data-testid="calculate-button"
          className="mt-4 w-full rounded-md bg-gray-900 px-6 py-2 text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={handleCalculate}
        >
          Calculate
        </button>
        {error && (
          <div data-testid="error-message" className="mt-2 w-full text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
