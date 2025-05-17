import Cookies from "js-cookie";
import { BaseUrl } from "../Baseurl";


export const Pvcfoamplatescalculation = async (data) => {

    try {
      let result = await fetch(`${BaseUrl}/PvcfoamPlates/calculatePrice`, {
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