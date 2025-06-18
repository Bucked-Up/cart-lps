import handleBuy from "./handleBuy.js";
import handleProductProperties from "./handleProductProperties.js";
import setProductQuantity from "./setProductQuantity.js";
import updateLocalStorageProduct from "./updateLocalStorageProduct.js";

const handleNoCart = ({ properties, products, productIds }) => {
  if (properties) {
    if (properties.couponCode) localStorage.setItem("lp_coupon", properties.couponCode);
    if (properties.productIds) {
      products = products.filter((product) => properties.productIds.map((id) => id.id).includes(Number(product.id)));
      handleProductProperties(products, properties.productIds);
    }
  } else {
    handleProductProperties(products, productIds);
  }
  products.forEach((product) => {
    updateLocalStorageProduct({ productId: product.id });
    if (product.quantity) setProductQuantity({ productId: product.id, productQuantity: product.quantity });
  });
  handleBuy();
};

export default handleNoCart;
