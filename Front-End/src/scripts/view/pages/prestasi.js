const Prestasi = {
  async render() {
    let prestasiEkstraList = [];
    try {
      const response = await fetch('http://localhost:5000/api/dashboardPrestasi');
      if (!response.ok) throw new Error("Gagal fetch data");
      prestasiEkstraList = await response.json();
      prestasiEkstraList = prestasiEkstraList.reverse(); // Show newest first
    } catch (e) {
      console.error("Error fetching prestasi:", e);
      prestasiEkstraList = [];
    }

    let prestasiContent = "";
    if (prestasiEkstraList.length > 0) {
      prestasiContent = `
        <div class="flex flex-col gap-6 prestasi-list-container">
          ${prestasiEkstraList
            .map(
              (prestasi, index) => `
              <div class="prestasi-item bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 group" data-aos="fade-up-right">
                <div class="relative overflow-hidden rounded-md">
                  <img
                    src="http://localhost:5000${prestasi.gambar}"
                    alt="${prestasi.judul}"
                    class="transition-all duration-500 ease-in-out transform hover:scale-110 object-cover w-full h-56 md:h-48 lg:h-56 rounded-lg shadow-lg"
                  />
                </div>
                <h4 class="text-xl font-semibold text-blue-800 group-hover:text-green-600 transition mt-4 prestasi-title" style="font-family: 'Merriweather', serif;">
                  ${prestasi.judul}
                </h4>
                <p class="text-sm text-gray-500 mt-1 prestasi-date">
                  <i class="fa-regular fa-calendar mr-2"></i>
                  ${new Date(prestasi.tanggal || Date.now()).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p class="text-gray-700 text-justify mt-2 prestasi-description line-clamp-3" style="font-family: 'Poppins', sans-serif;">
                  ${prestasi.deskripsi}
                </p>
                <a href="#/detail_prestasi/${prestasi._id || index}" class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition-transform transform hover:scale-105 read-more-btn">
                  Read More
                </a>
              </div>
            `
            )
            .join("")}
        </div>
      `;
    } else {
      prestasiContent = '<p class="text-center text-gray-500 text-lg">Belum ada prestasi yang diunggah.</p>';
    }

    const recentPrestasi = prestasiEkstraList.slice(0, 3);
    const recentPrestasiHTML = recentPrestasi
      .map(
        (prestasi, index) => `
          <div class="flex items-center mb-4" data-aos="fade-left">
            <a href="#/detail_prestasi/${prestasi._id || index}" class="block w-24 h-20 flex-shrink-0 mr-4 recent-link">
              <img src="http://localhost:5000${prestasi.gambar}" alt="${prestasi.judul}" class="w-full h-full object-cover rounded-md shadow" />
            </a>
            <div class="flex-1">
              <p class="text-sm text-gray-500 mb-1">
                ${new Date(prestasi.tanggal || Date.now()).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <a href="#/detail_prestasi/${prestasi._id || index}" class="text-base font-semibold text-blue-800 hover:text-green-600 line-clamp-2 recent-link" style="font-family: 'Merriweather', serif;">
                ${prestasi.judul}
              </a>
            </div>
          </div>
        `
      )
      .join("");

    return `
      <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
      <section class="relative text-center w-full">
        <div class="relative w-full overflow-hidden">
          <img alt="School Building" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan1.jpg"/>
          <img src="./images/logo.png" alt="School Logo" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition hover:scale-110">
          <h1 class="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-bold text-green-500 drop-shadow-xl" data-aos="zoom-in" style="font-family: 'Merriweather', serif;">
            Prestasi
          </h1>
        </div>
      </section>

      <main class="w-full mt-10 px-6 md:px-10 prestasi-main bg-gradient-to-b from-gray-100 to-white py-10">
        <section class="mt-6 prestasi-section">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="md:col-span-2" id="prestasi-content">
              ${prestasiContent}
            </div>
            <aside class="md:col-span-1">
              <h2 class="text-lg font-bold mb-4 text-green-700" data-aos="fade-right" style="font-family: 'Merriweather', serif;">Recent Achievements</h2>
              <input type="text" id="search-recent-prestasi" placeholder="Cari..." class="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" data-aos="fade-left">
              <div id="recent-prestasi-container" class="space-y-3">
                ${recentPrestasiHTML}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <style>
        /* Remove underline from recent post links */
        #recent-prestasi-container .recent-link {
          text-decoration: none !important;
        }
      </style>
    `;
  },

  async afterRender() {
    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        once: false,
      });
    }

    const searchInput = document.getElementById("search-recent-prestasi");
    const recentPrestasiContainer = document.getElementById("recent-prestasi-container");
    let prestasiEkstraList = [];
    try {
      const response = await fetch('http://localhost:5000/api/dashboardPrestasi');
      if (!response.ok) throw new Error("Gagal fetch data");
      prestasiEkstraList = await response.json();
      prestasiEkstraList = prestasiEkstraList.reverse();
    } catch (e) {
      prestasiEkstraList = [];
    }

    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      const filteredPrestasi = prestasiEkstraList
        .slice(0, 3)
        .filter((prestasi) => prestasi.judul.toLowerCase().includes(query));
      recentPrestasiContainer.innerHTML = filteredPrestasi
        .map(
          (prestasi, index) => `
          <div class="flex items-center mb-4" data-aos="fade-up-left">
            <a href="#/detail_prestasi/${prestasi._id || index}" class="block w-24 h-20 flex-shrink-0 mr-4 recent-link">
              <img src="http://localhost:5000${prestasi.gambar}" alt="${prestasi.judul}" class="w-full h-full object-cover rounded-md shadow" />
            </a>
            <div class="flex-1">
              <p class="text-sm text-gray-500 mb-1">
                ${new Date(prestasi.tanggal || Date.now()).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <a href="#/detail_prestasi/${prestasi._id || index}" class="text-base font-semibold text-blue-800 hover:text-green-600 line-clamp-2 recent-link" style="font-family: 'Merriweather', serif;">
                ${prestasi.judul}
              </a>
            </div>
          </div>
        `
        )
        .join("");
      if (window.AOS) window.AOS.refresh();
    });
  },
};

export default Prestasi;
  

  