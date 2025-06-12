const Berita = {
    async render() {
        let beritaList = [];
        try {
            const response = await fetch('http://localhost:5000/api/dashboardUploadBerita');
            if (!response.ok) throw new Error("Gagal fetch data");
            beritaList = await response.json();
            beritaList = beritaList.reverse(); // Show newest first
        } catch (e) {
            console.error("Error fetching news:", e);
            beritaList = [];
        }

        let beritaContent = '';
        if (beritaList.length > 0) {
            beritaContent = `
                <div class="flex flex-col gap-6 berita-list-container">
                    ${beritaList.map((berita, index) => `
                        <div class="berita-item bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 group" data-aos="fade-up">
                            <div class="relative overflow-hidden rounded-md">
                                <img
                                    src="http://localhost:5000${berita.gambar}"
                                    alt="${berita.judul}"
                                    class="transition-all duration-500 ease-in-out transform hover:scale-110 object-cover w-full h-56 md:h-48 lg:h-56 rounded-lg shadow-lg"
                                />
                            </div>
                            <h4 class="text-xl font-semibold text-blue-800 group-hover:text-green-600 transition mt-4 berita-title" style="font-family: 'Merriweather', serif;" data-aos="fade-in" data-aos-delay="100">
                                ${berita.judul}
                            </h4>
                            <p class="text-sm text-gray-500 mt-1 berita-date">
                                <i class="fa-regular fa-calendar mr-2"></i>
                                ${new Date(berita.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                                })}
                            </p>
                            <p class="text-gray-700 text-justify mt-2 berita-description line-clamp-3" style="font-family: 'Poppins', sans-serif;">
                                ${berita.deskripsi}
                            </p>
                            <a href="#/detail_berita/${berita._id || index}" class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition-transform transform hover:scale-105 read-more-btn">
                                Read More
                            </a>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            beritaContent = '<p class="text-center text-gray-500 text-lg">Belum ada berita yang diunggah.</p>';
        }

        const recentPosts = beritaList.slice(0, 3);
        const recentPostsHTML = recentPosts.map((post, index) => `
            <div class="flex items-center mb-4" data-aos="fade-left">
                <a href="#/detail_berita/${post._id || index}" class="block w-24 h-20 flex-shrink-0 mr-4">
                    <img src="http://localhost:5000${post.gambar}" alt="${post.judul}" class="w-full h-full object-cover rounded-md shadow" />
                </a>
                <div class="flex-1">
                    <p class="text-sm text-gray-500 mb-1">
                        ${new Date(post.tanggal || Date.now()).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'short', year: 'numeric'
                        })}
                    </p>
                    <a href="#/detail_berita/${post._id || index}" class="text-base font-semibold text-blue-800 hover:text-green-600 line-clamp-2 no-underline" style="font-family: 'Merriweather', serif; text-decoration: none;">
                        ${post.judul}
                    </a>
                </div>
            </div>
        `).join('');

        return `
            <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
            <section class="relative text-center w-full">
                <div class="relative w-full overflow-hidden">
                    <img alt="School Building" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan1.jpg"/>
                    <img src="./images/logo.png" alt="School Logo" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition hover:scale-110">
                    <h1 class="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-bold text-green-500 drop-shadow-xl" data-aos="fade-in" data-aos-duration="1000" style="font-family: 'Merriweather', serif;">
                        Berita
                    </h1>
                </div>
            </section>

            <main class="w-full mt-10 px-6 md:px-10 berita-main bg-gradient-to-b from-gray-100 to-white py-10">
                <section class="mt-6 berita-section">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="md:col-span-2" id="news-content">
                            ${beritaContent}
                        </div>
                        <aside class="md:col-span-1">
                            <h2 class="text-lg font-bold mb-4 text-green-700" data-aos="fade-right" style="font-family: 'Merriweather', serif;">Recent Posts</h2>
                            <input type="text" id="search-recent-posts" placeholder="Cari..." class="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" data-aos="fade-left">
                            <div id="recent-posts-container" class="space-y-3">
                                ${recentPostsHTML}
                            </div>
                        </aside>
                    </div>
                </section>
            </main>
            <style>
                /* Remove underline from recent post links */
                #recent-posts-container a {
                    text-decoration: none !important;
                }
            </style>
        `;
    },

    async afterRender() {
        if (window.AOS) {
            window.AOS.init({
                duration: 800,
                once: false, // animate every time on scroll
            });
        }

        const searchInput = document.getElementById('search-recent-posts');
        const recentPostsContainer = document.getElementById('recent-posts-container');
        let beritaList = [];
        try {
            const response = await fetch('http://localhost:5000/api/dashboardUploadBerita');
            if (!response.ok) throw new Error("Gagal fetch data");
            beritaList = await response.json();
            beritaList = beritaList.reverse();
        } catch (e) {
            beritaList = [];
        }

        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            const filteredPosts = beritaList.slice(0, 3).filter(post => post.judul.toLowerCase().includes(query));
            recentPostsContainer.innerHTML = filteredPosts.map((post, index) => `
                <div class="flex items-center mb-4" data-aos="fade-up-left">
                    <a href="#/detail_berita/${post._id || index}" class="block w-24 h-20 flex-shrink-0 mr-4">
                        <img src="http://localhost:5000${post.gambar}" alt="${post.judul}" class="w-full h-full object-cover rounded-md shadow" />
                    </a>
                    <div class="flex-1">
                        <p class="text-sm text-gray-500 mb-1">
                            ${new Date(post.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                day: 'numeric', month: 'short', year: 'numeric'
                            })}
                        </p>
                        <a href="#/detail_berita/${post._id || index}" class="text-base font-semibold text-blue-800 hover:text-green-600 line-clamp-2 no-underline" style="font-family: 'Merriweather', serif; text-decoration: none;">
                            ${post.judul}
                        </a>
                    </div>
                </div>
            `).join('');
            if (window.AOS) window.AOS.refresh();
        });
    }
};

export default Berita;
