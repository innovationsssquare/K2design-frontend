import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

  export const Getallcategory = async () => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/product/get/products`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      });
      result = await result.json();
      return result;
    } catch (error) {
      return error.message;
    }
  };