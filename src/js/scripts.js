import { resetProducts, setCoupon } from "./modules/appData.js";
import createCart from "./modules/createCart.js";
import fetchProducts from "./modules/fetchProducts.js";
import handleBuy from "./modules/handleBuy.js";
import handleCart from "./modules/handleCart.js";
import handleError from "./modules/handleError.js";
import handleNoCart from "./modules/handleNoCart.js";
import handleIntellimize from "./modules/intellimize.js";
import setCookies from "./modules/setCookies.js";
import toggleLoading from "./modules/toggleLoading.js";

const lpCart = async ({ noCart, country, pageData, productIds, couponCode }) => {
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      document.body.classList.remove("loading");
      resetProducts();
      setCoupon("");
    }
  });
  try {
    toggleLoading();
    const products = await fetchProducts({ productIds, country });
    if (products.some((product) => Object.keys(product.stock).every((key) => product.stock[key] <= 0))) throw new Error("Out of stock products.");
    handleIntellimize();
    setCookies({ couponCode, pageId: pageData.pageId });

    const [cartWrapper, inCartContainer, buyButton] = createCart();
    document.body.appendChild(cartWrapper);

    const buttons = document.querySelectorAll("[cart-button]");
    buttons.forEach((button) => {
      button.addEventListener("click", async () => {
        setCoupon(couponCode);
        const properties = JSON.parse(button.getAttribute("cart-button").replaceAll("'", '"') || null);
        if (noCart || (properties && properties.noCart)) handleNoCart({ properties, products, productIds });
        else handleCart({ properties, products, productIds, inCartContainer, cartWrapper });
      });
    });

    buyButton.addEventListener("click", () => handleBuy(country));
    toggleLoading();
  } catch (e) {
    console.error(e);
    handleError();
  }
};

window.lpCart = lpCart;
