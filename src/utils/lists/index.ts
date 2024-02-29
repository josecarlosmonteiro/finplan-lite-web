export function filterByProp<T>(list: T[], key: keyof T, match: any) {
  return list.filter((el) => el[key] === match);
}

export function totalByProp<T>(list: T[], key: keyof T) {
  return list.reduce((prev, current) => prev + Number(current[key]), 0);
}