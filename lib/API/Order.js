import { BaseUrl } from "./Baseurl";

/**
 * Place a new print order
 * @param {Object} orderData - { products, user, branch, details, fulfillmentType }
 */
export const CreateOrderApi = async (orderData) => {
  try {
    const res = await fetch(`${BaseUrl}/Order/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const GetOrderByIdApi = async (orderId) => {
  try {
    const res = await fetch(`${BaseUrl}/Order/order/getorder/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

