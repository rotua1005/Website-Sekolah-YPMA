const VisiMisi = {
    async render() {
      return `
          <section class="relative text-center w-full">
            <div class="relative w-full">
              <img
                alt="Gedung Sekolah"
                class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover"
                src="./images/Lapangan.jpg"
              />
              <img
                src="./images/logo.png"
                alt="Logo Sekolah"
                class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110 animate-bounce"
              />
              <h1
                class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500 animate-fade-in"
              >
                Visi Misi
              </h1>
            </div>
          </section>
          <main class="w-full mt-8">
            <section
              class="bg-gray-900 text-white py-14 md:py-16 mt-8 md:mt-12 w-full rounded-lg shadow-md animate-slide-in-right"
            >
              <div class="text-center max-w-screen-xl mx-auto px-4">
                <h2 class="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
                  Visi & Misi
                </h2>
                <h3 class="text-2xl md:text-3xl font-semibold mb-8 animate-fade-in">
                  Unggul Dengan Karakter Integral
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  <img
                    alt="Pesantren 1"
                    class="w-full h-[300px] object-cover rounded-lg shadow-md hover:scale-105 transition-all animate-slide-in-left"
                    src="./images/Pesantren 1.jpg"
                  />
                  <img
                    alt="Pesantren 2"
                    class="w-full h-[300px] object-cover rounded-lg shadow-md hover:scale-105 transition-all animate-slide-in-right"
                    src="./images/Pesantren 2.jpg"
                  />
                  <ul class="text-left space-y-6 text-lg">
                    <li class="flex items-start animate-fade-in">
                      <i class="fas fa-check-circle text-green-500 text-2xl mr-4"></i>
                      <span>Mewujudkan generasi yang beriman, cerdas, dan berkarakter berdasarkan nilai-nilai Islam.</span>
                    </li>
                    <li class="flex items-start animate-fade-in">
                      <i class="fas fa-check-circle text-green-500 text-2xl mr-4"></i>
                      <span>Meningkatkan pendidikan yang berlandaskan keimanan dan moral serta membentuk karakter disiplin.</span>
                    </li>
                    <li class="flex items-start animate-fade-in">
                      <i class="fas fa-check-circle text-green-500 text-2xl mr-4"></i>
                      <span>Menciptakan lingkungan yang mendukung pengembangan potensi peserta didik secara menyeluruh.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
  
            <section class="w-full py-14 md:py-16 bg-white animate-slide-in-left">
              <div class="max-w-screen-xl mx-auto px-4 text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-10 animate-fade-in">
                  Profil Output
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  ${[
                    {
                      title: "Belajar Dengan Tekun",
                      text: "Menjadikan ilmu sebagai landasan utama dalam mencapai kesuksesan.",
                    },
                    {
                      title: "Berakhlak Mulia",
                      text: "Menerapkan akhlak yang mulia sesuai tuntunan Al-Qur'an dalam kehidupan sehari-hari.",
                    },
                    {
                      title: "Beribadah Tekun",
                      text: "Menjalankan ibadah dengan disiplin dan istiqomah sebagai bentuk ketakwaan.",
                    },
                    {
                      title: "Aktif dalam Ekstrakurikuler",
                      text: "Mengikuti kegiatan seperti sepak bola, tahfidz Al-Qur'an, nasyid, seni tari, dan lainnya.",
                    },
                    {
                      title: "Unggul Dalam Akademik",
                      text: "Mencapai prestasi akademik melalui pembelajaran berkualitas dan bimbingan intensif.",
                    },
                    {
                      title: "Life Skill Excellence",
                      text: "Mengembangkan keterampilan hidup untuk kesiapan masa depan yang lebih baik.",
                    },
                  ]
                    .map(
                      (item) => `
                          <div class="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all animate-fade-in">
                            <h3 class="text-green-500 font-bold text-xl mb-4">
                              ${item.title}
                            </h3>
                            <p class="text-gray-700 text-lg">${item.text}</p>
                          </div>
                        `
                    )
                    .join("")}
                </div>
              </div>
            </section>
          </main>
        `;
    },
  
    async afterRender() {
      // Tidak ada fungsi spesifik setelah render untuk halaman Visi Misi saat ini
    },
  };
  
  export default VisiMisi;