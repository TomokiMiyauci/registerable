const BASE_URL = "https://registerable-tomoki-miyauci.vercel.app/";
import type { ApiResponse, Option } from "../mod.ts";

const client = async (name: string, option?: Partial<Option>) => {
  const url = new URL("check-name", BASE_URL);
  console.log(option);
  url.searchParams.append("name", name);

  const res = await fetch(url.toString());
  return await res.json() as ApiResponse;
};

export { client };
