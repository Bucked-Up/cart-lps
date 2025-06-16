import createCart from "./modules/createCart.js";
import createProducts from "./modules/createProducts.js";
import fetchProducts from "./modules/fetchProducts.js";
import handleBuy from "./modules/handleBuy.js";
import toggleLoading from "./modules/toggleLoading.js";

const main = async ({ noCart, country, dataLayer, productIds, couponCode }) => {
  toggleLoading();
  const products = await fetchProducts({ ids: Object.keys(productIds) });
  localStorage.setItem("lp_products", "{}");
  localStorage.setItem("lp_coupon", couponCode);

  const [cartWrapper, inCartContainer, buyButton] = createCart();
  document.body.appendChild(cartWrapper);
  document.querySelector("[cart-qtty]").innerHTML =
    Object.keys(products).length;

  createProducts({ products, inCartContainer, cartWrapper });

  const buttons = document.querySelectorAll("[cart-button]");
  buttons.forEach((button) => {
    const properties = button.getAttribute("cart-button");
    button.addEventListener("click", async () => {
      if (!properties || properties.trim() !== "") {
        createProducts({ products, inCartContainer, cartWrapper });
      }
    });
  });

  buyButton.addEventListener("click", () => handleBuy(country));
  toggleLoading();
};
main({
  noCart: false,
  country: "us",
  dataLayer: {},
  productIds: {
    935: {},
    201: {},
    999: {},
    1020: {},
  },
  couponCode: "test",
});
