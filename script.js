// =====================================================
// script.js – Clash of Ecosystem Landing Page
// Tim Ilmuan Muda · UMY · 2026–2027
// =====================================================
// File ini berisi JavaScript sederhana untuk:
// 1. Hamburger menu (mobile)
// 2. Navbar efek scroll
// 3. Smooth scroll saat klik link navbar
// 4. Animasi fade-in saat section terlihat
// 5. Penanganan gambar gagal dimuat
// =====================================================


// =====================================================
// 1. HAMBURGER MENU (untuk mobile)
// Membuka dan menutup menu navigasi di layar kecil
// =====================================================

// Ambil elemen hamburger dan menu
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

// Saat tombol hamburger diklik
hamburger.addEventListener('click', function () {
  // Toggle kelas 'open' pada hamburger dan menu
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');

  // Update atribut aria untuk aksesibilitas
  const isOpen = hamburger.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Tutup menu saat link diklik (di mobile)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});


// =====================================================
// 2. NAVBAR EFEK SCROLL
// Navbar mendapat shadow lebih saat halaman discroll
// =====================================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  // Cek apakah halaman sudah discroll lebih dari 50px
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// =====================================================
// 3. TANDAI LINK NAVBAR AKTIF saat SCROLL
// Link navbar berubah warna sesuai section yang sedang dilihat
// =====================================================

// Kumpulkan semua section yang punya id
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function () {
  // Posisi scroll saat ini (ditambah setengah tinggi layar)
  const scrollPos = window.scrollY + window.innerHeight / 2;

  sections.forEach(function (section) {
    const sectionTop    = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId     = section.getAttribute('id');

    // Cari link navbar yang menuju section ini
    const matchingLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');

    if (matchingLink) {
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        // Hapus kelas aktif dari semua link, lalu tambahkan ke yang sesuai
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        matchingLink.classList.add('active');
      }
    }
  });
});


// =====================================================
// 4. ANIMASI FADE-IN SAAT SCROLL
// Elemen dengan kelas 'fade-in' akan muncul saat masuk ke layar
// =====================================================

// Gunakan IntersectionObserver agar lebih efisien dari event scroll biasa
const fadeElements = document.querySelectorAll('.fade-in');

// Buat observer yang memantau kapan elemen masuk ke layar
const fadeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      // Elemen terlihat: tambah kelas 'visible' agar muncul
      entry.target.classList.add('visible');

      // Hentikan pemantauan setelah elemen muncul (tidak perlu dipantau lagi)
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12  // Muncul saat 12% elemen terlihat di layar
});

// Pasang observer ke setiap elemen fade-in
fadeElements.forEach(function (el) {
  fadeObserver.observe(el);
});


// =====================================================
// 5. PENANGANAN GAMBAR GAGAL DIMUAT
// Jika gambar tidak bisa dimuat, tampilkan placeholder
// =====================================================

// Ambil semua gambar di halaman
const allImages = document.querySelectorAll('img');

allImages.forEach(function (img) {
  // Jika gambar sudah punya handler onerror di HTML, lewati
  // Fungsi ini sebagai backup tambahan
  img.addEventListener('error', function () {
    // Jika gambar adalah foto profil tim
    if (img.classList.contains('tim-foto')) {
      // Ubah wrapper menjadi tampilan placeholder emoji
      const wrapper = img.parentElement;
      if (wrapper && !wrapper.classList.contains('foto-fallback')) {
        wrapper.classList.add('foto-fallback');
        wrapper.textContent = '👤';
      }
    }
    // Untuk gambar lain, sembunyikan saja agar tidak tampil ikon rusak
    else if (!img.closest('.hero-img-wrapper') && !img.closest('.solusi-img-wrapper')) {
      img.style.display = 'none';
    }
  });
});


// =====================================================
// 6. SMOOTH SCROLL TAMBAHAN (backup)
// Memastikan smooth scroll bekerja di semua browser
// =====================================================

// Ambil semua link yang menuju ke bagian halaman (href="#...")
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');

    // Jika bukan link kosong (#)
    if (targetId !== '#') {
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();

        // Hitung posisi target dikurangi tinggi navbar
        const navHeight = navbar.offsetHeight;
        const targetPos = targetEl.offsetTop - navHeight;

        // Scroll ke posisi tersebut dengan halus
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    }
  });
});


// =====================================================
// Selesai! Semua fitur JavaScript sudah aktif.
// Untuk menambah fitur baru, tambahkan di bawah baris ini.
// =====================================================
