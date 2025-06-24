let products = {};
let couponCode = "";

const getProducts = () => products;
const getCoupon = () => couponCode;
const setCoupon = (coupon) => (couponCode = coupon);
const setProduct = ({ productId, optionId, valueId }) => {
  if (!optionId) {
    if (!products[productId]) products[productId] = {};
    products[productId].type = "static";
  } else {
    if (!products[productId]) products[productId] = { type: "not-static", options: {} };
    if (!products[productId].options) products[productId].options = {};
    products[productId].options[optionId] = { value: valueId };
  }
};
const setProductType = ({ productId, productType }) => {
  if (!products[productId]) products[productId] = {};
  products[productId].type = productType;
};
const setProductQuantity = ({ productId, productQuantity }) => {
  if (!products[productId]) products[productId] = {};
  products[productId].quantity = productQuantity;
};
const getProductQuantity = ({ productId }) => products[productId].quantity;
const setProductValues = ({ productId, optionId, value }) => {
  if (!products[productId].options) products[productId].options = {};
  if (!products[productId].options[optionId]) products[productId].options[optionId] = {};
  if (!products[productId].options[optionId].values) products[productId].options[optionId].values = [];
  products[productId].options[optionId].values.push(value);
};
const removeProductValue = ({ productId, optionId, value }) => {
  const values = products[productId].options[optionId].values;
  values.splice(values.indexOf(value), 1);
};
const deleteProductOption = ({ productId, optionId }) => {
  delete products[productId].options[optionId];
};

const resetProducts = () => {
  products = {};
};

export { getProducts, getCoupon, getProductQuantity, setCoupon, setProduct, setProductType, setProductQuantity, setProductValues, removeProductValue, deleteProductOption, resetProducts };
