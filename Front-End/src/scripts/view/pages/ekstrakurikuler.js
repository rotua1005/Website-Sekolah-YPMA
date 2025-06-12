const Ekstrakurikuler = {
    async render() {
        let ekstrakurikulerList = [];
        try {
            const response = await fetch('http://localhost:5000/api/dashboardEkstrakurikuler');
            if (!response.ok) throw new Error("Gagal fetch data ekstrakurikuler");
            ekstrakurikulerList = await response.json();
            ekstrakurikulerList = ekstrakurikulerList.reverse(); // Show newest first
        } catch (e) {
            console.error("Error fetching ekstrakurikuler:", e);
            ekstrakurikulerList = [];
        }

        const generateEkstraCards = (list) => {
            if (list.length > 0) {
                return list.map((item, index) => `
                    <div class="berita-item bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 group" data-aos="fade-up-right">
                        <div class="relative overflow-hidden rounded-md">
                            <img
                                src="http://localhost:5000${item.gambar}"
                                alt="${item.nama || item.judul}"
                                class="transition-all duration-500 ease-in-out transform hover:scale-110 object-cover w-full h-56 md:h-48 lg:h-56 rounded-lg shadow-lg"
                            />
                        </div>
                        <h4 class="text-xl font-semibold text-blue-800 group-hover:text-green-600 transition mt-4 berita-title" style="font-family: 'Merriweather', serif;">
                            ${item.nama || item.judul}
                        </h4>
                        <p class="text-sm text-gray-500 mt-1 berita-date">
                            <i class="fa-regular fa-calendar mr-2"></i>
                            ${new Date(item.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                            })}
                        </p>
                        <p class="text-gray-700 text-justify mt-2 berita-description line-clamp-3" style="font-family: 'Roboto', sans-serif;">
                            ${item.deskripsi}
                        </p>
                        <a href="#/detail_ekstrakurikuler/${item._id || index}" class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition read-more-btn">
                            Read More
                        </a>
                    </div>
                `).join('');
            } else {
                return `<p class="text-center text-gray-500 text-lg">Belum ada data ekstrakurikuler.</p>`;
            }
        };

        // Recent posts: ambil 3 terbaru
        const recentPosts = ekstrakurikulerList.slice(0, 3);
        const recentPostsHTML = recentPosts.map((item, index) => `
            <div class="flex items-center mb-4" data-aos="fade-left">
                <a href="#/detail_ekstrakurikuler/${item._id || index}" class="block w-20 h-16 flex-shrink-0 mr-4">
                    <img src="http://localhost:5000${item.gambar}" alt="${item.nama || item.judul}" class="w-full h-full object-cover rounded-md shadow" />
                </a>
                <div class="flex-1">
                    <p class="text-sm text-gray-500 mb-1">
                        ${new Date(item.tanggal || Date.now()).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'short', year: 'numeric'
                        })}
                    </p>
                    <a href="#/detail_ekstrakurikuler/${item._id || index}" class="text-base font-semibold text-blue-800 hover:text-green-600 line-clamp-2 no-underline" style="font-family: 'Merriweather', serif; text-decoration: none;">
                        ${item.nama || item.judul}
                    </a>
                </div>
            </div>
        `).join('');

        const ekstrakurikulerCards = generateEkstraCards(ekstrakurikulerList);

        return `
            <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Roboto&display=swap" rel="stylesheet">
            <section class="relative text-center w-full">
                <div class="relative w-full overflow-hidden">
                    <img alt="School Building" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan1.jpg"/>
                    <img src="./images/logo.png" alt="School Logo" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110">
                    <h1 class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500 drop-shadow-xl" data-aos="zoom-in">
                        Ekstrakurikuler
                    </h1>
                </div>
            </section>

            <main class="w-full mt-10 px-6 md:px-10 berita-main bg-gradient-to-b from-gray-100 to-white py-10">
                <section class="mt-6 berita-section">
                    <h2 class="text-2xl font-bold mb-6 text-center text-green-700" style="font-family: 'Merriweather', serif;">Beragam Kegiatan Ekstrakurikuler</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="md:col-span-2" id="ekstra-content">
                            <div class="flex flex-col gap-6 ekstra-list-container">
                                ${ekstrakurikulerCards}
                            </div>
                        </div>
                        <aside class="md:col-span-1">
                            <h2 class="text-lg font-semibold mb-3 text-green-700">Cari Ekstrakurikuler</h2>
                            <input type="text" id="search-ekstra" placeholder="Cari..." class="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" data-aos="fade-left">
                            <h2 class="text-lg font-bold mb-4 text-green-700" style="font-family: 'Merriweather', serif;">Recent Posts</h2>
                            <div id="recent-ekstra-container" class="space-y-3">
                                ${recentPostsHTML}
                            </div>
                        </aside>
                    </div>
                </section>
            </main>
            <style>
                #recent-ekstra-container a {
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

        let ekstrakurikulerList = [];
        try {
            const response = await fetch('http://localhost:5000/api/dashboardEkstrakurikuler');
            if (!response.ok) throw new Error("Gagal fetch data ekstrakurikuler");
            ekstrakurikulerList = await response.json();
            ekstrakurikulerList = ekstrakurikulerList.reverse();
        } catch (e) {
            ekstrakurikulerList = [];
        }

        const attachReadMoreListeners = (selector, list) => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach((button, idx) => {
                button.addEventListener('click', function () {
                    const index = this.getAttribute('href').split('/').pop();
                    const dataDetail = list.find(item => (item._id && item._id == index)) || list[idx];
                    localStorage.setItem('detail_ekstrakurikuler', JSON.stringify(dataDetail));
                    window.location.hash = `#/detail_ekstrakurikuler/${index}`;
                });
            });
        };

        attachReadMoreListeners('.read-more-btn', ekstrakurikulerList);

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
                                <div class="berita-item bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 group" data-aos="fade-up-right">
                                    <div class="relative overflow-hidden rounded-md">
                                        <img
                                            src="http://localhost:5000${item.gambar}"
                                            alt="${item.nama || item.judul}"
                                            class="transition-all duration-500 ease-in-out transform hover:scale-110 object-cover w-full h-56 md:h-48 lg:h-56 rounded-lg shadow-lg"
                                        />
                                    </div>
                                    <h4 class="text-xl font-semibold text-blue-800 group-hover:text-green-600 transition mt-4 berita-title" style="font-family: 'Merriweather', serif;">
                                        ${item.nama || item.judul}
                                    </h4>
                                    <p class="text-sm text-gray-500 mt-1 berita-date">
                                        <i class="fa-regular fa-calendar mr-2"></i>
                                        ${new Date(item.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                                        })}
                                    </p>
                                    <p class="text-gray-700 text-justify mt-2 berita-description line-clamp-3" style="font-family: 'Roboto', sans-serif;">
                                        ${item.deskripsi}
                                    </p>
                                    <a href="#/detail_ekstrakurikuler/${item._id || index}" class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition read-more-btn">
                                        Read More
                                    </a>
                                </div>
                            `).join('');
                        } else {
                            container.innerHTML = `<p class="text-center text-gray-500 text-lg">Tidak ada ekstrakurikuler yang sesuai dengan pencarian Anda.</p>`;
                        }
                        attachReadMoreListeners('.read-more-btn', filtered);
                        if (window.AOS) window.AOS.refresh();
                    };
                    generateFilteredCards(filteredList);
                });
            }
        };

        setupSearch('search-ekstra', ekstrakurikulerList, 'ekstra-content');

        // Recent posts search
        const recentInput = document.getElementById('search-ekstra');
        const recentContainer = document.getElementById('recent-ekstra-container');
        if (recentInput && recentContainer) {
            recentInput.addEventListener('input', function () {
                const query = this.value.toLowerCase();
                const filteredRecent = ekstrakurikulerList
                    .filter(item =>
                        (item.nama && item.nama.toLowerCase().includes(query)) ||
                        (item.judul && item.judul.toLowerCase().includes(query))
                    )
                    .slice(0, 3);

                recentContainer.innerHTML = filteredRecent.map((item, index) => `
                    <div class="flex items-center mb-4" data-aos="fade-left">
                        <a href="#/detail_ekstrakurikuler/${item._id || index}" class="block w-20 h-16 flex-shrink-0 mr-4">
                            <img src="http://localhost:5000${item.gambar}" alt="${item.nama || item.judul}" class="w-full h-full object-cover rounded-md shadow" />
                        </a>
                        <div class="flex-1">
                            <p class="text-sm text-gray-500 mb-1">
                                ${new Date(item.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                })}
                            </p>
                            <a href="#/detail_ekstrakurikuler/${item._id || index}" class="text-base font-semibold text-blue-800 hover:text-green-600 line-clamp-2 no-underline" style="font-family: 'Merriweather', serif; text-decoration: none;">
                                ${item.nama || item.judul}
                            </a>
                        </div>
                    </div>
                `).join('');
                attachReadMoreListeners('#recent-ekstra-container a', filteredRecent);
                if (window.AOS) window.AOS.refresh();
            });
        }
    }
};

export default Ekstrakurikuler;
