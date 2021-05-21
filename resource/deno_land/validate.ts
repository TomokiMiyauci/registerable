// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { ifElse, isLength0, isString, ltLength, not } from "../../deps.ts";
import {
  gt40,
  INVALID_GREATER_THEN_40,
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_SPECIAL_LETTER,
  INVALID_TRIMABLE,
  isRegularLetter,
  isTrimable,
} from "../shared/mod.ts";
import { INVALID_LESS_THEN_3 } from "./constants/message.ts";

const lt3 = ltLength(3);

const table = [
  [isLength0, INVALID_LENGTH_0],
  [isTrimable, INVALID_TRIMABLE],
  [lt3, INVALID_LESS_THEN_3],
  [gt40, INVALID_GREATER_THEN_40],
  [not(isRegularLetter), INVALID_SPECIAL_LETTER],
] as const;

const validateDenoLand = (val: unknown): string | undefined =>
  ifElse(
    isString(val),
    () => {
      for (const [fn, message] of table) {
        if (fn(val as string)) {
          return message;
        }
      }

      return;
    },
    INVALID_NOT_STRING,
  );

export { isRegularLetter, lt3, validateDenoLand };
