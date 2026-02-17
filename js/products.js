const container = document.getElementById("allProductsContainer");
const buttons = document.querySelectorAll(".category-btn");

const fetchProducts = (category = "all") => {
    container.innerHTML = `
    <div class="flex justify-center col-span-full">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  `;

    let url = "https://fakestoreapi.com/products";

    if (category !== "all") {
        url = `https://fakestoreapi.com/products/category/${category}`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderProducts(data);
        });
};

buttons.forEach(button => {
    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("btn-info"));

        button.classList.add("btn-info");

        const category = button.dataset.category;

        fetchProducts(category);
    });
});

const renderProducts = (products) => {
  container.innerHTML = "";

  products.forEach((product, index) => {
    const { image, title, price, category, rating, description } = product;

    const card = document.createElement("div");
    card.className =
      "border border-slate-300 rounded-2xl p-4 shadow flex flex-col justify-between";

    const modalId = `modal_${index}`;

    card.innerHTML = `
      <img src="${image}" class="h-40 w-full mx-auto object-contain mb-4 bg-slate-300 py-4 rounded-2xl" />
      <div class="flex justify-between mb-2 text-xs">
        <p class="text-violet-800 bg-violet-100 px-2 rounded-full">${category}</p>
        <div class="flex items-center gap-2">
            <i class="fa-solid fa-star text-yellow-400"></i>
            <p class="text-slate-600">${rating.rate}</p>
            <p class="text-slate-600">(${rating.count})</p>
        </div>
      </div>
      <h3 class="font-semibold mb-2 text-left">${title}</h3>
      <p class="text-violet-600 font-bold mb-3 text-left">$${price}</p>
      <div class="flex justify-between">
        <button class="btn btn-sm w-5/12 btn-details">
            <i class="fa-regular fa-eye"></i> Details
        </button>
        <button class="btn btn-sm btn-primary w-5/12">
            <i class="fa-solid fa-cart-arrow-down"></i> Add
        </button>
      </div>

      <dialog id="${modalId}" class="modal">
        <div class="modal-box text-left">
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

    container.appendChild(card);

    const detailsBtn = card.querySelector(".btn-details");
    const modal = card.querySelector(`#${modalId}`);
    detailsBtn.addEventListener("click", () => {
      modal.showModal();
    });
  });
};


fetchProducts();
