import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "@/components/Calculator";
import useCalculator from "@/hooks/useCalculator";

jest.mock("@/hooks/useCalculator");

const mockUseCalculator = useCalculator as jest.MockedFunction<
  typeof useCalculator
>;

describe("Calculator component", () => {
  const defaultProps = {
    itemsPriceTotalA: 10,
    itemsPriceTotalB: 20,
    children: <div>Test Children</div>,
  };

  beforeEach(() => {
    mockUseCalculator.mockReturnValue({
      input: "",
      setInput: jest.fn(),
      result: "",
      error: "",
      calculate: jest.fn(),
    });
  });

  it("renders the component with initial state", () => {
    render(<Calculator {...defaultProps} />);

    expect(screen.getByTestId("children-container")).toHaveTextContent(
      "Test Children"
    );
    expect(screen.getByTestId("input")).toHaveValue("");
    expect(screen.queryByTestId("result")).toHaveTextContent("");
  });

  it("handles user input and update the input field", () => {
    const setInput = jest.fn();
    mockUseCalculator.mockReturnValueOnce({
      input: "",
      setInput,
      result: "",
      error: "",
      calculate: jest.fn(),
    });

    render(<Calculator {...defaultProps} />);

    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "A+B" } });

    expect(setInput).toHaveBeenCalledWith("A+B");
  });

  it("handles form submission and calculate the result", () => {
    const calculate = jest.fn();
    mockUseCalculator.mockReturnValueOnce({
      input: "A+B",
      setInput: jest.fn(),
      result: "",
      error: "",
      calculate,
    });

    render(<Calculator {...defaultProps} />);

    const button = screen.getByTestId("calculate-button");
    fireEvent.click(button);

    expect(calculate).toHaveBeenCalled();
  });

  it("displays the calculated result", () => {
    mockUseCalculator.mockReturnValueOnce({
      input: "A+B",
      setInput: jest.fn(),
      result: "30",
      error: "",
      calculate: jest.fn(),
    });

    render(<Calculator {...defaultProps} />);

    expect(screen.getByTestId("result")).toHaveTextContent("$ 30");
  });

  it("displays an error message for invalid input", () => {
    mockUseCalculator.mockReturnValueOnce({
      input: "A+B",
      setInput: jest.fn(),
      result: "",
      error: "Invalid input",
      calculate: jest.fn(),
    });

    render(<Calculator {...defaultProps} />);

    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Invalid input"
    );
  });
});
