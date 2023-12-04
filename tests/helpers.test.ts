import { describe, expect, it, test } from "vitest";
import { getPeriod, getRandomItemFromArray } from "../src/utils/helpers";

test("getPeriod(1)", () => {
  expect(getPeriod(1)).toBe(6.283185307179586);
});

test("getPeriod(2)", () => {
  expect(getPeriod(2)).toBe(3.141592653589793); // pi
});

test("getPeriod(3)", () => {
  expect(getPeriod(3)).toBe(2.0943951023931953);
});

describe("getRandomItemFromArray", () => {
  it("should return undefined for an empty array", () => {
    // Arrange
    const emptyArray: number[] = [];

    // Act
    const result = getRandomItemFromArray(emptyArray);

    // Assert
    expect(result).toBeUndefined();
  });

  it("should return a valid item for a non-empty array", () => {
    // Arrange
    const testArray: number[] = [1, 2, 3, 4, 5];

    // Act
    const result = getRandomItemFromArray(testArray);

    // Assert
    expect(testArray).toContain(result!); // We use 'result!' to assert that it's not undefined
  });
});
