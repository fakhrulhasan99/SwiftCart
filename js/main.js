const productContainer = document.getElementById("productContainer");

let allProducts = [];

const fetchProducts = () => {

    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            showTrendingProducts();
        });
};

const showTrendingProducts = () => {
    const topThree = allProducts.slice(0, 3);
    renderProducts(topThree);
};

const renderProducts = (products) => {
    productContainer.innerHTML = "";

    products.forEach((product, index) => {
        const { image, title, price, category, rating, description } = product;

        const card = document.createElement("div");
        card.className =
            "border border-slate-300 rounded-2xl p-4 shadow flex flex-col justify-between";

        const modalId = `modal_${index}`;

        card.innerHTML = `
      <img src="${image}" class="h-40 w-full mx-auto object-contain mb-4 bg-slate-300 py-4 rounded-2xl" />
      <div class="flex justify-between mb-2">
        <p class="text-violet-800 bg-violet-100 px-2 rounded-full">${category}</p>
        <div class="flex items-center gap-2">
            <i class="fa-solid fa-star text-yellow-400"></i>
            <p class="text-slate-600">${rating.rate}</p>
            <p class="text-slate-600">(${rating.count})</p>
        </div>
      </div>
      <h3 class="font-semibold mb-2">${title}</h3>
      <p class="text-violet-600 font-bold mb-3">$${price}</p>
      <div class="flex justify-between">
        <button class="btn btn-sm w-5/12 btn-details">
            <i class="fa-regular fa-eye"></i> Details
        </button>
        <button class="btn btn-sm btn-primary w-5/12">
            <i class="fa-solid fa-cart-arrow-down"></i> Add
        </button>
      </div>

    <!-- Modal -->
      <dialog id="${modalId}" class="modal">
        <div class="modal-box">
          <img src="${image}" class="h-80 w-full mx-auto object-contain mb-4 bg-slate-300 py-4 rounded-2xl" />
            <div class="flex justify-between mb-2">
            <p class="text-violet-800 bg-violet-100 px-2 rounded-full">${category}</p>
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-star text-yellow-400"></i>
                <p class="text-slate-600">${rating.rate}</p>
                <p class="text-slate-600">(${rating.count})</p>
            </div>
        </div>
        <h3 class="font-semibold mb-2 text-4xl">${title}</h3>
        <p class="py-4">${description}</p>
        <p class="text-violet-600 text-4xl font-bold mb-3">$${price}</p>
          <div class="modal-action">
            <button class="btn w-5/12" onclick="document.getElementById('${modalId}').close()">Close</button>
            <button class="btn btn-primary w-5/12">
            <i class="fa-solid fa-cart-arrow-down"></i> Add
        </button>
          </div>
        </div>
      </dialog>
    `;

        productContainer.appendChild(card);

        // Attach click event to button AFTER it's added to the DOM
        const detailsBtn = card.querySelector(".btn-details");
        const modal = card.querySelector(`#${modalId}`);
        detailsBtn.addEventListener("click", () => {
            modal.showModal();
        });
    });
};


fetchProducts();
