function openModal(file) {

    const modal = document.getElementById("modal");
    const content = document.getElementById("modalContent");

    content.innerHTML =
        `<iframe src="${file}" style="width:100%; height:80vh; border:none;"></iframe>`;

    modal.style.display = "flex";
}

function openProject(title, description) {

    const modal = document.getElementById("modal");
    const content = document.getElementById("modalContent");

    content.innerHTML =
        `<h2 style="color:#1db954;">${title}</h2>
         <p style="margin-top:15px;">${description}</p>`;

    modal.style.display = "flex";
}

function closeModal() {

    const modal = document.getElementById("modal");
    const content = document.getElementById("modalContent");

    modal.style.display = "none";
    content.innerHTML = "";
}


/* Active Navbar Highlight */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

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
