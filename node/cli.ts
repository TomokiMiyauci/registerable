// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { checkName } from "../mod.ts";
import { NN } from "../deps.ts";

const cli = () => {
  const name = process.argv[2];
  if (NN(name)) {
    checkName(name);
  } else {
    console.error("NAME is necessary\n");
    console.log("USAGE:");
    console.info("  registerable [NAME] [OPTION]");
  }
};

cli();
