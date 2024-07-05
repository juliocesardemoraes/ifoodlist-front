import { redirect } from "next/dist/server/api-utils";
import { IFoodlist } from "../entities/entities";

export const fetchFoodlists = async (query = ""): Promise<IFoodlist[]> => {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const FORCE_EMPTY = false;
  if (FORCE_EMPTY) return [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/foodlist`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR", error);
    return error;
  }
};

export const fetchFoodlistById = async (id = ""): Promise<IFoodlist | null> => {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const FORCE_EMPTY = false;
  if (FORCE_EMPTY) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/foodlist?id=${id}`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR", error);
    return error;
  }
};

export const addFoodlist = async (Foodlist: IFoodlist): Promise<any> => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Foodlist),
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/foodlist`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR", error);
    return error;
  }
};
