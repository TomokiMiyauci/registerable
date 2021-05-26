// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { checkName, defaultOption } from "../mod";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { description, name } from "../package.json";

const USAGE = `${name}
${description}

Usage:
  ${name} <name> [Options]`;

const main = async () => {
  const args = await yargs(hideBin(process.argv)).usage(USAGE).options({
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
      [`${name} <name>`, "General usage"],
      [
        `${name} <name> -r deno.land -r nest.land`,
        "Only specific registry",
      ],
    ])
    .alias("h", "help")
    .alias("v", "version")
    .version()
    .demandCommand(1, 1, "You must set <name>", "You must set <name> only")
    .argv;

  checkName(String(args._), args);
};

main();
