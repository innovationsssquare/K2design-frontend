import { BaseUrl } from "./Baseurl";
import { calculateProductPrice, pricingMatrix, normalizeCategory } from "../PricingEngine/pricingCalculator";

/**
 * Universal Print Pricing API Client with Resilient Local Engine
 * Computes exact quote in real-time based on the 16 categories and rate matrices
 */
export const calculatePriceApi = async (category, params = {}) => {
  try {
    const res = await fetch(`${BaseUrl}/pricing/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, params }),
    });
    if (res.ok) {
      const result = await res.json();
      if (result && result.status && result.data && result.data.subtotal > 0) {
        return result;
      }
    }
  } catch (err) {
    // network fallback below
  }

  // Resilient Local Calculation Fallback
  try {
    const calculated = calculateProductPrice(category, params);
    return { status: true, data: calculated, source: "local-matrix" };
  } catch (e) {
    try {
      const norm = normalizeCategory(category);
      const fallbackCalc = calculateProductPrice(norm, params);
      return { status: true, data: fallbackCalc, source: "local-matrix-normalized" };
    } catch (err2) {
      return { status: false, message: e.message };
    }
  }
};

/**
 * Get pricing matrix and configuration options for a category
 */
export const getPricingOptionsApi = async (category = "") => {
  try {
    const endpoint = category ? `${BaseUrl}/pricing/options/${category}` : `${BaseUrl}/pricing/options`;
    const res = await fetch(endpoint);
    if (res.ok) {
      const result = await res.json();
      if (result && result.status && result.data) {
        return result;
      }
    }
  } catch (err) {
    // network fallback below
  }

  // Resilient Local Options Fallback
  try {
    const norm = normalizeCategory(category);
    const data = norm && pricingMatrix[norm] ? pricingMatrix[norm] : pricingMatrix;
    return { status: true, data };
  } catch (e) {
    return { status: false, message: e.message };
  }
};
