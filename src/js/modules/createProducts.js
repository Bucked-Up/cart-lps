import createDependentProduct from "./createDependentProduct.js";
import createDropdownSelector from "./createDropdownSelector.js";
import createStaticProduct from "./createStaticProduct.js";
import updateLocalStorageProduct from "./updateLocalStorageProduct.js";

const createProducts = ({ products, inCartContainer, cartWrapper }) => {
  cartWrapper.classList.add("active");

  products.forEach((product) => {
    if (JSON.parse(Object.keys(product.stock)[0]).length > 1)
      createDependentProduct({ product });
    else if (
      product.options.length === 0 ||
      product.options[0].type === "static"
    ) {
      inCartContainer.appendChild(createStaticProduct({ product }));
      updateLocalStorageProduct({ productId: product.id });
    } else
      product.options.forEach((option) => {
        inCartContainer.appendChild(
          createDropdownSelector({ product, option })
        );
      });
  });
};
export default createProducts;
