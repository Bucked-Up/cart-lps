import createProductBase from "./createProductBase.js";

const createStaticProduct = ({ product }) => {
  document.querySelector("[cart-qtty]").innerHTML = +document.querySelector("[cart-qtty]").innerHTML+1
  const [card, image, productTitle] = createProductBase();
  productTitle.innerHTML = product.name;
  image.alt = product.name;
  image.src = product.image;
  return card;
};

export default createStaticProduct;
