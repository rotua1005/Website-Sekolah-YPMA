const Feedback = {
    async render() {
        return `
            <main class="w-full mt-8">
                <section class="relative text-center w-full">
                    <div class="relative w-full">
                        <img alt="School Building" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan.jpg"/>
                        <img src="./images/logo.png" alt="School Logo" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110">
                        <h1 class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500">Feedback</h1>
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
                    nama: nameInput.value,
                    email: emailInput.value,
                    skala: selectedRating,
                    masukan: feedbackInput.value,
                    timestamp: new Date().toISOString(),
                };

                // Ambil data feedback yang sudah ada dari localStorage
                const existingFeedback = JSON.parse(localStorage.getItem('feedbackData')) || [];

                // Tambahkan feedback baru ke array yang sudah ada
                existingFeedback.push(feedbackData);

                // Simpan kembali ke localStorage
                localStorage.setItem('feedbackData', JSON.stringify(existingFeedback));

                console.log('Data Feedback Tersimpan:', feedbackData);

                // Tampilkan pesan terima kasih
                feedbackForm.reset();
                feedbackMessage.classList.remove('hidden');

                // Sembunyikan pesan setelah beberapa detik (opsional)
                setTimeout(() => {
                    feedbackMessage.classList.add('hidden');
                }, 3000);
            });
        }

        // Menghapus bagian kode yang tidak relevan dengan halaman feedback
        // const searchButton = document.getElementById('searchButton');
        // if (searchButton) {
        //     searchButton.addEventListener('click', () => {
        //         this.render().then(html => {
        //             document.querySelector('main').innerHTML = html;
        //             this.afterRender();
        //         });
        //     });
        // }
    }
};

export default Feedback;