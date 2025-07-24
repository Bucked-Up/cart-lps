import { setProductAsBump } from "./appData.js";
import createProducts from "./createProducts.js";
import handleProductProperties from "./handleProductProperties.js";

const handleProductBump = (bump, bumpProducts, cartOrderBumpsContainer) => {
  handleProductProperties(bumpProducts, bump.ids);
  createProducts({ products: bumpProducts, inCartContainer: cartOrderBumpsContainer, isBump: true });
  bumpProducts.forEach((product) => {
    setProductAsBump({ productId: product.id });
  });
};

export default handleProductBump;
