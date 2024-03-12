import { ApiResponse } from "../types/ApiResponse";
import { CreditCardRelease } from "../types/CreditCardReleases";
import { api } from "./api";

const findAll = async (): Promise<ApiResponse<CreditCardRelease[]> | null> => {
  try {
    const { data } = await api.get("/credit-card-releases");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const create = async (
  payload: Omit<CreditCardRelease, "id">
): Promise<ApiResponse<CreditCardRelease> | null> => {
  try {
    const { data } = await api.post("/credit-card-releases", payload);
    return data;
  } catch (error) {
    return null;
  }
};

export const creditCardService = {
  findAll,
  create,
};
