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

async function create(payload: VariableReleaseProps) {
  try {
    const { data } = await api.post("/variable-releases", payload);

    return data;
  } catch (error: any) {
    console.log("ERROR");
    console.log(error.message);

    return null;
  }
}

async function remove(id: string) {
  try {
    const { data } = await api.delete(`/variable-releases/${id}`);
    return data;
  } catch (error: any) {
    console.log("ERROR");
    console.log(error.message);

    return null;
  }
}

export const variableReleasesService = {
  findByDate,
  create,
  remove,
};
