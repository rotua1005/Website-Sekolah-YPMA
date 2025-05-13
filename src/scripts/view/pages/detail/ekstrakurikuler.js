const DetailEkstrakurikuler = {
  async render() {
      const hashSegments = window.location.hash.split('/');
      const id = parseInt(hashSegments[hashSegments.length - 1]);
      const ekstrakurikulerList = JSON.parse(localStorage.getItem("ekstrakurikuler")) || [];
      const data = ekstrakurikulerList[id];

      if (!data) {
          return `<div class="text-center mt-20 text-red-600 text-xl font-semibold">Data tidak ditemukan.</div>`;
      }

      const relatedEkstra = ekstrakurikulerList.filter((_, i) => i !== id).slice(0, 3);
      let comments = JSON.parse(localStorage.getItem(`comments_ekstrakurikuler_${id}`)) || [];

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
          <section class="relative w-full mb-8 berita-hero">
              <div class="relative w-300 h-[300px] md:h-[700px] overflow-hidden">
                  <img
                      src="${data.gambar}"
                      alt="${data.nama}"
                      class="w-full h-full object-cover brightness-75"
                  />
              </div>
              <div class="px-4 md:px-20 mt-6">
                  <h1 class="text-3xl md:text-5xl font-bold text-gray-800">${data.nama}</h1>
              </div>
          </section>

          <main class="w-full mt-0 px-4 md:px-20">
              <section class="relative w-full mb-8 flex flex-col md:flex-row gap-8">
                  <div class="md:w-2/3">
                      <p class="text-lg text-gray-500 mb-3">
                          Diterbitkan: ${new Date(data.tanggal || Date.now()).toLocaleDateString('id-ID', {
                              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                          })}
                      </p>
                      <div class="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                          ${data.deskripsi}
                      </div>
                  </div>
                  <aside class="md:w-1/3">
                      <h3 class="text-xl font-semibold mb-4 text-green-700 border-b pb-3">Ekstrakurikuler Lainnya</h3>
                      <div class="space-y-4">
                          ${relatedEkstra.map((ekstra, index) => `
                              <div class="flex gap-4">
                                  <img src="${ekstra.gambar}" alt="${ekstra.nama}" class="w-20 h-16 object-cover rounded-md" />
                                  <div>
                                      <p class="text-sm text-gray-500 mb-1">
                                          ${new Date(ekstra.tanggal || Date.now()).toLocaleDateString('id-ID', {
                                              day: 'numeric', month: 'short', year: 'numeric'
                                          })}
                                      </p>
                                      <h4 class="text-base font-semibold text-blue-800 line-clamp-2">${ekstra.nama}</h4>
                                  </div>
                              </div>
                          `).join('')}
                      </div>
                  </aside>
              </section>

              <section class="mb-12 md:w-2/3">
                  <h3 class="text-xl font-bold text-blue-700 mb-4">Tinggalkan Komentar</h3>
                  <form id="comment-form" class="space-y-4">
                      <div>
                          <label for="comment-name" class="block text-sm font-medium text-gray-700 mb-1">Nama *</label>
                          <input type="text" id="comment-name" class="w-full border rounded px-3 py-2" required>
                      </div>
                      <div>
                          <label for="comment-email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                          <input type="email" id="comment-email" class="w-full border rounded px-3 py-2" required>
                      </div>
                      <div>
                          <label for="comment-text" class="block text-sm font-medium text-gray-700 mb-1">Komentar *</label>
                          <textarea id="comment-text" rows="4" class="w-full border rounded px-3 py-2" required></textarea>
                      </div>
                      <div>
                          <input type="checkbox" id="save-info">
                          <label for="save-info" class="text-sm text-gray-700">Simpan info saya untuk komentar berikutnya</label>
                      </div>
                      <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded">Kirim Komentar</button>
                  </form>
              </section>

              <section class="mb-16 md:w-2/3">
                  <h3 class="text-xl font-bold text-blue-700 mb-4">Komentar</h3>
                  <div id="comment-list">
                      ${renderComments(comments)}
                  </div>
              </section>

              <div class="mb-12">
                  <a href="#/ekstrakurikuler" class="text-blue-600 hover:underline text-lg font-medium inline-flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-5 h-5 mr-2" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12m7.5-7.5L8.25 12" />
                      </svg>
                      Kembali ke Ekstrakurikuler
                  </a>
              </div>
          </main>
      `;
  },

  async afterRender() {
      const commentForm = document.getElementById('comment-form');
      const commentListDiv = document.getElementById('comment-list');
      const hashSegments = window.location.hash.split('/');
      const currentId = parseInt(hashSegments[hashSegments.length - 1]);
      let comments = JSON.parse(localStorage.getItem(`comments_ekstrakurikuler_${currentId}`)) || [];

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
              const name = document.getElementById('comment-name').value;
              const email = document.getElementById('comment-email').value;
              const text = document.getElementById('comment-text').value;

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
              localStorage.setItem(`comments_ekstrakurikuler_${currentId}`, JSON.stringify(comments));
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
                  const parentId = parseInt(event.target.getAttribute('data-parent-id'));
                  const replyTextarea = event.target.previousElementSibling;
                  const replyText = replyTextarea.value;
                  const name = document.getElementById('comment-name').value;
                  const email = document.getElementById('comment-email').value;

                  if (replyText.trim()) {
                      const newReply = {
                          id: Date.now(),
                          parent: parentId,
                          name,
                          email,
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

                      addReply(comments);
                      localStorage.setItem(`comments_ekstrakurikuler_${currentId}`, JSON.stringify(comments));
                      commentListDiv.innerHTML = renderComments(comments);
                  }
              }
          });
      }
  }
};

export default DetailEkstrakurikuler;