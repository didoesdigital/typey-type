function isNormalInteger(str: string): boolean {
  let n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
}

export default isNormalInteger;
