"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface CalculatorProps {
  itemsPriceTotalA: number;
  itemsPriceTotalB: number;
}

const ALLOWED_OPERATIONS = ["+", "-", "*", "/", "%"];

const Calculator: React.FC<CalculatorProps> = ({
  itemsPriceTotalA,
  itemsPriceTotalB,
}) => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    const escapedOperations = ALLOWED_OPERATIONS.map((op) => `\\${op}`).join(
      ""
    );
    const regex = new RegExp(
      `^([AB])(\\s*([${escapedOperations}])\\s*([AB]))?$`
    );
    const match = input.trim().match(regex);

    if (match) {
      let expression: string;
      let calculatedResult: number;

      if (match[3] && match[4]) {
        const firstOperand =
          match[1] === "A" ? itemsPriceTotalA : itemsPriceTotalB;
        const operator = match[3];
        const secondOperand =
          match[4] === "A" ? itemsPriceTotalA : itemsPriceTotalB;

        expression = `${firstOperand} ${operator} ${secondOperand}`;
      } else {
        expression = (
          match[1] === "A" ? itemsPriceTotalA : itemsPriceTotalB
        ).toString();
      }

      try {
        const calculate = new Function("return " + expression);
        calculatedResult = calculate();
        setResult(`${calculatedResult}`);
        setError("");
      } catch (error) {
        setError("Error in calculation.");
        setResult("");
      }
    } else {
      setError(
        'Invalid input format. Please enter "A", "B", or use A or B followed by an operator (+, -, *, /, %) and A or B (e.g., A+B, B-A).'
      );
      setResult("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-6xl font-bold">{`$ ${result}`}</div>
      <input
        className={`mt-4 w-full max-w-md rounded-md border px-4 py-2 text-lg focus:outline-none focus:ring-2 ${
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
        className="mt-4 rounded-md bg-gray-900 px-6 py-2 text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        onClick={handleCalculate}
      >
        Calculate
      </button>
      {error && <div className="mt-2 text-lg text-red-600">{error}</div>}
    </div>
  );
};

export default Calculator;
