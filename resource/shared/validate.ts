// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { trim } from "../../deps.ts";

const isTrimable = (val: string) => trim(val) !== val;

export { isTrimable };
