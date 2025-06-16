import createProductBase from "./createProductBase.js";
import updateLocalStorageProduct from "./updateLocalStorageProduct.js";

const createDropdownSelector = ({ product, option }) => {
  const [card, image, productTitle, optionTitle, productInfoWrapper] =
    createProductBase();
  image.src = option.values[0].images[0];
  image.alt = option.values[0].name;
  productTitle.innerHTML = product.name;
  optionTitle.innerHTML = option.name;

  const cartDropdown = document.createElement("div");
  cartDropdown.addEventListener("click", (e) => {
    cartDropdown.classList.remove("shake");
    if (e.target.tagName !== "INPUT") cartDropdown.classList.toggle("active");
  });
  document.addEventListener("click", (e) => {
    if (!cartDropdown.contains(e.target) || e.target.tagName === "INPUT")
      cartDropdown.classList.remove("active");
  });
  const dropdownText = document.createElement("p");
  const dropdownVariantsWrapper = document.createElement("div");
  let arrowIcon = new DOMParser().parseFromString(
    '<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5981 15.5C11.4434 17.5 8.55662 17.5 7.40192 15.5L1.33975 5C0.185047 3 1.62842 0.499998 3.93782 0.499998L16.0622 0.499999C18.3716 0.5 19.815 3 18.6603 5L12.5981 15.5Z" fill="black"></path></svg>',
    "image/svg+xml"
  ).documentElement;

  cartDropdown.classList.add("cart__dropdown");
  cartDropdown.role = "button";
  dropdownVariantsWrapper.classList.add("cart__dropdown__variants");

  dropdownText.innerHTML = option.values[0].name;

  cartDropdown.appendChild(dropdownText);
  cartDropdown.appendChild(arrowIcon);
  cartDropdown.appendChild(dropdownVariantsWrapper);
  productInfoWrapper.appendChild(cartDropdown);

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

  return card;
};

export default createDropdownSelector;
