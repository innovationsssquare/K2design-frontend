import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const Letterheadcalculation = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/Letterhead/calculate-price`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};
