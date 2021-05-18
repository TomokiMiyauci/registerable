// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { LANGUAGES } from "../constants/language.ts";
import { N } from "../deps.ts";
const validateLanguage = (val: unknown[]) =>
  val.every((lang) => LANGUAGES.includes(lang as any));

const invalidLanguages = (val: unknown[]) =>
  val.filter((lang) => N(LANGUAGES.includes(lang as any)));

export { invalidLanguages, validateLanguage };
