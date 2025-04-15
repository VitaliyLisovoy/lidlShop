/**
 * Convert price text to float
 * @param {string} priceText
 * @returns {number}
 */
export const toPrice = (priceText) => {
  if (!priceText || typeof priceText !== "string") {
    throw new Error("Invalid price text");
  }
  return parseFloat(priceText.replace(",", ".").replace(/[^\d.]/g, ""));
};

/**
 * Convert discount text to float
 * @param {string} discountText
 * @returns {number}
 */
export const toDiscount = (discountText) => {
  if (!discountText || typeof discountText !== "string") {
    throw new Error("Invalid discount text");
  }
  return parseFloat(discountText.replace("-", "").replace("%", ""));
};
