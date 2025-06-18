import createProducts from "./createProducts.js";
import handleProductProperties from "./handleProductProperties.js";

const handleCart = ({ properties, products, productIds, inCartContainer, cartWrapper }) => {
  document.body.classList.toggle("no-scroll");
  document.querySelector("[cart-qtty]").innerHTML = 0;
  if (properties) {
    const filteredProducts = products.filter((product) => properties.productIds.map((id) => id.id).includes(Number(product.id)));
    handleProductProperties(filteredProducts, properties.productIds);
    if (properties.couponCode) localStorage.setItem("lp_coupon", properties.couponCode);
    createProducts({ products: filteredProducts, inCartContainer, cartWrapper });
  } else {
    handleProductProperties(products, productIds);
    createProducts({ products, inCartContainer, cartWrapper });
  }
};

export default handleCart;
