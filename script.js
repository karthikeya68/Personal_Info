function openModal(file) {

    const modal = document.getElementById("modal");
    const frame = document.getElementById("modalFrame");

    frame.src = file;
    modal.style.display = "flex";
}

function closeModal() {

    const modal = document.getElementById("modal");
    const frame = document.getElementById("modalFrame");

    modal.style.display = "none";
    frame.src = "";
}


/* Active Navbar Highlight on Scroll */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });

});
