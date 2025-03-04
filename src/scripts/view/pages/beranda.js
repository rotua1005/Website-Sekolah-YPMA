//beranda
const Beranda = {
  async render() {
    return `
      <div class="main-container">
        <img src="./walpaper.png" alt="Wallpaper Image" class="walpaper">
        <div class="container">
          <div class="image-container slide-left">
            <img src="./image1.png" alt="Wayang Image" class="wayang1">
          </div>
          <div class="text-container">
            <h1 class="tema">Wayang-Tales
              <span>Dari Indonesia Untuk Dunia</span>
            </h1>
            <br>
            <p>Wayang kulit semula berkembang di lingkungan istana
              <span>Jadi kesenian rakyat dan menyebar ke tempat - tempat jauh</span>
            </p>
            <br>
            <p class="judul">Kesenian</p>
            <p>Tagar: Jawa, Kesenian, Bali, Indonesia</p>
          </div>
          <div class="image-container slide-right">
            <img src="./image2.png" alt="Wayang Image" class="wayang2">
          </div>
        </div>

        

        <div class="row justify-content-center">
  <div class="col-md-5">
    <div class="video-container" style="margin-right: 10px;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/vbQV7E3yR_I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
  <div class="col-md-5">
    <div class="video-container">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/kbjKJHSa3nU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</div>

        <div class="text-center">
          <h2 class="judul2" style="padding-top: 30px;">Museum Wayang Tales </h2>
        </div>
        <div class="container">
          <div class="row justify-content-center" style="padding-top: 20px;">
            <div class="col-md-6">
              <div class="text">
                <p>
                  Museum Wayang Tales merupakan Unit Pelaksana Teknis Daerah pada Dinas Kebudayaan yang ada di Indonesia, dengan fungsi utama pengelolaan benda museum yang memiliki nilai budaya ilmiah. Fungsi tersebut mencakup pengumpulan, pengembangan, serta bimbingan edukatif kultural. Museum ini bertujuan untuk melestarikan berbagai jenis wayang dan artefak terkait dari seluruh Nusantara. Koleksi yang dimiliki museum ini mencakup wayang kulit, wayang golek, wayang klitik, dan lainnya, yang diidentifikasi, didokumentasikan, dan disimpan dengan baik untuk penelitian dan edukasi.
                </p>
                <p>Jadwal Masuk Museum Wayang:<br>
                Senin - Minggu: 09.00 - 17.00 WIB</p>
              </div>
            </div>
            <div class="col-md-6 text-center">
              <img src="./museum.png" alt="Wayang Image" class="img-fluid img-block" style="max-width: 80%; height: auto;">
            </div>
          </div>
        </div>

        <div class="text-center">
          <h2 class="judul2" style="padding-top: 30px;">Harga Tiket Masuk Museum Wayang</h2>
        </div>
        <div class="container">
          <div class="ticket-prices">
            <p>Sebagai objek wisata, Museum Wayang dibuka untuk umum setiap hari Selasa hingga Minggu pukul 09.00-17.00 WIB. Pengunjung dapat melihat lebih dari 4.000 buah wayang yang terdiri dari wayang kulit, wayang golek, wayang kardus, wayang rumput, wayang janur, topeng, boneka, wayang beber dan gamelan yang ada di Museum Wayang ini. Adapun harga tiket masuk ke museum masih cukup terjangkau.</p>
            <p>Dewasa: Rp5.000.<br>
            Mahasiswa: Rp3.000.<br>
            Pelajar/Anak-anak: Rp2.000.<br>
            Rombongan (minimal 30 orang):<br>
            Dewasa: Rp3.750.<br>
            Mahasiswa: Rp2.250.<br>
            Pelajar/Anak-anak: Rp1.500.</p>
          </div>
        </div>

        <div class="text-center">
  <h2 class="judul2" style="padding-top: 30px;">Galeri Museum Wayang</h2>
</div>
<div class="container">
  <div class="row justify-content-center" style="padding-top: 20px;">
    <div class="col-md-4">
      <div class="image-gallery">
        <img src="./museum.png" alt="Gallery Image 1" class="gallery-image" style="max-width: 100%; height: auto;">
      </div>
    </div>
    <div class="col-md-4">
      <div class="image-gallery">
        <img src="./museum2.png" alt="Gallery Image 2" class="gallery-image" style="max-width: 100%; height: auto;">
      </div>
    </div>
    <div class="col-md-4">
      <div class="image-gallery">
        <img src="./museum3.png" alt="Gallery Image 3" class="gallery-image" style="max-width: 115%; height: auto;">
      </div>
    </div>
  </div>
</div>



        <div class="container1">
          <div class="text-container1">
            <p>Wayang adalah seni pertunjukan boneka tradisional dari Indonesia yang telah ada selama berabad-abad dan mencakup berbagai bentuk, seperti wayang kulit, wayang golek, wayang klitik, dan lain-lain. Kata "wayang" sendiri berasal dari kata Jawa "wewayangan," yang berarti bayangan, karena dalam beberapa jenis wayang seperti wayang kulit, bayangan boneka yang diproyeksikan ke layar adalah bagian utama dari pertunjukan</p>
            <p>Istilah “wayang” sendiri berasal dari kata “ma Hyang”, yang berarti menuju spiritualitas Sang Kuasa. Tapi ada juga yang mengatakan “wayang” berasal dari teknik pertunjukan yang mengandalkan bayangan (bayang/wayang) di layar.</p>
            <p>Wayang kulit berasal dari daerah Jawa, dengan sejarah yang sangat panjang. Catatan tertua tentang wayang kulit atau wayang purwa tersua dalam Prasasti Kuti bertarikh 840 M dari Joho, Sidoarjo, Jawa Timur. Prasasti ini menyebut kata haringgit atau dalang. “Haringgit adalah bentuk halus dari kata ringgit. Kata ini sampai sekarang masih ada dalam bahasa Jawa, yang berarti wayang,” catat Timbul Haryono, guru besar arkeologi Universitas Gadjah Mada, dalam “Masyarakat Jawa Kuna dan Lingkungannya Pada Masa Borobudur” termuat di 100 Tahun Pasca Pemugaran Candi Borobudur</p>
          </div>
          <div class="image-container1 slide-left">
            <img src="./image3.png" alt="Wayang Image" class="wayang3">
          </div>
        </div>
      </div>

      


    `;
  },

  async afterRender() {
    const elementsToAnimate = document.querySelectorAll('.slide-left, .slide-right');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('slide-left')) {
            entry.target.classList.add('slide-in-left');
          } else if (entry.target.classList.contains('slide-right')) {
            entry.target.classList.add('slide-in-right');
          }
        }
      });
    });

    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
  },
};

export default Beranda;
