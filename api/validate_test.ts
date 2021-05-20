import { hasNameParameter, isValidQueryParameter } from "./validate.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("hasNameParameter", () => {
  const table: [URLSearchParams, boolean][] = [
    [new URLSearchParams({ g: "" }), false],
    [new URLSearchParams("name=fonction&name=xxx"), true],
    [new URLSearchParams({ name: "" }), true],
    [new URLSearchParams({ name: "", q: "test" }), true],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      hasNameParameter(val),
      expected,
      `hasNameParameter(${val}) -> ${expected}`,
    );
  });
});

Deno.test("isValidQueryParameter", () => {
  const table: [URLSearchParams, boolean][] = [
    [new URLSearchParams({ g: "" }), false],
    [new URLSearchParams("name=fonction&name=xxx"), true],
    [new URLSearchParams({ name: "" }), true],
    [new URLSearchParams({ name: "", q: "test" }), false],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isValidQueryParameter(val),
      expected,
      `isValidQueryParameter(${val}) -> ${expected}`,
    );
  });
});
