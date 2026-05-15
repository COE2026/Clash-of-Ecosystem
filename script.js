// 1. Fungsi Hamburger Menu (Mobile)
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 2. Smooth Scroll (Scroll Halus saat klik menu)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Tutup menu mobile jika sedang terbuka
        navLinks.classList.remove('active');

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 3. Efek Muncul Saat Scroll (Simple Reveal)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Menerapkan efek pada semua section
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
});

// 4. Penanganan Gambar Gagal Dimuat
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.backgroundColor = '#444';
        this.alt = "Gambar belum ditambahkan";
    });
});