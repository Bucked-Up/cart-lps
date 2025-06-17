import createDropdownItems from "./createDropdownItems.js";

const createDropdownSelector = ({ product, option, image }) => {
  const cartDropdown = document.createElement("div");
  cartDropdown.addEventListener("click", (e) => {
    if (e.target.tagName !== "INPUT") cartDropdown.classList.toggle("active");
  });
  document.addEventListener("click", (e) => {
    if (!cartDropdown.contains(e.target) || e.target.tagName === "INPUT") cartDropdown.classList.remove("active");
  });
  const dropdownText = document.createElement("p");
  dropdownText.innerHTML = option.values[0].name;
  const dropdownVariantsWrapper = document.createElement("div");
  let arrowIcon = new DOMParser().parseFromString('<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5981 15.5C11.4434 17.5 8.55662 17.5 7.40192 15.5L1.33975 5C0.185047 3 1.62842 0.499998 3.93782 0.499998L16.0622 0.499999C18.3716 0.5 19.815 3 18.6603 5L12.5981 15.5Z" fill="black"></path></svg>', "image/svg+xml").documentElement;
  cartDropdown.classList.add("cart__dropdown");
  cartDropdown.role = "button";
  dropdownVariantsWrapper.classList.add("cart__dropdown__variants");
  cartDropdown.appendChild(dropdownText);
  cartDropdown.appendChild(arrowIcon);
  cartDropdown.appendChild(dropdownVariantsWrapper);
  createDropdownItems({ product, option, image, dropdownText, dropdownVariantsWrapper });
  return cartDropdown;
};

export default createDropdownSelector;
