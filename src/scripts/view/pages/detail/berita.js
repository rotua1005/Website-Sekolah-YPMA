// detailberita.js
class DetailBerita {
    constructor() {
        this.template = '';
        this.currentIndex = null;
        this.beritaData = null;
    }

    async render(berita, index) {
        this.beritaData = berita;
        this.currentIndex = index;
        const beritaList = JSON.parse(localStorage.getItem("berita")) || [];
        const relatedBerita = beritaList.filter((_, i) => i !== index).slice(0, 3);
        let comments = JSON.parse(localStorage.getItem(`comments_berita_${index}`)) || [];

        const renderComments = (comments) => {
            let commentHTML = '';
            comments.forEach(comment => {
                commentHTML += `
                    <div class="mb-4 p-4 border rounded-md shadow-sm" style="margin-left: -300px;">
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

        this.template = `
            <div class="w-full" style="margin-left: -300px;">
                <div class="mb-8">
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
                </div>

                <div class="mt-8 border-t pt-8">
                    <h3 class="text-xl font-semibold mb-4 text-blue-700">Leave a Comment</h3>
                    <form id="comment-form" class="mb-8">
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
                </div>

                <div id="comments-section" class="mt-8">
                    <h3 class="text-xl font-semibold mb-4 text-blue-700">Comments</h3>
                    <div id="comment-list">
                        ${renderComments(comments)}
                    </div>
                </div>

                <div class="mt-8">
                    <button id="close-detail" class="px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-lg font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline-block mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Kembali
                    </button>
                </div>
            </div>

            <aside class="mt-8 md:mt-0" style="margin-left: -300px;">
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
        `;
    }

    getTemplate() {
        return this.template;
    }

    afterRender() {
        const commentForm = document.getElementById('comment-form');
        const commentListDiv = document.getElementById('comment-list');
        let comments = JSON.parse(localStorage.getItem(`comments_berita_${this.currentIndex}`)) || [];
        const renderComments = (comments) => {
            let commentHTML = '';
            comments.forEach(comment => {
                commentHTML += `
                    <div class="mb-4 p-4 border rounded-md shadow-sm" style="margin-left: -300px;">
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

        if (commentForm) {
            commentForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const commentText = document.getElementById('comment-text').value;
                const name = document.getElementById('comment-name').value;
                const email = document.getElementById('comment-email').value;

                const newComment = {
                    id: Date.now(),
                    parent: null,
                    name: name,
                    email: email,
                    text: commentText,
                    date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
                    replies: []
                };

                comments.push(newComment);
                localStorage.setItem(`comments_berita_${this.currentIndex}`, JSON.stringify(comments));
                commentListDiv.innerHTML = renderComments(comments);
                commentForm.reset();
            });
        }

        if (commentListDiv) {
            commentListDiv.addEventListener('click', (event) => {
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
                        localStorage.setItem(`comments_berita_${this.currentIndex}`, JSON.stringify(comments));
                        commentListDiv.innerHTML = renderComments(comments);
                        document.getElementById(`reply-form-${parentId}`).classList.add('hidden');
                        replyTextarea.value = '';
                    }
                }
            });
        }
    }
}

export default () => new DetailBerita();