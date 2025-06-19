import { setCoupon, setProduct, setProductQuantity } from "./appData.js";
import handleBuy from "./handleBuy.js";
import handleProductProperties from "./handleProductProperties.js";

const handleNoCart = ({ properties, products, productIds }) => {
  if (properties) {
    if (properties.couponCode) setCoupon(properties.couponCode);
    if (properties.productIds) {
      products = products.filter((product) => properties.productIds.map((id) => id.id).includes(Number(product.id)));
      handleProductProperties(products, properties.productIds);
    }
  } else {
    handleProductProperties(products, productIds);
  }
  products.forEach((product) => {
    setProduct({ productId: product.id })
    if (product.quantity) setProductQuantity({ productId: product.id, productQuantity: product.quantity });
  });
  handleBuy();
};

export default handleNoCart;
