const handleProductProperties = (products, properties) => {
  properties.forEach((property) => {
    const product = products.find((product) => product.id == property.id);
    if (property.title) product.name = property.title;
    if (property.quantity) product.quantity = property.quantity;
    else delete product.quantity;
  });
};

export default handleProductProperties;
