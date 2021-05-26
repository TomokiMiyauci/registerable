// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import yargs from "https://deno.land/x/yargs@v17.0.1-deno/deno.ts";
import { checkName, defaultOption, Option } from "./mod.ts";

const y = yargs(Deno.args)
  .usage("Usage:\n$0 --allow-net <name> [Options]")
  .options({
    json: {
      alias: "j",
      default: false,
      describe: "Display to JSON format",
      type: "boolean",
    },
    verbose: {
      default: true,
      describe: "Verbose mode",
      type: "boolean",
    },
    registry: {
      alias: "r",
      default: defaultOption.registry,
      describe: "Query to registry",
      choices: defaultOption.registry,
      type: "array",
    },
  })
  .example([
    ["$0 --allow-net <name>", "General usage"],
    [
      "$0 --allow-net <name> -r deno.land -r nest.land",
      "Only specific registry",
    ],
  ])
  .alias("h", "help")
  .alias("v", "version")
  .version()
  .demandCommand(1, 1, "You should set <name>", "You should set <name> only");

const argv: Option & { _: [string] } = (y as any).argv;

if (import.meta.main) {
  checkName(argv._[0], argv);
}
