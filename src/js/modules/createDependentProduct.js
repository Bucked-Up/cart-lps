import addRemoveButton from "./addRemoveButton.js";
import { setProductType } from "./appData.js";
import createBumpButtons from "./createBumpButtons.js";
import createDropdownSelector from "./createDropdownSelector.js";
import createProductBase from "./createProductBase.js";
import createSizesSelector from "./createSizesSelector.js";
import updateDomQuantities from "./updateDomQuantities.js";

const createDependentProduct = ({ product, isBump }) => {
  updateDomQuantities(1)
  const [card, image, imageWrapper, productTitle, optionTitle, productInfoWrapper] = createProductBase();
  addRemoveButton({ card, product });
  image.src = product.options[0].values[0].images[0];
  productTitle.innerHTML = product.name;
  setProductType({ productId: product.id, productType: "dependent" });
  const cartDropdown = createDropdownSelector({ product, option: product.options[0], image });
  const sizesSelector = createSizesSelector({ product, option: product.options[1] });
  productInfoWrapper.appendChild(cartDropdown);
  productInfoWrapper.appendChild(sizesSelector);
  if (isBump) {
    createBumpButtons({ price: product.bumpPrice, productInfoWrapper, productId: product.id, card, couponCode: product.couponCode });
  }
  return card;
};

export default createDependentProduct;
