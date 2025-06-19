let productsList = [];

function isValidInput(input) {
  return input.trim().length > 0;
}

function fetchProducts(url = 'https://dummyjson.com/products') {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      productsList = data.products;
      displayProducts(productsList);
    })
    .catch(err => {
      console.error('Error fetching products:', err);
    });
}

function displayProducts(products) {
  const container = document.getElementById('productList');
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = '<p>No products found.</p>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Rating:</strong> ${product.rating}</p>
    `;
    container.appendChild(card);
  });
}

function searchProducts() {
  const query = document.getElementById('searchInput').value;

  if (!isValidInput(query)) {
    alert('Please enter a valid product name.');
    return;
  }

  fetchProducts(`https://dummyjson.com/products/search?q=${encodeURIComponent(query.trim())}`);
}

function sortProducts() {
  const sortValue = document.getElementById('sortSelect').value;
  let sorted = [...productsList];

  switch (sortValue) {
    case 'priceAsc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'priceDesc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'ratingAsc':
      sorted.sort((a, b) => a.rating - b.rating);
      break;
    case 'ratingDesc':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
  }

  displayProducts(sorted);
}

function applyFilters() {
  const brand = document.getElementById('brandFilter').value.toLowerCase();
  const minPrice = parseFloat(document.getElementById('minPrice').value);
  const maxPrice = parseFloat(document.getElementById('maxPrice').value);

  const filtered = productsList.filter(product => {
    const matchesBrand = !brand || product.brand.toLowerCase().includes(brand);
    const matchesMin = isNaN(minPrice) || product.price >= minPrice;
    const matchesMax = isNaN(maxPrice) || product.price <= maxPrice;
    return matchesBrand && matchesMin && matchesMax;
  });

  displayProducts(filtered);
}

window.onload = () => fetchProducts();