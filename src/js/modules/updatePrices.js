import { getProperties } from "./appData.js";

const updatePrices = (product, action, multiplier = 1) => {
  const { isDynamic } = getProperties();
  if (!isDynamic || !isDynamic.hasPrices) return;
  const domTotal = document.querySelector(".cart__foot__total-text");
  const domOld = document.querySelector(".cart__foot__old-price");
  const domNew = document.querySelector(".cart__foot__new-price");

  const currentTotal = +domTotal.innerHTML.split("$")[1];
  const currentOld = +domOld.innerHTML.split("$")[1];
  const currentNew = +domNew.innerHTML.split("$")[1];

  const productOldPrice = product.oldPrice * multiplier
  const productNewPrice = product.newPrice * multiplier

  switch (action) {
    case "add":
      domOld.innerHTML = `$${((currentOld + productOldPrice) || productOldPrice).toFixed(2)}`
      domNew.innerHTML = `$${((currentNew + productNewPrice) || productNewPrice).toFixed(2)}`
      domTotal.innerHTML = `Total: $${((currentTotal + productNewPrice) || productNewPrice).toFixed(2)}`
      break;
    case "subtract":
      domOld.innerHTML = `$${(currentOld - productOldPrice).toFixed(2)}`
      domNew.innerHTML = `$${(currentNew - productNewPrice).toFixed(2)}`
      domTotal.innerHTML = `Total: $${(currentTotal - productNewPrice).toFixed(2)}`
      break;
  }
};

export default updatePrices;
