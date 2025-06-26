const Galery = {
    async render() {
        const galeriItems = [
            { gambar: "./images/Lapangan1.jpg", judul: "Jam Istirahat" },
            { gambar: "./images/Kegiatan Sholat Di Mushola.jpg", judul: "Sholat Jama'ah" },
            { gambar: "./images/Kegiatan Mengaji Di Mushola.jpg", judul: "Membaca alquran" },
            { gambar: "./images/Berkunjung.jpg", judul: "Senam & Olahraga" },
            { gambar: "./images/Membaca.jpg", judul: "Literasi di Perpustakaan" },
            { gambar: "./images/Kepala Sekolah.jpg", judul: "Sambutan Tamu" },
            { gambar: "./images/Belajar Bareng.jpg", judul: "Belajar Bersama Di Perpustakaan" },
            { gambar: "./images/Pramuka.jpg", judul: "Pramuka Sekolah" },
            { gambar: "./images/Olahraga.jpg", judul: "Gedung Integral" },
            { gambar: "./images/Sedang Olahraga.jpg", judul: "Foto Bersama" },
            { gambar: "./images/Sepak Bola.jpg", judul: "Tim Sepak Bola" },
            { gambar: "./images/Pesantren 1.jpg", judul: "Wisuda & Sertifikasi 30 Juz" },
            { gambar: "./images/Nasyid.jpg", judul: "Manasik Haji" },
            { gambar: "./images/Renang.jpg", judul: "Kegiatan Berenang" },
            { gambar: "./images/Renang1.jpg", judul: "Kunjungan Tahfidz" },
            { gambar: "./images/Acara.jpg", judul: "Belajar Kaligrafi" },
        ];

        const generateGaleriCards = (list) => {
            if (list.length > 0) {
                return list.map((item, idx) => `
                    <div 
                        class="relative overflow-hidden rounded-md shadow-md group transition-all duration-500 galery-card-float gallery-card-animate"
                        style="opacity:0; animation-delay:${idx * 90}ms;"
                    >
                        <img
                            src="${item.gambar}"
                            alt="${item.judul}"
                            class="galery-img object-cover w-full h-40 md:h-56 lg:h-64 transition-all duration-700 ease-[cubic-bezier(.23,1.07,.66,1)] group-hover:scale-110 group-hover:rotate-[1deg] group-hover:shadow-2xl"
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
            <section class="relative text-center w-full gallery-section-fade">
                <div class="relative w-full overflow-hidden">
                    <img alt="Gedung Sekolah" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan1.jpg"/>
                    <img src="./images/logo.png" alt="Logo Sekolah" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110">
                    <h1 class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500">Galery</h1>
                </div>
            </section>

            <main class="w-full mt-6 px-6 md:px-10 gallery-section-fade">
                <section class="mt-6">
                    <h2 class="text-2xl font-bold mb-6 text-center text-green-700">Foto Kegiatan Sekolah</h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        ${galeriCards}
                    </div>
                </section>
            </main>
            <style>
                /* Card hover */
                .galery-card-float {
                    transition: 
                        transform 0.5s cubic-bezier(.23,1.07,.66,1),
                        box-shadow 0.5s cubic-bezier(.23,1.07,.66,1);
                }
                .galery-card-float:hover {
                    transform: translateY(-12px) scale(1.03);
                    box-shadow: 0 16px 36px 0 rgba(34,34,64,0.20);
                    z-index: 1;
                }
                .galery-img {
                    transition:
                        transform 0.7s cubic-bezier(.23,1.07,.66,1),
                        box-shadow 0.3s;
                    will-change: transform, box-shadow;
                }
                .group:hover .galery-img {
                    box-shadow: 0 12px 36px rgba(34,34,64,.18);
                    filter: brightness(0.94) saturate(1.06);
                }
                /* Animasi Card */
                .gallery-card-animate {
                    animation: galleryCardFadeIn 0.7s forwards cubic-bezier(.19,1,.22,1);
                }
                @keyframes galleryCardFadeIn {
                    from { opacity: 0; transform: translateY(32px) scale(0.97);}
                    to   { opacity: 1; transform: none;}
                }
                /* Fade in section (halaman) */
                .gallery-section-fade {
                    opacity: 0;
                    animation: gallerySectionFade 0.8s forwards cubic-bezier(.19,1,.22,1);
                }
                @keyframes gallerySectionFade {
                    from { opacity: 0; transform: translateY(32px);}
                    to   { opacity: 1; transform: none;}
                }
            </style>
        `;
    },

    async afterRender() {
        setTimeout(() => {
            document.querySelectorAll('.gallery-section-fade').forEach((el) => {
                el.style.animationDelay = '40ms';
                el.classList.add('gallery-section-fade');
            });
            document.querySelectorAll('.gallery-card-animate').forEach((el, i) => {
                el.style.opacity = 0;
                el.style.animationPlayState = 'running';
            });
        }, 10);
    },
};

export default Galery;
