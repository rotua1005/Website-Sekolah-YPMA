const hubungiKami = {
    async render() {
        return `
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
                        <div class="md:w-1/2 mt-8 md:mt-0" id="hubungiKami">
                            <h3 class="text-xl font-semibold text-gray-800 mb-4">Hubungi Kami</h3>
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
        `;
    },

    async afterRender() {
        const contactForm = document.getElementById('contactForm');
        const submitButton = document.getElementById('submitMessage');

        if (contactForm && submitButton) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Mencegah form submit biasa

                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const phoneInput = document.getElementById('phone');
                const messageInput = document.getElementById('message');

                const feedback = {
                    name: nameInput.value,
                    email: emailInput.value,
                    phone: phoneInput.value,
                    message: messageInput.value,
                    timestamp: new Date().toISOString() // Tambahkan timestamp
                };

                // Ambil data feedback yang sudah ada dari localStorage
                const existingFeedback = JSON.parse(localStorage.getItem('feedback')) || [];

                // Tambahkan feedback baru ke array
                existingFeedback.push(feedback);

                // Simpan kembali ke localStorage
                localStorage.setItem('feedback', JSON.stringify(existingFeedback));

                // Reset form setelah berhasil menyimpan
                contactForm.reset();

                alert('Pesan Anda berhasil terkirim!'); // Berikan umpan balik kepada pengguna
            });
        }
    },
};

export default hubungiKami;