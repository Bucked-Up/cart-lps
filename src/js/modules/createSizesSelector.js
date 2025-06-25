import { setProduct } from "./appData.js";

const createSizesSelector = ({ product, option }) => {
  const sizesSelector = document.createElement("div");
  sizesSelector.setAttribute("sizes-selector", product.id);
  sizesSelector.classList.add("cart__sizes-selector");

  const getInputText = ({ name }) => {
    switch (name) {
      case "Small":
        return "S";
      case "Medium":
        return "M";
      case "Large":
        return "L";
      case "X-Large":
        return "XL";
      default:
        return name;
    }
  };

  option.values.forEach((value) => {
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");
    const input = document.createElement("input");
    input.type = "radio";
    input.setAttribute("hidden", "hidden");
    const inputId = `${product.id}-${option.id}-${value.id}`;
    input.id = inputId;
    input.value = inputId;
    input.name = `${product.id}-${option.id}`;
    const label = document.createElement("label");
    label.setAttribute("for", inputId);
    const labelText = document.createElement("span");
    labelText.classList.add("label-text");
    let [size, price] = getInputText({ name: value.name }).split(" (");
    labelText.innerHTML = size;
    buttonWrapper.appendChild(input);
    buttonWrapper.appendChild(label);
    label.appendChild(labelText);
    input.addEventListener("change", () => {
      sizesSelector.classList.remove("shake");
      setProduct({ productId: product.id, optionId: option.id, valueId: value.id });
    });
    if (price) {
      price = price.split("(")[0].replaceAll(")","");
      const labelPrice = document.createElement("span");
      labelPrice.classList.add("label-price");
      labelPrice.innerHTML = price;
      labelText.appendChild(labelPrice);
    }
    sizesSelector.appendChild(buttonWrapper);
  });

  return sizesSelector;
};

export default createSizesSelector;
