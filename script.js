function openModal(cert) {

    const modal = document.getElementById("modal");
    const frame = document.getElementById("modalFrame");

    let file = "";

    if (cert === "cert1") file = "cert1.pdf";
    if (cert === "cert2") file = "cert2.pdf";
    if (cert === "cert3") file = "cert3.pdf";
    if (cert === "cert4") file = "cert4.pdf";
    if (cert === "cert5") file = "cert5.pdf";

    frame.src = file;
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}
