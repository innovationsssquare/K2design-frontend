import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const Weddingcardcalculation = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/Wedding/calculatePrice`, {
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
