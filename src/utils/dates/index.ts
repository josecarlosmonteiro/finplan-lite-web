export function allMonthNames() {
  let months: string[] = [];

  for (let x = 0; x < 12; x++) {
    const data = new Date(2000, x, 1);

    months.push(data.toLocaleDateString("pt-br", { month: "long" }));
  }

  return months;
}
