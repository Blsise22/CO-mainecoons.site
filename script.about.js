
function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    const closeBtn = document.getElementById("closeBtn");
    const hamburgerBtn = document.getElementById("hamburgerBtn");

    menu.classList.toggle("show");
    const isOpen = menu.classList.contains("show");

    closeBtn.style.display = isOpen ? "block" : "none";
    hamburgerBtn.style.display = isOpen ? "none" : "flex";
}

//styed-box fade-in animation
window.addEventListener('scroll', () => {
  const boxes = document.querySelectorAll('.styled-box-div');

  boxes.forEach(box => {
    const boxRect = box.getBoundingClientRect();
    const boxCenter = boxRect.top + boxRect.height / 2;
    const screenMiddle = window.innerHeight / 2;

    if (boxCenter <= screenMiddle) {
      box.classList.add('show');
    } else {
      box.classList.remove('show'); // remove this line if you want it to trigger only once
    }
  });
});
//end here