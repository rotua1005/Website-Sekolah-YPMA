const DetailPrestasi = {
  async render() {
    const data = JSON.parse(localStorage.getItem("detail_prestasi"));
    let comments = JSON.parse(localStorage.getItem("comments_prestasi")) || [];

    const renderComments = (comments) => {
      return comments.map(comment => `
        <div class="mb-3 p-3 border rounded-md shadow-sm text-sm">
          <p class="font-semibold">${comment.name}</p>
          <p class="text-xs text-gray-500">${comment.date}</p>
          <p class="mt-1">${comment.text}</p>
        </div>
      `).join('');
    };

    if (!data) {
      return `<div class="text-center mt-20 text-red-600 text-xl font-semibold">Data tidak ditemukan.</div>`;
    }

    return `
      <main id="detail-container" class="container mx-auto max-w-3xl px-4 py-6 transition-all duration-300 ease-in-out opacity-0 scale-95">
        <h2 class="text-xl md:text-2xl font-bold text-green-700 mb-2">${data.judul}</h2>
        <p class="text-sm text-gray-500 mb-4">Diterbitkan: ${new Date(data.tanggal || Date.now()).toLocaleDateString('id-ID', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        })}</p>
        
        <!-- GAMBAR UTAMA DIPERBESAR -->
        <img src="${data.gambar}" alt="${data.judul}" class="w-full h-72 md:h-96 object-cover rounded-xl shadow mb-6"/>

        <p class="text-sm text-gray-800 leading-relaxed whitespace-pre-line mb-8">${data.deskripsi}</p>

        <div class="border-t pt-4">
          <h3 class="text-base font-semibold mb-2 text-blue-700">Leave a comment</h3>
          <form id="comment-form" class="text-sm">
            <textarea id="comment-text" rows="3" class="w-full border rounded p-2 mb-2" placeholder="Komentar..." required></textarea>
            <input type="text" id="comment-name" class="w-full border rounded p-2 mb-2" placeholder="Nama *" required />
            <input type="email" id="comment-email" class="w-full border rounded p-2 mb-2" placeholder="Email *" required />
            <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded">Post Comment</button>
          </form>
        </div>

        <div id="comments-section" class="mt-6">
          <h3 class="text-base font-semibold mb-2 text-blue-700">Komentar</h3>
          <div id="comment-list">${renderComments(comments)}</div>
        </div>

        <!-- TOMBOL KEMBALI -->
        <div class="mt-6">
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
    const container = document.getElementById('detail-container');

    if (container) {
      setTimeout(() => {
        container.classList.remove('opacity-0', 'scale-95');
        container.classList.add('opacity-100', 'scale-100');
      }, 10);
    }

    const form = document.getElementById('comment-form');
    const list = document.getElementById('comment-list');
    let comments = JSON.parse(localStorage.getItem("comments_prestasi")) || [];

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('comment-name').value.trim();
      const email = document.getElementById('comment-email').value.trim();
      const text = document.getElementById('comment-text').value.trim();

      const newComment = {
        name,
        email,
        text,
        date: new Date().toLocaleDateString('id-ID', {
          year: 'numeric', month: 'long', day: 'numeric',
          hour: 'numeric', minute: 'numeric'
        })
      };

      comments.push(newComment);
      localStorage.setItem("comments_prestasi", JSON.stringify(comments));

      list.innerHTML += `
        <div class="mb-3 p-3 border rounded-md shadow-sm text-sm">
          <p class="font-semibold">${newComment.name}</p>
          <p class="text-xs text-gray-500">${newComment.date}</p>
          <p class="mt-1">${newComment.text}</p>
        </div>
      `;
      form.reset();
    });

    const closeBtn = document.getElementById('close-detail');
    closeBtn?.addEventListener('click', () => {
      container.classList.remove('opacity-100', 'scale-100');
      container.classList.add('opacity-0', 'scale-95');

      setTimeout(() => {
        window.location.hash = '#/prestasi';
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }, 300);
    });
  }
};

export default DetailPrestasi;
