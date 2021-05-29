// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { checkName } from "./check_name.ts";
import { assertEquals } from "./dev_deps.ts";
import { ApiResponse } from "./types/mod.ts";
Deno.test("checkName", async () => {
  const results: ApiResponse = {
    result: { "deno.land": false, "nest.land": false, npm: false },
    hasError: true,
    error: {
      "deno.land": "Name length must be greater than zero",
      "nest.land": "Name length must be greater than zero",
      npm: "Name length must be greater than zero",
    },
    errorRegistry: ["deno.land", "nest.land", "npm"],
    name: "",
  };
  assertEquals(await checkName(""), results);
});

Deno.test("checkName", async () => {
  const results: ApiResponse = {
    result: { "deno.land": true, "nest.land": true, npm: true },
    hasError: false,
    error: {},
    errorRegistry: [],
    name: "xxxxxxxxyyyyyyyyzzzzzz",
  };
  assertEquals(await checkName("xxxxxxxxyyyyyyyyzzzzzz"), results);
});
