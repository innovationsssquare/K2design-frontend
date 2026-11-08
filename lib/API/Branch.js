import { BaseUrl } from "./Baseurl";

export const Getbranch = async () => {
  try {
    let result = await fetch(`${BaseUrl}/branch/get/branch`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const Getbranchbyid = async (id) => {
  try {
    let result = await fetch(`${BaseUrl}/branch/get/branch/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

