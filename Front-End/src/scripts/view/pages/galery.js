const Galery = {
    async render() {
        const galeriItems = [
            { gambar: "./images/Lapangan.jpg", judul: "Lapangan Sekolah" },
            { gambar: "./images/galeri/sholat_jamaah.jpg", judul: "Sholat Jama'ah" },
            { gambar: "./images/galeri/apel_pandu1.jpg", judul: "Apel Pandu" },
            { gambar: "./images/galeri/apel_pandu2.jpg", judul: "Apel Pandu" },
            { gambar: "./images/galeri/tahsin_makharijul_huruf.jpg", judul: "Tahsin Makharijul Huruf" },
            { gambar: "./images/galeri/team_work_gph.jpg", judul: "Team Work GPH" },
            { gambar: "./images/galeri/upacara_sekolah.jpg", judul: "Upacara Sekolah" },
            { gambar: "./images/galeri/pelantikan_gph.jpg", judul: "Pelantikan GPH" },
            { gambar: "./images/galeri/gedung_integral.jpg", judul: "Gedung Integral" },
            { gambar: "./images/galeri/tahsin_bersama_syech.jpg", judul: "Tahsin Bersama Syech" },
            { gambar: "./images/galeri/setoran_hafalan.jpg", judul: "Setoran Hafalan" },
            { gambar: "./images/galeri/wisuda_30_juz.jpg", judul: "Wisuda & Sertifikasi 30 Juz" },
            { gambar: "./images/galeri/manasik_haji.jpg", judul: "Manasik Haji" },
            { gambar: "./images/galeri/latihan_pidato.jpg", judul: "Latihan Pidato" },
            { gambar: "./images/galeri/kunjungan_tahfidz.jpg", judul: "Kunjungan Tahfidz" },
            { gambar: "./images/galeri/belajar_kaligrafi.jpg", judul: "Belajar Kaligrafi" },
        ];

        const generateGaleriCards = (list) => {
            if (list.length > 0) {
                return list.map((item) => `
                    <div class="relative overflow-hidden rounded-md shadow-md">
                        <img
                            src="${item.gambar}"
                            alt="${item.judul}"
                            class="transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 object-cover w-full h-40 md:h-56 lg:h-64"
                        />
                        <div class="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-white p-4">
                            <h4 class="text-lg font-semibold">${item.judul}</h4>
                        </div>
                    </div>
                `).join('');
            } else {
                return `<p class="text-center text-gray-500 text-lg">Belum ada foto galeri.</p>`;
            }
        };

        const galeriCards = generateGaleriCards(galeriItems);

        return `
            <section class="relative text-center w-full">
                <div class="relative w-full overflow-hidden">
                    <img alt="Gedung Sekolah" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan.jpg"/>
                    <img src="./images/logo.png" alt="Logo Sekolah" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110">
                    <h1 class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500">Galery</h1>
                </div>
            </section>

            <main class="w-full mt-6 px-6 md:px-10">
                <section class="mt-6">
                    <h2 class="text-2xl font-bold mb-6 text-center text-green-700">Foto Kegiatan Sekolah</h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        ${galeriCards}
                    </div>
                </section>
            </main>
        `;
    },

    async afterRender() {
        // Tidak ada interaksi khusus yang dibutuhkan setelah render untuk galeri statis ini
    },
};

export default Galery;
