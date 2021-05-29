// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { punctuationRegex } from "./_constants.ts";
import { lowerCase } from "../deps.ts";

const normalize = (val: string): string =>
  lowerCase(val.replace(punctuationRegex, ""));

const isEqualNormalizedName = (name: string) =>
  (packageName: string): boolean => normalize(packageName) === name;

export { isEqualNormalizedName, normalize };
