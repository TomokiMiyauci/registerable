// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
const includeFactory = (array: string[]) =>
  (val: string): boolean => array.includes(val);

export { includeFactory };
