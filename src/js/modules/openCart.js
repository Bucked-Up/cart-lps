const openCart = () => {
  document.body.classList.toggle("no-scroll");
  document.querySelector(".cart-wrapper").classList.add("active");
};

export default openCart;
