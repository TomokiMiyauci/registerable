import {
  AnyFn,
  gt,
  ifElse,
  isFunction,
  isString,
  length,
  N,
  startsWith,
  trim,
} from "../../deps.ts";

const SPECIAL_CHARACTERS = /[~'!()*]/;
const BLACKLIST = ["node_modules", "favicon.ico"];
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

const gt214 = (val: string): boolean => gt(length(val), 214);
const isLength0 = (val: string): boolean => N(length(val));
const isLowerCase = (val: string): boolean => val.toLowerCase() === val;
const isNotLowerCase = (val: string): boolean => N(isLowerCase(val));
const isStartWithDot = startsWith(".");
const isStartWith_ = startsWith("_");
const hasSpecialCharacter = (val: string) => SPECIAL_CHARACTERS.test(val);
const isTrimable = (val: string) => trim(val) !== val;
const isBlacklistName = (val: string) => BLACKLIST.includes(val);

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
  [isNotLowerCase, INVALID_LETTER_CASE],
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
  isLength0,
  isLowerCase,
  isTrimable,
  validateNpm,
};
