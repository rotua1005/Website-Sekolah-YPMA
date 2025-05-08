const Berita = {
    async render() {
        const beritaList = JSON.parse(localStorage.getItem("berita")) || [];

        let beritaCards = '';
        if (beritaList.length > 0) {
            beritaCards = `
                <div class="flex flex-col gap-8 berita-list-container">
                    ${beritaList.map((berita, index) => `
                        <div class="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200 berita-card md:mx-auto md:w-3/4 lg:w-2/3">
                            <div class="md:flex">
                                <div class="md:w-1/3 flex-shrink-0">
                                    <img src="${berita.gambar}" alt="${berita.judul}"
                                         class="w-full h-full object-cover rounded-l-md md:rounded-t-md md:rounded-l-none border-gray-200 berita-image" />
                                </div>
                                <div class="p-5 flex flex-col flex-grow md:w-2/3">
                                    <h4 class="text-xl font-semibold text-blue-800 hover:text-blue-600 transition mb-3 berita-title">
                                        ${berita.judul}
                                    </h4>
                                    <p class="text-base text-gray-500 mb-3 berita-date">
                                        <i class="fa-regular fa-calendar mr-2"></i>
                                        ${new Date(berita.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                                        })}
                                    </p>
                                    <p class="text-lg text-gray-700 line-clamp-3 text-justify mb-4 flex-grow berita-description">
                                        ${berita.deskripsi.substring(0, 150)}...
                                    </p>
                                   <button data-index="${index}" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md text-lg focus:outline-none focus:shadow-outline transition-all berita-read-more-button mt-auto self-start">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            beritaCards = '<p class="text-center text-gray-500 text-lg">Belum ada berita yang diunggah.</p>';
        }

        return `
            <main class="w-full mt-10 px-6 md:px-10 berita-main">
                <section class="relative w-full mb-8 berita-hero">
                    <div class="relative w-full">
                        <img
                            alt="School Building"
                            class="w-full h-[220px] md:h-[300px] object-cover rounded-md shadow-md berita-hero-image"
                            src="./images/Lapangan.jpg"
                        />
                        <img
                            src="./images/logo.png"
                            alt="School Logo"
                            class="absolute top-6 left-6 w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110 berita-hero-logo"
                        >
                    </div>
                </section>

                <section class="mt-10 berita-section">
                    <h2 class="text-3xl font-bold mb-5 text-center text-green-700 berita-section-title">Berita Terbaru</h2>
                    <div id="news-cards">
                        ${beritaCards}
                    </div>
                </section>

                <div id="overlay" class="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm hidden z-40 berita-overlay"></div>
                <div id="news-detail-container" class="fixed inset-0 transform translate-x-full transition-transform duration-700 ease-in-out bg-white/0 z-50 overflow-y-auto pointer-events-none berita-detail-container">
                    <div id="news-detail" class="p-6 md:p-10 opacity-0 transition-opacity duration-500 max-w-4xl mx-auto berita-detail"></div>
                </div>
            </main>
        `;
    },

    async afterRender() {
        const beritaList = JSON.parse(localStorage.getItem("berita")) || [];
        const readMoreButtons = document.querySelectorAll('.berita-read-more-button');
        const newsDetail = document.getElementById('news-detail');
        const newsDetailContainer = document.getElementById('news-detail-container');
        const overlay = document.getElementById('overlay');

        const openDetail = () => {
            overlay.classList.remove('hidden');
            newsDetailContainer.classList.remove('translate-x-full', 'pointer-events-none');
            newsDetailContainer.classList.add('translate-x-0');
            setTimeout(() => {
                newsDetail.classList.add('opacity-100');
            }, 300);
        };

        const closeDetail = () => {
            newsDetail.classList.remove('opacity-100');
            newsDetailContainer.classList.remove('translate-x-0');
            newsDetailContainer.classList.add('translate-x-full', 'pointer-events-none');
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 700);
        };

        readMoreButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.getAttribute('data-index'));
                const berita = beritaList[index];

                if (berita) {
                    const relatedBerita = beritaList.filter((_, i) => i !== index).slice(0, 3);

                    newsDetail.innerHTML = `
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="md:col-span-2">
                                
                                <h2 class="text-3xl font-bold text-green-700 mb-4">${berita.judul}</h2>
                                <p class="text-lg text-gray-500 mb-5">
                                    Diterbitkan: ${new Date(berita.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                                    })}
                                </p>
                                <img src="${berita.gambar}" alt="${berita.judul}" class="w-full h-auto object-cover rounded-md shadow mb-3"/>
                                <div class="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                                    ${berita.deskripsi}
                                </div>
                                <div class="mt-8">
                                    <button id="close-detail" class="px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-lg font-semibold">
                                        Tutup
                                    </button>
                                </div>
                            </div>
                            <aside>
                                <h3 class="text-xl font-semibold mb-4 text-green-700 border-b pb-3">Berita Terkait</h3>
                                <div class="space-y-4">
                                    ${relatedBerita.map(rb => `
                                        <div class="flex gap-4">
                                            <div class="aspect-w-4 aspect-h-3 w-20 h-15">
                                                <img src="${rb.gambar}" alt="${rb.judul}" class="w-full h-full object-cover rounded-md" />
                                            </div>
                                            <div class="flex-1">
                                                <h4 class="text-lg font-semibold text-blue-800 line-clamp-2">${rb.judul}</h4>
                                                <p class="text-sm text-gray-500">
                                                    ${new Date(rb.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                                        day: 'numeric', month: 'short', year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </aside>
                        </div>
                    `;
                    openDetail();
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (e.target.id === 'close-detail' || e.target.id === 'overlay') {
                closeDetail();
            }
        });

        newsDetailContainer.classList.add('pointer-events-none');
    }
};

export default Berita;