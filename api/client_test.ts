// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { assertEquals } from "../dev_deps.ts";
import { client } from "./client.ts";

Deno.test("client", async () => {
  const table: [
    ...Parameters<typeof client>,
    any,
  ][] = [
    ["fonction", { registry: ["deno.land"] }, {
      error: {},
      errorRegistry: [],
      hasError: false,
      name: "fonction",
      result: {
        "deno.land": false,
      },
    }],
    ["@@@", { registry: ["deno.land", "nest.land"] }, {
      error: {
        "deno.land": "Name contains only the characters a-z, 0-9 and _",
        "nest.land": "Name contains only the characters a-z, 0-9 and _",
      },
      errorRegistry: ["deno.land", "nest.land"],
      hasError: true,
      name: "@@@",
      result: {
        "deno.land": false,
        "nest.land": false,
      },
    }],
  ];

  await Promise.all(table.map(async ([name, option, expected]) => {
    assertEquals(await client(name, option), expected);
  }));
});
