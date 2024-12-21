// API link
const API_URL = "https://raw.githubusercontent.com/diyor011/apibest/master/api.json";

// Global o'zgaruvchilar
let headphones = [];
let filteredHeadphones = [];

// API-dan ma'lumotlarni olish
async function fetchHeadphones() {
  try {
    document.getElementById("loading").style.display = "flex"; // Loading ko'rsatish
    const response = await fetch(API_URL);
    const data = await response.json();
    headphones = data;
    filteredHeadphones = data;
    renderCards(data);
  } catch (error) {
    console.error("API-dan ma'lumot olishda xato:", error);
  } finally {
    document.getElementById("loading").style.display = "none"; // Loadingni yashirish
    document.getElementById("cardsContainer").classList.remove("hidden");
  }
}

// Kartochkalarni yaratish
function renderCards(data) {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = ""; // Eski kartalarni o'chirish
  data.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "card bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300";
    card.innerHTML = `
      <div class="w-full h-48 bg-gray-100 flex items-center justify-center">
        <img src="${item.pic}" alt="${item.name}" class="max-w-full max-h-full object-contain">
      </div>
      <div class="p-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">${item.name}</h2>
        <p class="text-gray-600 mb-4">${item.fullDesc ? item.fullDesc : 'No description available.'}</p>
        <p class="text-lg font-bold text-green-500">Price: $${item.price}</p>
        <button class="btn btn-primary w-full mt-4">Buy Now</button>
      </div>
    `;
    container.appendChild(card);
  });
}



// Qidiruv funksiyasi
function filterHeadphones() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  const searchFiltered = headphones.filter((item) =>
    item.name.toLowerCase().includes(query) // Nomga mosligini tekshirish
  );
  renderCards(searchFiltered);
}

// Kategoriya bo'yicha filterlash
function filterByCategory() {
  const category = document.getElementById("categoryFilter").value;
  filteredHeadphones = category === "all" ? headphones : headphones.filter((item) => item.desc1 === category);
  renderCards(filteredHeadphones);
}

// Narx bo'yicha saralash
function sortByPrice() {
  const sortOrder = document.getElementById("priceSort").value;
  let sortedData = [...filteredHeadphones];
  if (sortOrder === "lowToHigh") {
    sortedData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortOrder === "highToLow") {
    sortedData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }
  renderCards(sortedData);
}

// Sahifa yuklanganda API-dan ma'lumot olish
fetchHeadphones();
