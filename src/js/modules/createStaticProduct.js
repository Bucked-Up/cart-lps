import addQuantitySelector from "./addQuantitySelector.js";
import addRemoveButton from "./addRemoveButton.js";
import { setProductQuantity } from "./appData.js";
import createBumpButtons from "./createBumpButtons.js";
import createProductBase from "./createProductBase.js";
import updateDomQuantities from "./updateDomQuantities.js";
import updatePrices from "./updatePrices.js";

const createStaticProduct = ({ product, isBump }) => {
  updateDomQuantities(product.quantity || 1)
  const [card, image, imageWrapper, productTitle, optionTitle, productInfoWrapper] = createProductBase();
  addQuantitySelector({ wrapper: optionTitle, product });
  updatePrices(product, "add");
  addRemoveButton({ card, product });
  productTitle.innerHTML = product.name;
  image.alt = product.name;
  image.src = product.image;
  if (product.quantity) {
    setProductQuantity({ productId: product.id, productQuantity: product.quantity });
    const span = document.createElement("span");
    span.innerHTML = product.quantity;
    imageWrapper.appendChild(span);
  }
  if (isBump) {
    createBumpButtons({ price: product.bumpPrice, productInfoWrapper, productId: product.id, card, couponCode: product.couponCode });
  }
  return card;
};

export default createStaticProduct;
