import { setCoupon, setProduct, setProductOptionValue, setProductQuantity, setProductType } from "./appData.js";
import handleBuy from "./handleBuy.js";
import handleProductProperties from "./handleProductProperties.js";

const handleNoCart = ({ properties, products, productIds, country }) => {
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
    setProduct({ productId: product.id });
    if (product.quantity) setProductQuantity({ productId: product.id, productQuantity: product.quantity });
    if (product.hasSetVariant) {
      setProductType({ productId: product.id, productType: "has-set-variant" });
      setProductOptionValue({ productId: product.id, optionId: product.hasSetVariant[0], valueId: product.hasSetVariant[1] });
    }
  });
  handleBuy(country);
};

export default handleNoCart;
