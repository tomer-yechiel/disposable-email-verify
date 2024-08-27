import { expect, test } from "vitest";
import { isEmailValid } from "./index.js";

test("isEmailValid", async () => {
  const isValid = await isEmailValid("tomer.yechiel@gmail.com");
  expect(isValid).toBe(true);
});

test("isEmailValid", async () => {
  const isValid = await isEmailValid("mer53715@tccho.com");
  expect(isValid).toBe(false);
});

test("multiple calls to isEmailValid", async () => {
  const res = await Promise.all([
    isEmailValid("mer53715@tccho.com"),
    isEmailValid("mer53715@tccho.com"),
  ]);
  expect(res).toEqual([false, false]);
});
