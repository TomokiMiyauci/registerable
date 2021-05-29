// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { query2Direct, uniqFlatten } from "./_utils.ts";
import { assertEquals } from "../dev_deps.ts";
import { QUERY_MAP } from "../constants/query.ts";

Deno.test("uniqFlatten", () => {
  const table: [unknown[], unknown[]][] = [
    [[], []],
    [[1, 2, 3], [1, 2, 3]],
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4], [1, 2, 3, 4]],
    [[1, [2, 1, [2, 1, 2, 1, [1, 2]]]], [1, 2]],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      uniqFlatten(val),
      expected,
      `query2Direct(${val}) -> ${expected}`,
    );
  });
});

Deno.test("query2Direct", async () => {
  const table: [unknown[], string, Record<PropertyKey, unknown>][] = [
    [[], "fonction", {
      error: {},
      errorRegistry: [],
      hasError: false,
      name: "fonction",
      result: {},
    }],
    [[QUERY_MAP["deno.land"]], "fonction", {
      error: {},
      errorRegistry: [],
      hasError: false,
      name: "fonction",
      result: {
        "deno.land": false,
      },
    }],
    [[QUERY_MAP["deno.land"], QUERY_MAP["nest.land"]], "fonction", {
      error: {},
      errorRegistry: [],
      hasError: false,
      name: "fonction",
      result: {
        "deno.land": false,
        "nest.land": false,
      },
    }],
    [
      [QUERY_MAP["deno.land"], QUERY_MAP["nest.land"], QUERY_MAP.npm],
      "fonction",
      {
        error: {},
        errorRegistry: [],
        hasError: false,
        name: "fonction",
        result: {
          "deno.land": false,
          "nest.land": false,
          npm: false,
        },
      },
    ],
    [
      [QUERY_MAP["deno.land"], QUERY_MAP["nest.land"], QUERY_MAP.npm],
      "xxxxxxxxxxxyyyyyyyyyzzzzzzzzzz",
      {
        error: {},
        errorRegistry: [],
        hasError: false,
        name: "xxxxxxxxxxxyyyyyyyyyzzzzzzzzzz",
        result: {
          "deno.land": true,
          "nest.land": true,
          npm: true,
        },
      },
    ],
    [
      [QUERY_MAP["deno.land"], QUERY_MAP["nest.land"]],
      "@",
      {
        error: {
          "deno.land": "Name length must be greater equal than 3",
          "nest.land": "Name length must be greater equal than 2",
        },
        errorRegistry: ["deno.land", "nest.land"],
        hasError: true,
        name: "@",
        result: {
          "deno.land": false,
          "nest.land": false,
        },
      },
    ],
  ];

  await Promise.all(table.map(async ([queries, name, expected]) => {
    assertEquals(
      await query2Direct(queries, name),
      expected,
      `query2Direct(${queries}, ${name}) -> ${expected}`,
    );
  }));
});
