const isStatic = (product) => product.options.length === 0 || product.options[0].type === "static" || product.hasSetVariant;

export default isStatic;
