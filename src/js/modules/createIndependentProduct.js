import createDropdownItems from "./createDropdownItems.js";
import createDropdownSelector from "./createDropdownSelector.js";
import createProductBase from "./createProductBase.js";

const createIndependentProduct = ({ product, option }) => {
  const [card, image, productTitle, optionTitle, productInfoWrapper] = createProductBase();
  image.src = option.values[0].images[0];
  image.alt = option.values[0].name;
  productTitle.innerHTML = product.name;
  optionTitle.innerHTML = option.name;
  const cartDropdown = createDropdownSelector({ product, option, image });
  productInfoWrapper.appendChild(cartDropdown);
  return card;
};

export default createIndependentProduct;
