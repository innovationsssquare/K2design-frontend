import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";


export const WallCalendarcalculation = async (data) => {

    try {
      let result = await fetch(`${BaseUrl}/Calender/calculatePrice`, {
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