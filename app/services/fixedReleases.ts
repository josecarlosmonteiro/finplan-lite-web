import { api } from "./api";

export async function findAll() {
  try {
    const { data } = await api.get("fixed-releases");
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
}
