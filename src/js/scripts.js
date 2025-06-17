import createCart from "./modules/createCart.js";
import createProducts from "./modules/createProducts.js";
import fetchProducts from "./modules/fetchProducts.js";
import handleBuy from "./modules/handleBuy.js";
import handleError from "./modules/handleError.js";
import toggleLoading from "./modules/toggleLoading.js";

const main = async ({ noCart, country, dataLayer, productIds, couponCode }) => {
  try{
    toggleLoading();
    const products = await fetchProducts({ ids: productIds.map((el) => el.id) });
    if(products.some(product=>Object.keys(product.stock).every(key=>product.stock[key]<=0))) throw new Error("Out of stock products.")
    localStorage.setItem("lp_products", "{}");
    localStorage.setItem("lp_coupon", couponCode);
  
    const [cartWrapper, inCartContainer, buyButton] = createCart();
    document.body.appendChild(cartWrapper);
    document.querySelector("[cart-qtty]").innerHTML = Object.keys(products).length;
  
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
  }catch(e){
    console.error(e);
    handleError();
  }
};
main({
  noCart: false,
  country: "us",
  dataLayer: {},
  productIds: [{ id: 935 }, { id: 924 }, { id: 979 }],
  couponCode: "test",
});
