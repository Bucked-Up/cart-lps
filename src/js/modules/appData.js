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
const deleteProductOption = ({ productId, optionId }) => {
  delete products[productId].options[optionId];
};

const resetProducts = () =>{
  products = {}
}

export { getProducts, getCoupon, setCoupon, setProduct, setProductType, setProductQuantity, deleteProductOption, resetProducts };
