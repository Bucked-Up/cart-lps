import { setProductOptionValue } from "./appData.js";
import sendViewedProducts from "./sendViewedProducts.js";

const handleCustomVariants = (data, productIds) => {
  const givenOptions = productIds.find((el) => el.id == data.product.id);
  if (givenOptions.customVariants) {
    givenOptions.customVariants.forEach((customVariant, i) => {
      data.product.options
        .find((option) => option.id === customVariant.optionId)
        .values.push({
          id: `custom-${i}`,
          name: customVariant.name,
          images: [customVariant.image],
        });
      data.product.stock[`[custom-${i}]`] = 0;
    });
  }
};

const handleForceSingleOption = (data, productIds) => {
  const givenOptions = productIds.find((el) => el.id == data.product.id);
  if (givenOptions.forceSingleOption) {
    const optionId = givenOptions.forceSingleOption.optionId;
    const valueId = givenOptions.forceSingleOption.valueId;
    Object.keys(data.product.stock).forEach((key) => {
      if (!key.includes(`${valueId}`)) delete data.product.stock[key];
      else {
        const stockValue = data.product.stock[key];
        const newKey = key.replace(valueId, "").replace(",", "");
        delete data.product.stock[key];
        data.product.stock[newKey] = stockValue;
      }
    });
    data.product.options = data.product.options.filter((option) => option.id !== optionId);
    setProductOptionValue({ productId: data.product.id, optionId, valueId });
  }
};

const fetchProducts = async ({ country, productIds }) => {
  const ids = productIds.map((el) => el.id);
  const fetchApi = async (id) => {
    let url = `https://funnels.buckedup.com/product/json/detail?product_id=${id}`;
    if (country && country !== "us") url = url + `?country=${country}`;
    try {
      const response = await fetch(url);
      if (response.status === 404) throw new Error(`Product ${id} Not Found.`);
      if (response.status == 500 || response.status == 400) throw new Error("Sorry, there was a problem.");
      const data = await response.json();
      handleCustomVariants(data, productIds);
      handleForceSingleOption(data, productIds);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const data = await Promise.all(ids.map(fetchApi));
  sendViewedProducts(data);
  data.forEach((item) => {
    if (Object.keys(item.product.stock).every((key) => item.product.stock[key] <= 0)) console.error(`${item.product.name} Out of stock.`);
  });
  return data.map((data) => data.product);
};

export default fetchProducts;
