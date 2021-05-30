import {
  getInvalidKeys,
  hasInvalidKey,
  validateNoNameKey,
  validateQueryParameter,
  validateRegistryMember,
} from "./validate.ts";
import { assertEquals } from "../dev_deps.ts";
import { ParsedParameters } from "./parse.ts";
import { REGISTRIES } from "../constants/registry.ts";

Deno.test("getInvalidKeys", () => {
  const table: [ParsedParameters, string[]][] = [
    [{}, []],
    [{ name: undefined }, []],
    [{ registry: undefined }, []],
    [{ name: undefined, registry: undefined }, []],
    [{ name: undefined, registry: undefined, test: "hoge" }, ["test"]],
    [{ name: undefined, registry: undefined, test: "hoge", a: "b" }, [
      "test",
      "a",
    ]],
    [{ name: undefined, registry: undefined, test: "hoge", a: "b", c: "d" }, [
      "test",
      "a",
      "c",
    ]],
    [{ name: "hello", registry: ["world"], test: "hoge", a: "b", c: "d" }, [
      "test",
      "a",
      "c",
    ]],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      getInvalidKeys(val),
      expected,
      `getInvalidKeys(${val}) -> ${expected}`,
    );
  });
});

Deno.test("hasInvalidKey", () => {
  const table: [ParsedParameters, [boolean, string]][] = [
    [{}, [true, ""]],
    [{ name: undefined }, [true, ""]],
    [{ registry: undefined }, [true, ""]],
    [{ name: undefined, registry: undefined }, [true, ""]],
    [{ name: undefined, registry: undefined, test: "hoge" }, [
      false,
      "Invalid query parameter (test)",
    ]],
    [{ name: undefined, registry: undefined, test: "hoge", a: "b" }, [
      false,
      "Invalid query parameter (test, a)",
    ]],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      hasInvalidKey(val),
      expected,
      `hasInvalidKey(${val}) -> ${expected}`,
    );
  });
});

Deno.test("validateNoNameKey", () => {
  const table: [unknown, [boolean, string]][] = [
    [undefined, [false, "Name parameter is necessary"]],
    ["", [false, "Name parameter is necessary"]],
    ["hoge", [true, ""]],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      validateNoNameKey(val),
      expected,
      `validateNoNameKey(${val}) -> ${expected}`,
    );
  });
});
Deno.test("validateRegistryMember", () => {
  const table: [undefined | string[], [boolean, string]][] = [
    [undefined, [true, ""]],
    [[], [true, ""]],
    [["nest.land"], [true, ""]],
    [["nest.land", "npm"], [true, ""]],
    [["nest.land", "npm", "deno.land"], [true, ""]],
    [["nest.land", "npm", "deno.land", "hoge"], [
      false,
      `Invalid registry member (hoge) [valid: ${REGISTRIES.join(", ")}]`,
    ]],
    [["hoge", "huga"], [
      false,
      `Invalid registry member (hoge, huga) [valid: ${REGISTRIES.join(", ")}]`,
    ]],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      validateRegistryMember(val),
      expected,
      `validateRegistryMember(${val}) -> ${expected}`,
    );
  });
});
Deno.test("validateQueryParameter", () => {
  const table: [ParsedParameters, [boolean, string]][] = [
    [{}, [false, "Name parameter is necessary"]],
    [{ name: undefined }, [false, "Name parameter is necessary"]],
    [{ name: "hoge", registry: undefined }, [true, ""]],
    [{ name: undefined, registry: ["nest.land"] }, [
      false,
      "Name parameter is necessary",
    ]],
    [{ name: "huga", registry: ["nest.land", "hoge"] }, [
      false,
      `Invalid registry member (hoge) [valid: ${REGISTRIES.join(", ")}]`,
    ]],
    [{ name: undefined, registry: undefined, test: "hoge" }, [
      false,
      "Invalid query parameter (test)",
    ]],
    [{ name: undefined, registry: undefined, test: "hoge", a: "b" }, [
      false,
      "Invalid query parameter (test, a)",
    ]],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      validateQueryParameter(val),
      expected,
      `validateQueryParameter(${val}) -> ${expected}`,
    );
  });
});
