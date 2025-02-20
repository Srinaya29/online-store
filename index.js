const products = [
  {
    id: 1,
    name: "Laptop",
    desc: "A powerful laptop for work and gaming.",
    price: 800,
    image: "assets/images/product1.jpg"
  },
  {
    id: 2,
    name: "Desktop Computer",
    desc: "A high-performance desktop computer.",
    price: 1200,
    image: "assets/images/product2.jpg"
  },
  {
    id: 3,
    name: "Gaming Laptop",
    desc: "A fast gaming laptop with RGB keyboard.",
    price: 1500,
    image: "assets/images/product3.jpeg"
  }
];

// ✅ Show products with images in index.html
const showProducts = () => {
  let str = "<div class='row'>";
  products.forEach((product) => {
    str += `
      <div class='box'>
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h3>${product.name}</h3>
        <h4>Price: $${product.price}</h4>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
  document.getElementById("divProducts").innerHTML = str + "</div>";
};

// ✅ Add to cart and save in localStorage
const addToCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  cart[id] = (cart[id] || 0) + 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};

// ✅ Update cart count in header
const updateCartCount = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  let totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  document.getElementById("items").innerText = totalItems;
};

// ✅ Show cart WITHOUT images in cart.html
const showCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  let cartHTML = "";
  let total = 0;

  Object.keys(cart).forEach(id => {
    let product = products.find(p => p.id == id);
    let quantity = cart[id];
    let subtotal = product.price * quantity;
    total += subtotal;

    cartHTML += `
      <div class="cart-item">
        <h3>${product.name}</h3>
        <h4>Price: $${product.price} | Quantity: ${quantity} | Total: $${subtotal}</h4>
        <button onclick="removeFromCart(${product.id})">Remove</button>
      </div>
    `;
  });

  document.getElementById("divCart").innerHTML = cartHTML || "<p>Your cart is empty.</p>";
  document.getElementById("divTotal").innerHTML = `<h3>Grand Total: $${total}</h3>`;
};

// ✅ Remove item from cart
const removeFromCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (cart[id]) {
    cart[id] -= 1;
    if (cart[id] === 0) {
      delete cart[id];
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
  updateCartCount();
};

// ✅ Run functions when page loads
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("divProducts")) {
    showProducts();
  }
  if (document.getElementById("divCart")) {
    showCart();
  }
  updateCartCount();
});