import { ifElse } from "../deps.ts";
const loggerFactory = (isSilent: boolean) =>
  ifElse(
    isSilent,
    () => (..._: any[]) => {},
    () => (...message: any[]) => console.log(...message),
  );

export { loggerFactory };
