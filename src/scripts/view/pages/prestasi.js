const Prestasi = {
    async render() {
      return `
        <main class="w-full mt-8">
          <section class="relative text-center w-full">
            <div class="relative w-full">
              <img
                alt="School Building"
                class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover"
                src="./images/Lapangan.jpg"
              />
              <img
                src="./images/logo.png"
                alt="School Logo"
                class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110"
              />
              <h1
                class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500"
              >
                Prestasi
              </h1>
            </div>
          </section>
  
          <section class="mt-16">
            <h2 class="text-2xl font-bold mb-6 text-center text-green-700">
              Prestasi Siswa (Ekstrakurikuler)
            </h2>
            <div id="prestasi-list" class="space-y-6">
              </div>
          </section>
        </main>
      `;
    },
  
    async afterRender() {
      const prestasiEkstraList =
        JSON.parse(localStorage.getItem("prestasi")) || []; // Perbaikan: Gunakan "prestasi" dari localStorage
      const prestasiListContainer = document.getElementById("prestasi-list");
  
      let prestasiCards = "";
      if (prestasiEkstraList.length > 0) {
        prestasiCards = prestasiEkstraList
          .map(
            (prestasi, index) => `
              <div class="flex max-w-[800px] mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <img
                  src="${prestasi.gambar}"
                  alt="${prestasi.judul}"
                  class="w-1/3 h-48 object-cover rounded-l self-center"
                />
                <div class="p-5 w-2/3 flex flex-col justify-between">
                  <h3 class="text-2xl font-bold text-green-700">
                    ${
                      prestasi.judul === "Sepak Bola"
                        ? "Menang Olimpiade Sepak Bola"
                        : prestasi.judul
                    }
                  </h3>
                  <p class="mt-3 text-gray-700 text-base">
                    ${prestasi.deskripsi.substring(0, 100)}...
                  </p>
                  <p class="mt-2 text-sm text-gray-500">
                    Diupload: ${prestasi.tanggal}
                  </p>
                  <button
                    data-index="${index}"
                    class="read-more-prestasi mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700 w-max self-start"
                  >
                    Read More
                  </button>
                </div>
              </div>
            `
          )
          .join("");
      } else {
        prestasiCards =
          '<p class="text-center text-gray-500">Belum ada data prestasi ekstrakurikuler.</p>';
      }
  
      prestasiListContainer.innerHTML = prestasiCards;
  
      document.querySelectorAll(".read-more-prestasi").forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          const dataDetail = prestasiEkstraList[index];
          localStorage.setItem("detail_prestasi", JSON.stringify(dataDetail));
          window.location.href = "#/detail_prestasi/${index}";
        });
      });
    },
  };
  
  export default Prestasi;
  