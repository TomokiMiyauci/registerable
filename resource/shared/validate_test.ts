import { gt40, isRegularLetter, isTrimable } from "./validate.ts";
import { assertEquals } from "../../dev_deps.ts";

const lengthOf = (val: number): string => new Array(val).fill("a").join("");

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

Deno.test("gt40", () => {
  const string39 = lengthOf(39);
  const string40 = lengthOf(40);
  const string41 = lengthOf(41);

  const table: [string, boolean][] = [
    ["", false],
    [
      string39,
      false,
    ],
    [
      string40,
      false,
    ],
    [string41, true],
    [
      new Array(1000).fill("a").join(""),
      true,
    ],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(gt40(val), expected, `gt40(${val}) -> ${expected}`);
  });
});

Deno.test("isRegularLetter", () => {
  const table: [string, boolean][] = [
    ["", false],
    ["A", false],
    [
      "a",
      true,
    ],
    [
      "aaaaaaaaaa",
      true,
    ],
    [
      "0",
      true,
    ],
    [
      "_",
      true,
    ],
    [
      "0abcd_",
      true,
    ],
    [
      "_A",
      false,
    ],
    [
      "_Aabc09ABC",
      false,
    ],
    [
      "___fonction0123456789",
      true,
    ],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isRegularLetter(val),
      expected,
      `isRegularLetter(${val}) -> ${expected}`,
    );
  });
});
