import Cookies from "js-cookie";
import { BaseUrl } from "../Baseurl";


export const Cliponframecalculation = async (data) => {

    try {
      let result = await fetch(`${BaseUrl}/LEDThinliteFrame/calculatePrice`, {
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