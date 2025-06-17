import updateLocalStorageProduct from "./updateLocalStorageProduct.js";

const createDropdownItems = ({ product, option, image, dropdownText, dropdownVariantsWrapper }) => {
  option.values.forEach((value, i) => {
    const valueId = `${product.id}-${option.id}-${value.id}`;
    const buttonWrapper = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const ball = document.createElement("span");
    const text = document.createElement("span");
    if (i === 0) {
      updateLocalStorageProduct({
        productId: product.id,
        optionId: option.id,
        valueId: value.id,
      });
      input.checked = true;
    }
    input.type = "radio";
    input.id = valueId;
    input.name = `${product.id}-${option.id}`;
    input.value = valueId;
    input.setAttribute("hidden", "hidden");

    input.addEventListener("change", () => {
      updateLocalStorageProduct({
        productId: product.id,
        optionId: option.id,
        valueId: value.id,
      });
      image.src = value.images[0];
      image.alt = value.name;
      dropdownText.innerHTML = value.name;
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
