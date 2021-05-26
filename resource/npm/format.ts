// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.

const punctuationRegex = /[.\-_]/g;
const normalize = (val: string): string =>
  val.replace(punctuationRegex, "").toLowerCase();

export { normalize };