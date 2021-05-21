// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import {
  AnyFn,
  gtLength,
  ifElse,
  isFunction,
  isLength0,
  isString,
  not,
  startsWith,
} from "../../deps.ts";
import { includeFactory } from "../shared/composite.ts";

const SPECIAL_CHARACTERS = /[~'!()*]/;
const BLACKLIST = ["node_modules", "favicon.ico"];
import {
  INVALID_BLACKLIST,
  INVALID_LETTER_CASE,
  INVALID_SPACIAL_CHAR,
  INVALID_START_WITH_,
  INVALID_START_WITH_DOT,
} from "./constants/message.ts";
import {
  INVALID_LENGTH_0,
  INVALID_NOT_STRING,
  INVALID_TRIMABLE,
  isTrimable,
} from "../shared/mod.ts";

const gt214 = gtLength(214);
const isLowerCase = (val: string): boolean => val.toLowerCase() === val;
const isStartWithDot = startsWith(".");
const isStartWith_ = startsWith("_");
const hasSpecialCharacter = (val: string) => SPECIAL_CHARACTERS.test(val);
const isBlacklistName = includeFactory(BLACKLIST);

const table = [
  [
    isLength0,
    INVALID_LENGTH_0,
  ],
  [isTrimable, INVALID_TRIMABLE],
  [
    isStartWithDot,
    INVALID_START_WITH_DOT,
  ],
  [
    isStartWith_,
    INVALID_START_WITH_,
  ],
  [not(isLowerCase), INVALID_LETTER_CASE],
  [hasSpecialCharacter, INVALID_SPACIAL_CHAR],
  [isBlacklistName, (val: string) => `${val} ${INVALID_BLACKLIST}`],
] as const;

const validateNpm = (val: unknown): string | undefined =>
  ifElse(
    isString(val),
    () => {
      for (const [fn, message] of table) {
        if (fn(val as string)) {
          return ifElse(isFunction(message), () =>
            (message as AnyFn<any, string>)(val), message);
        }
      }

      return;
    },
    INVALID_NOT_STRING,
  );

export {
  gt214,
  hasSpecialCharacter,
  isBlacklistName,
  isLowerCase,
  isTrimable,
  validateNpm,
};
