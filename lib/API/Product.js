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

  export const GetProductBySlug  = async (slug , productslug) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/product/get/productbyslug/${slug}/${productslug}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      });
      result = await result.json();
      console.log("Result",result)
      return result;
    } catch (error) {
      return error.message;
    }
  };
  