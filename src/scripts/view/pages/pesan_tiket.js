const Pesan_tiket = {
  async render() {
    return `
    <div class="register-wrapper">
      <div class="Pesan-container">
        <div class="containerr">
          <img src="./Mask_group2.png" alt="Logo" class="login-logo"></img>
          <form id="pesanForm" action="#">
            <div class="form-group">
              <input type="text" id="username" name="username" required placeholder="nama lengkap">
            </div>
            <div class="form-group">
              <input type="date" id="date" name="date" required placeholder="Tanggal Pesan">
            </div>
            <div class="form-group">
              <input type="tel" id="tel" name="tel" required placeholder="no. HP">
            </div>
            <div class="form-group">
              <input type="text" id="alamat" name="alamat" required placeholder="alamat">
            </div>                 
            <button type="submit" class="log">Pesan Sekarang</button>
          </form>
        </div>
      </div>
    </div>
    `;
  },
  async afterRender() {
    const dateInput = document.getElementById('date');
    const pesanForm = document.getElementById('pesanForm');
    const today = new Date().toISOString().split('T')[0]; // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD
    dateInput.setAttribute('min', today); // Mengatur atribut min pada input tanggal

    pesanForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Mencegah submit form default

      if (dateInput.value < today) {
        alert('Tiket sudah berakhir'); // Menampilkan pesan kesalahan
      } else {
        window.location.href = '/#/pembayaran'; // Arahkan ke halaman berikutnya
      }
    });
  },
};

export default Pesan_tiket;
