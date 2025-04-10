const Berita = {
    async render() {
        const beritaList = JSON.parse(localStorage.getItem("berita")) || [];

        let beritaCards = '';
        if (beritaList.length > 0) {
            beritaCards = beritaList.map(berita => `
                <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1 transform -translate-x-2">
                    <img src="${berita.gambar}" alt="${berita.judul}" class="w-full h-48 object-cover rounded">
                    <p class="mt-3 text-sm text-gray-500">Berita</p>
                    <h3 class="text-xl font-bold mt-2 text-green-700">${berita.judul}</h3>
                    <p class="mt-2 text-gray-700">${berita.deskripsi.substring(0, 100)}...</p>
                    <p class="mt-2 text-sm text-gray-500">Admin | ${berita.tanggal}</p>
                    <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Read More</a>
                </div>
            `).join('');
        } else {
            beritaCards = '<p class="text-center text-gray-500">Belum ada berita yang diunggah.</p>';
        }

        return `
            <main class="w-full mt-8">
                <section class="relative text-center w-full">
                    <div class="relative w-full">
                        <img alt="School Building" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan.jpg"/>
                        <img src="./images/logo.png" alt="School Logo" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110">
                        <h1 class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500">Berita</h1>
                    </div>
                </section>

                <section class="mt-10">
                    <h2 class="text-2xl font-bold mb-6 text-center text-green-700">News &amp; Update</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${beritaCards}
                    </div>
                </section>
            </main>
        `;
    },

    async afterRender() {
        // Fungsi tambahan bisa ditambahkan di sini jika diperlukan
    }
};

export default Berita;