import {
  and,
  identity,
  ifElse,
  isEmpty,
  isLength0,
  isString,
  isUndefined,
  keys,
  N,
  props,
} from "../deps.ts";
import { ParsedParameters } from "./parse.ts";
import { REGISTRIES } from "../constants/registry.ts";
const getInvalidKeys = (val: ParsedParameters): string[] =>
  keys(val).filter((key) => N(["name", "registry"].includes(key)));

const hasInvalidKey = (val: ParsedParameters): [boolean, string] => {
  const invalidKeys = getInvalidKeys(val);
  const isTrue = isLength0(invalidKeys);
  return [
    isTrue,
    ifElse(
      isTrue,
      "",
      () => `Invalid query parameter (${invalidKeys.join(", ")})`,
    ),
  ];
};

const validateNoNameKey = (
  val: unknown,
): [boolean, string] => {
  const result = and(isString(val), () => N(isEmpty(val)));
  return [result, ifElse(result, "", "Name parameter is necessary")];
};

const validateRegistryMember = (
  val: undefined | string[],
): [boolean, string] => {
  if (isUndefined(val)) return [true, ""];
  const result = val.filter((v) => N(REGISTRIES.includes(v as any)));
  const isTrue = isLength0(result);
  return [
    isTrue,
    ifElse(
      isTrue,
      "",
      `Invalid registry member (${result.join(", ")}) [valid: ${
        REGISTRIES.join(", ")
      }]`,
    ),
  ];
};

const pick = <T extends string>(key: T) =>
  (val: ParsedParameters) => props(key, val);

const validateTable = [
  [identity, hasInvalidKey],
  [pick("name"), validateNoNameKey],
  [pick("registry"), validateRegistryMember],
] as const;

const validateQueryParameter = (val: ParsedParameters): [boolean, string] => {
  for (const [adaptor, fn] of validateTable) {
    const [result, err] = fn(adaptor(val as any));
    if (N(result)) {
      return [result, err];
    }
  }

  return [true, ""];
};

export {
  getInvalidKeys,
  hasInvalidKey,
  validateNoNameKey,
  validateQueryParameter,
  validateRegistryMember,
};
