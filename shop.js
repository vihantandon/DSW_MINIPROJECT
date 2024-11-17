async function populateCards(filter = "all") {
    const container = document.querySelector(".card_container");

    const response = await fetch('cardData.json');
    const data = await response.json();

    container.innerHTML = ""; // Clear existing cards

    // Filter data based on the selected option
    const filteredData = filter === "all" ? data : data.filter(item => item.title === filter);

    filteredData.forEach(item => {
        const card = document.createElement("article");
        card.classList.add("card_article");
        card.innerHTML = `
            <img src="${item.imgUrl}" alt="${item.title}">
            <div class="card_data">
                <span class="card_desc">
                    <h2 class="card_title">${item.title}</h2>
                    <p>${item.description}</p>
                </span>
            </div>
        `;

        // Add event listener to open modal on click
        card.addEventListener("click", () => openModal(item));

        container.appendChild(card);
    });
}

// Function to open modal
function openModal(item) {
    const modal = document.getElementById("plantDetailModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalPrice = document.getElementById("modalPrice");
    const addToCartBtn = document.getElementById("addToCartBtn");

    // Set the modal content
    modalImage.src = item.imgUrl;
    modalTitle.innerText = item.title;
    modalDescription.innerText = item.description;
    modalPrice.innerText = `$${item.price}`;

    // Show the modal and make the Add to Cart button visible with animation
    modal.style.display = "block";
    setTimeout(() => addToCartBtn.classList.add("visible"), 50); // Animate the button

    // Close the modal when the close button is clicked
    const closeBtn = document.getElementById("closeBtn");
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        addToCartBtn.classList.remove("visible"); // Hide the button when closing the modal
    });

    // Close the modal if clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            addToCartBtn.classList.remove("visible");
        }
    });

    // Add to Cart Button Action (example)
    addToCartBtn.addEventListener("click", () => {
        alert(`${item.title} has been added to your cart!`);
        modal.style.display = "none";
        addToCartBtn.classList.remove("visible");
    });
}

// Event listener for dropdown filter
document.getElementById("plantFilter").addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    populateCards(selectedValue); // Call populateCards with the selected filter
});

// Initial population of all cards
populateCards();
