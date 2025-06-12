const DetailPrestasi = {
  async render() {
    const hashSegments = window.location.hash.split('/');
    const id = hashSegments[hashSegments.length - 1];

    let data = null;
    try {
      const response = await fetch(`http://localhost:5000/api/dashboardPrestasi/${id}`);
      if (!response.ok) throw new Error("Gagal fetch detail prestasi");
      data = await response.json();
      localStorage.setItem("detail_prestasi", JSON.stringify(data));
    } catch (e) {
      console.error("Error fetching detail prestasi:", e);
      return `<div class="text-center mt-20 text-red-600 text-xl font-semibold">Gagal memuat data prestasi. Silakan coba lagi nanti.</div>`;
    }

    if (!data) {
      return `<div class="text-center mt-20 text-red-600 text-xl font-semibold">Data tidak ditemukan.</div>`;
    }

    // Fetch all prestasi for related list
    let prestasiList = [];
    try {
      const allResponse = await fetch('http://localhost:5000/api/dashboardPrestasi');
      if (allResponse.ok) {
        prestasiList = await allResponse.json();
      }
    } catch (e) {
      prestasiList = [];
    }
    // Filter out current and take 3 related
    const relatedPrestasi = prestasiList.filter(item => (item._id || item.id) != id).slice(0, 3);

    let comments = JSON.parse(localStorage.getItem(`comments_prestasi_${id}`)) || [];
    const backendBaseUrl = 'http://localhost:5000';

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
            src="${data.gambar ? `${backendBaseUrl}${data.gambar}` : '/placeholder-image.jpg'}"
            alt="${data.judul}"
            class="w-full h-full object-cover brightness-75"
          />
        </div>
        <div class="px-4 md:px-20 mt-6">
          <h1 class="text-3xl md:text-5xl font-bold text-gray-800">${data.judul}</h1>
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
            <h3 class="text-xl font-semibold mb-4 text-green-700 border-b pb-3">Prestasi Lainnya</h3>
            <div class="space-y-4">
              ${relatedPrestasi.map(prestasi => `
                <a href="#/detail-prestasi/${prestasi._id || prestasi.id}" class="block hover:bg-gray-50 rounded transition">
                  <div class="flex gap-4">
                    <img src="${prestasi.gambar ? `${backendBaseUrl}${prestasi.gambar}` : '/placeholder-image.jpg'}" alt="${prestasi.judul}" class="w-20 h-16 object-cover rounded-md" />
                    <div>
                      <p class="text-sm text-gray-500 mb-1">
                        ${new Date(prestasi.tanggal || Date.now()).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </p>
                      <h4 class="text-base font-semibold text-blue-800 line-clamp-2">${prestasi.judul}</h4>
                    </div>
                  </div>
                </a>
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
          <a href="#/prestasi" class="text-blue-600 hover:underline text-lg font-medium inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-5 h-5 mr-2" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12m7.5-7.5L8.25 12" />
            </svg>
            Kembali ke Prestasi Siswa
          </a>
        </div>
      </main>
    `;
  },

  async afterRender() {
    const commentForm = document.getElementById('comment-form');
    const commentListDiv = document.getElementById('comment-list');
    const hashSegments = window.location.hash.split('/');
    const currentId = hashSegments[hashSegments.length - 1];
    let comments = JSON.parse(localStorage.getItem(`comments_prestasi_${currentId}`)) || [];

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
        const name = document.getElementById('comment-name').value.trim();
        const email = document.getElementById('comment-email').value.trim();
        const text = document.getElementById('comment-text').value.trim();
        const saveInfoCheckbox = document.getElementById('save-info');

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
        localStorage.setItem(`comments_prestasi_${currentId}`, JSON.stringify(comments));
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

          const replyName = localStorage.getItem('saved_comment_name') || 'Pengunjung';

          const newReply = {
            id: Date.now(),
            parent: parentId,
            name: replyName,
            email: localStorage.getItem('saved_comment_email') || '',
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
            localStorage.setItem(`comments_prestasi_${currentId}`, JSON.stringify(comments));
            commentListDiv.innerHTML = renderComments(comments);
            replyTextarea.value = '';
            document.getElementById(`reply-form-${parentId}`).classList.add('hidden');
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
  }
};

export default DetailPrestasi;
