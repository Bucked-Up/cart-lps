import sendViewedProducts from "./sendViewedProducts.js";

const fetchProducts = async ({ country, productIds }) => {
  const ids = productIds.map((el) => el.id);
  const fetchApi = async (id) => {
    // let url = `https://www.buckedup.com/product/json/detail?product_id=${id}`;
    let url = `https://ar5vgv5qw5.execute-api.us-east-1.amazonaws.com/list/${id}`;
    if (country && country !== "us") url = url + `?country=${country}`;
    try {
      const response = await fetch(url);
      if (response.status === 404) throw new Error(`Product ${id} Not Found.`);
      if (response.status == 500 || response.status == 400) throw new Error("Sorry, there was a problem.");
      const data = await response.json();
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
