const Fasilitas = {
  async render() {
    // Inject Bootstrap 5, Animate.css, Google Fonts (Poppins)
    if (!document.getElementById('bootstrap5css')) {
      const bsCSS = document.createElement('link');
      bsCSS.rel = 'stylesheet';
      bsCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
      bsCSS.id = 'bootstrap5css';
      document.head.appendChild(bsCSS);
    }
    if (!document.getElementById('bootstrap5js')) {
      const bsJS = document.createElement('script');
      bsJS.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
      bsJS.id = 'bootstrap5js';
      document.body.appendChild(bsJS);
    }
    if (!document.getElementById('animatecss')) {
      const animateCSS = document.createElement('link');
      animateCSS.rel = 'stylesheet';
      animateCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
      animateCSS.id = 'animatecss';
      document.head.appendChild(animateCSS);
    }
    if (!document.getElementById('googlefontspoppins')) {
      const poppinsFont = document.createElement('link');
      poppinsFont.rel = 'stylesheet';
      poppinsFont.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
      poppinsFont.id = 'googlefontspoppins';
      document.head.appendChild(poppinsFont);
    }
    if (!document.getElementById('fasilitas-style')) {
      const style = document.createElement('style');
      style.id = 'fasilitas-style';
      style.innerHTML = `
        .fasilitas-poppins * {
          font-family: 'Poppins', Arial, Helvetica, sans-serif !important;
          letter-spacing: 0.01em;
        }
        .fasilitas-divider {
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        .fasilitas-deskripsi {
          color: #6b7280;
          font-size: 1.25rem;
        }
        .fasilitas-list {
          min-width: 280px;
          max-width: 100%;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(380px,1fr));
          gap: 2rem;
        }
        .gallery-card {
          background: #fff;
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .gallery-card:hover {
          transform: scale(1.035) translateY(-6px);
          box-shadow: 0 12px 32px 0 rgba(31, 38, 135, 0.15);
        }
        .gallery-img {
          width: 100%;
          height: 270px;
          object-fit: cover;
          transition: transform 0.4s;
        }
        .gallery-card:hover .gallery-img {
          transform: scale(1.08);
        }
        .gallery-caption {
          font-size: 1.12rem;
          font-weight: 400;
          color: #636d7a;
          text-align: center;
          padding: 1.1rem 0 1.3rem 0;
          background: #fff;
        }
        @media (max-width: 991.98px) {
          .fasilitas-twocol { flex-direction: column!important; }
          .fasilitas-col { width: 100%!important; max-width: 100%!important; }
          .gallery-img { height: 170px;}
        }
        @media (max-width: 600px) {
          .gallery-grid { grid-template-columns: 1fr;}
        }
      `;
      document.head.appendChild(style);
    }

    // List gambar galeri
    const fasilitasGaleri = [
      { img: "./images/Lapangan1.jpg", caption: "Lapangan Sekolah" },
      { img: "./images/Mushola1.jpg", caption: "Mushola" },
      { img: "./images/Perpustakaan.jpg", caption: "Perpustakaan" },
      { img: "./images/Lapangan.jpg", caption: "Ruangan Guru" },
      { img: "./images/Lapangan.jpg", caption: "Ruangan Kepala Sekola" },
      { img: "./images/Lapangan.jpg", caption: "Kamar Santri 02" },
    ];

    return `
      <section class="relative text-center w-full fasilitas-poppins">
        <div class="relative w-full">
          <img
            alt="Gedung Sekolah"
            class="w-full h-[350px] md:h-[500px] lg:h-[600px] object-cover"
            src="./images/Lapangan1.jpg"
          />
          <img
            src="./images/logo.png"
            alt="Logo Sekolah"
            class="absolute top-6 left-6 w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110 animate__animated animate__bounce"
          />
          <h1
            class="absolute inset-0 flex items-center justify-center left-8 text-5xl md:text-6xl lg:text-7xl font-bold text-green-500 animate__animated animate__fadeInDown"
            style="text-shadow:none;"
          >
            Fasilitas Sekolah
          </h1>
        </div>
      </section>
      </section>

      <section class="w-full py-5" style="background: #fff;">
        <h2 class="text-4xl md:text-5xl font-bold text-center"
          style="color:#22c55e; font-family: 'Poppins', Arial, Helvetica, sans-serif; letter-spacing:0.01em;">
            Fasilitas yang tersedia di Sekolah
       </h2>
      </section>
      <main class="w-100 mt-5 fasilitas-poppins">

      <main class="w-100 mt-5 fasilitas-poppins">
        <section class="py-4 py-md-5 w-100">
          <div class="container px-3">
            <!-- Dua kolom utama -->
            <div class="d-flex fasilitas-twocol flex-lg-row flex-column justify-content-between gap-5 mb-5">
              <!-- Kolom Kiri -->
              <div class="fasilitas-col" style="width:48%;">
                <h2 class="fw-bold mb-2 fs-2 text-start animate__animated animate__fadeInLeft" style="letter-spacing:0.03em;">
                  Jumlah Ruangan
                </h2>
                <div class="fasilitas-deskripsi mb-4 text-start animate__animated animate__fadeInLeft animate__delay-1s">
                  Sekolah ini memiliki total 23 ruangan dengan rincian sebagai berikut:
                </div>
                <ul class="list-unstyled fs-5 fasilitas-list">
                  <li class="fasilitas-divider text-secondary text-start">Ruang Kelas: 15</li>
                  <li class="fasilitas-divider text-secondary text-start">Ruang Perpustakaan: 1</li>
                  <li class="fasilitas-divider text-secondary text-start">Ruang Laboratorium: 1</li>
                  <li class="fasilitas-divider text-secondary text-start">Ruang Pimpinan: 1</li>
                  <li class="fasilitas-divider text-secondary text-start">Ruang Guru: 1</li>
                  <li class="fasilitas-divider text-secondary text-start">Ruang Ibadah: 1</li>
                  <li class="fasilitas-divider text-secondary text-start">Ruang Toilet: 2</li>
                  <li class="fasilitas-divider text-secondary text-start">Ruang Bangunan: 1</li>
                </ul>
              </div>
              <!-- Kolom Kanan -->
              <div class="fasilitas-col" style="width:48%;">
                <h2 class="fw-bold mb-2 fs-2 text-start animate__animated animate__fadeInRight" style="letter-spacing:0.03em;">
                  Fasilitas Pendukung
                </h2>
                <div class="fasilitas-deskripsi mb-4 text-start animate__animated animate__fadeInRight animate__delay-1s">
                  YPMA dilengkapi dengan fasilitas lengkap untuk mendukung kegiatan belajar mengajar:
                </div>
                <ul class="list-unstyled fs-5 fasilitas-list">
                  <li class="fasilitas-divider text-secondary text-start">Gedung milik sendiri</li>
                  <li class="fasilitas-divider text-secondary text-start">Halaman luas</li>
                  <li class="fasilitas-divider text-secondary text-start">12 Ruang Kelas</li>
                  <li class="fasilitas-divider text-secondary text-start">Perpustakaan "Al Adnan Bina Pustaka"</li>
                  <li class="fasilitas-divider text-secondary text-start">Mushola</li>
                  <li class="fasilitas-divider text-secondary text-start">Ruang Guru</li>
                  <li class="fasilitas-divider text-secondary text-start">Kantor Kepala Sekolah dan Tata Usaha</li>
                  <li class="fasilitas-divider text-secondary text-start">Area Parkir Luas</li>
                  <li class="fasilitas-divider text-secondary text-start">Kamar Mandi</li>
                  <li class="fasilitas-divider text-secondary text-start">Gudang</li>
                  <li class="fasilitas-divider text-secondary text-start">Ruang Yayasan</li>
                </ul>
                <div class="fasilitas-deskripsi mt-4 mb-2 text-start animate__animated animate__fadeInUp animate__delay-2s"
                  style="font-weight: 500;">
                  Semua guru adalah lulusan S1 dan bersertifikat pendidikan.
                </div>
              </div>
            </div>
            <!-- Bagian galeri gambar fasilitas -->
            <div class="gallery-grid animate__animated animate__fadeInUp">
              ${fasilitasGaleri.map((item, idx) => `
                <div class="gallery-card animate__animated animate__fadeInUp animate__delay-${(idx%3)+1}s">
                  <img src="${item.img}" alt="${item.caption}" class="gallery-img" />
                  <div class="gallery-caption">${item.caption}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      </main>
    `;
  },
  async afterRender() {
    // Tidak ada fungsi spesifik setelah render untuk halaman Fasilitas saat ini
  },
};

export default Fasilitas;
