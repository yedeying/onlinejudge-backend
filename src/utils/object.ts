export const pick = <T extends object, U extends keyof T>(obj: T, props: U[]) => {
  const newObj = {} as Pick<T, U>;
  for (const prop of props) {
    newObj[prop] = obj[prop];
  }
  return newObj;
};
