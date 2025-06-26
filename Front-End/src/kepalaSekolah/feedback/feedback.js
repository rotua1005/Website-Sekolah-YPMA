import MenuKepsek from "../menu/menu_kepsek";

const FeedbackKepsek = {
    async render() {
        let feedbackMessages = [];
        let errorMessage = '';

        try {
            // Fetch feedback messages from the backend API
            const response = await fetch('http://localhost:5000/api/kontak');
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal mengambil pesan feedback dari server.');
            }
            
            const data = await response.json();
            feedbackMessages = data.data || [];
            feedbackMessages = feedbackMessages.reverse();
        } catch (error) {
            console.error("Error fetching feedback:", error);
            errorMessage = `<p class="text-red-500 text-center">Error: ${error.message}. Gagal memuat pesan feedback.</p>`;
            feedbackMessages = [];
        }

        let feedbackListHTML = '';
        if (errorMessage) {
            feedbackListHTML = errorMessage;
        } else if (feedbackMessages.length > 0) {
            feedbackListHTML = `
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Nama
                            </th>
                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Email
                            </th>
                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Telepon
                            </th>
                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Pesan
                            </th>
                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Waktu
                            </th>
                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        ${feedbackMessages.map(feedback => `
                            <tr>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">${feedback.nama}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">${feedback.email}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">${feedback.telepon}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-pre-line">${feedback.pesan}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">${new Date(feedback.tanggal).toLocaleString('id-ID')}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span class="relative inline-block px-3 py-1 font-semibold leading-tight ${feedback.status === 'terkirim' ? 'text-blue-900' : feedback.status === 'dibaca' ? 'text-green-900' : 'text-purple-900'}">
                                        <span aria-hidden="true" class="absolute inset-0 opacity-50 rounded-full ${feedback.status === 'terkirim' ? 'bg-blue-200' : feedback.status === 'dibaca' ? 'bg-green-200' : 'bg-purple-200'}"></span>
                                        <span class="relative">${feedback.status}</span>
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            feedbackListHTML = '<p class="text-gray-600 text-center">Belum ada pesan feedback.</p>';
        }

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuKepsek.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Kepala Sekolah</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">Feedback Pengguna</h1>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            ${feedbackListHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        // Tidak ada interaksi spesifik yang dibutuhkan setelah render untuk komponen Feedback saat ini.
    }
};

export default FeedbackKepsek;