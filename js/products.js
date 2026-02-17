const container = document.getElementById("allProductsContainer");

const fetchProducts = async () => {
    try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) throw new Error("Failed to fetch products");

        const products = await res.json();
        renderProducts(products);

    } catch (error) {
        container.innerHTML =
            `<p class="text-red-500">${error.message}</p>`;
    }
};

const renderProducts = (products) => {
    container.innerHTML = "";

    products.forEach(product => {
        const { image, title, price } = product;

        const card = document.createElement("div");
        card.className = "border rounded-xl p-4 shadow";

        card.innerHTML = `
        <img src="${image}" class="h-40 mx-auto object-contain mb-4" />
        <h3 class="font-semibold mb-2">${title}</h3>
        <p class="text-violet-600 font-bold mb-3">$${price}</p>
        <button class="btn btn-sm btn-primary w-full">
            Add to Cart
        </button>
    `;

        container.appendChild(card);
    });
};

fetchProducts();
