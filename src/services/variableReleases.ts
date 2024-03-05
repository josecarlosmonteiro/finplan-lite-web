import { VariableReleaseProps } from "../types/Releases";
import { api } from "./api";

type BaseParamsProps = {
  month: string;
  year: number;
};

const baseUrl = ({ month, year }: BaseParamsProps) =>
  `/variable-releases?month=${month}&year=${year}`;

async function findByDate(baseParams: BaseParamsProps) {
  try {
    const { data } = await api.get(baseUrl(baseParams));

    return data;
  } catch (error: any) {
    console.log("ERROR");
    console.log(error.message);

    return [];
  }
}

async function create(
  month: string,
  year: number,
  payload: VariableReleaseProps[]
) {
  try {
    const { data } = await api.post(baseUrl({ month, year }), {
      releases: payload,
    });

    return data;
  } catch (error: any) {
    console.log("ERROR");
    console.log(error.message);

    return [];
  }
}

export const variableReleasesService = {
  findByDate,
};
