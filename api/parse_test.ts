import { parse, ParsedParameters } from "./parse.ts";
import { assertEquals } from "../dev_deps.ts";
const baseUrl = new URL("https://test.com/check-name");

Deno.test("parse", () => {
  const table: [URL, ParsedParameters][] = [
    [new URL(`${baseUrl.toString()}`), {
      name: undefined,
      registry: undefined,
    }],
    [new URL(`${baseUrl.toString()}?name=hoge`), {
      name: "hoge",
      registry: undefined,
    }],
    [new URL(`${baseUrl.toString()}?name=hoge&registry`), {
      name: "hoge",
      registry: [""],
    }],
    [new URL(`${baseUrl.toString()}?name=hoge&registry=`), {
      name: "hoge",
      registry: [""],
    }],
    [new URL(`${baseUrl.toString()}?registry=nest.land`), {
      name: undefined,
      registry: ["nest.land"],
    }],
    [new URL(`${baseUrl.toString()}?registry=nest.land&registry=deno.land`), {
      name: undefined,
      registry: ["nest.land", "deno.land"],
    }],
    [
      new URL(
        `${baseUrl.toString()}?name=hoge&registry=nest.land&registry=deno.land`,
      ),
      {
        name: "hoge",
        registry: ["nest.land", "deno.land"],
      },
    ],
    [
      new URL(
        `${baseUrl.toString()}?name=hoge&registry=nest.land&registry=deno.land&nokey=no`,
      ),
      {
        name: "hoge",
        registry: ["nest.land", "deno.land"],
        nokey: "no",
      },
    ],
    [
      new URL(
        `${baseUrl.toString()}?name=hoge&registry=nest.land&registry=deno.land&nokey=no&nokey=test`,
      ),
      {
        name: "hoge",
        registry: ["nest.land", "deno.land"],
        nokey: "test",
      },
    ],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(parse(val), expected, `parse(${val}) -> ${expected}`);
  });
});
