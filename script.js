let cartItems = [];

// Sample product data
const products = [
  { id: 1, name: 'Product 1', price: 10, image: 'product1.jpg' },
  { id: 2, name: 'Product 2', price: 15, image: 'product2.jpg' },
  { id: 3, name: 'Product 3', price: 20, image: 'product3.jpg' },
];

function addToCart(productId) {
  const selectedProduct = products.find(product => product.id === productId);

  if (selectedProduct) {
    cartItems.push(selectedProduct);
    updateCartCount();
    updateCartDropdown();
  }
}

function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  cartCount.textContent = cartItems.length;
}

function updateCartDropdown() {
  const cartItemsList = document.getElementById('cartItems');
  cartItemsList.innerHTML = '';

  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
      </div>
    `;
    cartItemsList.appendChild(li);
  });
}

function toggleCart() {
  const cartDropdown = document.getElementById('cartDropdown');
  cartDropdown.style.display = cartDropdown.style.display === 'none' ? 'block' : 'none';
}

// Close cart dropdown when clicking outside
document.addEventListener('click', function(event) {
  const cartDropdown = document.getElementById('cartDropdown');
  const cart = document.querySelector('.cart');

  if (event.target !== cart && !cart.contains(event.target) && event.target !== cartDropdown && !cartDropdown.contains(event.target)) {
    cartDropdown.style.display = 'none';
  }
});

// Display products in the UI
function displayProducts() {
  const itemsContainer = document.querySelector('.items');

  products.forEach(product => {
    const item = document.createElement('div');
    item.classList.add('item');
    item.onclick = () => addToCart(product.id);
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-details">
        <p class="product-name">${product.name}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
    `;
    itemsContainer.appendChild(item);
  });
}

// Initialize the UI
displayProducts();
updateCartCount();
updateCartDropdown();
