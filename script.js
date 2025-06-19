const fadeInSlideElements = document.querySelectorAll('.fade-in-slide');

const observerOptions = {
    root: null, // Use the viewport as the container
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the element is visible (middle of viewport)
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible'); // Remove class when not in view
        }
    });
}, observerOptions);

fadeInSlideElements.forEach(element => {
    observer.observe(element);
});

// Modal functions
function openModal(title, description) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDescription").innerText = description;
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Info Modal functions
function openInfoModal(title, description) {
    document.getElementById("infoTitle").innerText = title;
    document.getElementById("infoDescription").innerText = description;
    document.getElementById("infoModal").style.display = "block";
}

function closeInfoModal() {
    document.getElementById("infoModal").style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    const infoModal = document.getElementById("infoModal");
    if (event.target === modal) {
        closeModal();
    } else if (event.target === infoModal) {
        closeInfoModal();
    }
}

// Handle form submission
document.getElementById("orderForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent page refresh
    alert('Order submitted! Thank you!');
    closeModal();
}
