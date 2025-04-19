const Tentang = {
    async render() {
        const profile = JSON.parse(localStorage.getItem("profile")) || [];
        let profileCards = '';

        console.log("Data profil dari localStorage:", profile); // Langkah debugging 1

        if (profile.length > 0) {
            profileCards = profile
                .filter(p => ["Guru", "Tata Usaha", "Kepala Sekolah"].includes(p.jabatan))
                .map(p => {
                    let detailTambahan = '';
                    if (p.mata_pelajaran && p.jabatan === "Guru") {
                        detailTambahan = `<p class="text-gray-600 text-sm mt-1">Mata Pelajaran: ${p.mata_pelajaran}</p>`;
                    }
                    return `
                        <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                            <img src="${p.foto}" alt="${p.nama}" class="w-32 h-32 mx-auto rounded-full border-4 border-green-500 shadow-md object-cover">
                            <h3 class="text-green-600 font-bold text-xl mt-4">${p.nama}</h3>
                            <p class="text-gray-700 text-lg">${p.jabatan}</p>
                            ${detailTambahan}
                        </div>
                    `;
                }).join("");

            console.log("HTML profileCards yang dihasilkan:", profileCards); // Langkah debugging 2
        } else {
            profileCards = `<p class="text-center text-gray-500">Belum ada profile guru atau staff yang diupload.</p>`;
        }

        return `
<main class="w-full mt-8">
    <section class="relative text-center w-full">
        <div class="relative w-full">
            <img alt="School Building" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan.jpg"/>
            <img src="./images/logo.png" alt="School Logo" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110">
            <h1 class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500">Tentang Kami</h1>
        </div>
    </section>

    <section class="mt-8 md:mt-12 bg-white p-6 md:p-10 lg:p-12 shadow-md w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <img alt="Students in Classroom" class="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover" src="./images/Pesantren.jpg"/>
            <div class="px-4 md:px-6 lg:px-10">
                <h2 class="text-green-500 font-bold text-lg uppercase">Tentang Sekolah Kami</h2>
                <h3 class="text-3xl md:text-4xl font-bold mt-2">SD Yayasan Pesantren Modern Adnan</h3>
                <p class="mt-4 text-gray-700 text-lg leading-relaxed">
                    SD Yayasan Pesantren Modern Adnan didirikan untuk melahirkan generasi yang unggul di bidang Al-Qur'an, Sains, dan Teknologi dengan tetap berlandaskan nilai-nilai keislaman.
                </p>
                <div class="mt-4 flex items-center text-xl font-semibold text-gray-700">
                    <i class="fas fa-medal text-green-500 text-3xl mr-3"></i>
                    Akreditasi B
                </div>
                <a class="mt-6 inline-block bg-green-500 text-white px-6 py-3 md:px-8 md:py-4 text-lg rounded-lg shadow-md transition-all hover:bg-green-600" href="#">Baca Selengkapnya</a>
            </div>
        </div>
    </section>

    <section class="bg-gray-900 text-white py-14 md:py-16 mt-8 md:mt-12 w-full">
        <div class="text-center max-w-screen-xl mx-auto px-4">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">Visi & Misi</h2>
            <h3 class="text-2xl md:text-3xl font-semibold mb-8">Unggul Dengan Karakter Integral</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <img alt="Pesantren 1" class="w-full h-[300px] object-cover shadow-md hover:scale-105 transition-all" src="./images/Pesantren 1.jpg"/>
                <img alt="Pesantren 2" class="w-full h-[300px] object-cover shadow-md hover:scale-105 transition-all" src="./images/Pesantren 2.jpg"/>
                <ul class="text-left space-y-6 text-lg">
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 text-2xl mr-4"></i>
                        <span>Mewujudkan generasi yang beriman, cerdas, dan berkarakter berdasarkan nilai-nilai Islam.</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 text-2xl mr-4"></i>
                        <span>Meningkatkan pendidikan yang berlandaskan keimanan dan moral serta membentuk karakter disiplin.</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 text-2xl mr-4"></i>
                        <span>Menciptakan lingkungan yang mendukung pengembangan potensi peserta didik secara menyeluruh.</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <section class="w-full py-14 md:py-16 bg-white">
        <div class="max-w-screen-xl mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-10">Profil Output</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                ${[
                    { title: "Belajar Dengan Tekun", text: "Menjadikan ilmu sebagai landasan utama dalam mencapai kesuksesan." },
                    { title: "Berakhlak Mulia", text: "Menerapkan akhlak yang mulia sesuai tuntunan Al-Qur'an dalam kehidupan sehari-hari." },
                    { title: "Beribadah Tekun", text: "Menjalankan ibadah dengan disiplin dan istiqomah sebagai bentuk ketakwaan." },
                    { title: "Aktif dalam Ekstrakurikuler", text: "Mengikuti kegiatan seperti sepak bola, tahfidz Al-Qur'an, nasyid, seni tari, dan lainnya." },
                    { title: "Unggul Dalam Akademik", text: "Mencapai prestasi akademik melalui pembelajaran berkualitas dan bimbingan intensif." },
                    { title: "Life Skill Excellence", text: "Mengembangkan keterampilan hidup untuk kesiapan masa depan yang lebih baik." },
                ].map(
                    (item) => `
                        <div class="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                            <h3 class="text-green-500 font-bold text-xl mb-4">${item.title}</h3>
                            <p class="text-gray-700 text-lg">${item.text}</p>
                        </div>
                    `
                ).join("")}
            </div>
        </div>
    </section>

    <section class="w-full py-14 md:py-16 bg-gray-100">
        <div class="max-w-screen-xl mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-10 text-green-600">Profil Guru & Staff</h2>
            <div id="guru-staff-profiles" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                ${profileCards}
            </div>
        </div>
    </section>

    <section class="w-full py-16 md:py-20 bg-white mt-8 md:mt-12 shadow-lg rounded-lg">
        <div class="max-w-screen-md mx-auto px-6 md:px-8">
            <h2 class="text-3xl md:text-4xl font-bold mb-8 text-green-600 text-center">Berikan Masukan Anda</h2>
            <form id="feedbackForm" class="space-y-6">
                <div>
                    <label for="name" class="block text-gray-700 text-sm font-semibold mb-2">Nama<span class="text-red-500">*</span>:</label>
                    <input type="text" id="name" class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-4" placeholder="Nama Lengkap Anda" required>
                </div>
                <div>
                    <label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Email<span class="text-red-500">*</span>:</label>
                    <input type="email" id="email" class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-4" placeholder="Alamat Email Anda" required>
                </div>
                <div>
                    <label for="rating" class="block text-gray-700 text-sm font-semibold mb-2">Penilaian (Skala 1-5):</label>
                    <div class="flex items-center space-x-2">
                        <input type="radio" id="rating1" name="rating" value="1" class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300">
                        <label for="rating1" class="text-gray-700 text-sm">1 (Kurang)</label>
                        <input type="radio" id="rating2" name="rating" value="2" class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300">
                        <label for="rating2" class="text-gray-700 text-sm">2 (Cukup)</label>
                        <input type="radio" id="rating3" name="rating" value="3" class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300" checked>
                        <label for="rating3" class="text-gray-700 text-sm">3 (Baik)</label>
                        <input type="radio" id="rating4" name="rating" value="4" class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300">
                        <label for="rating4" class="text-gray-700 text-sm">4 (Sangat Baik)</label>
                        <input type="radio" id="rating5" name="rating" value="5" class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300">
                        <label for="rating5" class="text-gray-700 text-sm">5 (Luar Biasa)</label>
                    </div>
                </div>
                <div>
                    <label for="feedback" class="block text-gray-700 text-sm font-semibold mb-2">Masukan<span class="text-red-500">*</span>:</label>
                    <textarea id="feedback" rows="5" class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-4" placeholder="Bagaimana pendapat Anda tentang sekolah kami?" required></textarea>
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        <i class="fas fa-paper-plane mr-2"></i> Kirim Masukan
                    </button>
                </div>
            </form>
            <div id="feedbackMessage" class="mt-6 text-green-600 font-semibold text-center hidden">Terima kasih atas masukan Anda!</div>
        </div>
    </section>
</main>
        `;
    },

    async afterRender() {
        const feedbackForm = document.getElementById('feedbackForm');
        const feedbackMessage = document.getElementById('feedbackMessage');

        if (feedbackForm) {
            feedbackForm.addEventListener('submit', async (event) => {
                event.preventDefault();

                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const feedbackInput = document.getElementById('feedback');
                const ratingInputs = document.querySelectorAll('input[name="rating"]:checked');
                const selectedRating = ratingInputs.length > 0 ? ratingInputs[0].value : '';

                const feedbackData = {
                    name: nameInput.value,
                    email: emailInput.value,
                    rating: selectedRating,
                    message: feedbackInput.value,
                    timestamp: new Date().toISOString(),
                };

                // Anda bisa menambahkan logika untuk mengirim data feedback ke server di sini
                console.log('Data Feedback:', feedbackData);

                // Tampilkan pesan terima kasih
                feedbackForm.reset();
                feedbackMessage.classList.remove('hidden');

                // Sembunyikan pesan setelah beberapa detik (opsional)
                setTimeout(() => {
                    feedbackMessage.classList.add('hidden');
                }, 3000);
            });
        }
    }
};

export default Tentang;