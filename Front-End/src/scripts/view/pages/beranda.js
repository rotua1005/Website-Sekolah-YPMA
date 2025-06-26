// Beranda.js
const Beranda = {
    async render() {
        return `
            <div class="main-container">
                <section class="hero">
                    <div class="hero-slider-container">
                        <div class="hero-slide active" style="background-image: url('images/walpaper.png');">
                            <div class="hero-content">
                                <h1 id="main">Selamat Datang Di Sekolah SD Swasta Yayasan Pesatren </h1>
                                <p>Jl. Pesantren No.15, Sei Sikambing B, Kec. Medan Sunggal, Kota Medan, Sumatera Utara 20123</p>
                            </div>
                        </div>
                        <div class="hero-slide" style="background-image: url('images/news.jpg');">
                            <div class="hero-content">
                                <h1 id="main">Excellent with Integral Character</h1>
                                <p>Cerdas, Taqwa, Mandiri, Berwawasan Global</p>
                            </div>
                        </div>
                        <div class="hero-slide" style="background-image: url('images/Pesantren 2.jpg');">
                            <div class="hero-content">
                                <h1 id="main">Berakhlak Mulia</h1>
                                <p>Menerapkan akhlak yang mulia sesuai tuntunan Al-Qur'an dalam kehidupan sehari-hari.</p>
                            </div>
                        </div>
                        <button class="slide-control prev-slide">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="slide-control next-slide">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </section>

                <section class="sekolah-section animate__animated animate__fadeInUp">
                    <div class="p-4 flex justify-between items-center"></div>
                </section>

                <section class="bg-white shadow-md rounded-lg overflow-hidden mb-8 animate__animated animate__fadeIn">
                    <div class="flex flex-col md:flex-row">
                        <img src="images/visimisi.jpg" alt="Children holding a banner in a forest" class="slide-left rounded-lg transition-transform hover:scale-105" data-tilt>
                        <div class="p-6 md:w-1/2 text-center flex flex-col items-center slide-right">
                            <h2 class="text-2xl font-bold text-green-600 animate__animated animate__fadeInDown">Tentang Sekolah Kami</h2>
                            <h3 class="text-3xl font-bold mt-2 animate__animated animate__fadeInDown animate__delay-1s">SD Swasta Yayasan Pesantren Modern Adnan</h3>
                            <p class="text-lg text-gray-700 mt-4 leading-relaxed animate__animated animate__fadeInUp animate__delay-2s">
                                Pendidikan SD Swasta Yayasan Pesantren Modern Adnan didirikan untuk memberikan solusi terbaik dalam mencetak generasi yang berkualitas dan unggul di bidang Alquran, Ilmu Pengetahuan (Sains), dan Teknologi.
                                Dengan kurikulum berbasis nilai-nilai keislaman serta pendidikan modern, sekolah ini berkomitmen untuk membentuk siswa yang berakhlak mulia, cerdas, serta siap menghadapi tantangan masa depan.
                                Kami menawarkan lingkungan belajar yang nyaman, guru-guru berpengalaman, serta fasilitas lengkap untuk mendukung proses pembelajaran yang optimal.
                            </p>
                            <div class="flex justify-center items-center space-x-2 text-green-600 mt-6 animate__animated animate__fadeIn">
                                <i class="fas fa-medal text-2xl"></i>
                                <span class="text-lg font-semibold">Akreditasi B</span>
                            </div>
                            <button class="bg-green-600 text-white px-5 py-3 rounded-lg mt-6 text-lg hover:bg-green-700 transition-all animate__animated animate__pulse animate__delay-2s">
                                Read More
                            </button>
                        </div>
                    </div>
                </section>

                <section class="py-12 bg-gray-100">
                    <h2 class="text-2xl font-bold mb-6 text-center text-green-600 animate__animated animate__fadeInDown">Program Pendidikan</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-12">
                        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 max-w-xl mx-auto overflow-hidden transition-transform hover:scale-[1.03] hover:shadow-2xl animate__animated animate__zoomIn" style="transition: box-shadow .3s, transform .3s;" data-tilt>
                            <img src="images/Pesantren.jpg" alt="Pelajaran Reguler" class="w-full h-56 object-cover rounded-t-2xl shadow-sm">
                            <div class="px-8 py-7 text-center">
                                <h3 class="text-xl md:text-2xl font-bold mb-2 text-gray-900 animate__animated animate__fadeInLeft" style="font-family: 'Poetsen One',sans-serif;">
                                    Pelajaran Reguler
                                </h3>
                                <p class="text-gray-600 text-base md:text-lg leading-relaxed tracking-wide animate__animated animate__fadeInUp" style="font-family: 'Inter',sans-serif;">
                                    Program pendidikan yang dirancang untuk memberikan ilmu akademik serta nilai-nilai keislaman dengan kurikulum berkualitas.
                                </p>
                            </div>
                        </div>

                        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 max-w-xl mx-auto overflow-hidden transition-transform hover:scale-[1.03] hover:shadow-2xl animate__animated animate__zoomIn animate__delay-1s" style="transition: box-shadow .3s, transform .3s;" data-tilt>
                            <img src="images/Pesantren 2.jpg" alt="Tahfidz Alquran" class="w-full h-56 object-cover rounded-t-2xl shadow-sm">
                            <div class="px-8 py-7 text-center">
                                <h3 class="text-xl md:text-2xl font-bold mb-2 text-gray-900 animate__animated animate__fadeInLeft" style="font-family: 'Poetsen One',sans-serif;">
                                    Tahfidz Alquran
                                </h3>
                                <p class="text-gray-600 text-base md:text-lg leading-relaxed tracking-wide animate__animated animate__fadeInUp" style="font-family: 'Inter',sans-serif;">
                                    Program unggulan bagi siswa yang ingin menghafal Alquran dengan metode yang efektif serta bimbingan dari guru tahfidz berpengalaman.
                                </p>
                            </div>
                        </div>

                        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 max-w-xl mx-auto overflow-hidden transition-transform hover:scale-[1.03] hover:shadow-2xl animate__animated animate__zoomIn animate__delay-2s" style="transition: box-shadow .3s, transform .3s;" data-tilt>
                            <img src="images/Nasyid.jpg" alt="Manasik" class="w-full h-56 object-cover rounded-t-2xl shadow-sm">
                            <div class="px-8 py-7 text-center">
                                <h3 class="text-xl md:text-2xl font-bold mb-2 text-gray-900 animate__animated animate__fadeInLeft" style="font-family: 'Poetsen One',sans-serif;">
                                    Manasik 
                                </h3>
                                <p class="text-gray-600 text-base md:text-lg leading-relaxed tracking-wide animate__animated animate__fadeInUp" style="font-family: 'Inter',sans-serif;">
                                    Program Manasik Haji kegiatan simulasi ibadah haji bagi siswa untuk mengenalkan rukun dan tata cara haji sejak dini. 
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="bg-dark-taupe text-black py-12 px-6 mt-10 animate__animated animate__fadeIn">
                    <div class="container mx-auto flex flex-col md:flex-row items-center gap-8">
                        <div class="md:w-2/3 animate__animated animate__fadeInLeft">
                        <h1 class="text-3xl font-bold text-green-400 animate__animated animate__fadeInDown">
                            Visi Pendidikan SD Swasta Yayasan Pesantren Modern Adnan
                        </h1>
                        <p class="mt-6 text-lg leading-relaxed animate__animated animate__fadeIn animate__delay-1s">
                            Kami berkomitmen untuk mencetak generasi yang bertaqwa, cerdas, mandiri, dan berwawasan global.
                            Pendidikan di SD Swasta Yayasan Pesantren Modern Adnan berlandaskan pada nilai-nilai Islam, ilmu pengetahuan, serta pengelolaan pendidikan yang unggul.
                            Visi kami mencerminkan dedikasi dalam membangun lingkungan pendidikan yang Islami, ilmiah, dan alamiah guna membentuk karakter yang kuat pada siswa.
                        </p>
                        <h2 class="mt-6 text-2xl font-semibold text-green-600 animate__animated animate__fadeIn animate__delay-2s">
                            Karakter yang Kami Bangun:
                        </h2>
                        <ul class="mt-4 space-y-4 text-lg">
                            <li class="flex items-start space-x-3 animate__animated animate__fadeInUp animate__delay-2s">
                            <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                            <div>
                                <span class="font-bold text-black">Bertaqwa</span>
                                <p class="text-gray-800">Berpegang teguh pada ajaran Islam dalam kehidupan sehari-hari.</p>
                            </div>
                            </li>
                            <li class="flex items-start space-x-3 animate__animated animate__fadeInUp animate__delay-3s">
                            <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                            <div>
                                <span class="font-bold text-black">Cerdas</span>
                                <p class="text-gray-800">Memiliki kecerdasan intelektual, emosional, dan spiritual.</p>
                            </div>
                            </li>
                            <li class="flex items-start space-x-3 animate__animated animate__fadeInUp animate__delay-4s">
                            <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                            <div>
                                <span class="font-bold text-black">Mandiri</span>
                                <p class="text-gray-800">Mampu berpikir dan bertindak secara mandiri serta bertanggung jawab.</p>
                            </div>
                            </li>
                            <li class="flex items-start space-x-3 animate__animated animate__fadeInUp animate__delay-5s">
                            <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                            <div>
                                <span class="font-bold text-black">Berwawasan Global</span>
                                <p class="text-gray-800">Mempersiapkan siswa menghadapi tantangan dunia dengan pemikiran terbuka.</p>
                            </div>
                            </li>
                            <li class="flex items-start space-x-3 animate__animated animate__fadeInUp animate__delay-6s">
                            <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                            <div>
                                <span class="font-bold text-black">Keteladanan & Kasih Sayang</span>
                                <p class="text-gray-800">Menanamkan sikap empati, disiplin, dan akhlak mulia.</p>
                            </div>
                            </li>
                            <li class="flex items-start space-x-3 animate__animated animate__fadeInUp animate__delay-7s">
                            <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                            <div>
                                <span class="font-bold text-black">Lingkungan Islami, Ilmiah & Alamiah</span>
                                <p class="text-gray-800">Mengedepankan suasana belajar yang kondusif dan mendidik.</p>
                            </div>
                            </li>
                            <li class="flex items-start space-x-3 animate__animated animate__fadeInUp animate__delay-8s">
                            <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                            <div>
                                <span class="font-bold text-black">Pelayanan Pendidikan Unggul</span>
                                <p class="text-gray-800">Mengelola sistem pendidikan secara profesional dan berorientasi pada kualitas.</p>
                            </div>
                            </li>
                        </ul>
                        </div>
                        <div class="md:w-2/3 flex flex-wrap justify-center gap-6 animate__animated animate__fadeInRight">
                        <img src="images/visimisi.jpg" alt="Siswa dalam suasana belajar"
                            class="rounded-lg shadow-lg w-full max-w-2xl md:max-w-4xl aspect-video transition-transform transform hover:scale-105">
                        <img src="images/kurikulum.png" alt="Siswa dalam suasana belajar"
                            class="rounded-lg shadow-lg w-full max-w-2xl md:max-w-4xl aspect-video transition-transform transform hover:scale-105">
                        <img src="images/Pesantren 1.jpg" alt="Siswa dalam suasana belajar"
                            class="rounded-lg shadow-lg w-full max-w-2xl md:max-w-4xl aspect-video transition-transform transform hover:scale-105">
                        </div>
                    </div>
                </section>

                <section class="pendaftaran-section bg-green-700 text-white py-20 relative overflow-hidden animate__animated animate__fadeInUp">
                <div class="container mx-auto text-center">
                    <h2 class="text-4xl font-bold mb-6 animate__animated animate__fadeInDown">
                    PENDAFTARAN PESERTA DIDIK BARU
                    </h2>
                    <p class="text-lg mb-8 animate__animated animate__fadeIn animate__delay-1s">
                    Kami mengundang putra dan putri terbaik Negeri untuk bergabung bersama SD Swasta Yayasan Pesantren Modern Adnan, Medan
                    </p>
                </div>
                <div class="container mx-auto text-center mt-8 animate__animated animate__zoomIn animate__delay-2s">
                    <button onclick="window.open('https://wa.me/+6283867104991', '_blank')"
                    class="bg-white text-green-700 font-bold py-3 px-8 rounded-full hover:bg-green-100 transition-all inline-flex items-center no-underline shadow-lg animate__animated animate__pulse animate__infinite animate__delay-3s">
                    <i class="fab fa-whatsapp text-2xl mr-2"></i> Daftar Sekarang
                    </button>
                </div>
                </section>

                <section class="py-12 bg-gray-100 animate__animated animate__fadeIn">
                <div class="container mx-auto">
                    <h2 class="text-3xl font-bold text-center text-green-600 mb-8 animate__animated animate__fadeInDown">
                    Berita Terbaru
                    </h2>
                    <div id="berita-terbaru-container" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Card berita tetap dapat animasi via JS/tilt -->
                    </div>
                    <div class="flex justify-center mt-8 animate__animated animate__fadeInUp animate__delay-2s">
                    <button onclick="location.href='/#/berita'"
                        class="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg transition-transform animate__animated animate__pulse animate__infinite">
                        Lihat Berita Lainnya
                    </button>
                    </div>
                </div>
                </section>

                <section class="py-12 bg-white animate__animated animate__fadeIn">
                <div class="container mx-auto">
                    <h2 class="text-3xl font-bold text-center text-green-600 mb-8 animate__animated animate__fadeInDown">
                    Lokasi & Kontak Sekolah Kami
                    </h2>
                    <div class="md:flex md:gap-8">
                    <div class="md:w-1/2 animate__animated animate__fadeInLeft">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">Lokasi Kami</h3>
                        <p class="text-lg text-gray-700 mb-4">
                        Jl. Pesantren No.15, Sei Sikambing B, Kec. Medan Sunggal, Kota Medan, Sumatera Utara 20123
                        </p>
                        <div class="rounded-lg overflow-hidden shadow-md animate__animated animate__zoomIn animate__delay-1s">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.891897959313!2d98.6469879747968!3d3.5688488964345886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312e27f6b749df%3A0x49b82449a354558f!2sJl.%20Pesantren%20No.15%2C%20Sei%20Sikambing%20B%2C%20Kec.%20Medan%20Sunggal%2C%20Kota%20Medan%2C%20Sumatera%20Utara%2020123!5e0!3m2!1sid!2sid!4v1715196328987!5m2!1sid!2sid"
                            width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <div class="md:w-1/2 mt-8 md:mt-0 animate__animated animate__fadeInRight animate__delay-1s">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4" id="kontak">Hubungi Kami</h3>
                        <p class="text-lg text-gray-700 mb-6">Silakan kirimkan pertanyaan atau pesan Anda melalui formulir di bawah ini.</p>
                        <form id="contactForm" class="space-y-6 animate__animated animate__fadeInUp animate__delay-2s">
                        <div>
                            <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nama Lengkap</label>
                            <input type="text" id="name"
                                class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Masukkan nama lengkap Anda">
                        </div>
                        <div>
                            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Alamat Email</label>
                            <input type="email" id="email"
                                class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Masukkan alamat email Anda">
                        </div>
                        <div>
                            <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Nomor Telepon</label>
                            <input type="tel" id="phone"
                                class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Masukkan nomor telepon Anda">
                        </div>
                        <div>
                            <label for="message" class="block text-gray-700 text-sm font-bold mb-2">Pesan Anda</label>
                            <textarea id="message" rows="5"
                                    class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Tuliskan pesan Anda di sini"></textarea>
                        </div>
                        <div class="flex justify-end">
                            <button type="submit" id="submitMessage"
                                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300 animate__animated animate__pulse animate__infinite">
                            Kirim Pesan
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </section>
            </div>
        `;
    },

    async afterRender() {
        // Vanilla Tilt CDN inject (hanya sekali)
        if (!document.getElementById('vanillatiltcdn')) {
            const vtScript = document.createElement('script');
            vtScript.id = 'vanillatiltcdn';
            vtScript.src = 'https://cdn.jsdelivr.net/npm/vanilla-tilt@1.8.1/dist/vanilla-tilt.min.js';
            vtScript.onload = function() {
                if (window.VanillaTilt) {
                    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
                        max: 8,
                        speed: 500,
                        glare: true,
                        "max-glare": 0.18,
                    });
                }
            };
            document.body.appendChild(vtScript);
        } else if (window.VanillaTilt) {
            VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
                max: 8,
                speed: 500,
                glare: true,
                "max-glare": 0.18,
            });
        }

        // Animasi Intersection Observer (untuk .slide-left/.slide-right custom)
        const elementsToAnimate = document.querySelectorAll('.slide-left, .slide-right');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('slide-left')) {
                        entry.target.classList.add('animate__animated', 'animate__fadeInLeft');
                    } else if (entry.target.classList.contains('slide-right')) {
                        entry.target.classList.add('animate__animated', 'animate__fadeInRight');
                    }
                }
            });
        });
        elementsToAnimate.forEach(element => observer.observe(element));

        // Hero Slider Functionality (tanpa animasi right/left/top/bottom)
        const sliderContainer = document.querySelector('.hero-slider-container');
        const slides = document.querySelectorAll('.hero-slide');
        const prevButton = document.querySelector('.prev-slide');
        const nextButton = document.querySelector('.next-slide');
        let currentIndex = 0;
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.style.transform = `translateX(${100 * (i - index)}%)`;
            });
            slides[index].classList.add('active');
            // Hilangkan SEMUA animasi pada hero
            const activeSlide = slides[index];
            const h1 = activeSlide.querySelector('h1#main');
            const p = activeSlide.querySelector('p');
            if (h1) {
                h1.className = '';
            }
            if (p) {
                p.className = '';
            }
        }
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }
        if (nextButton && prevButton) {
            nextButton.addEventListener('click', nextSlide);
            prevButton.addEventListener('click', prevSlide);
        }
        showSlide(currentIndex);

        // --- Berita Terbaru (tambahkan tilt ke setiap card, tetap support animasi fadeIn) ---
        const beritaTerbaruContainer = document.getElementById('berita-terbaru-container');
        if (beritaTerbaruContainer) {
            try {
                const response = await fetch('http://localhost:5000/api/dashboardUploadBerita');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                let beritaList = await response.json();
                beritaList = beritaList.reverse();
                const latestThreeBerita = beritaList.slice(0, 3);
                if (latestThreeBerita.length > 0) {
                    beritaTerbaruContainer.innerHTML = latestThreeBerita.map(berita => {
                        const imageUrl = `http://localhost:5000${berita.gambar || '/images/default-news.jpg'}`;
                        const formattedDate = new Date(berita.tanggal || Date.now()).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'long', year: 'numeric'
                        });
                        return `
                            <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:scale-105 animate__animated animate__fadeInUp" data-tilt>
                                <img src="${imageUrl}" alt="${berita.judul}" class="w-full h-48 object-cover">
                                <div class="p-6">
                                    <h3 class="text-xl font-semibold mb-2 text-gray-800">${berita.judul}</h3>
                                    <p class="text-gray-600 text-sm mb-4">${formattedDate} - No Comments</p>
                                    <p class="text-gray-700 leading-relaxed truncate">${berita.deskripsi}</p>
                                    <a href="#/detail_berita/${berita._id}" class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition-transform transform hover:scale-105">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        `;
                    }).join('');
                    // Inisialisasi tilt pada card berita terbaru
                    if (window.VanillaTilt) {
                        VanillaTilt.init(document.querySelectorAll("#berita-terbaru-container [data-tilt]"), {
                            max: 8, speed: 500, glare: true, "max-glare": 0.18,
                        });
                    }
                } else {
                    beritaTerbaruContainer.innerHTML = '<p class="text-center text-gray-500 text-lg">Belum ada berita terbaru yang diunggah.</p>';
                }
            } catch (error) {
                console.error("Error fetching latest news for Beranda:", error);
                beritaTerbaruContainer.innerHTML = '<p class="text-center text-red-500 text-lg">Gagal memuat berita terbaru. Silakan coba lagi nanti.</p>';
            }
        }

        // --- Handle contact form submission (no change) ---
        const contactForm = document.getElementById('contactForm');
        const submitButton = document.getElementById('submitMessage');
        if (contactForm && submitButton) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const phoneInput = document.getElementById('phone');
                const messageInput = document.getElementById('message');
                const feedback = {
                    name: nameInput.value,
                    email: emailInput.value,
                    phone: phoneInput.value,
                    message: messageInput.value,
                    timestamp: new Date().toISOString()
                };
                const existingFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
                existingFeedback.push(feedback);
                localStorage.setItem('feedback', JSON.stringify(existingFeedback));
                contactForm.reset();
                alert('Pesan Anda berhasil terkirim!');
            });
        }
    },
};

export default Beranda;