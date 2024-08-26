import { test, expect } from "vitest";
import { isEmailValid } from "./index.js";

test("isEmailValid", async () => {
  const isValid = await isEmailValid("tomer.yechiel@gmail.com");
  expect(isValid).toBe(true);
});

test("isEmailValid", async () => {
  const isValid = await isEmailValid("mer53715@tccho.com");
  expect(isValid).toBe(false);
})
