// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { ifElse, isLength0, isString, not } from "../../deps.ts";
import {
  gtLength,
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_TRIMABLE,
  isTrimable,
  ltLength,
} from "../shared/mod.ts";
import {
  INVALID_GREATER_THEN_40,
  INVALID_LESS_THEN_2,
  INVALID_RESERVED_NAME,
  INVALID_SPECIAL_LETTER,
} from "./constants/message.ts";
import { RESERVED } from "./constants/name_list.ts";
const RegularLetter = /^[a-z\d_]+$/;

const gt40 = gtLength(40);
const lt2 = ltLength(2);
const isReservedName = (val: string) => RESERVED.includes(val);
const isRegularLetter = (val: string) => RegularLetter.test(val);

const table = [
  [isLength0, INVALID_LENGTH_0],
  [isTrimable, INVALID_TRIMABLE],
  [lt2, INVALID_LESS_THEN_2],
  [gt40, INVALID_GREATER_THEN_40],
  [isReservedName, INVALID_RESERVED_NAME],
  [not(isRegularLetter), INVALID_SPECIAL_LETTER],
] as const;

const validateNestLand = (val: unknown): string | undefined =>
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

export { gt40, isRegularLetter, lt2, validateNestLand };
