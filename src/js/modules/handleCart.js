import { setCoupon } from "./appData.js";
import createProducts from "./createProducts.js";
import handleProductProperties from "./handleProductProperties.js";
import updateDomQuantities from "./updateDomQuantities.js";

const handleCart = ({ properties, products, productIds, inCartContainer, cartWrapper }) => {
  updateDomQuantities(0,true)
  if (properties) {
    const filteredProducts = products.filter((product) => properties.productIds.map((id) => id.id).includes(Number(product.id)));
    handleProductProperties(filteredProducts, properties.productIds);
    if (properties.couponCode) setCoupon(properties.couponCode);
    createProducts({ products: filteredProducts, inCartContainer, cartWrapper });
  } else {
    handleProductProperties(products, productIds);
    createProducts({ products, inCartContainer, cartWrapper });
  }
};

export default handleCart;
