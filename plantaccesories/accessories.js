// JavaScript to hide the preloader after page load
window.addEventListener('load', function () {
    document.getElementById('preloader').style.display = 'none';
});
var loader =document.querySelector("#preloader");
  window.addEventListener("load",function(){
    loader.style.display = "none";
  })

  function togglePopUp(){
    document.getElementById("popup1").classList.toggle("active");
  }
  
  function updatePlace()
  {
    const pl = document.getElementById("place").value; // Get the selected place value
const dropdownContainer = document.getElementById("dropdown-container"); // Container for the dynamic dropdown
dropdownContainer.innerHTML = ""; // Clear existing dropdown if any

const dropdown = document.createElement("select");
dropdown.id = "dynamicDropdown";
dropdown.name = "dynamicDropdown";

const label = document.createElement("label");
label.innerHTML = `<br>Select the city : `;

let options = [];
switch (pl) {
  case "NCR":
    options = ["Noida", "Gurugram", "Dwarka"];
    break;
  case "MH":
    options = ["Mumbai", "Pune", "Nashik", "Thane"];
    break;
  case "TN":
    options = ["Chennai", "Coimbatore", "Vellore", "Madurai"];
    break;
  case "WB":
    options = ["Kolkata", "Darjeeling", "Howrah", "Siliguri"];
    break;
  case "GJ":
    options = ["Ahmedabad", "Vadodara", "Surat", "Bhavnagar"];
    break;
  case "MP":
    options = ["Bhopal", "Ujjain", "Rewa", "Ratlam"];
    break;
  case "UP":
    options = ["Lucknow", "Varanasi", "Kanpur", "Prayagraj"];
    break;
  default:
    options = []; // No options if place not selected
}

options.forEach(optionText => {
  const option = document.createElement("option");
  option.value = optionText.replace(" ", "_");
  option.textContent = optionText;
  dropdown.appendChild(option);
});

dropdownContainer.appendChild(label);
dropdownContainer.appendChild(dropdown); // Add the new dropdown to the container

  }


  async function populateCards() {
    const container = document.querySelector(".catalogue");

    try {
        // Fetch JSON data
        const response = await fetch('accessories.json');
        const data = await response.json();

        // Clear existing cards
        container.innerHTML = "";

        // Populate the cards dynamically
        data.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");

            // Populate card HTML (excluding description)
            card.innerHTML = `
                <img src="${item.imgUrl}" alt="${item.title}" height="150px">
                <p><b>${item.title}</b></p>
                <p class="price">${item.price}</p> 
            `;

            // Append card to the container
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching or populating cards:", error);
        container.innerHTML = `<p>Error loading cards. Please try again later.</p>`;
    }
}


populateCards();