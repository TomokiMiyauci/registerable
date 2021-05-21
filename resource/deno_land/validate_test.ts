import { validateDenoLand } from "./validate.ts";
import { assertEquals } from "../../dev_deps.ts";
import {
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_SPECIAL_LETTER,
  INVALID_TRIMABLE,
} from "../shared/message.ts";
import {
  INVALID_GREATER_THEN_40,
  INVALID_LESS_THEN_3,
} from "./constants/message.ts";
const lengthOf = (val: number): string => new Array(val).fill("a").join("");

Deno.test("validateDenoLand", () => {
  const table: [unknown, string | undefined][] = [
    [undefined as unknown, INVALID_NOT_STRING],
    ["", INVALID_LENGTH_0],
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
