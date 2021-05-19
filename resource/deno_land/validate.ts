// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { ifElse, isLength0, isString, N } from "../../deps.ts";
import {
  gtLength,
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_TRIMABLE,
  inversion,
  isTrimable,
  ltLength,
} from "../shared/mod.ts";
import {
  INVALID_GREATER_THEN_40,
  INVALID_LESS_THEN_3,
  INVALID_SPECIAL_LETTER,
} from "./constants/message.ts";
const RegularLetter = /^[a-z\d_]+$/;

const gt40 = gtLength(40);
const lt3 = ltLength(3);
const isRegularLetter = (val: string) => RegularLetter.test(val);

const table = [[isLength0, INVALID_LENGTH_0], [
  isTrimable,
  INVALID_TRIMABLE,
], [
  lt3,
  INVALID_LESS_THEN_3,
], [
  gt40,
  INVALID_GREATER_THEN_40,
], [
  inversion(isRegularLetter),
  INVALID_SPECIAL_LETTER,
]] as const;

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

export { gt40, isRegularLetter, lt3, validateDenoLand };
