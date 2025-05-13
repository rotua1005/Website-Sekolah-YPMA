const Berita = {
    async render() {
        const beritaList = JSON.parse(localStorage.getItem("berita")) || [];

        // Generate berita content
        let beritaContent = '';
        if (beritaList.length > 0) {
            beritaContent = `
                <div class="flex flex-col gap-2 berita-list-container">
                    ${beritaList.map((berita, index) => `
                        <div class="berita-item">
                            <div class="relative overflow-hidden rounded-md shadow-md">
                                <img
                                    src="${berita.gambar}"
                                    alt="${berita.judul}"
                                    class="berita-image transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 object-cover w-full h-64 md:h-48 lg:h-56"
                                />
                            </div>
                            <h4 class="text-xl font-semibold text-blue-800 hover:text-blue-600 transition mb-2 berita-title">
                                ${berita.judul}
                            </h4>
                            <p class="text-sm text-gray-500 mb-2 berita-date">
                                <i class="fa-regular fa-calendar mr-2"></i>
                                ${new Date(berita.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                                })}
                            </p>
                            <p class="text-gray-700 text-justify mt-2 berita-description line-clamp-3">
                                ${berita.deskripsi}
                            </p>
                            <a href="#/detail_berita/${index}" class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline read-more-btn mt-3">
                                Read More
                            </a>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            beritaContent = '<p class="text-center text-gray-500 text-lg">Belum ada berita yang diunggah.</p>';
        }

        // Generate recent posts (3 terakhir)
        const recentPosts = beritaList.slice(0, 3);
        const recentPostsHTML = recentPosts.map((post, index) => `
            <div class="flex items-center mb-3">
                <a href="#/detail_berita/${index}" class="block w-24 h-20 flex-shrink-0 mr-4">
                    <img src="${post.gambar}" alt="${post.judul}" class="w-full h-full object-cover rounded-md shadow" />
                </a>
                <div class="flex-1">
                    <p class="text-base text-gray-500 mb-1">
                        ${new Date(post.tanggal || Date.now()).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'short', year: 'numeric'
                        })}
                    </p>
                    <a href="#/detail_berita/${index}" class="text-lg font-semibold text-blue-800 hover:text-blue-600 line-clamp-2">
                        ${post.judul}
                    </a>
                </div>
            </div>
        `).join('');

        return `
            <section class="relative text-center w-full">
                <div class="relative w-full overflow-hidden">
                    <img alt="School Building" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan.jpg"/>
                    <img src="./images/logo.png" alt="School Logo" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110">
                    <h1 class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500">Berita</h1>
                </div>
            </section>

            <main class="w-full mt-6 px-6 md:px-10 berita-main">
                <section class="mt-6 berita-section">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="md:col-span-2" id="news-content">
                            ${beritaContent}
                        </div>
                        <aside class="md:col-span-1">
                            <h2 class="text-lg font-semibold mb-3 text-green-700">Recent Posts</h2>
                            <input type="text" id="search-recent-posts" placeholder="Cari..." class="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                            <div id="recent-posts-container" class="space-y-3">
                                ${recentPostsHTML}
                            </div>
                        </aside>
                    </div>
                </section>
            </main>
        `;
    },

    async afterRender() {
        const readMoreButtons = document.querySelectorAll('.read-more-btn');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function () {
                const id = this.dataset.id;
                window.location.hash = `/detail_berita/${id}`;
            });
        });

        const searchInput = document.getElementById('search-recent-posts');
        const recentPostsContainer = document.getElementById('recent-posts-container');
        const beritaList = JSON.parse(localStorage.getItem("berita")) || [];

        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            const filteredPosts = beritaList.slice(0, 3).filter(post => post.judul.toLowerCase().includes(query));
            recentPostsContainer.innerHTML = filteredPosts.map((post, index) => `
                <div class="flex items-center mb-3">
                    <a href="#/detail_berita/${index}" class="block w-24 h-20 flex-shrink-0 mr-4">
                        <img src="${post.gambar}" alt="${post.judul}" class="w-full h-full object-cover rounded-md shadow" />
                    </a>
                    <div class="flex-1">
                        <p class="text-base text-gray-500 mb-1">
                            ${new Date(post.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                day: 'numeric', month: 'short', year: 'numeric'
                            })}
                        </p>
                        <a href="#/detail_berita/${index}" class="text-lg font-semibold text-blue-800 hover:text-blue-600 line-clamp-2">
                            ${post.judul}
                        </a>
                    </div>
                </div>
            `).join('');
        });
    }
};

export default Berita;