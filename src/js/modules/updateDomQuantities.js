const updateDomQuantities = (quantity, reset) => {
  const domElements = document.querySelectorAll("[cart-qtty]");
  const currentQuantity = +domElements[0].innerHTML + quantity;
  domElements.forEach((el) => {
    if (reset) {
      el.innerHTML = 0;
      return;
    }
    el.innerHTML = currentQuantity;
  });
};

export default updateDomQuantities;
