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
const setProductAsBump = ({ productId }) => {
  products[productId].isBump = true;
};
const setProductQuantity = ({ productId, productQuantity }) => {
  if (!products[productId]) products[productId] = {};
  products[productId].quantity = productQuantity;
};
const setProductOptionValue = ({ productId, optionId, valueId }) => {
  if (!products[productId]) products[productId] = {};
  if (!products[productId].options) products[productId].options = {};
  products[productId].options[optionId] = { value: valueId };
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
const removeProductAsBump = ({ productId }) => {
  products[productId].isBump = false;
};
const deleteProductOption = ({ productId, optionId }) => {
  delete products[productId].options[optionId];
};

const resetProducts = () => {
  for(let key in products){
    if(products[key].hasOwnProperty('isBump')) products[key].isBump = true;
    else delete products[key]
  }
};

export { getProducts, getCoupon, getProductQuantity, setCoupon, setProduct, setProductType, setProductAsBump, setProductQuantity, setProductValues, setProductOptionValue, removeProductValue, removeProductAsBump, deleteProductOption, resetProducts };
