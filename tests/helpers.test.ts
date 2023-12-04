import { describe, expect, it } from "vitest";
import { getPeriod, getRandomItemFromArray } from "../src/utils/helpers";

describe("getPeriod", () => {
  it("should return the correct period for a positive frequency", () => {
    // Arrange
    const testFrequency = 1;
    const expectedPeriod = 6.283185307179586;

    // Act
    const result = getPeriod(testFrequency);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return the correct period for a negative frequency", () => {
    // Arrange
    const testFrequency = -1;
    const expectedPeriod = 6.283185307179586;

    // Act
    const result = getPeriod(testFrequency);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return the correct period for a zero frequency", () => {
    // Arrange
    const testFrequency = 0;
    const expectedPeriod = Infinity;

    // Act
    const result = getPeriod(testFrequency);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return the correct period for a decimal frequency", () => {
    // Arrange
    const testFrequency = 0.5;
    const expectedPeriod = 12.566370614359172;

    // Act
    const result = getPeriod(testFrequency);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return the correct period for a large frequency", () => {
    // Arrange
    const testFrequency = 100;
    const expectedPeriod = 0.06283185307179587;

    // Act
    const result = getPeriod(testFrequency);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return the correct period for a small frequency", () => {
    // Arrange
    const testFrequency = 0.0001;
    const expectedPeriod = 62831.85307179586;

    // Act
    const result = getPeriod(testFrequency);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return the correct period for a negative decimal frequency", () => {
    // Arrange
    const testFrequency = -0.5;
    const expectedPeriod = 12.566370614359172;

    // Act
    const result = getPeriod(testFrequency);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return the correct period for a negative large frequency", () => {
    // Arrange
    const testFrequency = -100;
    const expectedPeriod = 0.06283185307179587;

    // Act
    const result = getPeriod(testFrequency);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return the correct period for a negative small frequency", () => {
    // Arrange
    const testFrequency = -0.0001;
    const expectedPeriod = 62831.85307179586;

    // Act
    const result = getPeriod(testFrequency);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return NaN for a NaN frequency", () => {
    // Arrange
    const testFrequency = NaN;
    const expectedPeriod = NaN;

    // Act
    const result = getPeriod(testFrequency);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return NaN for a non-number frequency", () => {
    // Arrange
    const testFrequency = "test";
    const expectedPeriod = NaN;

    // Act
    const result = getPeriod(testFrequency as unknown as number);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return NaN for an undefined frequency", () => {
    // Arrange
    const testFrequency = undefined;
    const expectedPeriod = NaN;

    // Act
    const result = getPeriod(testFrequency as unknown as number);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return NaN for an object frequency", () => {
    // Arrange
    const testFrequency = {};
    const expectedPeriod = NaN;

    // Act
    const result = getPeriod(testFrequency as unknown as number);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return Infinity for an array frequency", () => {
    // Arrange
    const testFrequency: unknown = [];
    const expectedPeriod = Infinity;

    // Act
    const result = getPeriod(testFrequency as unknown as number);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return Infinity for a null frequency", () => {
    // Arrange
    const testFrequency = null;
    const expectedPeriod = Infinity;

    // Act
    const result = getPeriod(testFrequency as unknown as number);

    // Assert
    expect(result).toBe(expectedPeriod);
  });

  it("should return Infinity for an empty frequency", () => {
    // Arrange
    const testFrequency = "";
    const expectedPeriod = Infinity;

    // Act
    const result = getPeriod(testFrequency as unknown as number);

    // Assert
    expect(result).toBe(expectedPeriod);
  });
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
