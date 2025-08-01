import createBumpButtons from "./createBumpButtons.js";
import createDropdownSelector from "./createDropdownSelector.js";
import createProductBase from "./createProductBase.js";
import addRemoveButton from "./addRemoveButton.js";
import updateDomQuantities from "./updateDomQuantities.js";

const createIndependentProduct = ({ product, option, isBump }) => {
  updateDomQuantities(1)
  const [card, image, imageWrapper, productTitle, optionTitle, productInfoWrapper] = createProductBase();
  addRemoveButton({card, product})
  image.src = option.values[0].images[0];
  image.alt = option.values[0].name;
  productTitle.innerHTML = product.name;
  optionTitle.innerHTML = option.name;
  const cartDropdown = createDropdownSelector({ product, option, image });
  productInfoWrapper.appendChild(cartDropdown);
  if (isBump) {
    createBumpButtons({ price: product.bumpPrice, productInfoWrapper, productId: product.id, card, couponCode: product.couponCode });
  }
  return card;
};

export default createIndependentProduct;
