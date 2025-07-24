import createBumpButtons from "./createBumpButtons.js";
import createDropdownSelector from "./createDropdownSelector.js";
import createProductBase from "./createProductBase.js";

const createIndependentProduct = ({ product, option, isBump }) => {
  document.querySelector("[cart-qtty]").innerHTML = +document.querySelector("[cart-qtty]").innerHTML + 1;
  const [card, image, imageWrapper, productTitle, optionTitle, productInfoWrapper] = createProductBase();
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
