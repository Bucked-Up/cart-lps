import createProductBase from "./createProductBase.js";
import setProductQuantity from "./setProductQuantity.js";

const createStaticProduct = ({ product }) => {
  document.querySelector("[cart-qtty]").innerHTML = +document.querySelector("[cart-qtty]").innerHTML + (product.quantity || 1);
  const [card, image, imageWrapper, productTitle] = createProductBase();
  productTitle.innerHTML = product.name;
  image.alt = product.name;
  image.src = product.image;
  if (product.quantity){
    setProductQuantity({ productId: product.id, productQuantity: product.quantity });
    const span = document.createElement("span")
    span.innerHTML = product.quantity;
    imageWrapper.appendChild(span)
  } 
  return card;
};

export default createStaticProduct;
