const Ekstrakurikuler = {
    async render() {
        const ekstrakurikulerList = JSON.parse(localStorage.getItem("ekstrakurikuler")) || [];

        const generateEkstraCards = (list) => {
            if (list.length > 0) {
                return list.map((item, index) => `
                    <div class="berita-item">
                        <div class="relative overflow-hidden rounded-md shadow-md">
                            <img
                                src="${item.gambar}"
                                alt="${item.nama || item.judul}"
                                class="berita-image transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 object-cover w-full h-64 md:h-48 lg:h-56"
                            />
                        </div>
                        <h4 class="text-xl font-semibold text-blue-800 hover:text-blue-600 transition mb-2 berita-title">
                            ${item.nama || item.judul}
                        </h4>
                        <p class="text-sm text-gray-500 mb-2 berita-date">
                            <i class="fa-regular fa-calendar mr-2"></i>
                            ${new Date(item.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                            })}
                        </p>
                        <p class="text-gray-700 text-justify mt-2 berita-description line-clamp-3">
                            ${item.deskripsi}
                        </p>
                        <a href="#/detail_ekstrakurikuler/${index}" class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline read-more-ekstra-btn mt-3" data-index="${index}">
                            Read More
                        </a>
                    </div>
                `).join('');
            } else {
                return `<p class="text-center text-gray-500 text-lg">Belum ada data ekstrakurikuler.</p>`;
            }
        };

        const ekstrakurikulerCards = generateEkstraCards(ekstrakurikulerList);

        return `
            <section class="relative text-center w-full">
                <div class="relative w-full overflow-hidden">
                    <img alt="School Building" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan.jpg"/>
                    <img src="./images/logo.png" alt="School Logo" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110">
                    <h1 class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500">Ekstrakurikuler</h1>
                </div>
            </section>

            <main class="w-full mt-6 px-6 md:px-10 berita-main">
                <section class="mt-6 berita-section">
                    <h2 class="text-2xl font-bold mb-6 text-center text-green-700">Beragam Kegiatan Ekstrakurikuler</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="md:col-span-2" id="ekstra-content">
                            <div class="flex flex-col gap-2 ekstra-list-container">
                                ${ekstrakurikulerCards}
                            </div>
                        </div>
                        <aside class="md:col-span-1">
                            <h2 class="text-lg font-semibold mb-3 text-green-700">Cari Ekstrakurikuler</h2>
                            <input type="text" id="search-ekstra" placeholder="Cari..." class="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        </aside>
                    </div>
                </section>
            </main>
        `;
    },

    async afterRender() {
        const ekstrakurikulerList = JSON.parse(localStorage.getItem("ekstrakurikuler")) || [];

        const attachReadMoreListeners = (selector, list, path) => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(button => {
                button.addEventListener('click', function () {
                    const index = this.dataset.index;
                    const dataDetail = list[index];
                    localStorage.setItem(`detail_${path.split('-')[0]}`, JSON.stringify(dataDetail));
                    window.location.hash = `/${path}/${index}`;
                });
            });
        };

        attachReadMoreListeners('.read-more-ekstra-btn', ekstrakurikulerList, 'detail-ekstrakurikuler');

        const setupSearch = (inputId, list, containerId) => {
            const searchInput = document.getElementById(inputId);
            const container = document.getElementById(containerId);

            if (searchInput && container) {
                searchInput.addEventListener('input', function () {
                    const query = this.value.toLowerCase();
                    const filteredList = list.filter(item =>
                        (item.nama && item.nama.toLowerCase().includes(query)) ||
                        (item.judul && item.judul.toLowerCase().includes(query)) ||
                        (item.deskripsi && item.deskripsi.toLowerCase().includes(query))
                    );

                    const generateFilteredCards = (filtered) => {
                        if (filtered.length > 0) {
                            container.innerHTML = filtered.map((item, index) => `
                                <div class="berita-item">
                                    <div class="relative overflow-hidden rounded-md shadow-md">
                                        <img
                                            src="${item.gambar}"
                                            alt="${item.nama || item.judul}"
                                            class="berita-image transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 object-cover w-full h-64 md:h-48 lg:h-56"
                                        />
                                    </div>
                                    <h4 class="text-xl font-semibold text-blue-800 hover:text-blue-600 transition mb-2 berita-title">
                                        ${item.nama || item.judul}
                                    </h4>
                                    <p class="text-sm text-gray-500 mb-2 berita-date">
                                        <i class="fa-regular fa-calendar mr-2"></i>
                                        ${new Date(item.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                                        })}
                                    </p>
                                    <p class="text-gray-700 text-justify mt-2 berita-description line-clamp-3">
                                        ${item.deskripsi}
                                    </p>
                                    <a href="#/detail-ekstrakurikuler/${index}" class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline read-more-ekstra-btn mt-3" data-index="${index}">
                                        Read More
                                    </a>
                                </div>
                            `).join('');
                        } else {
                            container.innerHTML = `<p class="text-center text-gray-500 text-lg">Tidak ada ekstrakurikuler yang sesuai dengan pencarian Anda.</p>`;
                        }
                        attachReadMoreListeners('.read-more-ekstra-btn', filteredList, 'detail-ekstrakurikuler');
                    };
                    generateFilteredCards(filteredList);
                });
            }
        };

        setupSearch('search-ekstra', ekstrakurikulerList, 'ekstra-content');
    }
};

export default Ekstrakurikuler;