// =====================
// CUSTOM CURSOR
// =====================
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
});

(function animRing() {
    rx += (mx - rx - 18) * 0.12;
    ry += (my - ry - 18) * 0.12;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .cert-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        ring.style.width = '54px';
        ring.style.height = '54px';
        ring.style.opacity = '0.8';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.opacity = '0.5';
    });
});

// =====================
// SCROLL REVEAL
// =====================
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            e.target.style.transitionDelay = (i * 0.05) + 's';
            e.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// =====================
// SKILL BARS ON HOVER
// =====================
document.querySelectorAll('.skill-item').forEach(item => {
    const fill = item.querySelector('.skill-fill');
    const pct = parseFloat(item.querySelector('.skill-pct').textContent) / 100;
    item.addEventListener('mouseenter', () => {
        fill.style.transform = `scaleX(${pct})`;
    });
    item.addEventListener('mouseleave', () => {
        fill.style.transform = 'scaleX(0)';
    });
});

// =====================
// ACTIVE NAVBAR HIGHLIGHT
// =====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (pageYOffset >= s.offsetTop - 150) current = s.id;
    });
    navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
});

// =====================
// MODAL — CERTIFICATE
// =====================
function openModal(file) {
    document.getElementById('modalTitle').textContent = 'Certificate';
    document.getElementById('modalContent').innerHTML =
        `<iframe src="${file}" style="width:100%;height:75vh;border:none;border-radius:3px;"></iframe>`;
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

// =====================
// MODAL — PROJECT
// =====================
function openProject(title, desc) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = `<p>${desc}</p>`;
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

// =====================
// MODAL — CLOSE
// =====================
function closeModal() {
    document.getElementById('modal').classList.remove('open');
    document.getElementById('modalContent').innerHTML = '';
    document.body.style.overflow = '';
}

function handleOverlayClick(e) {
    if (e.target === document.getElementById('modal')) closeModal();
}

// Close on ESC key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});
