// Beranda.js
const Beranda = {
    async render() {
        return `
            <div class="main-container">
                <section class="hero">
                    <div class="hero-slider-container">
                        <div class="hero-slide active" style="background-image: url('images/walpaper.png');">
                            <div class="hero-content">
                                <h1 id="main">Selamat Datang Di Sekolah Yayasan Pesatren YPMA</h1>
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

                <section class="sekolah-section">
                    <div class="p-4 flex justify-between items-center">

                    </div>
                </section>

                <section class="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                    <div class="flex flex-col md:flex-row">
                        <img src="images/visimisi.jpg" alt="Children holding a banner in a forest">
                        <div class="p-6 md:w-1/2 text-center flex flex-col items-center">
                            <h2 class="text-2xl font-bold text-green-600">Tentang Sekolah Kami</h2>
                            <h3 class="text-3xl font-bold mt-2">SD Yayasan Pesantren Modern Adnan</h3>
                            <p class="text-lg text-gray-700 mt-4 leading-relaxed">
                                Pendidikan SD Yayasan Pesantren Modern Adnan didirikan untuk memberikan solusi terbaik dalam mencetak
                                generasi yang berkualitas dan unggul di bidang Alquran, Ilmu Pengetahuan (Sains), dan Teknologi.
                                Dengan kurikulum berbasis nilai-nilai keislaman serta pendidikan modern, sekolah ini berkomitmen
                                untuk membentuk siswa yang berakhlak mulia, cerdas, serta siap menghadapi tantangan masa depan.
                                Kami menawarkan lingkungan belajar yang nyaman, guru-guru berpengalaman, serta fasilitas lengkap
                                untuk mendukung proses pembelajaran yang optimal.
                            </p>
                            <div class="flex justify-center items-center space-x-2 text-green-600 mt-6">
                                <i class="fas fa-medal text-2xl"></i>
                                <span class="text-lg font-semibold">Akreditasi B</span>
                            </div>
                            <button class="bg-green-600 text-white px-5 py-3 rounded-lg mt-6 text-lg hover:bg-green-700 transition-all">
                                Read More
                            </button>
                        </div>
                    </div>
                </section>

                <section class="py-12 bg-gray-100">
                    <h2 class="text-2xl font-bold mb-6 text-center text-green-600">Program Pendidikan</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-12">
                        <div class="bg-white text-black p-6 rounded-lg shadow-md transition-all hover:scale-105 flex flex-col items-center">
                            <img src="images/Pesantren.jpg" alt="Pelajaran Reguler" class="w-full h-48 object-cover mb-6 rounded-lg">
                            <h3 class="text-xl font-bold mb-2 text-center">Pelajaran Reguler</h3>
                            <p class="text-gray-600 text-center mb-4 leading-relaxed">
                                Program pendidikan yang dirancang untuk memberikan ilmu akademik serta nilai-nilai keislaman dengan kurikulum berkualitas.
                            </p>
                        </div>

                        <div class="bg-white text-black p-6 rounded-lg shadow-md transition-all hover:scale-105 flex flex-col items-center">
                            <img src="images/Pesantren.jpg" alt="Tahfidz Alquran" class="w-full h-48 object-cover mb-6 rounded-lg">
                            <h3 class="text-xl font-bold mb-2 text-center">Tahfidz Alquran</h3>
                            <p class="text-gray-600 text-center mb-4 leading-relaxed">
                                Program unggulan bagi siswa yang ingin menghafal Alquran dengan metode yang efektif serta bimbingan dari guru tahfidz berpengalaman.
                            </p>
                        </div>

                        <div class="bg-white text-black p-6 rounded-lg shadow-md transition-all hover:scale-105 flex flex-col items-center">
                            <img src="images/Pesantren.jpg" alt="Pengembangan Diri" class="w-full h-48 object-cover mb-6 rounded-lg">
                            <h3 class="text-xl font-bold mb-2 text-center">Pengembangan Diri</h3>
                            <p class="text-gray-600 text-center mb-4 leading-relaxed">
                                Program yang mendukung pengembangan soft skills, kepemimpinan, serta keterampilan sosial siswa agar siap menghadapi masa depan.
                            </p>
                        </div>
                    </div>
                </section>

                <section class="bg-dark-taupe text-black py-12 px-6 mt-10">
                    <div class="container mx-auto flex flex-col md:flex-row items-center gap-8">
                        <div class="md:w-2/3">
                            <h1 class="text-3xl font-bold text-green-400">Visi Pendidikan SD Yayasan Pesantren Modern Adnan</h1>
                            <p class="mt-6 text-lg leading-relaxed">
                                Kami berkomitmen untuk mencetak generasi yang bertaqwa, cerdas, mandiri, dan berwawasan global.
                                Pendidikan di SD Yayasan Pesantren Modern Adnan berlandaskan pada nilai-nilai Islam, ilmu pengetahuan, serta pengelolaan pendidikan yang unggul.
                                Visi kami mencerminkan dedikasi dalam membangun lingkungan pendidikan yang Islami, ilmiah, dan alamiah guna membentuk karakter yang kuat pada siswa.
                            </p>
                            <h2 class="mt-6 text-2xl font-semibold text-green-600">Karakter yang Kami Bangun:</h2>
                            <ul class="mt-4 space-y-4 text-lg">
                                <li class="flex items-start space-x-3">
                                    <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                                    <div>
                                        <span class="font-bold text-black">Bertaqwa</span>
                                        <p class="text-gray-800">Berpegang teguh pada ajaran Islam dalam kehidupan sehari-hari.</p>
                                    </div>
                                </li>
                                <li class="flex items-start space-x-3">
                                    <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                                    <div>
                                        <span class="font-bold text-black">Cerdas</span>
                                        <p class="text-gray-800">Memiliki kecerdasan intelektual, emosional, dan spiritual.</p>
                                    </div>
                                </li>
                                <li class="flex items-start space-x-3">
                                    <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                                    <div>
                                        <span class="font-bold text-black">Mandiri</span>
                                        <p class="text-gray-800">Mampu berpikir dan bertindak secara mandiri serta bertanggung jawab.</p>
                                    </div>
                                </li>
                                <li class="flex items-start space-x-3">
                                    <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                                    <div>
                                        <span class="font-bold text-black">Berwawasan Global</span>
                                        <p class="text-gray-800">Mempersiapkan siswa menghadapi tantangan dunia dengan pemikiran terbuka.</p>
                                    </div>
                                </li>
                                <li class="flex items-start space-x-3">
                                    <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                                    <div>
                                        <span class="font-bold text-black">Keteladanan & Kasih Sayang</span>
                                        <p class="text-gray-800">Menanamkan sikap empati, disiplin, dan akhlak mulia.</p>
                                    </div>
                                </li>
                                <li class="flex items-start space-x-3">
                                    <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                                    <div>
                                        <span class="font-bold text-black">Lingkungan Islami, Ilmiah & Alamiah</span>
                                        <p class="text-gray-800">Mengedepankan suasana belajar yang kondusif dan mendidik.</p>
                                    </div>
                                </li>
                                <li class="flex items-start space-x-3">
                                    <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                                    <div>
                                        <span class="font-bold text-black">Pelayanan Pendidikan Unggul</span>
                                        <p class="text-gray-800">Mengelola sistem pendidikan secara profesional dan berorientasi pada kualitas.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="md:w-2/3 flex flex-wrap justify-center gap-6">
                            <img src="images/visimisi.jpg" alt="Siswa dalam suasana belajar" class="rounded-lg shadow-lg w-full max-w-2xl md:max-w-4xl aspect-video transition-transform transform hover:scale-105">
                            <img src="images/kurikulum.png" alt="Siswa dalam suasana belajar" class="rounded-lg shadow-lg w-full max-w-2xl md:max-w-4xl aspect-video transition-transform transform hover:scale-105">
                            <img src="images/Pesantren 1.jpg" alt="Siswa dalam suasana belajar" class="rounded-lg shadow-lg w-full max-w-2xl md:max-w-4xl aspect-video transition-transform transform hover:scale-105">
                        </div>
                    </div>
                </section>

                <section class="pendaftaran-section bg-green-700 text-white py-20 relative overflow-hidden">
                    <div class="container mx-auto text-center">
                        <h2 class="text-4xl font-bold mb-6">PENDAFTARAN PESERTA DIDIK BARU</h2>
                        <p class="text-lg mb-8">Kami mengundang putra dan putri terbaik Negeri untuk bergabung bersama SD Yayasan Pesantren Modern Adnan, Medan</p>
                    </div>
                    <div class="container mx-auto text-center mt-8">
                        <button onclick="window.open('https://wa.me/+6283854537823', '_blank')" class="bg-white text-green-700 font-bold py-3 px-8 rounded-full hover:bg-green-100 transition-all inline-flex items-center no-underline">
                            <i class="fab fa-whatsapp text-2xl mr-2"></i> Daftar Sekarang
                        </button>
                    </div>
                </section>

                <section class="py-12 bg-gray-100">
                    <div class="container mx-auto">
                        <h2 class="text-3xl font-bold text-center text-green-600 mb-8">Berita Terbaru</h2>
                        <div id="berita-terbaru-container" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            </div>
                        <div class="flex justify-center mt-8">
                            <button onclick="location.href='/#/berita'" class="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">Lihat Berita Lainnya</button>
                        </div>
                    </div>
                </section>

                <section class="py-12 bg-white">
                    <div class="container mx-auto">
                        <h2 class="text-3xl font-bold text-center text-green-600 mb-8">Lokasi & Kontak Sekolah Kami</h2>
                        <div class="md:flex md:gap-8">
                            <div class="md:w-1/2">
                                <h3 class="text-xl font-semibold text-gray-800 mb-4">Lokasi Kami</h3>
                                <p class="text-lg text-gray-700 mb-4">Jl. Pesantren No.15, Sei Sikambing B, Kec. Medan Sunggal, Kota Medan, Sumatera Utara 20123</p>
                                <div class="rounded-lg overflow-hidden shadow-md">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.891897959313!2d98.6469879747968!3d3.5688488964345886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312e27f6b749df%3A0x49b82449a354558f!2sJl.%20Pesantren%20No.15%2C%20Sei%20Sikambing%20B%2C%20Kec.%20Medan%20Sunggal%2C%20Kota%20Medan%2C%20Sumatera%20Utara%2020123!5e0!3m2!1sid!2sid!4v1715196328987!5m2!1sid!2sid"
                                        width="100%"
                                        height="450" style="border:0;"
                                        allowfullscreen=""
                                        loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade">
                                    </iframe>
                                </div>
                            </div>
                            <div class="md:w-1/2 mt-8 md:mt-0">
                            <h3 class="text-xl font-semibold text-gray-800 mb-4" id="kontak">Hubungi Kami</h3>
                                <p class="text-lg text-gray-700 mb-6">Silakan kirimkan pertanyaan atau pesan Anda melalui formulir di bawah ini.</p>
                                <form id="contactForm" class="space-y-6">
                                    <div>
                                        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nama Lengkap</label>
                                        <input type="text" id="name" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Masukkan nama lengkap Anda">
                                    </div>
                                    <div>
                                        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Alamat Email</label>
                                        <input type="email" id="email" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Masukkan alamat email Anda">
                                    </div>
                                    <div>
                                        <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Nomor Telepon</label>
                                        <input type="tel" id="phone" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Masukkan nomor telepon Anda">
                                    </div>
                                    <div>
                                        <label for="message" class="block text-gray-700 text-sm font-bold mb-2">Pesan Anda</label>
                                        <textarea id="message" rows="5" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Tuliskan pesan Anda di sini"></textarea>
                                    </div>
                                    <div class="flex justify-end">
                                        <button type="submit" id="submitMessage" class="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300">
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
        const elementsToAnimate = document.querySelectorAll('.slide-left, .slide-right');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('slide-left')) {
                        entry.target.classList.add('slide-in-left');
                    } else if (entry.target.classList.contains('slide-right')) {
                        entry.target.classList.add('slide-in-right');
                    }
                }
            });
        });

        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });

        // Hero Slider Functionality
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

            // Animate text on the active slide
            const activeSlide = slides[index];
            const h1 = activeSlide.querySelector('h1#main');
            const p = activeSlide.querySelector('p');

            if (h1) {
                h1.style.opacity = 0;
                h1.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    h1.style.opacity = 1;
                    h1.style.transform = 'translateY(0)';
                }, 50);
            }

            if (p) {
                p.style.opacity = 0;
                p.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    p.style.opacity = 1;
                    p.style.transform = 'translateY(0)';
                }, 250); // Slightly longer delay for paragraph
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

            // Optional: Auto slide
            // setInterval(nextSlide, 5000);
        }

        // Initial slide display
        showSlide(currentIndex);

        // --- Fetch and Display Latest News ---
        const beritaTerbaruContainer = document.getElementById('berita-terbaru-container');
        if (beritaTerbaruContainer) {
            try {
                const response = await fetch('http://localhost:5000/api/dashboardUploadBerita');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let beritaList = await response.json();
                beritaList = beritaList.reverse(); // Show newest first

                // Take only the first 3 news articles for the homepage
                const latestThreeBerita = beritaList.slice(0, 3);

                if (latestThreeBerita.length > 0) {
                    beritaTerbaruContainer.innerHTML = latestThreeBerita.map(berita => {
                        // Ensure the image URL is correct (prepended with localhost:5000)
                        const imageUrl = `http://localhost:5000${berita.gambar || '/images/default-news.jpg'}`;
                        const formattedDate = new Date(berita.tanggal || Date.now()).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'long', year: 'numeric'
                        });

                        return `
                            <div class="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:scale-105">
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
                } else {
                    beritaTerbaruContainer.innerHTML = '<p class="text-center text-gray-500 text-lg">Belum ada berita terbaru yang diunggah.</p>';
                }

            } catch (error) {
                console.error("Error fetching latest news for Beranda:", error);
                beritaTerbaruContainer.innerHTML = '<p class="text-center text-red-500 text-lg">Gagal memuat berita terbaru. Silakan coba lagi nanti.</p>';
            }
        }
        // --- End Fetch and Display Latest News ---


        // Handle contact form submission
        const contactForm = document.getElementById('contactForm');
        const submitButton = document.getElementById('submitMessage');

        if (contactForm && submitButton) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent default form submission

                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const phoneInput = document.getElementById('phone');
                const messageInput = document.getElementById('message');

                const feedback = {
                    name: nameInput.value,
                    email: emailInput.value,
                    phone: phoneInput.value,
                    message: messageInput.value,
                    timestamp: new Date().toISOString() // Add timestamp
                };

                // Retrieve existing feedback from localStorage
                const existingFeedback = JSON.parse(localStorage.getItem('feedback')) || [];

                // Add new feedback to the array
                existingFeedback.push(feedback);

                // Save back to localStorage
                localStorage.setItem('feedback', JSON.stringify(existingFeedback));

                // Reset form after successful submission
                contactForm.reset();

                alert('Pesan Anda berhasil terkirim!'); // Provide user feedback
            });
        }
    },
};

export default Beranda;