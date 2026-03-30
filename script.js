// =====================
// CUSTOM CURSOR (desktop)
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
// TOUCH TRAIL (mobile)
// Spawns glowing green particles that follow finger movement
// =====================
const TRAIL_COLORS = ['#1db954', '#14843c', '#22e065', '#0fa844', '#5dfc9b'];
let lastTrailTime = 0;

function spawnParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'touch-particle';
    const size = 8 + Math.random() * 14;
    const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
    p.style.cssText = `
        width:${size}px;
        height:${size}px;
        left:${x}px;
        top:${y}px;
        background:${color};
        box-shadow: 0 0 ${size * 1.5}px ${color};
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 700);
}

// Continuous trail while dragging
document.addEventListener('touchmove', e => {
    const now = Date.now();
    if (now - lastTrailTime < 30) return; // throttle to ~30fps
    lastTrailTime = now;
    for (let t of e.touches) {
        spawnParticle(t.clientX, t.clientY);
    }
}, { passive: true });

// Burst of particles on tap/touch start
document.addEventListener('touchstart', e => {
    for (let t of e.touches) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => spawnParticle(
                t.clientX + (Math.random() - 0.5) * 10,
                t.clientY + (Math.random() - 0.5) * 10
            ), i * 60);
        }
    }
}, { passive: true });

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
// Shimmer loading animation + smooth scale-in
// =====================
function openModal(file) {
    document.getElementById('modalTitle').textContent = 'Certificate';

    // Build iframe with shimmer loader
    const loaderDiv = document.createElement('div');
    loaderDiv.className = 'iframe-loader';
    loaderDiv.innerHTML = `
        <div class="modal-loading-text">
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            Loading
        </div>
        <iframe src="${file}"></iframe>
    `;

    // Fade in iframe once loaded, hide shimmer
    const iframe = loaderDiv.querySelector('iframe');
    iframe.addEventListener('load', () => {
        loaderDiv.classList.add('loaded');
    });

    document.getElementById('modalContent').innerHTML = '';
    document.getElementById('modalContent').appendChild(loaderDiv);
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
// Waits for exit animation before clearing content
// =====================
function closeModal() {
    const overlay = document.getElementById('modal');
    overlay.classList.remove('open');
    // Delay clearing content so exit animation finishes
    setTimeout(() => {
        document.getElementById('modalContent').innerHTML = '';
    }, 400);
    document.body.style.overflow = '';
}

function handleOverlayClick(e) {
    if (e.target === document.getElementById('modal')) closeModal();
}

// Close on ESC key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});
