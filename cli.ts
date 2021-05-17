// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { checkName } from "./mod.ts";
import { first, NN } from "./deps.ts";
import { error, info } from "https://deno.land/std@0.96.0/log/mod.ts";

const cli = () => {
  const name = first(Deno.args);
  if (NN(name)) {
    checkName(name);
  } else {
    error("NAME is necessary\n");
    console.log("USAGE:");
    info("  nameable [NAME] [OPTION]");
  }
};

if (import.meta.main) {
  cli();
}
