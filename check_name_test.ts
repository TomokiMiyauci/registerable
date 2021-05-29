// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { checkName } from "./check_name.ts";
import { assertEquals } from "./dev_deps.ts";
import { Option } from "./types/mod.ts";
import { RegisterableResult } from "./types/mod.ts";

Deno.test("checkName", async () => {
  const table: [
    string,
    Partial<Option>,
    RegisterableResult<any>,
  ][] = [[
    "",
    {},
    {
      result: { "deno.land": false, "nest.land": false, npm: false },
      hasError: true,
      error: {
        "deno.land": "Name length must be greater than zero",
        "nest.land": "Name length must be greater than zero",
        npm: "Name length must be greater than zero",
      },
      errorRegistry: ["deno.land", "nest.land", "npm"],
      name: "",
    },
  ], [
    "xxxxxxxxyyyyyyyyzzzzzz",
    {},
    {
      result: { "deno.land": true, "nest.land": true, npm: true },
      hasError: false,
      error: {},
      errorRegistry: [],
      name: "xxxxxxxxyyyyyyyyzzzzzz",
    },
  ], ["xxxxxxxxyyyyyyyyzzzzzz", {
    mode: "universal",
  }, {
    result: { "deno.land": true, "nest.land": true, npm: true },
    hasError: false,
    error: {},
    errorRegistry: [],
    name: "xxxxxxxxyyyyyyyyzzzzzz",
  }], ["xxxxxxxxyyyyyyyyzzzzzz", {
    registry: ["deno.land", "nest.land"],
  }, {
    result: { "deno.land": true, "nest.land": true },
    hasError: false,
    error: {},
    errorRegistry: [],
    name: "xxxxxxxxyyyyyyyyzzzzzz",
  }], ["xxxxxxxxyyyyyyyyzzzzzz", {
    registry: ["deno.land"],
  }, {
    result: { "deno.land": true },
    hasError: false,
    error: {},
    errorRegistry: [],
    name: "xxxxxxxxyyyyyyyyzzzzzz",
  }], ["xxxxxxxxyyyyyyyyzzzzzz", {
    registry: ["deno.land", "deno.land", "deno.land", "deno.land"],
  }, {
    result: { "deno.land": true },
    hasError: false,
    error: {},
    errorRegistry: [],
    name: "xxxxxxxxyyyyyyyyzzzzzz",
  }], ["fonction", {
    registry: ["deno.land", "npm"],
  }, {
    result: { "deno.land": false, npm: false },
    hasError: false,
    error: {},
    errorRegistry: [],
    name: "fonction",
  }], ["-", {
    registry: ["deno.land", "npm"],
  }, {
    result: { "deno.land": false, npm: false },
    hasError: true,
    error: {
      "deno.land": "Name length must be greater equal than 3",
    },
    errorRegistry: ["deno.land"],
    name: "-",
  }]];

  await Promise.all(table.map(async ([name, option, expected]) => {
    assertEquals(
      await checkName(name, option),
      expected,
      `checkName(${name}, ${option}) -> ${expected}`,
    );
  }));
});
