function openModal(file) {

    document.getElementById("modalFrame").src = file;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {

    document.getElementById("modal").style.display = "none";
    document.getElementById("modalFrame").src = "";
}
