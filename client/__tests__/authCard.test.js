/* eslint-disable testing-library/render-result-naming-convention */
// authUtils.test.js
import { getAuthCardTitle, statusRenderer } from "../src/utils/helper";

describe("getAuthCardTitle", () => {
  it("should capitalize the first letter and replace hyphens with spaces", () => {
    const input = "example-title";
    const output = getAuthCardTitle(input);
    expect(output).toBe("Example title");
  });

  it("should work with single words", () => {
    const input = "example";
    const output = getAuthCardTitle(input);
    expect(output).toBe("Example");
  });

  it("should handle an empty string", () => {
    const input = "";
    const output = getAuthCardTitle(input);
    expect(output).toBe("");
  });

  it("should handle strings without hyphens", () => {
    const input = "exampleTitle";
    const output = getAuthCardTitle(input);
    expect(output).toBe("ExampleTitle");
  });
});

describe("statusRenderer", () => {
  it('should return "yellow" for "PENDING" status', () => {
    const status = "PENDING";
    const color = statusRenderer(status);
    expect(color).toBe("yellow");
  });

  it('should return "red" for "CANCELLED" status', () => {
    const status = "CANCELLED";
    const color = statusRenderer(status);
    expect(color).toBe("red");
  });

  it('should return "green" for "ACCEPTED" status', () => {
    const status = "ACCEPTED";
    const color = statusRenderer(status);
    expect(color).toBe("green");
  });

  it('should return "yellow" for an unknown status', () => {
    const status = "UNKNOWN";
    const color = statusRenderer(status);
    expect(color).toBe("yellow");
  });

  it('should return "yellow" when status is not provided', () => {
    const color = statusRenderer();
    expect(color).toBe("yellow");
  });
});
