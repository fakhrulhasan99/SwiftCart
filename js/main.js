const productContainer = document.getElementById("productContainer");
const viewAllBtn = document.getElementById("viewAllBtn");

let allProducts = [];

// Fetch products
const fetchProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    allProducts = data;

    showTrendingProducts(); // Show first 3 initially
  } catch (error) {
    productContainer.innerHTML =
      `<p class="text-red-500">${error.message}</p>`;
  }
};

// Show top 3 products
const showTrendingProducts = () => {
  const topThree = allProducts.slice(0, 3);
  renderProducts(topThree);
};

// Show all products
const showAllProducts = () => {
  renderProducts(allProducts);
};

// Render function
const renderProducts = (products) => {
  productContainer.innerHTML = "";

  products.forEach(product => {
    const { image, title, price } = product;

    const card = document.createElement("div");
    card.className =
      "border rounded-xl p-4 shadow hover:shadow-lg transition";

    card.innerHTML = `
        <img src="${image}" class="h-40 mx-auto object-contain mb-4" />
        <h3 class="font-semibold text-lg mb-2 line-clamp-2">${title}</h3>
        <p class="text-violet-600 font-bold mb-3">$${price}</p>
        <button class="btn btn-sm btn-primary w-full">Add to Cart</button>
    `;

    productContainer.appendChild(card);
  });
};

// Button event
viewAllBtn.addEventListener("click", showAllProducts);

// Initial call
fetchProducts();
