import { getProducts, deleteProductOption } from "./appData.js";

const checkSizeStock = ({ product }) => {
  const sizesInputs = document.querySelectorAll(`[name='${product.id}-${product.options[1]?.id}']`);
  sizesInputs.forEach((input) => input.removeAttribute("disabled"));
  const products = getProducts();
  if (products[product.id] && products[product.id].type === "dependent") {
    const mainSelected = products[product.id].options[product.options[0].id].value;
    const stockKeys = Object.keys(product.stock).filter((key) => key.includes(mainSelected));
    sizesInputs.forEach((input) => {
      const valueId = input.id.split("-")[2];
      const stockKey = stockKeys.find((key) => key.includes(valueId));
      if (product.stock[stockKey] <= 0) {
        input.setAttribute("disabled", "disabled");
        if (input.checked) {
          input.checked = false;
          deleteProductOption({ productId: product.id, optionId: product.options[1].id });
        }
      }
    });
  }
};

export default checkSizeStock;
