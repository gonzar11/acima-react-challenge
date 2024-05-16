import { parseStyle, getClassNames } from "./styleUtils";

describe("parseStyle", () => {
  it("should parse a simple style string", () => {
    const styleString = "color: red; font-size: 16px;";
    const expected = {
      color: "red",
      fontSize: "16px",
    };
    expect(parseStyle(styleString)).toEqual(expected);
  });

  it("should ignore invalid styles", () => {
    const styleString = "color: red; invalidStyle";
    const expected = {
      color: "red",
    };
    expect(parseStyle(styleString)).toEqual(expected);
  });

  it("should handle empty string gracefully", () => {
    const styleString = "";
    expect(parseStyle(styleString)).toBeUndefined();
  });

  it("should handle undefined gracefully", () => {
    const styleString = undefined;
    expect(parseStyle(styleString)).toBeUndefined();
  });

  it("should trim spaces", () => {
    const styleString = " color : blue; ";
    const expected = {
      color: "blue",
    };
    expect(parseStyle(styleString)).toEqual(expected);
  });
});

describe("getClassNames", () => {
  it("should return the provided classes when style is undefined", () => {
    const classes = "default-class";
    const style = undefined;
    const expected = "default-class";
    expect(getClassNames(classes, style)).toEqual(expected);
  });

  it("should return an empty string when style is defined", () => {
    const classes = "default-class";
    const style = { color: "red" };
    const expected = "";
    expect(getClassNames(classes, style)).toEqual(expected);
  });

  it("should handle the case when style is not undefined or empty object", () => {
    const classes = "default-class";
    const style = { fontSize: "16px" };
    const expected = "";
    expect(getClassNames(classes, style)).toEqual(expected);
  });

  it("should handle classes being an empty string", () => {
    const classes = "";
    const style = undefined;
    const expected = "";
    expect(getClassNames(classes, style)).toEqual(expected);
  });
});
