// Input Validation Function
function isValidInput(input) {
  return input.trim().length > 0;
}

// Search and Fetch Products
function searchProducts() {
  const query = document.getElementById('searchInput').value;
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Clear previous results

  if (!isValidInput(query)) {
    alert('Please enter a valid product name.');
    return;
  }

  fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query.trim())}`)
    .then(res => res.json())
    .then(data => {
      if (data.products.length === 0) {
        productList.innerHTML = '<p>No products found.</p>';
        return;
      }

      data.products.forEach(product => {
        const productCard = `
          <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}" />
            <h4>${product.title}</h4>
            <p><strong>Price:</strong> $${product.price}</p>
          </div>
        `;
        productList.innerHTML += productCard;
      });
    })
    .catch(error => {
      productList.innerHTML = '<p>Error fetching products. Please try again later.</p>';
      console.error(error);
    });
}

// Optional: Load initial products
window.onload = function () {
  fetch('https://dummyjson.com/products?limit=12')
    .then(res => res.json())
    .then(data => {
      const productList = document.getElementById('productList');
      data.products.forEach(product => {
        const productCard = `
          <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}" />
            <h4>${product.title}</h4>
            <p><strong>Price:</strong> $${product.price}</p>
          </div>
        `;
        productList.innerHTML += productCard;
      });
    });
};