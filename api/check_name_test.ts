// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { assertEquals } from "../dev_deps.ts";
import { RegisterableResult } from "../types/mod.ts";
import { REGISTRIES } from "../constants/registry.ts";
import { BASE_URL, VERSION } from "./_constants.ts";
const ENTPOINT = new URL(`api/${VERSION}`, BASE_URL).toString();

Deno.test("check-name", async () => {
  const table: [
    string,
    number,
    boolean,
    RegisterableResult<any> | { error: string },
  ][] = [
    [
      ENTPOINT,
      403,
      false,
      {
        error: "Name parameter is necessary",
      },
    ],
    [
      `${ENTPOINT}?name=fonction`,
      200,
      true,
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
      `${ENTPOINT}?name=fonction&hoge=huga`,
      403,
      false,
      {
        error: "Invalid query parameter (hoge)",
      },
    ],
    [
      `${ENTPOINT}?name=fonction&hoge=huga&test=test`,
      403,
      false,
      {
        error: "Invalid query parameter (hoge, test)",
      },
    ],
    [
      `${ENTPOINT}?hoge=huga&test=test`,
      403,
      false,
      {
        error: "Invalid query parameter (hoge, test)",
      },
    ],
    [
      `${ENTPOINT}?name=fonction&registry=nest.land`,
      200,
      true,
      {
        error: {},
        errorRegistry: [],
        hasError: false,
        name: "fonction",
        result: {
          "nest.land": false,
        },
      },
    ],
    [
      `${ENTPOINT}?name=fonction&registry=nest.land&registry=deno.land`,
      200,
      true,
      {
        error: {},
        errorRegistry: [],
        hasError: false,
        name: "fonction",
        result: {
          "nest.land": false,
          "deno.land": false,
        },
      },
    ],
    [
      `${ENTPOINT}?name=fonction&registry=hoge.land`,
      403,
      false,
      {
        error: `Invalid registry member (hoge.land) [valid: ${
          REGISTRIES.join(
            ", ",
          )
        }]`,
      },
    ],
    [
      `${ENTPOINT}?name=fonction&registry=hoge.land&registry=huga.land`,
      403,
      false,
      {
        error: `Invalid registry member (hoge.land, huga.land) [valid: ${
          REGISTRIES.join(
            ", ",
          )
        }]`,
      },
    ],
    [
      `${ENTPOINT}?name=fonction&registry`,
      403,
      false,
      {
        error: `Invalid registry member () [valid: ${REGISTRIES.join(", ")}]`,
      },
    ],
    [
      `${ENTPOINT}?name=fonction&registry=`,
      403,
      false,
      {
        error: `Invalid registry member () [valid: ${REGISTRIES.join(", ")}]`,
      },
    ],
  ];

  await Promise.all(
    table.map(async ([url, status, ok, expected]) => {
      const res = await fetch(url);
      assertEquals(res.status, status);
      assertEquals(res.ok, ok);
      const result = (await res.json()) as RegisterableResult;
      assertEquals(result, expected);
    }),
  );
});
