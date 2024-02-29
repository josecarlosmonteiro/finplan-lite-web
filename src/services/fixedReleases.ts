import { ReleaseProps } from "../types/Releases";
import { api } from "./api";

async function findAll() {
  try {
    const { data } = await api.get("fixed-releases");
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
}

async function create(payload: Omit<ReleaseProps, "id">) {
  try {
    const { data } = await api.post("fixed-releases", payload);
    return data;
  } catch (error) {
    alert("Erro ao cadastrar lançamento fixo...");
    console.error(error);
  }
}

export const fixedReleaseService = {
  findAll,
  create,
};
