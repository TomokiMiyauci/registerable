import { isTrimable } from "./validate.ts";
import { assertEquals } from "../../dev_deps.ts";

Deno.test("isTrimable", () => {
  const table: [string, boolean][] = [
    ["", false],
    ["hello", false],
    [" hello", true],
    ["hello ", true],
    [" hello ", true],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isTrimable(val),
      expected,
      `isTrimable(${val}) -> ${expected}`,
    );
  });
});
