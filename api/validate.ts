import { AnyFn, N } from "../deps.ts";
import { INVALID_ARGS_MEMBER } from "../constants/message.ts";
import { inversion } from "../resource/shared/utils.ts";
const NAME = "name";
const queryParameters = [NAME];

const hasNameParameter = (searchParams: URLSearchParams): boolean =>
  searchParams.has(NAME);

const isValidQueryParameter = (searchParams: URLSearchParams): boolean => {
  for (const [key] of searchParams) {
    if (N(queryParameters.includes(key))) {
      return false;
    }
  }
  return true;
};

const validateTable = [
  [
    inversion(hasNameParameter),
    "name parameter is necessary",
  ],
  [inversion(isValidQueryParameter), INVALID_ARGS_MEMBER],
] as const;

const validate = <
  T extends readonly [
    readonly [
      AnyFn<any, boolean>,
      string,
    ],
    readonly [
      AnyFn<any, boolean>,
      string,
    ],
  ],
>(
  table: T,
) =>
  <U>(val: U): string | true => {
    for (const [fn, message] of table) {
      if (fn(val)) {
        return message;
      }
    }

    return true;
  };

const validateQueryParameter = validate(validateTable);
export { hasNameParameter, isValidQueryParameter, validateQueryParameter };
