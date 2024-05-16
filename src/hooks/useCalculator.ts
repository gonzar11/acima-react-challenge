import { useState } from "react";

export interface UseCalculatorInput {
  itemsPriceTotalA: number;
  itemsPriceTotalB: number;
}

export interface UseCalculatorOutput {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  result: string;
  error: string;
  calculate: () => void;
}

const ALLOWED_OPERATIONS = ["+", "-", "*", "/", "%"];

const useCalculator = ({
  itemsPriceTotalA,
  itemsPriceTotalB,
}: UseCalculatorInput): UseCalculatorOutput => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const calculate = () => {
    const trimmedInput = input.trim().toUpperCase();
    const escapedOperations = ALLOWED_OPERATIONS.map((op) => `\\${op}`).join(
      ""
    );
    const regex = new RegExp(
      `^([AB])(\\s*([${escapedOperations}])\\s*([AB]))?$`
    );
    const match = trimmedInput.match(regex);

    if (match) {
      let expression: string;
      let calculatedResult: number;

      if (match[3] && match[4]) {
        const firstOperand =
          match[1] === "A" ? itemsPriceTotalA : itemsPriceTotalB;
        const operator = match[3];
        const secondOperand =
          match[4] === "A" ? itemsPriceTotalA : itemsPriceTotalB;

          if (operator === '/' && secondOperand === 0) {
            setError("Error in calculation: Division by zero.");
            setResult("");
            return;
          }

        expression = `${firstOperand} ${operator} ${secondOperand}`;
      } else {
        expression = (
          match[1] === "A" ? itemsPriceTotalA : itemsPriceTotalB
        ).toString();
      }

      try {
        const calculateFunction = new Function("return " + expression);
        calculatedResult = calculateFunction();
        setResult(calculatedResult.toFixed(2));
        setError("");
      } catch (error) {
        setError("Error in calculation.");
        setResult("");
      }
    } else {
      setError(
        `Invalid input format. Please enter "A", "B", or use A or B followed by an operator (${ALLOWED_OPERATIONS.join(
          ", "
        )}) and A or B (e.g., A+B, B-A).`
      );
      setResult("");
    }
  };

  return { input, setInput, result, error, calculate };
};

export default useCalculator;
