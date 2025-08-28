import { setBumpCoupon, setCoupon, setProperties } from "./modules/appData.js";
import createCart from "./modules/createCart.js";
import fetchProducts from "./modules/fetchProducts.js";
import handleBuy from "./modules/handleBuy.js";
import handleCart from "./modules/handleCart.js";
import handleError from "./modules/handleError.js";
import handleNoCart from "./modules/handleNoCart.js";
import setCookies from "./modules/setCookies.js";
import toggleLoading from "./modules/toggleLoading.js";
import closeCart from "./modules/closeCart.js";
import createDynamicCartIcon from "./modules/createDynamicCartIcon.js";
import handleProductProperties from "./modules/handleProductProperties.js";
import handleQuantityBump from "./modules/handleBumps/handleQuantityBump.js";
import handleProductBump from "./modules/handleBumps/handleProductBump.js";
import createProducts from "./modules/createProducts/createProducts.js";
import openCart from "./modules/openCart.js";

const lpCart = async ({ noCart, country, pageData, productIds, couponCode, bump, isDynamic, customButtons }) => {
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      document.body.classList.remove("loading");
      closeCart();
    }
  });
  try {
    toggleLoading();
    const [products, bumpProducts] = await Promise.all([fetchProducts({ productIds, country }), fetchProducts({ productIds: bump?.type === "product" && bump?.ids, country })]);
    if (products.some((product) => Object.keys(product.stock).every((key) => product.stock[key] <= 0))) throw new Error("Out of stock products.");
    // handleIntellimize();
    setCookies({ couponCode, pageId: pageData.pageId });
    setProperties({ noCart, country, pageData, productIds, couponCode, bump, isDynamic });

    const [cartWrapper, inCartContainer, cartOrderBumpsContainer, buyButton] = createCart();
    document.body.appendChild(cartWrapper);

    if (isDynamic) {
      createDynamicCartIcon(cartWrapper);
      setCoupon(couponCode);
    }

    const buttons = document.querySelectorAll("[cart-button]");
    buttons.forEach((button) => {
      button.addEventListener("click", async () => {
        const properties = JSON.parse(button.getAttribute("cart-button").replaceAll("'", '"') || null) || (customButtons && customButtons[button.id]);
        if (isDynamic) {
          const filteredProducts = products.filter((product) => properties.productIds.map((id) => id.id).includes(Number(product.id)));
          handleProductProperties(filteredProducts, productIds);
          createProducts({ products: filteredProducts, inCartContainer, cartWrapper });
        } else {
          setCoupon(couponCode);
          if (properties?.bumpCoupon) setBumpCoupon(properties.bumpCoupon);
          else setBumpCoupon("");
          if (noCart || (properties && properties.noCart)) handleNoCart({ properties, products, productIds, country });
          else handleCart({ properties, products, productIds, inCartContainer, cartWrapper });
        }
        openCart();
      });
    });
    if (bump?.type === "quantity") handleQuantityBump(bump, cartOrderBumpsContainer, inCartContainer);
    else if (bump?.type === "product") handleProductBump(bump, bumpProducts, cartOrderBumpsContainer);
    buyButton.addEventListener("click", () => handleBuy(country));
    toggleLoading();
  } catch (e) {
    console.error(e);
    handleError();
  }
};

window.lpCart = lpCart;
