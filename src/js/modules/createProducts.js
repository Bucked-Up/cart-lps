import checkSizeStock from "./checkSizeStock.js";
import createDependentProduct from "./createDependentProduct.js";
import createIndependentProduct from "./createIndependentProduct.js";
import createStaticProduct from "./createStaticProduct.js";
import isDependent from "./isDependent.js";
import updateLocalStorageProduct from "./updateLocalStorageProduct.js";

const createProducts = ({ products, inCartContainer, cartWrapper }) => {
  cartWrapper.classList.add("active");

  products.forEach((product) => {
    if (isDependent(product)) inCartContainer.appendChild(createDependentProduct({ product }));
    else if (product.options.length === 0 || product.options[0].type === "static") {
      inCartContainer.appendChild(createStaticProduct({ product }));
      updateLocalStorageProduct({ productId: product.id });
    } else
      product.options.forEach((option) => {
        inCartContainer.appendChild(createIndependentProduct({ product, option }));
      });
    checkSizeStock({ product });
  });
};
export default createProducts;
