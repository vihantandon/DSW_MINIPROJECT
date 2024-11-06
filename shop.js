// console.log("hello");
// async function populatecards()
// {
//     const container = document.querySelector(".card_container");

//     const response = await fetch('cardData.json');
//         const data = await response.json();

//         container.innerHtml = "";
//         data.forEach(item => {
//             const card = document.createElement("article");
//             card.classList.add("card_article");
//             card.innerHTML = `
//                 <img src="${item.imgUrl}" alt="${item.title}">
//                 <div class="card_data">
//                     <span class="card_desc">
//                         <h2 class="card_title">${item.title}</h2>
//                         <p>${item.description}</p>
//                     </span>
//                 </div>
//             `;
//             container.appendChild(card);
//         });
// }

// populatecards();

console.log("hello");

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
        container.appendChild(card);
    });
}

// Event listener for dropdown filter
document.getElementById("plantFilter").addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    populateCards(selectedValue); // Call populateCards with the selected filter
});

// Initial population of all cards
populateCards();
