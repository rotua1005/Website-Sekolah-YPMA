// DetailBerita.js
const DetailBerita = {
    async render() {
        const hashSegments = window.location.hash.split('/');
        const id = hashSegments[hashSegments.length - 1]; // Get the ID from the URL hash

        let berita = null;
        try {
            // Fetch the specific news item from the API using its ID
            const response = await fetch(`http://localhost:5000/api/dashboardUploadBerita/${id}`);
            if (!response.ok) {
                // If response is not OK (e.g., 404 Not Found), throw an error
                throw new Error(`Failed to fetch news with ID ${id}: ${response.statusText}`);
            }
            berita = await response.json();
        } catch (e) {
            console.error("Error fetching detail news:", e);
            // Optionally, show a more user-friendly error message
            return `<div class="text-center mt-20 text-red-600 text-xl font-semibold">Gagal memuat berita. Silakan coba lagi nanti.</div>`;
        }

        if (!berita) {
            return `<div class="text-center mt-20 text-red-600 text-xl font-semibold">Berita tidak ditemukan.</div>`;
        }

        // Fetch all berita to find related ones (if needed)
        let allBeritaList = [];
        try {
            const allBeritaResponse = await fetch('http://localhost:5000/api/dashboardUploadBerita');
            if (allBeritaResponse.ok) {
                allBeritaList = await allBeritaResponse.json();
            }
        } catch (e) {
            console.warn("Could not fetch all news for related articles:", e);
        }

        // Filter out the current news item and take the first 3 related ones
        const relatedBerita = allBeritaList.filter(item => item._id !== id).slice(0, 3);
        
        // Comments will still use localStorage for now, as per your original code
        let comments = JSON.parse(localStorage.getItem(`comments_berita_${id}`)) || [];
        const backendBaseUrl = 'http://localhost:5000'; // Define backend base URL for images

        const renderComments = (commentsArray) => { // Renamed parameter to avoid shadowing
            let commentHTML = '';
            commentsArray.forEach(comment => {
                commentHTML += `
                    <div class="mb-4 p-4 border border-[#22c55e] rounded-md shadow-sm text-black">
                        <p class="font-semibold text-black">${comment.name}</p>
                        <p class="text-sm text-gray-500">${comment.date}</p>
                        <p class="mt-2 text-black">${comment.text}</p>
                        <button class="text-blue-500 hover:underline mt-2 reply-button" data-comment-id="${comment.id}">Reply</button>
                        <div id="reply-form-${comment.id}" class="hidden mt-4">
                            <textarea rows="2" class="w-full border rounded p-2 text-sm mb-2" placeholder="Balas komentar ini"></textarea>
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded post-reply-button" data-parent-id="${comment.id}">Post Reply</button>
                        </div>
                        ${comment.replies && comment.replies.length > 0 ? `
                            <div class="ml-6 mt-4 border-l pl-4">
                                ${renderComments(comment.replies)}
                            </div>
                        ` : ''}
                    </div>
                `;
            });
            return commentHTML;
        };

        return `
            <section class="relative w-full mb-8 berita-hero font-sans text-black">
                <div class="relative w-full h-[300px] md:h-[700px] overflow-hidden">
                    <img src="${berita.gambar ? `${backendBaseUrl}${berita.gambar}` : '/placeholder-image.jpg'}" alt="${berita.judul}" class="w-full h-full object-cover brightness-75" />
                </div>
                <div class="px-4 md:px-20 mt-6">
                    <h1 class="text-3xl md:text-5xl font-bold">${berita.judul}</h1>
                    <p class="text-gray-500 mt-2 mb-2">
                        ${new Date(berita.tanggal || Date.now()).toLocaleDateString('id-ID', {
                            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                        })}
                    </p>
                </div>
            </section>

            <main class="w-full mt-0 px-4 md:px-20 font-sans text-black">
                <section class="relative w-full mb-8 flex flex-col md:flex-row gap-8">
                    <div class="md:w-2/3">
                        <div class="text-lg leading-relaxed whitespace-pre-line">
                            ${berita.deskripsi}
                        </div>
                    </div>
                    <aside class="md:w-1/3">
                        <h3 class="text-xl font-semibold mb-4 text-[#22c55e] border-b pb-3">Berita Lainnya</h3>
                        <div class="space-y-4">
                            ${relatedBerita.map(rb => `
                                <div class="flex gap-4">
                                    <img src="${rb.gambar ? `${backendBaseUrl}${rb.gambar}` : '/placeholder-image.jpg'}" alt="${rb.judul}" class="w-14 h-12 object-cover rounded-md" />
                                    <div>
                                        <p class="text-sm text-gray-500 mb-1">
                                            ${new Date(rb.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            })}
                                        </p>
                                        <a href="#/detail_berita/${rb._id}" class="text-base font-semibold text-blue-800 hover:text-[#22c55e] line-clamp-2" style="text-decoration: none;">${rb.judul}</a>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </aside>
                </section>

                <section class="mb-12 md:w-2/3 border border-[#22c55e] p-6 rounded-md">
                    <h3 class="text-xl font-bold text-[#22c55e] mb-4"><i class="fas fa-comment-dots mr-2"></i>Tinggalkan Komentar</h3>
                    <form id="comment-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="comment-name" class="block text-sm font-medium mb-1">Nama *</label>
                                <input type="text" id="comment-name" class="w-full border rounded px-3 py-2" required>
                            </div>
                            <div>
                                <label for="comment-email" class="block text-sm font-medium mb-1">Email *</label>
                                <input type="email" id="comment-email" class="w-full border rounded px-3 py-2" required>
                            </div>
                        </div>
                        <div>
                            <label for="comment-text" class="block text-sm font-medium mb-1">Komentar *</label>
                            <textarea id="comment-text" rows="4" class="w-full border rounded px-3 py-2" required></textarea>
                        </div>
                        <div>
                            <input type="checkbox" id="save-info">
                            <label for="save-info" class="text-sm">Simpan info saya untuk komentar berikutnya</label>
                        </div>
                        <button type="submit" class="border border-[#22c55e] bg-white text-[#22c55e] hover:bg-[#22c55e] hover:text-white font-semibold px-5 py-2 rounded shadow">
                            <i class="fas fa-paper-plane mr-2"></i> Kirim Komentar
                        </button>
                    </form>
                </section>

                <section class="mb-16 md:w-2/3">
                    <h3 class="text-xl font-bold text-[#22c55e] mb-4">Komentar</h3>
                    <div id="comment-list">
                        ${renderComments(comments)}
                    </div>
                </section>

                <div class="mb-12">
                    <a href="#/berita" class="border border-[#22c55e] text-[#22c55e] px-4 py-2 rounded hover:bg-[#22c55e] hover:text-white text-lg font-medium inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-5 h-5 mr-2" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12m7.5-7.5L8.25 12" />
                        </svg>
                        Kembali ke Berita
                    </a>
                </div>
            </main>
        `;
    },

    async afterRender() {
        const commentForm = document.getElementById('comment-form');
        const commentListDiv = document.getElementById('comment-list');
        const hashSegments = window.location.hash.split('/');
        const currentId = hashSegments[hashSegments.length - 1]; // Get the ID as a string
        let comments = JSON.parse(localStorage.getItem(`comments_berita_${currentId}`)) || [];

        // Updated renderComments to ensure it always uses the local `comments` array
        const renderComments = (commentsArray) => {
            let commentHTML = '';
            commentsArray.forEach(comment => {
                commentHTML += `
                    <div class="mb-4 p-4 border border-[#22c55e] rounded-md shadow-sm text-black">
                        <p class="font-semibold text-black">${comment.name}</p>
                        <p class="text-sm text-gray-500">${comment.date}</p>
                        <p class="mt-2 text-black">${comment.text}</p>
                        <button class="text-blue-500 hover:underline mt-2 reply-button" data-comment-id="${comment.id}">Reply</button>
                        <div id="reply-form-${comment.id}" class="hidden mt-4">
                            <textarea rows="2" class="w-full border rounded p-2 text-sm mb-2" placeholder="Balas komentar ini"></textarea>
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded post-reply-button" data-parent-id="${comment.id}">Post Reply</button>
                        </div>
                        ${comment.replies && comment.replies.length > 0 ? `
                            <div class="ml-6 mt-4 border-l pl-4">
                                ${renderComments(comment.replies)}
                            </div>
                        ` : ''}
                    </div>
                `;
            });
            return commentHTML;
        };

        if (commentForm) {
            commentForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const nameInput = document.getElementById('comment-name');
                const emailInput = document.getElementById('comment-email');
                const textInput = document.getElementById('comment-text');
                const saveInfoCheckbox = document.getElementById('save-info');

                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const text = textInput.value.trim();

                if (!name || !email || !text) {
                    if (window.Swal) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Input tidak lengkap!',
                            text: 'Harap isi semua kolom yang diperlukan.',
                            confirmButtonText: 'OK'
                        });
                    }
                    return;
                }

                const newComment = {
                    id: Date.now(),
                    name,
                    email,
                    text,
                    date: new Date().toLocaleDateString('id-ID', {
                        year: 'numeric', month: 'long', day: 'numeric',
                        hour: 'numeric', minute: 'numeric'
                    }),
                    replies: []
                };

                comments.push(newComment);
                localStorage.setItem(`comments_berita_${currentId}`, JSON.stringify(comments));
                commentListDiv.innerHTML = renderComments(comments);
                commentForm.reset();

                if (saveInfoCheckbox.checked) {
                    localStorage.setItem('saved_comment_name', name);
                    localStorage.setItem('saved_comment_email', email);
                } else {
                    localStorage.removeItem('saved_comment_name');
                    localStorage.removeItem('saved_comment_email');
                }

                if (window.Swal) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Komentar berhasil dikirim!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        }

        // Load saved info if available
        const savedName = localStorage.getItem('saved_comment_name');
        const savedEmail = localStorage.getItem('saved_comment_email');
        if (savedName && savedEmail) {
            document.getElementById('comment-name').value = savedName;
            document.getElementById('comment-email').value = savedEmail;
            document.getElementById('save-info').checked = true;
        }

        if (commentListDiv) {
            commentListDiv.addEventListener('click', (event) => {
                if (event.target.classList.contains('reply-button')) {
                    const commentId = event.target.getAttribute('data-comment-id');
                    const replyForm = document.getElementById(`reply-form-${commentId}`);
                    replyForm.classList.toggle('hidden');
                } else if (event.target.classList.contains('post-reply-button')) {
                    const parentId = parseInt(event.target.getAttribute('data-parent-id'));
                    const replyTextarea = event.target.previousElementSibling;
                    const replyText = replyTextarea.value.trim();

                    if (!replyText) {
                        if (window.Swal) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Balasan kosong!',
                                text: 'Harap masukkan teks balasan.',
                                confirmButtonText: 'OK'
                            });
                        }
                        return;
                    }

                    // For replies, you might want to ask for name/email or use a default
                    const replyName = localStorage.getItem('saved_comment_name') || 'Pengunjung';


                    const newReply = {
                        id: Date.now(),
                        parent: parentId,
                        name: replyName, // Using saved name or default
                        email: localStorage.getItem('saved_comment_email') || '', // Using saved email or empty
                        text: replyText,
                        date: new Date().toLocaleDateString('id-ID', {
                            year: 'numeric', month: 'long', day: 'numeric',
                            hour: 'numeric', minute: 'numeric'
                        }),
                        replies: []
                    };

                    const addReply = (arr) => {
                        for (const comment of arr) {
                            if (comment.id === parentId) {
                                comment.replies = comment.replies || [];
                                comment.replies.push(newReply);
                                return true;
                            }
                            if (comment.replies && addReply(comment.replies)) return true;
                        }
                        return false;
                    };

                    if (addReply(comments)) {
                        localStorage.setItem(`comments_berita_${currentId}`, JSON.stringify(comments));
                        commentListDiv.innerHTML = renderComments(comments);
                        replyTextarea.value = ''; // Clear the reply textarea
                        document.getElementById(`reply-form-${parentId}`).classList.add('hidden'); // Hide the reply form
                        if (window.Swal) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Balasan berhasil dikirim!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                }
            });
        }

        // Initialize AOS if it's not already
        if (typeof AOS !== 'undefined' && !AOS.instance) {
            AOS.init({ duration: 800, once: true });
        }
    }
};

export default DetailBerita;