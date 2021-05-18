import {
  gt214,
  hasSpecialCharacter,
  isBlacklistName,
  isLength0,
  isLowerCase,
  isTrimable,
  validateNpm,
} from "./validate.ts";
import { assertEquals } from "../../dev_deps.ts";
import {
  INVALID_BLACKLIST,
  INVALID_LENGTH_0,
  INVALID_LETTER_CASE,
  INVALID_NOT_STRING,
  INVALID_SPACIAL_CHAR,
  INVALID_START_WITH_,
  INVALID_START_WITH_DOT,
  INVALID_TRIMABLE,
} from "./constants/message.ts";
const lengthOf = (val: number): string => new Array(val).fill("a").join("");

const emptyString = "";
const string213 = lengthOf(213);
const string214 = lengthOf(214);
const string215 = lengthOf(215);

Deno.test("gt214", () => {
  const table: [string, boolean][] = [
    [emptyString, false],
    [
      string213,
      false,
    ],
    [
      string214,
      false,
    ],
    [string215, true],
    [
      new Array(1000).fill("a").join(""),
      true,
    ],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(gt214(val), expected, `gt214(${val}) -> ${expected}`);
  });
});

Deno.test("isLength0", () => {
  const table: [string, boolean][] = [[emptyString, true], ["a", false], [
    string213,
    false,
  ]];

  table.forEach(([val, expected]) => {
    assertEquals(isLength0(val), expected, `isLength0(${val}) -> ${expected}`);
  });
});

Deno.test("isLowerCase", () => {
  const table: [string, boolean][] = [
    [emptyString, true],
    ["a", true],
    [
      "hoge",
      true,
    ],
    ["Hello", false],
    ["heLlo", false],
    ["hello Everyone", false],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isLowerCase(val),
      expected,
      `isLowerCase(${val}) -> ${expected}`,
    );
  });
});

Deno.test("hasSpecialCharacter", () => {
  const table: [string, boolean][] = [
    [emptyString, false],
    ["a", false],
    [
      "hoge",
      false,
    ],
    [
      "~",
      true,
    ],
    [
      "'",
      true,
    ],
    [
      "!",
      true,
    ],
    [
      "(",
      true,
    ],
    [
      ")",
      true,
    ],
    [
      "*",
      true,
    ],
    [
      "~'!()*",
      true,
    ],
    [
      "~'!()*xxxxxxx",
      true,
    ],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      hasSpecialCharacter(val),
      expected,
      `hasSpecialCharacter(${val}) -> ${expected}`,
    );
  });
});

Deno.test("isTrimable", () => {
  const table: [string, boolean][] = [
    [emptyString, false],
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

Deno.test("isBlacklistName", () => {
  const table: [string, boolean][] = [
    [emptyString, false],
    ["hello", false],
    ["node_modules", true],
    ["favicon.ico", true],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isBlacklistName(val),
      expected,
      `isBlacklistName(${val}) -> ${expected}`,
    );
  });
});

Deno.test("validateNpm", () => {
  const table: [unknown, string | undefined][] = [
    [undefined as unknown, INVALID_NOT_STRING],
    [emptyString, INVALID_LENGTH_0],
    ["A", INVALID_LETTER_CASE],
    [" hello", INVALID_TRIMABLE],
    ["~", INVALID_SPACIAL_CHAR],
    ["_hello", INVALID_START_WITH_],
    [".hello", INVALID_START_WITH_DOT],
    ["fonction", undefined],
    ["fonction~", INVALID_SPACIAL_CHAR],
    ["node_modules", `node_modules ${INVALID_BLACKLIST}`],
    ["favicon.ico", `favicon.ico ${INVALID_BLACKLIST}`],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      validateNpm(val),
      expected,
      `validateNpm(${val}) -> ${expected}`,
    );
  });
});
