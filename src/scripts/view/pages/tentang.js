const Tentang = { 
  async render() {
    return `
      <img src="./walpaper.png" alt="Wallpaper Image" class="walpaper">
      <div class="text-center">
        <h2 class="judul2" style="padding-top: 30px;">Tentang Kami</h2>
      </div>
      <div class="container">
      <div class="row justify-content-center" style="padding-top: 20px;">
        <div class="col-md-6">
          <div class="text">
            <p>Wayang Tales merupakan web platform digital yang bertujuan untuk memperkenalkan, mempromosikan dan memfasilitasi seni wayang secara online. Web ini akan menjadi pusat informasi utama yang mengenai seni wayang, baik itu menyajikan sejarah wayang, tokoh-tokohnya, jenis pertunjukan serta jadwal terkini dari berbagai pertunjukan wayang yang ada di seluruh Indonesia.</p>
          </div>
        </div>
        <div class="col-md-6 text-center">
          <img src="./image4.png" alt="Wayang Image" class="img-fluid img-block" style="max-width: 80%; height: auto;">
        </div>
        <div class="col-md-6 text-center" style="margin-top: 20px;">
          <img src="./image5.png" alt="Wayang Image" class="img-fluid img-block" style="max-width: 60%; height: auto;">
        </div>
        <div class="col-md-6">
          <h2 class="text1" style="margin-top: 10px;">Mengapa Wayang Tales?</h2>
          <div class="text">
            <p>Dengan memanfaatkan teknologi digital, web ini dapat menciptakan solusi yang tidak hanya meningkatkan aksesibilitas informasi tentang seni wayang, tetapi juga memperkuat pengaruh dan keberlangsungan seni wayang sebagai bagian penting dari warisan budaya Indonesia.</p>
          </div>
        </div>
      </div>
    </div>
    
      <div class="text-center">
        <h2 class="judul4">Kontak Kami</h2>
      </div>
      <section class="contact">
        <form action="#">
          <div class="input-box">
            <div class="input-field field">
              <input type="text" placeholder="Nama Lengkap" id="name" class="item" autocomplete="off">
            </div>
            <div class="input-field field">
              <input type="email" placeholder="Email" id="email" class="item" autocomplete="off">
            </div>
          </div>
          <div class="input-box">
            <div class="input-field field">
              <input type="text" placeholder="No Handphone" id="phone" class="item" autocomplete="off">
            </div>
            <div class="input-field field">
              <input type="text" placeholder="Subject" id="subject" class="item" autocomplete="off">
            </div>
          </div>
          <div class="textarea-field field">
            <textarea name="message" id="message" cols="30" rows="10" placeholder="Pesan Teks" class="item" autocomplete="off"></textarea>
          </div>
          <button type="submit">Kirim Pesan</button>
        </form>
      </section>

      <section class="team text-center py-5">
        <h2 class="judul5">Team Kami</h2>
        <div class="container">
          <div id="team-container" class="row justify-content-center">
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    try {
      const response = await fetch('http://localhost:3000/api/profileList'); 
      const profiles = await response.json();
      
      const teamContainer = document.getElementById('team-container');
      
      profiles.forEach(profile => {
        const profileHTML = `
          <div class="col-md4 col-lg-4">
            <div class="img-block mb-5">
              <img src="${profile.photo_url || 'https://via.placeholder.com/150'}" class="img-fluid img-thumbnail rounded-circle" alt="${profile.nama}">
              <div class="content mt-2">
                <h4>${profile.nama}</h4>
                <p class="text-muted">${profile.jurusan}</p>
              </div>
            </div>
          </div>
        `;
        teamContainer.insertAdjacentHTML('beforeend', profileHTML);
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  },
};

export default Tentang;
