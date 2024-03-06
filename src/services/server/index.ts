export const fetchFixedReleases = async () => {
  try {
    const response = await fetch("http://localhost:7001/fixed-releases", {
      cache: "no-cache",
    });

    const data = await response.json();

    return data || [];
  } catch (error: any) {
    console.log("ERROR");
    console.log(error.message);

    return [];
  }
};

export const fetchVariableReleases = async (month: string, year: number) => {
  try {
    const response = await fetch(
      `http://localhost:7001/variable-releases?month=${month}&year=${year}`,
      {
        cache: "no-cache",
      }
    );

    const data = await response.json();

    return data || [];
  } catch (error: any) {
    console.log("ERROR");
    console.log(error.message);

    return [];
  }
};
