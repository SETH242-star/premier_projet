// Sélection des éléments
const searchInput = document.querySelector(".search-bar input");
const cards = document.querySelectorAll(".anime-card");
const randomBtn = document.getElementById("random-btn");
const sortBtn = document.getElementById("sort-btn");
const grid = document.querySelector(".grid");

// Variable pour suivre l'état du tri
let isSortedAscending = false;

// Fonctionnalité de recherche
searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();
    cards.forEach(card => {
        let title = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = title.includes(value) ? "block" : "none";
    });
});

// Fonctionnalité aléatoire
randomBtn.addEventListener("click", () => {
    let cardsArray = Array.from(cards);
    cardsArray.sort(() => Math.random() - 0.5);
    cardsArray.forEach(card => grid.appendChild(card));
    
    // Réinitialiser l'état du tri
    isSortedAscending = false;
    sortBtn.textContent = "Trier (A-Z)";
});

// Fonctionnalité de tri alphabétique
sortBtn.addEventListener("click", () => {
    let cardsArray = Array.from(cards);
    
    if (isSortedAscending) {
        // Trier de Z à A
        cardsArray.sort((a, b) => {
            let titleA = a.querySelector("h3").textContent.toLowerCase();
            let titleB = b.querySelector("h3").textContent.toLowerCase();
            return titleB.localeCompare(titleA);
        });
        sortBtn.textContent = "Trier (A-Z)";
    } else {
        // Trier de A à Z
        cardsArray.sort((a, b) => {
            let titleA = a.querySelector("h3").textContent.toLowerCase();
            let titleB = b.querySelector("h3").textContent.toLowerCase();
            return titleA.localeCompare(titleB);
        });
        sortBtn.textContent = "Trier (Z-A)";
    }
    
    // Inverser l'état du tri
    isSortedAscending = !isSortedAscending;
    
    // Réinsérer les cartes dans le nouvel ordre
    cardsArray.forEach(card => grid.appendChild(card));
});