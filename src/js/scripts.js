import createCart from "./modules/createCart.js";
import createProducts from "./modules/createProducts.js";
import fetchProducts from "./modules/fetchProducts.js";
import handleBuy from "./modules/handleBuy.js";
import handleError from "./modules/handleError.js";
import handleIntellimize from "./modules/intellimize.js";
import setCookies from "./modules/setCookies.js";
import toggleLoading from "./modules/toggleLoading.js";

const lpCart = async ({ noCart, country, pageData, productIds, couponCode }) => {
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      document.body.classList.remove("loading");
    }
  });
  try {
    toggleLoading();
    const products = await fetchProducts({ productIds: productIds });
    if (products.some((product) => Object.keys(product.stock).every((key) => product.stock[key] <= 0))) throw new Error("Out of stock products.");
    handleIntellimize();
    setCookies({ couponCode, pageId: pageData.pageId });
    localStorage.setItem("lp_products", "{}");
    localStorage.setItem("lp_coupon", couponCode);

    const [cartWrapper, inCartContainer, buyButton] = createCart();
    document.body.appendChild(cartWrapper);

    const buttons = document.querySelectorAll("[cart-button]");
    buttons.forEach((button) => {
      let properties = button.getAttribute("cart-button");
      button.addEventListener("click", async () => {
        document.body.classList.toggle("no-scroll");
        document.querySelector("[cart-qtty]").innerHTML = 0;
        if (!properties) {
          localStorage.setItem("lp_coupon", couponCode);
          createProducts({ products, inCartContainer, cartWrapper });
        } else {
          properties = JSON.parse(button.getAttribute("cart-button"));
          const filteredProducts = products.filter((product) => properties.productIds.includes(Number(product.id)));
          if (properties.couponCode) localStorage.setItem("lp_coupon", properties.couponCode);
          createProducts({ products: filteredProducts, inCartContainer, cartWrapper });
        }
      });
    });

    buyButton.addEventListener("click", () => handleBuy(country));
    toggleLoading();
  } catch (e) {
    console.error(e);
    handleError();
  }
};
// lpCart({
  // noCart: false,
  // country: "us",
  // pageData: { pageId: "test" },
  // productIds: [{ id: 935, title: "test title" }, { id: 924 }, { id: 979 }],
  // couponCode: "test",
// });
window.lpCart = lpCart;
