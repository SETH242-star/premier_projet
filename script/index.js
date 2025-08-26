// Données des bannières
const banners = [
    {
        logo: "img/blood_lad.jpg",
        age: "16+",
        description: "Taz C. Vlad est un vampire pas tout à fait comme les autres...",
        image: "img/blood_lad.jpg",
        link: "#",
        genres: "Comédie • Fantasy",
        rating: 4.8
    },
    {
        logo: "img/demon_slayer.jpg",
        age: "12+",
        description: "Tanjiro part en quête pour sauver sa sœur Nezuko et se battre contre les démons.",
        image: "img/demon_slayer_banner.jpg",
        link: "#",
        genres: "Action • Aventure",
        rating: 4.9
    },
    {
        logo: "img/snk.jpg",
        age: "18+",
        description: "L'humanité lutte pour survivre face aux titans qui menacent son existence.",
        image: "img/snk_banner.jpg",
        link: "#",
        genres: "Action • Drame",
        rating: 4.7
    }
];

// Données des animés
const animeData = [
    { title: "Blood Lad", image: "img/blood_lad.jpg", description: "Vampire fan de culture japonaise" },
    { title: "Demon Slayer", image: "img/demon_slayer.jpg", description: "Chasseur de démons en mission" },
    { title: "Attack on Titan", image: "img/snk.jpg", description: "Combat contre les titans" },
    { title: "My Hero Academia", image: "img/mha-thumb.jpg", description: "École de super-héros" },
    { title: "Jujutsu Kaisen", image: "img/jujutsu-thumb.jpg", description: "Exorcisme moderne" },
    { title: "One Piece", image: "img/one_piece.jpg", description: "Aventure pirate épique" },
    { title: "Naruto", image: "img/naruto-thumb.jpg", description: "Ninja en formation" },
    { title: "Dragon Ball", image: "img/dragonball-thumb.jpg", description: "Arts martiaux légendaires" }
];

let currentIndex = 0;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initBanner();
    generateAnimeCards();
    setInterval(rotateBanner, 7000);
    initSlantedBanner();
});

// Initialisation de la bannière
function initBanner() {
    const dotsContainer = document.getElementById("banner-dots");
    
    // Création des points indicateurs
    banners.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => showBanner(i));
        dotsContainer.appendChild(dot);
    });
    
    // Afficher la première bannière
    showBanner(0);
}

// Affichage d'une bannière spécifique
function showBanner(index) {
    const data = banners[index];
    const bannerLogo = document.getElementById("banner-logo");
    const bannerAge = document.getElementById("banner-age");
    const bannerDescription = document.getElementById("banner-description");
    const bannerImage = document.getElementById("banner-image");
    const bannerLink = document.getElementById("banner-link");
    
    // Mise à jour des informations
    bannerLogo.src = data.logo;
    bannerLogo.alt = data.title;
    bannerAge.textContent = data.age;
    bannerDescription.textContent = data.description;
    bannerImage.src = data.image;
    bannerImage.alt = data.title;
    bannerLink.href = data.link;
    
    // Mise à jour des informations supplémentaires
    const ratingElement = document.querySelector('.banner-info .rating span');
    const genresElement = document.querySelector('.banner-info span:last-child');
    
    if (ratingElement) ratingElement.textContent = data.rating;
    if (genresElement) genresElement.textContent = data.genres;
    
    // Mise à jour des points indicateurs
    document.querySelectorAll(".dot").forEach((d, i) => {
        d.classList.toggle("active", i === index);
    });
    
    currentIndex = index;
}

// Rotation automatique des bannières
function rotateBanner() {
    let nextIndex = (currentIndex + 1) % banners.length;
    showBanner(nextIndex);
}

// Génération des cartes d'animés
function generateAnimeCards() {
    const sections = ['new-episodes', 'popular-anime', 'recommended-anime'];
    
    sections.forEach(sectionId => {
        const container = document.getElementById(sectionId);
        if (!container) return;
        
        container.innerHTML = ''; // Vider le conteneur
        
        animeData.forEach(anime => {
            const card = document.createElement('div');
            card.className = 'anime-card';
            card.innerHTML = `
                <img src="${anime.image}" alt="${anime.title}">
                <div class="anime-info">
                    <h3>${anime.title}</h3>
                    <p>${anime.description}</p>
                </div>
            `;
            container.appendChild(card);
        });
    });
}

// Fonctionnalité pour la banderole horizontale
function initSlantedBanner() {
    const track = document.querySelector('.slanted-track');
    const items = document.querySelectorAll('.slanted-item');
    const prevBtn = document.querySelector('.slanted-prev');
    const nextBtn = document.querySelector('.slanted-next');
    
    if (!track || items.length === 0) return;
    
    let currentPosition = 0;
    const itemWidth = items[0].offsetWidth + 20; // width + gap
    const visibleItems = Math.floor(track.parentElement.offsetWidth / itemWidth);
    const maxPosition = (items.length - visibleItems) * itemWidth;
    
    // Masquer les boutons si nécessaire
    function updateButtonVisibility() {
        if (prevBtn) prevBtn.style.visibility = currentPosition <= 0 ? 'hidden' : 'visible';
        if (nextBtn) nextBtn.style.visibility = currentPosition >= maxPosition ? 'hidden' : 'visible';
    }
    
    // Défilement vers la droite
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentPosition = Math.min(currentPosition + itemWidth * visibleItems, maxPosition);
            track.style.transform = `translateX(-${currentPosition}px)`;
            updateButtonVisibility();
        });
    }
    
    // Défilement vers la gauche
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentPosition = Math.max(currentPosition - itemWidth * visibleItems, 0);
            track.style.transform = `translateX(-${currentPosition}px)`;
            updateButtonVisibility();
        });
    }
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn?.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn?.click();
        }
    });
    
    // Mise à jour responsive
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newItemWidth = items[0].offsetWidth + 20;
            const newVisibleItems = Math.floor(track.parentElement.offsetWidth / newItemWidth);
            const newMaxPosition = (items.length - newVisibleItems) * newItemWidth;
            
            maxPosition = newMaxPosition;
            currentPosition = Math.min(currentPosition, newMaxPosition);
            track.style.transform = `translateX(-${currentPosition}px)`;
            updateButtonVisibility();
        }, 250);
    });
    
    // Initial visibility
    updateButtonVisibility();
}

// Fonctionnalité de recherche (basique)
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            alert('Recherche de: ' + this.value);
            this.value = '';
        }
    });
}