var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

/* Set the width of the side navigation to 250px */
function openNav() {
    sidenav.classList.add("active");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    sidenav.classList.remove("active");
}

const carousel = document.querySelector('.carousel');
const slides = document.querySelector('.slides');
const slideCount = document.querySelectorAll('.slide').length;

let currentIndex = 0;

function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

carousel.addEventListener('click', (event) => {
    const carouselRect = carousel.getBoundingClientRect();
    const carouselWidth = carouselRect.width;

    if (event.clientX < carouselRect.left + carouselWidth / 2) {
        prevSlide();
    } else {
        nextSlide();
    }
});

setInterval(nextSlide, 5000); // Change automatiquement de slide toutes les 5000ms (5 secondes)

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;

    // Envoie les données du formulaire à Formspree
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Affiche la modal
            document.getElementById('thanks-modal').style.display = 'block';
        } else {
            alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
    }).catch(error => {
        console.error('Error:', error);
        alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
    });

    return false;
}

function closeModal() {
    document.getElementById('thanks-modal').style.display = 'none';
}

function closeNavOnClickOutside(event) {
    if (!sidenav.contains(event.target) && !openBtn.contains(event.target)) {
        closeNav();
    }
}

document.addEventListener('click', closeNavOnClickOutside);
