const handleProductProperties = (products, properties) => {
  properties.forEach((property) => {
    const product = products.find((product) => product.id == property.id);
    if (!product) return;
    if (property.title) product.name = property.title;
    if (property.quantity) product.quantity = property.quantity;
    else delete product.quantity;
    if (property.bumpPrice) product.bumpPrice = property.bumpPrice;
    if (property.couponCode) product.couponCode = property.couponCode;
    if (property.variant) product.hasSetVariant = property.variant;
    if (property.oldPrice) product.oldPrice = property.oldPrice;
    if (property.newPrice) product.newPrice = property.newPrice;
  });
};

export default handleProductProperties;
