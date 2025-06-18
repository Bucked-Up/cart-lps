const updateLocalStorageProduct = ({ productId, optionId, valueId }) => {
  const storage = JSON.parse(localStorage.getItem("lp_products") || "{}");
  if (!optionId) {
    if (!storage[productId]) storage[productId] = {};
    storage[productId].type = "static";
    localStorage.setItem("lp_products", JSON.stringify(storage));
  } else {
    if (!storage[productId]) storage[productId] = { type: "not-static", options: {} };
    if (!storage[productId].options) storage[productId].options = {};
    storage[productId].options[optionId] = { value: valueId };
    localStorage.setItem("lp_products", JSON.stringify(storage));
  }
};

export default updateLocalStorageProduct;
