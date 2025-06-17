const checkSizeStock = ({ product }) => {
  const sizesInputs = document.querySelectorAll(`[name='${product.id}-${product.options[1]?.id}']`);
  sizesInputs.forEach((input) => input.removeAttribute("disabled"));
  const storage = JSON.parse(localStorage.getItem("lp_products") || "{}");
  if (storage[product.id] && storage[product.id].type !== "static") {
    const mainSelected = storage[product.id].options[product.options[0].id].value;
    const stockKeys = Object.keys(product.stock).filter((key) => key.includes(mainSelected));
    sizesInputs.forEach((input) => {
      const valueId = input.id.split("-")[2];
      const stockKey = stockKeys.find((key) => key.includes(valueId));
      if (product.stock[stockKey] <= 0) {
        input.setAttribute("disabled", "disabled");
        if(input.checked){
          input.checked = false;
          delete storage[product.id].options[product.options[1].id]
          localStorage.setItem("lp_products", JSON.stringify(storage));
        }
      }
    });
  }
};

export default checkSizeStock;
