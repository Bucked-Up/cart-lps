# lpCart

## Add this to the footer:

```
<script>
  document.head.appendChild(Object.assign(document.createElement("link"), {
    rel: "stylesheet",
    href: `https://cdn.jsdelivr.net/gh/Bucked-Up/cart-lps@1/src/scss/style.css?cb=${Math.floor(Date.now()/600000)}`
  }));
</script>
<script>
  document.head.appendChild(Object.assign(document.createElement("script"), {
    src: `https://cdn.jsdelivr.net/gh/Bucked-Up/cart-lps@1/cart-lps.min.js?cb=${Math.floor(Date.now() / 600000)}`,
    onload: () => lpCart({
      noCart: false,
      country: "us",
      pageData: { pageId: "example" },
      productIds: [{ id: 999 }],
      couponCode: "example",
    })
  }));
</script>
```

## Cart Activation

To activate the cart, the page must include a button element with a cart-button attribute.

Example:

```
<button cart-button></button>
```

Optionally, the cart-button attribute can contain a JSON string with productIds and couponCode:

```
<button cart-button="{'productIds':[{'id':1,'quantity':2}],'couponCode':'ABC123'}"></button>
```

## Parameters

It receives an object with the following properties:

- noCart  
  True to have the cart interface, false to go to checkout.

- country  
  The country to consider for the cart operation.

- pageData  
  An object containing information about the current page; must include a pageId property with the page's unique identifier.

- productIds  
  An array of products to add to the cart. Each product is an object that can have:

  - id  
    The unique identifier of the product.
  - quantity  
    The number of units to add.
  - title  
    The product's name.
  - customVariants  
    An array listing custom variants for the product.
    - optionId  
      The unique identifier for the option.
    - name  
      The variant's name (such as "Large" or "Red").
    - image  
      A URL for the variant's image.
  - forceSingleOption  
    An object to lock a specific option and value for this product. Contains:
    - optionId  
      The unique identifier of the option to force.
    - valueId  
      The specific value to assign to that option.

- bump (optional)  
  An optional object for additional offers or upsells. Can have:

  - type  
    Determines the bump type (just quantity atm)
  - ids  
    A list of product IDs included in the bump.
  - quantity  
    The number of items in the bump.
  - name  
    The bump's name.
  - image  
    A URL of an image illustrating the bump.
  - price  
    The bump's offer price.
  - couponCode  
    A coupon code applied only to the bump.

- couponCode  
  The discount code to apply to the cart.
