const ProfileGuru = {
    async render() {
      const profileData = JSON.parse(localStorage.getItem('profile')) || [];
  
      let profileCards = '';
      if (profileData.length > 0) {
        profileCards = profileData.map(profile => `
          <div class="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col transform hover:scale-105 transition-transform duration-300 border border-gray-200">
            <img
              class="w-full h-64 object-cover"
              src="${profile.foto}"
              alt="Foto ${profile.nama}"
            />
            <div class="p-6 text-center flex-grow flex flex-col justify-center items-center space-y-3">
              <h3 class="text-xl font-bold text-gray-800">${profile.nama}</h3>
              <span class="inline-block px-4 py-1 bg-green-100 text-green-700 text-base font-semibold rounded-full">
                ${profile.jabatan}
              </span>
              ${profile.mata_pelajaran ? `<p class="text-sm text-gray-600 italic">Mapel: ${profile.mata_pelajaran}</p>` : ''}
            </div>
          </div>
        `).join('');
      } else {
        profileCards = '<p class="text-gray-600 text-center">Belum ada data profil guru yang diupload.</p>';
      }
  
      return `
        <section class="relative text-center w-full">
          <div class="relative w-full">
            <img
              alt="Gedung Sekolah"
              class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover"
              src="./images/Lapangan.jpg"
            />
            <img
              src="./images/logo.png"
              alt="Logo Sekolah"
              class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110 animate-bounce"
            />
            <h1
              class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500 animate-fade-in"
            >
              Profile Guru
            </h1>
          </div>
        </section>
        <section class="bg-gray-100 py-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-semibold text-gray-800 mb-10 text-center">Tenaga Pendidik dan Kependidikan</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              ${profileCards}
            </div>
          </div>
        </section>
      `;
    },
  
    async afterRender() {
      // Tidak ada fungsi spesifik setelah render untuk halaman ProfileGuru saat ini
    },
  };
  
  export default ProfileGuru;
  