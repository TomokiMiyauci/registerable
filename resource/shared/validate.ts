// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { trim } from "../../deps.ts";
import { gtLength } from "./composite.ts";

const isTrimable = (val: string) => trim(val) !== val;
const gt40 = gtLength(40);

const RegularLetter = /^[a-z\d_]+$/;
const isRegularLetter = (val: string) => RegularLetter.test(val);

export { gt40, isRegularLetter, isTrimable };
