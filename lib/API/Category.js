import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";



export const Getallcategory = async () => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/category/get/categories`, {
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

export const Getallcategorybyslug = async () => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/category/get/allcategorybyslug`, {
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

export const Getsinglecategorybyid = async (id) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/category/get/category/${id}`, {
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


// New function to get subcategory products
export const GetSubCategoryProducts = async (slug) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/product/getsubcategoryproducts/${slug}`, {
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




