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
        const response = await fetch('seed.json');
        const data = await response.json();

        // Clear existing cards
        container.innerHTML = "";

        // Populate the cards dynamically
        data.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");

            // Create a slider container
            const slider = document.createElement("div");
            slider.classList.add("slider");

            // Add the first image to the slider
            const img1 = document.createElement("img");
            img1.src = item.imgUrl1; // First image URL
            img1.alt = `${item.title} Image 1`;
            img1.classList.add("slide", "active"); // First slide is active
            slider.appendChild(img1);

            // Add the second image to the slider
            const img2 = document.createElement("img");
            img2.src = item.imgUrl2; // Second image URL
            img2.alt = `${item.title} Image 2`;
            img2.classList.add("slide"); // Second slide
            slider.appendChild(img2);

            // Add navigation buttons
            const prevButton = document.createElement("button");
            prevButton.textContent = "<";
            prevButton.classList.add("prev");

            const nextButton = document.createElement("button");
            nextButton.textContent = ">";
            nextButton.classList.add("next");

            slider.appendChild(prevButton);
            slider.appendChild(nextButton);

            // Populate card HTML
            card.innerHTML = `
                <p><b>${item.title}</b></p>
                <p class="price">${item.price}</p> 
            `;

            // Append slider and card details to the card
            card.insertBefore(slider, card.firstChild);

            // Append card to the container
            container.appendChild(card);

            // Add slider functionality
            let currentIndex = 0;
            const slides = slider.querySelectorAll(".slide");

            const updateSlide = (index) => {
                slides.forEach((slide, i) => {
                    slide.classList.toggle("active", i === index);
                });
            };

            prevButton.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlide(currentIndex);
            });

            nextButton.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlide(currentIndex);
            });
        });
    } catch (error) {
        console.error("Error fetching or populating cards:", error);
        container.innerHTML = `<p>Error loading cards. Please try again later.</p>`;
    }
}


populateCards();