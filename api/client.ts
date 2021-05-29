const BASE_URL = "https://nameable-qmfotcl44-tomoki-miyauci.vercel.app/";
import type { RegisterableResult, Registry } from "../types/mod.ts";

const client = async <T extends Registry>(
  name: string,
) => {
  const url = new URL("check-name", BASE_URL);
  url.searchParams.append("name", name);

  const res = await fetch(url.toString());
  return await res.json() as RegisterableResult<T>;
};

export { client };
