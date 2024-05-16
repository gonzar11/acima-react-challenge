import { render, screen } from "@testing-library/react";
import Title from "@/components/Title";

describe("Title component", () => {
  test("renders with provided text", () => {
    render(<Title text="Dynamic Title" />);
    const titleElement = screen.getByText("Dynamic Title");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders with default classes when no style prop is provided", () => {
    render(<Title text="Test Title" />);
    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toHaveClass(
      "pl-2 text-lg font-bold leading-tight mb-2"
    );
  });

  test("renders with provided style prop and without default classes", () => {
    const customStyle = { color: "red", fontSize: "20px" };
    render(<Title text="Styled Title" style={customStyle} />);
    const titleElement = screen.getByText("Styled Title");
    expect(titleElement).toHaveStyle("color: red; font-size: 20px");
    expect(titleElement).not.toHaveClass(
      "pl-2 text-lg font-bold leading-tight mb-2"
    );
  });
});
