const DetailUpload = {
    async render() {
        return `
        <div class="dashboard-container bg-gray-100 min-h-screen flex">
            <div class="dashboard-main flex-1 p-8">
                <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Detail Berita</h2>
                </header>
                <main class="bg-white shadow-lg rounded-lg p-6">
                    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Daftar Berita</h1>
                    <div id="berita-list" class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
                </main>
            </div>
        </div>`;
    },

    async afterRender() {
        let beritaList = JSON.parse(localStorage.getItem("berita")) || [];
        const beritaListContainer = document.getElementById("berita-list");
        
        // Get the selected index from local storage
        const selectedIndex = localStorage.getItem("selectedBeritaIndex");
        
        function tampilkanBerita() {
            if (selectedIndex !== null && beritaList[selectedIndex]) {
                const berita = beritaList[selectedIndex];
                beritaListContainer.innerHTML = `
                    <div class="berita-item p-4 border rounded-lg shadow-lg bg-gray-50">
                        <h3 class="text-xl font-bold text-gray-800">${berita.judul}</h3>
                        <p class="text-gray-700 mt-2">${berita.deskripsi}</p>
                        <p class="text-gray-500 mt-2">${berita.tanggal}</p>
                        <img src="${berita.gambar}" alt="${berita.judul}" class="w-full h-48 object-cover rounded-lg mt-4 shadow-md">
                    </div>`;
            } else {
                beritaListContainer.innerHTML = `<p class="text-center text-gray-500">Berita tidak ditemukan.</p>`;
            }
        }
        
        tampilkanBerita();
        // Clear the selected index after displaying the detail
        localStorage.removeItem("selectedBeritaIndex");
    }
};

export default DetailUpload;