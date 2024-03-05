export function filterByProp<T>(list: T[], key: keyof T, match: any) {
  return list.filter((el) => el[key] === match);
}

export function totalByProp<T>(list: T[], key: keyof T) {
  return list.reduce((prev, current) => prev + Number(current[key]), 0);
}

export function uniquesByProp<T>(list: T[], prop: keyof T) {
  const values: string[] = [];

  list.forEach((item) => {
    let uniqueItem: string = item[prop] as string;
    if (!values.includes(uniqueItem)) values.push(uniqueItem);
  });

  return values;
}

export function ascendingSort<T>(list: T[], prop: keyof T) {
  return list.sort((a, b) => {
    if (a[prop] > b[prop]) return 1;
    if (a[prop] < b[prop]) return -1;

    return 0;
  });
}
