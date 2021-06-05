import type { Option, RegisterableResult, Registry } from "../types/mod.ts";
import { stringify } from "./stringify.ts";

const client = async <T extends Registry>(
  name: string,
  option: Omit<Option, "mode">,
) => {
  const url = stringify({ name, ...option });

  const res = await fetch(url, {
    signal: option.signal,
  });
  return await res.json() as RegisterableResult<T>;
};

export { client };
