// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { checkNameWithLog } from "./cli/mod.ts";
import { cliDeno } from "./cli/deno.ts";
import { checkName } from "./check_name.ts";

if (import.meta.main) {
  const argv = cliDeno();
  checkNameWithLog(argv._[0], argv);
}

export { checkName };
