import { getProducts, getProperties, setProduct, setProductOptionValue, setProductQuantity, setProductType } from "./appData.js";
import checkSizeStock from "./checkSizeStock.js";
import createDependentProduct from "./createDependentProduct.js";
import { bounceDynamicCartIcon } from "./createDynamicCartIcon.js";
import createIndependentProduct from "./createIndependentProduct.js";
import createOneCardProduct from "./createOneCardProduct.js";
import createStaticProduct from "./createStaticProduct.js";
import isDependent from "./isDependent.js";
import isStatic from "./isStatic.js";
import openCart from "./openCart.js";
import updateDomQuantities from "./updateDomQuantities.js";

const handleDuplicates = (products) => {
  const newProducts = structuredClone(products);
  newProducts.forEach((product) => {
    if (isStatic(product)) return;
    const prevProducts = Object.keys(getProducts()).map((id) => id.split("-")[0]);
    if (prevProducts.includes(product.id)) {
      const qtty = prevProducts.filter((id) => id == product.id).length;
      product.id = `${product.id}-${qtty}`;
    }
  });
  return newProducts;
};

const createProducts = ({ products, inCartContainer, cartWrapper, isBump }) => {
  const newProducts = handleDuplicates(products);
  const { isDynamic } = getProperties();
  openCart();
  newProducts.forEach((product) => {
    if (isDependent(product)) inCartContainer.appendChild(createDependentProduct({ product, isBump }));
    else if (isStatic(product)) {
      if (isDynamic) {
        const qttyInput = document.querySelector(`#qtty-${product.id}`);
        if (qttyInput) {
          qttyInput.value = +qttyInput.value + 1;
          setProductQuantity({ productId: product.id, productQuantity: qttyInput.value });
          updateDomQuantities(1);
          return;
        }
      }
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
      else
        product.options.forEach((option) => {
          inCartContainer.appendChild(createIndependentProduct({ product, option, isBump }));
        });
    }
    checkSizeStock({ product });
  });
};
export default createProducts;
