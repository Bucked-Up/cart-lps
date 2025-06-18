const setProductQuantity = ({ productId, productQuantity }) => {
  const storage = JSON.parse(localStorage.getItem("lp_products") || "{}");
  if (!storage[productId]) storage[productId] = {};
  storage[productId].quantity = productQuantity;
  localStorage.setItem("lp_products", JSON.stringify(storage));
};

export default setProductQuantity;
