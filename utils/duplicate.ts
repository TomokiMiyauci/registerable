const duplicate = <T extends unknown>(val: T[]) => Array.from(new Set(val));

export { duplicate };
