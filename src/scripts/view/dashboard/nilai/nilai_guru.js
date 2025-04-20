import MenuDashboard from '../../menu/menu_dashboard';

const NilaiGuru = {
  loadData() {
    const guruData = JSON.parse(localStorage.getItem('dataGuru')) || [];
    const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
    const kelasTerpilih = localStorage.getItem('kelasUntukNilai');
    const filteredGuru = guruData.filter(guru => guru.kelas === kelasTerpilih);
    console.log('NilaiGuru - Data guru yang difilter berdasarkan kelas terpilih:', filteredGuru);

    return filteredGuru.map((guru, index) => {
      const tahunAkademik = tahunAkademikData.length > 0 ? tahunAkademikData[0].tahun : 'N/A';
      const semester = tahunAkademikData.length > 0 ? `Semester ${tahunAkademikData[0].semester}` : 'N/A';
      const kkm = 75;

      return `
        <tr class="border-t">
          <td class="py-4 px-6">${index + 1}</td>
          <td class="py-4 px-6">${guru.nama}</td>
          <td class="py-4 px-6">${guru.kelas}</td>
          <td class="py-4 px-6">${guru.mapel}</td>
          <td class="py-4 px-6">${tahunAkademik}</td>
          <td class="py-4 px-6">${semester}</td>
          <td class="py-4 px-6">${kkm}</td>
          <td class="py-4 px-6 flex space-x-4">
            <button class="bg-blue-500 text-white px-4 py-2 rounded detail-btn" data-index="${index}">Detail</button>
            <button class="bg-yellow-400 text-white px-4 py-2 rounded kelola-btn" data-index="${index}">Kelola</button>
          </td>
        </tr>
      `;
    }).join('');
  },

  async render() {
    return `
      <div class="dashboard-container bg-gray-100 min-h-screen flex">
        ${MenuDashboard.render()}
        <div class="dashboard-main flex-1 p-8">
          <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
          </header>

          <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
            <h1 class="text-center text-4xl font-bold mb-6">Nilai Guru</h1>
            <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
              <table class="w-full border shadow-lg rounded-lg text-lg">
                <thead class="bg-gray-800 text-white">
                  <tr>
                    <th class="py-4 px-6">No</th>
                    <th class="py-4 px-6">Guru</th>
                    <th class="py-4 px-6">Kelas</th>
                    <th class="py-4 px-6">Mata Pelajaran</th>
                    <th class="py-4 px-6">Tahun Akademik</th>
                    <th class="py-4 px-6">Semester</th>
                    <th class="py-4 px-6">KKM</th>
                    <th class="py-4 px-6">Aksi</th>
                  </tr>
                </thead>
                <tbody id="dataTable" class="text-gray-700">
                  ${this.loadData()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>`;
  },

  async afterRender() {
    MenuDashboard.afterRender();
    this.attachRowEventListeners();
  },

  attachRowEventListeners() {
    document.querySelectorAll('.detail-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const index = btn.getAttribute('data-index');
        const guruData = JSON.parse(localStorage.getItem('dataGuru')) || [];
        const data = guruData[index];
        alert(`Detail Guru:\nNama: ${data.nama}\nKelas: ${data.kelas}\nMata Pelajaran: ${data.mapel}`);
      });
    });

    document.querySelectorAll('.kelola-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const index = btn.getAttribute('data-index');
        console.log('NilaiGuru - Index tombol Kelola yang diklik:', index);
        const guruData = JSON.parse(localStorage.getItem('dataGuru')) || [];
        const selectedData = guruData[index];

        console.log('NilaiGuru - Data guru yang akan disimpan:', selectedData);
        localStorage.setItem('guruUntukKelola', JSON.stringify(selectedData));
        console.log('NilaiGuru - Data guru berhasil disimpan di localStorage:', localStorage.getItem('guruUntukKelola'));
        window.location.hash = '#/kelola_nilai';
      });
    });
  }
};

export default NilaiGuru;