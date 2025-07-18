const handleProductProperties = (products, properties) => {
  properties.forEach((property) => {
    const product = products.find((product) => product.id == property.id);
    if (!product) return;
    if (property.title) product.name = property.title;
    if (property.quantity) product.quantity = property.quantity;
    if(property.bumpPrice) product.bumpPrice = property.bumpPrice
    if(property.couponCode) product.couponCode = property.couponCode
    else delete product.quantity;
  });
};

export default handleProductProperties;
