import { expect, test } from "vitest";
import { getPeriod } from "../src/utils/helpers";

test("getPeriod(1)", () => {
  expect(getPeriod(1)).toBe(6.283185307179586);
});

test("getPeriod(2)", () => {
  expect(getPeriod(2)).toBe(3.141592653589793); // pi
});

test("getPeriod(3)", () => {
  expect(getPeriod(3)).toBe(2.0943951023931953);
});
