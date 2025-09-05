import { setProductAttribute } from "./appData.js";

const handleSelectRecurring = ({ productIds }) => {
  productIds.forEach((product) => {
    if (product.selectRecurring) {
      const select = document.querySelector(`[recurring-select='${product.id}']`);
      setProductAttribute({ productId: product.id, key: "recurringId", value: select.value });
      select.addEventListener("change", () => {
        setProductAttribute({ productId: product.id, key: "recurringId", value: select.value });
      });
    }
  });
  return;
};

export default handleSelectRecurring;
