import { gt40, isRegularLetter, lt3, validateDenoLand } from "./validate.ts";
import { assertEquals } from "../../dev_deps.ts";
import {
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_TRIMABLE,
} from "../shared/message.ts";
import {
  INVALID_GREATER_THEN_40,
  INVALID_LESS_THEN_3,
  INVALID_SPECIAL_LETTER,
} from "./constants/message.ts";
const lengthOf = (val: number): string => new Array(val).fill("a").join("");

const emptyString = "";

Deno.test("gt40", () => {
  const string39 = lengthOf(39);
  const string40 = lengthOf(40);
  const string41 = lengthOf(41);

  const table: [string, boolean][] = [
    [emptyString, false],
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
  const string1 = lengthOf(1);

  const table: [string, boolean][] = [
    [emptyString, false],
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

Deno.test("lt3", () => {
  const string1 = lengthOf(1);
  const string2 = lengthOf(2);
  const string3 = lengthOf(3);
  const string4 = lengthOf(4);

  const table: [string, boolean][] = [
    [emptyString, true],
    [
      string1,
      true,
    ],
    [
      string2,
      true,
    ],
    [string3, false],
    [string4, false],
    [
      new Array(1000).fill("a").join(""),
      false,
    ],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(lt3(val), expected, `lt3(${val}) -> ${expected}`);
  });
});

Deno.test("validateDenoLand", () => {
  const table: [unknown, string | undefined][] = [
    [undefined as unknown, INVALID_NOT_STRING],
    [emptyString, INVALID_LENGTH_0],
    [" hello", INVALID_TRIMABLE],
    ["aa", INVALID_LESS_THEN_3],
    ["a", INVALID_LESS_THEN_3],
    [lengthOf(41), INVALID_GREATER_THEN_40],
    [lengthOf(40), undefined],
    ["Ab", INVALID_LESS_THEN_3],
    ["Abc", INVALID_SPECIAL_LETTER],
    ["?hogehoge", INVALID_SPECIAL_LETTER],
    ["fonction", undefined],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      validateDenoLand(val),
      expected,
      `validateDenoLand(${val}) -> ${expected}`,
    );
  });
});
