function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    const closeBtn = document.getElementById("closeBtn");
    const hamburgerBtn = document.getElementById("hamburgerBtn");

    menu.classList.toggle("show");
    const isOpen = menu.classList.contains("show");

    closeBtn.style.display = isOpen ? "block" : "none";
    hamburgerBtn.style.display = isOpen ? "none" : "flex";
}