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

        const renderComments = (comments) => {
            let commentHTML = '';
            comments.forEach(comment => {
                commentHTML += `
                    <div class="mb-4 p-4 border rounded-md shadow-sm">
                        <p class="font-semibold">${comment.name}</p>
                        <p class="text-sm text-gray-500">${comment.date}</p>
                        <p class="mt-2">${comment.text}</p>
                        <button class="text-blue-500 hover:underline mt-2 reply-button" data-comment-id="${comment.id}">Reply</button>
                        <div id="reply-form-${comment.id}" class="hidden mt-4">
                            <textarea rows="2" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Balas komentar ini"></textarea>
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 post-reply-button" data-parent-id="${comment.id}">Post Reply</button>
                        </div>
                        ${comment.replies && comment.replies.length > 0 ? `
                            <div class="ml-6 mt-4">
                                ${renderComments(comment.replies)}
                            </div>
                        ` : ''}
                    </div>
                `;
            });
            return commentHTML;
        };

        readMoreButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.getAttribute('data-index'));
                const berita = beritaList[index];

                if (berita) {
                    const relatedBerita = beritaList.filter((_, i) => i !== index).slice(0, 3);
                    let comments = JSON.parse(localStorage.getItem(`comments_berita_${index}`)) || [];

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

                                <div class="mt-8 border-t pt-8">
                                    <h3 class="text-xl font-semibold mb-4 text-blue-700">Leave a Comment</h3>
                                    <form id="comment-form">
                                        <div class="mb-4">
                                            <label for="comment-text" class="block text-gray-700 text-sm font-bold mb-2">Comment</label>
                                            <textarea id="comment-text" rows="4" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
                                        </div>
                                        <div class="mb-4">
                                            <label for="comment-name" class="block text-gray-700 text-sm font-bold mb-2">Name *</label>
                                            <input type="text" id="comment-name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                                        </div>
                                        <div class="mb-4">
                                            <label for="comment-email" class="block text-gray-700 text-sm font-bold mb-2">Email *</label>
                                            <input type="email" id="comment-email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                                        </div>
                                        <div class="mb-4">
                                            <input type="checkbox" id="save-info" name="save-info">
                                            <label for="save-info" class="text-gray-700 text-sm">Simpan nama, email, dan situs web saya pada peramban ini untuk komentar saya berikutnya.</label>
                                        </div>
                                        <button type="submit" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                            Post Comment
                                        </button>
                                    </form>
                                    <div id="comments-section" class="mt-8">
                                        <h3 class="text-xl font-semibold mb-4 text-blue-700">Comments</h3>
                                        <div id="comment-list">
                                            ${renderComments(comments)}
                                        </div>
                                    </div>
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

                    const commentForm = document.getElementById('comment-form');
                    const commentListDiv = document.getElementById('comment-list');

                    commentForm.addEventListener('submit', function(event) {
                        event.preventDefault();
                        const commentText = document.getElementById('comment-text').value;
                        const name = document.getElementById('comment-name').value;
                        const email = document.getElementById('comment-email').value;
                        const saveInfo = document.getElementById('save-info').checked;

                        const newComment = {
                            id: Date.now(), // Generate unique ID for the comment
                            parent: null, // Top-level comment
                            name: name,
                            email: email,
                            text: commentText,
                            date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
                            replies: []
                        };

                        comments.push(newComment);
                        localStorage.setItem(`comments_berita_${index}`, JSON.stringify(comments));
                        commentListDiv.innerHTML = renderComments(comments);
                        commentForm.reset();
                    });

                    commentListDiv.addEventListener('click', function(event) {
                        if (event.target.classList.contains('reply-button')) {
                            const commentId = event.target.getAttribute('data-comment-id');
                            const replyForm = document.getElementById(`reply-form-${commentId}`);
                            replyForm.classList.toggle('hidden');
                        } else if (event.target.classList.contains('post-reply-button')) {
                            const parentId = event.target.getAttribute('data-parent-id');
                            const replyTextarea = event.target.previousElementSibling;
                            const replyText = replyTextarea.value;
                            const replyName = document.getElementById('comment-name').value;
                            const replyEmail = document.getElementById('comment-email').value;

                            if (replyText.trim()) {
                                const newReply = {
                                    id: Date.now(),
                                    parent: parentId,
                                    name: replyName,
                                    email: replyEmail,
                                    text: replyText,
                                    date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
                                    replies: []
                                };

                                const findAndAddReply = (commentArray) => {
                                    for (const comment of commentArray) {
                                        if (comment.id === parseInt(parentId)) {
                                            comment.replies = comment.replies || [];
                                            comment.replies.push(newReply);
                                            return true;
                                        }
                                        if (comment.replies && comment.replies.length > 0) {
                                            if (findAndAddReply(comment.replies)) {
                                                return true;
                                            }
                                        }
                                    }
                                    return false;
                                };

                                findAndAddReply(comments);
                                localStorage.setItem(`comments_berita_${index}`, JSON.stringify(comments));
                                commentListDiv.innerHTML = renderComments(comments);
                                document.getElementById(`reply-form-${parentId}`).classList.add('hidden');
                                replyTextarea.value = '';
                            }
                        }
                    });
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