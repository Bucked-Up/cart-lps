const createProductBase = () => {
  const card = document.createElement("div");
  const cardContainer = document.createElement("div");
  const imageWrapper = document.createElement("div");
  const image = document.createElement("img");
  const productInfoWrapper = document.createElement("div");
  const productTitle = document.createElement("p");
  const optionTitle = document.createElement("p");

  card.classList.add("cart__product");
  cardContainer.classList.add("cart__product__container");
  imageWrapper.classList.add("cart__product__img-wrapper");
  productInfoWrapper.classList.add("cart__product__info");
  productTitle.classList.add("cart__product__title");
  optionTitle.classList.add("cart__product__option-title");

  card.appendChild(cardContainer);
  cardContainer.appendChild(imageWrapper);
  cardContainer.appendChild(productInfoWrapper);
  imageWrapper.appendChild(image);
  productInfoWrapper.appendChild(productTitle);
  productInfoWrapper.appendChild(optionTitle);

  return [card, image, productTitle, optionTitle, productInfoWrapper];
};

export default createProductBase;
