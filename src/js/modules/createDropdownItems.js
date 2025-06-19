import { setProduct } from "./appData.js";
import checkSizeStock from "./checkSizeStock.js";
import isDependent from "./isDependent.js";

const createDropdownItems = ({ product, option, image, dropdownText, dropdownVariantsWrapper }) => {
  let hasChecked = false;
  option.values.forEach((value) => {
    const valueId = `${product.id}-${option.id}-${value.id}`;
    const buttonWrapper = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const ball = document.createElement("span");
    const text = document.createElement("span");

    input.type = "radio";
    input.id = valueId;
    input.name = `${product.id}-${option.id}`;
    input.value = valueId;
    input.setAttribute("hidden", "hidden");

    if (
      (isDependent(product) &&
        Object.keys(product.stock)
          .filter((key) => key.includes(value.id))
          .every((key) => product.stock[key] <= 0)) ||
      (!isDependent(product) && product.stock[`[${value.id}]`] <= 0)
    ) {
      input.setAttribute("disabled", "disabled");
    } else if (!hasChecked) {
      setProduct({
        productId: product.id,
        optionId: option.id,
        valueId: value.id,
      });
      input.checked = true;
      hasChecked = true;
    }

    input.addEventListener("change", () => {
      setProduct({
        productId: product.id,
        optionId: option.id,
        valueId: value.id,
      });
      image.src = value.images[0];
      image.alt = value.name;
      dropdownText.innerHTML = value.name;
      checkSizeStock({ product });
    });

    label.setAttribute("for", valueId);
    label.role = "button";

    text.innerHTML = value.name;

    buttonWrapper.classList.add("button-wrapper");
    ball.classList.add("label-ball");
    text.classList.add("label-text");
    buttonWrapper.appendChild(input);
    buttonWrapper.appendChild(label);
    label.appendChild(ball);
    label.appendChild(text);
    dropdownVariantsWrapper.appendChild(buttonWrapper);
  });
};

export default createDropdownItems;
