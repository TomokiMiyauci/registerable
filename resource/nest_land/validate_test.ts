import { validateNestLand } from "./validate.ts";
import { assertEquals } from "../../dev_deps.ts";
import {
  INVALID_GREATER_THEN_40,
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_SPECIAL_LETTER,
  INVALID_TRIMABLE,
} from "../shared/message.ts";
import {
  INVALID_LESS_THEN_2,
  INVALID_RESERVED_NAME,
} from "./constants/message.ts";
const lengthOf = (val: number): string => new Array(val).fill("a").join("");

Deno.test("validateNestLand", () => {
  const table: [unknown, string | undefined][] = [
    [undefined as unknown, INVALID_NOT_STRING],
    ["", INVALID_LENGTH_0],
    [" hello", INVALID_TRIMABLE],
    ["a", INVALID_LESS_THEN_2],
    [lengthOf(41), INVALID_GREATER_THEN_40],
    [lengthOf(40), undefined],
    ["A", INVALID_LESS_THEN_2],
    ["Abc", INVALID_SPECIAL_LETTER],
    ["@@", INVALID_SPECIAL_LETTER],
    ["fff fff", INVALID_SPECIAL_LETTER],
    ["?hogehoge", INVALID_SPECIAL_LETTER],
    ["console", INVALID_RESERVED_NAME],
    ["fonction", undefined],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      validateNestLand(val),
      expected,
      `validateNestLand(${val}) -> ${expected}`,
    );
  });
});
