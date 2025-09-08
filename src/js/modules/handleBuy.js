import { getCoupon, getProducts } from "./appData.js";
import getCookie from "./getCookie.js";
import sendVibeLead from "./sendVibeLead.js";
import toggleLoading from "./toggleLoading.js";

const getRecurringIdString = ({ i, recurringId }) => `&products[${i}][product_recurring_id]=${recurringId}`;

const handleBuy = (country) => {
  const urlParams = new URLSearchParams(window.location.search);
  const rlAnonId = getCookie("rl_anonymous_id");
  if (rlAnonId) urlParams.set("rl_anonymous_id", rlAnonId);
  urlParams.set("cc", getCoupon());
  urlParams.set("source_url", location.href);
  const products = getProducts();
  let string = "";
  let i = 0;
  for (let prodId in products) {
    if (products[prodId].isBump) continue;
    if (products[prodId].type === "oneCard" && (!products[prodId].options || products[prodId].options[Object.keys(products[prodId].options)[0]].values.length < products[prodId].quantity)) {
      document.querySelector(`[variants-selector='${prodId}']`).classList.add("shake");
      return;
    }
    if (products[prodId].type === "dependent" && Object.keys(products[prodId].options).length < 2) {
      document.querySelector(`[sizes-selector='${prodId}']`).classList.add("shake");
      return;
    }
    if (products[prodId].type === "isWhole") {
      const fixedOption = Object.keys(products[prodId].options).find((optionKey) => products[prodId].options[optionKey].value);
      const valuesOption = Object.keys(products[prodId].options).find((optionKey) => products[prodId].options[optionKey].values);
      for (let j = 0; j < products[prodId].options[valuesOption].values.length; j++) {
        string = string + `&products[${i}][id]=${prodId}&products[${i}][quantity]=1&products[${i}][options][${valuesOption}]=${products[prodId].options[valuesOption].values[j]}`;
        if (fixedOption) string = string + `&products[${i}][options][${fixedOption}]=${products[prodId].options[fixedOption].value}`;
        i++;
      }
      continue;
    }
    if (products[prodId].type === "oneCard") {
      const firstOptionId = Object.keys(products[prodId].options)[0];
      for (let j = 0; j < products[prodId].quantity; j++) {
        string = string + `&products[${i}][id]=${prodId}&products[${i}][quantity]=1&products[${i}][options][${firstOptionId}]=${products[prodId].options[firstOptionId].values[j]}`;
        if (products[prodId].recurringId) string = string + getRecurringIdString({ i, recurringId: products[prodId].recurringId });
        i++;
      }
      continue;
    }
    string = string + `&products[${i}][id]=${prodId}&products[${i}][quantity]=${products[prodId].quantity || 1}`;
    if (products[prodId].recurringId) string = string + getRecurringIdString({ i, recurringId: products[prodId].recurringId });
    if (products[prodId].recurringIdSeparate && products[prodId].type === "static") {
      i++;
      string = string + `&products[${i}][id]=${prodId}&products[${i}][quantity]=1` + getRecurringIdString({ i, recurringId: products[prodId].recurringIdSeparate });
      continue;
    }
    if (products[prodId].type !== "static")
      Object.keys(products[prodId].options).forEach((optionId) => {
        string = string + `&products[${i}][options][${optionId}]=${products[prodId].options[optionId].value}`;
      });
    i++;
  }
  sendVibeLead();
  toggleLoading();
  if (country === "uk") window.location.href = `https://www.buckedup.co.uk/cart/add?${string}&clear=true&${urlParams}`;
  else if (country === "us") window.location.href = `https://funnels.buckedup.com/cart/add?${string}&clear=true&${urlParams}`;
  else window.location.href = `https://${country && country !== "us" ? country + "." : ""}buckedup.com/cart/add?${string}&clear=true&${urlParams}`;
  // else console.log(`https://${country && country !== "us" ? country + "." : ""}buckedup.com/cart/add?${string}&clear=true&${urlParams}`);
};

export default handleBuy;
