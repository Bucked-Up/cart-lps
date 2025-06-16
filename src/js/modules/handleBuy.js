const handleBuy = (country) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("cc", localStorage.getItem("lp_coupon") || urlParams.get("cc"));
  const products = JSON.parse(localStorage.getItem("lp_products"));
  let string = "";
  Object.keys(products).forEach((prodId, i) => {
    string = string + `&products[${i}][id]=${prodId}&products[${i}][quantity]=${1}`;
    if (products[prodId].type !== "static")
      Object.keys(products[prodId].options).forEach((optionId) => {
        string = string + `&products[${i}][options][${optionId}]=${products[prodId].options[optionId].value}`;
      });
  });
  if (country === "uk") window.location.href = `https://www.buckedup.co.uk/cart/add?${string}&clear=true&${urlParams}`;
  else window.location.href = `https://${country && country !== "us" ? country + "." : ""}buckedup.com/cart/add?${string}&clear=true&${urlParams}`;
};

export default handleBuy;
