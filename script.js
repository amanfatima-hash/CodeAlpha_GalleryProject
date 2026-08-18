const images = [
    {
        src: "images/AI.jpg",
        title: "Artificial Intelligence",
        category: "ai"
    },
    {
        src: "images/Machine learning.jpg",
        title: "Machine Learning",
        category: "ai"
    },
    {
        src: "images/Web Dev 1.jpg",
        title: "The World of Web",
        category: "web"
    },
    {
        src: "images/Web Dev 2.jpg",
        title: "Web Development",
        category: "web"
    },
    {
        src: "images/Programming1.jpg",
        title: "Programming Workspace",
        category: "programming"
    },
    {
        src: "images/Robotics1.jpg",
        title: "Robotic Future",
        category: "robotics"
    },
    {
        src: "images/Programming2.jpg",
        title: "Developer Setup",
        category: "programming"
    },
    {
        src: "images/cybersecurity1.jpg",
        title: "Digital Security",
        category: "security"
    },
    {
        src: "images/cybersecurity2.jpg",
        title: "Data & Networks",
        category: "security"
    },
    {
        src: "images/gaming1.jpg",
        title: "Gaming World",
        category: "gaming"
    },
    {
        src: "images/gaming2.jpg",
        title: "Next Generation Gaming",
        category: "gaming"
    },
    {
        src: "images/Robotics2.jpg",
        title: "Robotics Lab",
        category: "robotics"
    }
];

const gallery = document.getElementById("gallery");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput =document.getElementById("searchInput");
const resultCount =document.getElementById("resultCount");
const noResults =document.getElementById("noResults");
   
const lightbox =document.getElementById("lightbox");
const lightboxImage =document.getElementById("lightboxImage");
const lightboxTitle =document.getElementById("lightboxTitle");
const lightboxCategory =document.getElementById("lightboxCategory");
const imageCounter =document.getElementById("imageCounter");
const closeBtn =document.getElementById("closeBtn");
const prevBtn =document.getElementById("prevBtn");
const nextBtn =document.getElementById("nextBtn");

// VARIABLES

let currentCategory = "all";
let currentImages = [];
let currentIndex = 0;

// DISPLAY IMAGES
function displayImages() {
    const searchText = searchInput.value .toLowerCase() .trim();

 // Filter images
    currentImages = images.filter(image => {
        const matchesCategory =
            currentCategory === "all" ||
            image.category === currentCategory;
        const matchesSearch = image.title
                .toLowerCase()
                .includes(searchText) || image.category
                .toLowerCase()
                .includes(searchText);
        return matchesCategory && matchesSearch;
    });

    // Clear gallery
    gallery.innerHTML = "";

    // Result count
    resultCount.textContent =
        `${currentImages.length} image${currentImages.length !== 1 ? "s" : ""}`;

    // No results
    if (currentImages.length === 0) {
        noResults.style.display = "block";
        return;
    }
    noResults.style.display = "none";

    // Create cards
    currentImages.forEach((image, index) => {
        const galleryItem =
            document.createElement("div");
        galleryItem.classList.add("gallery-item");
        galleryItem.style.animationDelay =
            `${index * 0.05}s`;
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy"  >
            <div class="gallery-overlay">
                <p>${getCategoryName(image.category)}</p>
                <h3>${image.title}</h3>
            </div> `;

 // Open lightbox
        galleryItem.addEventListener("click", () => {
            openLightbox(index);
        });
        gallery.appendChild(galleryItem);
    });
}

// CATEGORY NAME
function getCategoryName(category) {
    const names = {
        ai: "AI & ML",
        web: "Web Development",
        programming: "Programming",
        robotics: "Robotics",
        security: "Cybersecurity",
        gaming: "Gaming"
    };
    return names[category] || category;
}

// FILTER BUTTONS
filterButtons.forEach(button => {
    button.addEventListener("click", () => { filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        currentCategory = button.dataset.category;
        // Display images
        displayImages();
    });
});

// SEARCH
searchInput.addEventListener( "input", displayImages);

// OPEN LIGHTBOX
function openLightbox(index) {
    if (currentImages.length === 0) {
        return;
    }
    currentIndex = index;
    const image = currentImages[currentIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxCategory.textContent =getCategoryName(image.category);
    imageCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    lightbox.classList.add("active");
   
    document.body.style.overflow = "hidden";
}

// CLOSE LIGHTBOX
function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow =  "";
}
// NEXT IMAGE
function showNext() {
    currentIndex++;
    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }
    openLightbox(currentIndex);
}

// PREVIOUS IMAGE
function showPrevious() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex =   currentImages.length - 1;
    }
    openLightbox(currentIndex);
}

// BUTTON EVENTS
closeBtn.addEventListener( "click", closeLightbox);
nextBtn.addEventListener( "click",showNext);
prevBtn.addEventListener(  "click",showPrevious);

// KEYBOARD CONTROLS
document.addEventListener( "keydown", (event) => {
        if (!lightbox.classList.contains("active")) {
            return;
        }
        if (event.key === "ArrowRight") {
            showNext();
        }
        if (event.key === "ArrowLeft") {
            showPrevious();
        }
        if (event.key === "Escape") {
            closeLightbox();
        }
    }
);

// CLICK OUTSIDE IMAGE
lightbox.addEventListener( "click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    }
);

// INITIAL DISPLAY
displayImages();
