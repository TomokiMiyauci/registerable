import { constructSearchParams, stringify } from "./stringify.ts";
import { Registry } from "../types/mod.ts";
import { BASE_URL, VERSION } from "./_constants.ts";

import { assertEquals } from "../dev_deps.ts";
Deno.test("stringify", () => {
  const table: [{ name: string; registry: Registry[] }, string][] = [[{
    name: "fonction",
    registry: [],
  }, `${new URL(VERSION, BASE_URL)}?name=fonction`], [
    {
      name: "fonction",
      registry: ["deno.land", "nest.land"],
    },
    `${new URL(
      VERSION,
      BASE_URL,
    )}?name=fonction&registry=deno.land&registry=nest.land`,
  ]];

  table.forEach(([val, expected]) => {
    assertEquals(stringify(val), expected);
  });
});
Deno.test("constructSearchParams", () => {
  const table: [{ name: string; registry: Registry[] }, string][] = [[
    { name: "hoge", registry: [] },
    "name=hoge",
  ], [
    { name: "hoge", registry: ["npm"] },
    "name=hoge&registry=npm",
  ], [
    { name: "hoge", registry: ["npm", "nest.land", "deno.land"] },
    "name=hoge&registry=npm&registry=nest.land&registry=deno.land",
  ], [
    { name: "hoge", registry: ["nest.land", "npm"] },
    "name=hoge&registry=nest.land&registry=npm",
  ]];

  table.forEach(([val, expected]) => {
    assertEquals(constructSearchParams(val).toString(), expected);
  });
});
