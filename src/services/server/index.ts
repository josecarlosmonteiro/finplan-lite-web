export const fetchFixedReleases = async () => {
  try {
    console.log("GET - fixed releases...");
    const response = await fetch("http://localhost:7001/fixed-releases", {
      cache: "no-cache",
    });

    const data = await response.json();
    console.log("response - ", data);

    return data || [];
  } catch (error: any) {
    console.log("ERROR");
    console.log(error.message);

    return [];
  }
};

export const fetchVariableReleases = async (month: string, year: number) => {
  try {
    console.log(`GET - variable releases - ${month}/${year}...`);

    const response = await fetch(
      `http://localhost:7001/variable-releases?month=${month}&year=${year}`,
      {
        cache: "no-cache",
      }
    );

    const data = await response.json();
    console.log("response - ", data);

    return data || [];
  } catch (error: any) {
    console.log("ERROR");
    console.log(error.message);

    return [];
  }
};