import { BaseUrl } from "../Baseurl";

export const ThreeDLEDLetterCalculation = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/3Dletter/calculatePrice`, {
      method: "POST",
      body: JSON.stringify(data),
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
