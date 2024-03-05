import { ReleaseProps } from "../types/Releases";
import { api } from "./api";

const url = "fixed-releases";

async function findAll() {
  try {
    const { data } = await api.get(url);
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
}

async function create(payload: Omit<ReleaseProps, "id">) {
  try {
    const { data } = await api.post(url, payload);
    return data;
  } catch (error) {
    alert("Erro ao cadastrar lançamento fixo...");
    console.error(error);
  }
}

async function remove(id: string) {
  try {
    await api.delete(`${url}/${id}`);
  } catch (error) {
    alert("Erro ao remover lançamento fixo...");
    console.error(error);
  }
}

export const fixedReleaseService = {
  findAll,
  create,
  remove,
};
