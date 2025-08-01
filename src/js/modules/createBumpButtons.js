import { getCoupon, getProductQuantity, removeProductAsBump, setCoupon, setProductAsBump, setProductQuantity } from "./appData.js";
import updateDomQuantities from "./updateDomQuantities.js";

const createBumpButtons = ({ price, productInfoWrapper, productId, ids, card, couponCode, quantity }) => {
  const inCartContainer = document.querySelector(".cart__in-cart-container");
  const cartOrderBumpsContainer = document.querySelector(".cart__order-bumps-container");

  const addButton = document.createElement("button");
  addButton.classList.add("add-button");
  addButton.innerHTML = `Add to cart for only +$${price}`;

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.innerHTML = "Added to cart";

  productInfoWrapper.appendChild(addButton);
  productInfoWrapper.appendChild(removeButton);

  const oldQuantities = {};

  let ogCoupon = "";

  addButton.addEventListener("click", () => {
    inCartContainer.appendChild(card);
    ogCoupon = getCoupon();
    setCoupon(couponCode);
    if (productId) {
      updateDomQuantities(1)
      removeProductAsBump({ productId });
    } else if (ids) {
      ids.forEach((id) => {
        oldQuantities[id] = getProductQuantity({ productId: id });
        setProductQuantity({ productId: id, productQuantity: quantity });
      });
    }
  });
  removeButton.addEventListener("click", () => {
    cartOrderBumpsContainer.appendChild(card);
    setCoupon(ogCoupon);
    if (productId) {
      updateDomQuantities(-1)
      setProductAsBump({ productId });
    } else if (ids) {
      ids.forEach((id) => {
        setProductQuantity({ productId: id, productQuantity: oldQuantities[id] });
      });
    }
  });
};

export default createBumpButtons;
