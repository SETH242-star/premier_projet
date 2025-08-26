// Données des animes pour les différentes sections
const animeData = {
    newEpisodes: [
        { title: "One Piece", image: "img/one_piece.jpg", rating: 4.9, episodes: 1054 },
        { title: "Demon Slayer", image: "img/demon_slayer.jpg", rating: 4.8, episodes: 55 },
        { title: "Jujutsu Kaisen", image: "img/jujutsu_kaisen.jpg", rating: 4.7, episodes: 47 },
        { title: "Attack on Titan", image: "img/attack_titan.jpg", rating: 4.9, episodes: 89 },
        { title: "My Hero Academia", image: "img/my_hero.jpg", rating: 4.6, episodes: 138 },
        { title: "Chainsaw Man", image: "img/chainsaw_man.jpg", rating: 4.7, episodes: 12 }
    ],
    popularAnime: [
        { title: "Demon Slayer", image: "demon_slayer.jpg", rating: 4.8, episodes: 720 },
        { title: "Dragon Ball", image: "img/dragon_ball.jpg", rating: 4.7, episodes: 639 },
        { title: "Bleach", image: "img/bleach.jpg", rating: 4.6, episodes: 366 },
        { title: "Death Note", image: "img/death_note.jpg", rating: 4.9, episodes: 37 },
        { title: "Fullmetal Alchemist", image: "img/fullmetal.jpg", rating: 4.9, episodes: 64 },
        { title: "Hunter x Hunter", image: "img/hunter.jpg", rating: 4.8, episodes: 148 }
    ],
    recommendedAnime: [
        { title: "Tokyo Revengers", image: "img/tokyo_revengers.jpg", rating: 4.5, episodes: 37 },
        { title: "Spy x Family", image: "img/spy_family.jpg", rating: 4.7, episodes: 25 },
        { title: "Vinland Saga", image: "img/vinland.jpg", rating: 4.8, episodes: 48 },
        { title: "One Punch Man", image: "img/onepunch_man.jpg", rating: 4.6, episodes: 24 },
        { title: "Mob Psycho 100", image: "img/mob_psycho.jpg", rating: 4.7, episodes: 37 },
        { title: "Haikyuu!!", image: "img/haikyuu.jpg", rating: 4.8, episodes: 85 }
    ]
};

// Fonction pour créer une carte anime
function createAnimeCard(anime) {
    return `
        <div class="anime-card">
            <img src="${anime.image}" alt="${anime.title}">
            <div class="anime-info">
                <h3 class="anime-title">${anime.title}</h3>
                <div class="anime-details">
                    <span><i class="fas fa-star"></i> ${anime.rating}</span>
                    <span>${anime.episodes} épisodes</span>
                </div>
            </div>
        </div>
    `;
}

// Fonction pour peupler une section d'animes
function populateAnimeSection(sectionId, animeList) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.innerHTML = animeList.map(createAnimeCard).join('');
    }
}

// Fonction pour initialiser la bannière avec des données dynamiques
function initBanner() {
    // Ici vous pouvez ajouter une logique pour changer la bannière
    // Par exemple, rotation entre différents animes populaires
    console.log("Bannière initialisée");
}

// Fonction pour l'effet de défilement parallaxe
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
        
        const slantedBanner = document.querySelector('.slanted-banner');
        if (slantedBanner) {
            slantedBanner.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
    });
}

// Fonction pour initialiser les animations de la banderole oblique
function initSlantedBanner() {
    const slantedItems = document.querySelectorAll('.slanted-item');
    
    // Animation d'entrée
    setTimeout(() => {
        slantedItems.forEach((item, index) => {
            item.style.transition = 'all 0.5s ease';
            item.style.transitionDelay = (index * 0.1) + 's';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        });
    }, 500);
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    // Peupler les sections d'animes
    populateAnimeSection('new-episodes', animeData.newEpisodes);
    populateAnimeSection('popular-anime', animeData.popularAnime);
    populateAnimeSection('recommended-anime', animeData.recommendedAnime);
    
    // Initialiser la bannière
    initBanner();
    
    // Initialiser l'effet parallaxe
    initParallax();
    
    // Initialiser la banderole oblique
    initSlantedBanner();
    
    // Ajouter des écouteurs d'événements pour les points de la bannière
    const bannerDots = document.getElementById('banner-dots');
    if (bannerDots) {
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            bannerDots.appendChild(dot);
        }
    }
});

// Gestionnaire de recherche
const searchBox = document.querySelector('.search-box input');
if (searchBox) {
    searchBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            alert(`Recherche pour: ${this.value}`);
            this.value = '';
        }
    });
}