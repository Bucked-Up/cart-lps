import { setProduct } from "./appData.js";
import checkSizeStock from "./checkSizeStock.js";
import createDependentProduct from "./createDependentProduct.js";
import createIndependentProduct from "./createIndependentProduct.js";
import createOneCardProduct from "./createOneCardProduct.js";
import createStaticProduct from "./createStaticProduct.js";
import isDependent from "./isDependent.js";
import isStatic from "./isStatic.js";

const createProducts = ({ products, inCartContainer, cartWrapper }) => {
  cartWrapper.classList.add("active");

  products.forEach((product) => {
    if (isDependent(product)) inCartContainer.appendChild(createDependentProduct({ product }));
    else if (isStatic(product)) {
      inCartContainer.appendChild(createStaticProduct({ product }));
      setProduct({ productId: product.id });
    } else {
      if (product.quantity)
        product.options.forEach((option) => {
          createOneCardProduct({ product, option, inCartContainer });
        });
      else
        product.options.forEach((option) => {
          inCartContainer.appendChild(createIndependentProduct({ product, option }));
        });
    }
    checkSizeStock({ product });
  });
};
export default createProducts;
