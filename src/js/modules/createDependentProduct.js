import createDropdownSelector from "./createDropdownSelector.js";
import createProductBase from "./createProductBase.js";
import createSizesSelector from "./createSizesSelector.js";
import setProductType from "./setProductType.js";

const createDependentProduct = ({ product }) => {
  document.querySelector("[cart-qtty]").innerHTML = +document.querySelector("[cart-qtty]").innerHTML+1
  const [card, image, productTitle, optionTitle, productInfoWrapper] = createProductBase();
  image.src = product.options[0].values[0].images[0];
  productTitle.innerHTML = product.name;
  setProductType({ productId: product.id, productType: "dependent" });
  const cartDropdown = createDropdownSelector({ product, option: product.options[0], image });
  const sizesSelector = createSizesSelector({ product, option: product.options[1] });
  productInfoWrapper.appendChild(cartDropdown);
  productInfoWrapper.appendChild(sizesSelector);
  return card;
};

export default createDependentProduct;
