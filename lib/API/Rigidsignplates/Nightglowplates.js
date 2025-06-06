import Cookies from "js-cookie";
import { BaseUrl } from "../Baseurl";


export const Nightglowplatescalculation = async (data) => {

    try {
      let result = await fetch(`${BaseUrl}/NightglowPlates/calculatePrice`, {
        method: "POST",
        body:JSON.stringify(data),
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