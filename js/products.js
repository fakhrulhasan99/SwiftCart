const container = document.getElementById("allProductsContainer");

const fetchProducts = () => {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {

            renderProducts(data);
        });
};

const renderProducts = (products) => {
    container.innerHTML = "";

    products.forEach(product => {
        const { image, title, price, category, rating } = product;

        const card = document.createElement("div");
        card.className =
            "border border-slate-300 rounded-2xl p-4 shadow flex flex-col justify-between";

        card.innerHTML = `
      <img src="${image}" class="h-40 w-full mx-auto object-contain mb-4 bg-slate-300 py-4 rounded-2xl" />
      <div class="flex justify-between mb-2">
        <p class="text-violet-800 bg-violet-100 px-2 rounded-full md:text-xs">${category}</p>
        <div class="flex items-center gap-2">
            <i class="fa-solid fa-star text-yellow-400"></i>
            <p class="text-slate-600">${rating.rate}</p>
            <p class="text-slate-600">(${rating.count})</p>
        </div>
      </div>
      <h3 class="font-semibold mb-2">${title}</h3>
      <p class="text-violet-600 font-bold mb-3">$${price}</p>
      <div class="flex justify-between">
        <button class="btn btn-sm w-5/12">
            <i class="fa-regular fa-eye"></i> Details
        </button>
        <button class="btn btn-sm btn-primary w-5/12">
            <i class="fa-solid fa-cart-arrow-down"></i> Add
        </button>
      </div>
    `;

        container.appendChild(card);
    });
};

fetchProducts();
