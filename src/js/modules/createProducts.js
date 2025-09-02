import { setProduct, setProductOptionValue, setProductType, setProductValues } from "./appData.js";
import checkSizeStock from "./checkSizeStock.js";
import createDependentProduct from "./createDependentProduct.js";
import createIndependentProduct from "./createIndependentProduct.js";
import createOneCardProduct from "./createOneCardProduct.js";
import createStaticProduct from "./createStaticProduct.js";
import isDependent from "./isDependent.js";
import isStatic from "./isStatic.js";

const createProducts = ({ products, inCartContainer, cartWrapper, isBump }) => {
  cartWrapper?.classList.add("active");

  products.forEach((product) => {
    if (isDependent(product)) inCartContainer.appendChild(createDependentProduct({ product, isBump }));
    else if (isStatic(product)) {
      inCartContainer.appendChild(createStaticProduct({ product, isBump }));
      setProduct({ productId: product.id });
      if (product.hasSetVariant) {
        setProductType({ productId: product.id, productType: "has-set-variant" });
        setProductOptionValue({ productId: product.id, optionId: product.hasSetVariant[0], valueId: product.hasSetVariant[1] });
      }
    } else {
      if (product.quantity)
        product.options.forEach((option) => {
          createOneCardProduct({ product, option, inCartContainer });
        });
      else if (product.isWhole) {
        setProductType({ productId: product.id, productType: "isWhole" });
        product.options[0].values.forEach((value) => {
          inCartContainer.appendChild(createStaticProduct({ product, value }));
          setProductValues({ productId: product.id, optionId: product.options[0].id, value: value.id });
        });
      } else
        product.options.forEach((option) => {
          inCartContainer.appendChild(createIndependentProduct({ product, option, isBump }));
        });
    }
    checkSizeStock({ product });
  });
};
export default createProducts;
