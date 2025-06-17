const setProductType = ({ productId, productType }) => {
  const storage = JSON.parse(localStorage.getItem("lp_products") || "{}");
  storage[productId] = { type: productType, options: {} };
  localStorage.setItem("lp_products", JSON.stringify(storage));
};

export default setProductType;
