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
