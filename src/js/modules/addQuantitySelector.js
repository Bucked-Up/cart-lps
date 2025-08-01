import { getProductQuantity, getProperties, setProductQuantity } from "./appData.js";
import updateDomQuantities from "./updateDomQuantities.js";

const addQuantitySelector = ({ wrapper, product }) => {
  const { isDynamic } = getProperties();
  if (!isDynamic) return;

  const plusBtn = document.createElement("button");
  plusBtn.classList.add("btn-plus");
  plusBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>';

  const minusBtn = document.createElement("button");
  minusBtn.classList.add("btn-minus");
  minusBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-440v-80h560v80H200Z"/></svg>';

  const qttyInput = document.createElement("input");
  qttyInput.id = `qtty-${product.id}`;
  qttyInput.value = 1;
  qttyInput.type = "number";
  qttyInput.setAttribute("qtty-input","")

  qttyInput.addEventListener("focusout", () => {
    if (qttyInput.value <= 0) qttyInput.value = 1;
    const prevQuantity = getProductQuantity({ productId: product.id }) || 1;
    setProductQuantity({ productId: product.id, productQuantity: qttyInput.value });
    updateDomQuantities(qttyInput.value - prevQuantity)
  });

  plusBtn.addEventListener("click", () => {
    updateDomQuantities(1);
    qttyInput.value = +qttyInput.value + 1;
    setProductQuantity({ productId: product.id, productQuantity: qttyInput.value });
  });
  minusBtn.addEventListener("click", () => {
    if (qttyInput.value > 1) {
      updateDomQuantities(-1);
      qttyInput.value = +qttyInput.value - 1;
      setProductQuantity({ productId: product.id, productQuantity: qttyInput.value });
    }
  });

  const qttyWrapper = document.createElement("div");
  qttyWrapper.classList.add("qtty-wrapper");
  qttyWrapper.appendChild(minusBtn);
  qttyWrapper.appendChild(qttyInput);
  qttyWrapper.appendChild(plusBtn);
  wrapper.appendChild(qttyWrapper);
};

export default addQuantitySelector;
