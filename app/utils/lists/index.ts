export function filterByProp<T>(list: T[], key: keyof T, match: any) {
  return list?.filter((el) => el[key] === match);
}
