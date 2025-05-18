import MenuDashboard from '../../menu/menu_dashboard';

const KelolaNilaiAkhir = {
  async render() {
    return `
      <div class="dashboard-container bg-gray-100 min-h-screen flex">
        ${await MenuDashboard.render()}
        <div class="dashboard-main flex-1 p-8">
          <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
          </header>

          <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
            <h1 class="text-center text-4xl font-bold mb-6">Kelola Nilai Akhir</h1>

            <div class="shadow-xl rounded-lg p-6 overflow-x-auto mb-6">
              <h2 class="text-xl font-semibold mb-4">Detail Informasi</h2>
              <div id="detailNilai" class="mb-4">
              </div>
            </div>

            <div class="bg-white shadow-xl rounded-lg p-6 overflow-x-auto">
              <h2 class="text-xl font-semibold mb-4">Data Nilai Siswa</h2>
              <table class="w-full border shadow-lg rounded-lg text-lg">
                <thead class="bg-gray-800 text-white">
                  <tr id="tableHead">
                    <th class="py-4 px-6">#</th>
                    <th class="py-4 px-6">NIS</th>
                    <th class="py-4 px-6">Nama</th>
                    <th class="py-4 px-6">L/P</th>
                  </tr>
                </thead>
                <tbody id="dataNilaiSiswa" class="text-gray-700">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>`;
  },

  async afterRender() {
    await MenuDashboard.afterRender();
    this.loadDetailNilaiInfo();
    this.loadDataNilaiSiswa();
  },

  async loadDetailNilaiInfo() {
    const detailNilaiContainer = document.getElementById('detailNilai');
    const guruData = JSON.parse(localStorage.getItem('guruUntukKelola'));
    const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];

    if (guruData) {
      const tahunAkademik = tahunAkademikData.length > 0 ? tahunAkademikData[0].tahun : 'N/A';
      const semester = tahunAkademikData.length > 0 ? `Semester ${tahunAkademikData[0].semester}` : 'N/A';

      detailNilaiContainer.innerHTML = `
        <p><strong>Wali Kelas:</strong> ${guruData.nama}</p>
        <p><strong>Kelas:</strong> ${guruData.kelas}</p>
        <p><strong>Tahun Akademik:</strong> ${tahunAkademik}</p>
        <p><strong>Semester:</strong> ${semester}</p>
      `;
    } else {
      detailNilaiContainer.innerHTML = '<p>Tidak ada data guru yang dipilih untuk dikelola.</p>';
    }
  },

  async loadDataNilaiSiswa() {
    const dataNilaiSiswaBody = document.getElementById('dataNilaiSiswa');
    const tableHead = document.querySelector('thead tr');
    const guruDataWaliKelas = JSON.parse(localStorage.getItem('guruUntukKelola'));
    const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
    const dataMapel = JSON.parse(localStorage.getItem('dataMapel')) || [];
    const kelasWaliKelas = guruDataWaliKelas?.kelas;
    const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
    const semester = tahunAkademikData.length > 0 ? tahunAkademikData[0].semester : 'Ganjil';

    if (!kelasWaliKelas) {
      dataNilaiSiswaBody.innerHTML = '<tr><td colspan="100%" class="py-4 px-6 text-center">Data kelas tidak ditemukan.</td></tr>';
      return;
    }

    const mapelKelasIni = dataMapel
      .filter(m => m.kelas === kelasWaliKelas)
      .map(m => ({
        label: m.mapel,
        key: m.mapelKey
      }));

    let headerHTML = `
      <th class="py-4 px-6">#</th>
      <th class="py-4 px-6">NIS</th>
      <th class="py-4 px-6">Nama</th>
      <th class="py-4 px-6">L/P</th>
    `;
    mapelKelasIni.forEach(m => {
      headerHTML += `<th class="py-4 px-6">${m.label}</th>`;
    });
    headerHTML += `
      <th class="py-4 px-6">Rata-Rata</th>
      <th class="py-4 px-6">Ranking</th>
    `;
    tableHead.innerHTML = headerHTML;

    const siswaSatuKelas = dataSiswa.filter(siswa => siswa.kelas === kelasWaliKelas);
    const dataSiswaDenganNilai = [];

    for (const siswa of siswaSatuKelas) {
      const nilaiMapelSiswa = {};
      let totalNilai = 0;
      let jumlahMapel = 0;

      for (const mapelInfo of mapelKelasIni) {
        const nilaiKey = `nilaiSiswa_${kelasWaliKelas}_${mapelInfo.label}`;
        const nilaiData = JSON.parse(localStorage.getItem(nilaiKey)) || [];
        const nilaiSiswaMapel = nilaiData.find(n => n.nisn === siswa.nisn);
        nilaiMapelSiswa[mapelInfo.label] = nilaiSiswaMapel?.rataRata || null;
        if (nilaiSiswaMapel?.rataRata !== undefined && nilaiSiswaMapel.rataRata !== null) {
          totalNilai += parseFloat(nilaiSiswaMapel.rataRata);
          jumlahMapel++;
        }
      }

      const rataRataKeseluruhan = jumlahMapel > 0 ? totalNilai / jumlahMapel : null;

      dataSiswaDenganNilai.push({
        ...siswa,
        ...nilaiMapelSiswa,
        rataRata: rataRataKeseluruhan
      });
    }

    dataSiswaDenganNilai.sort((a, b) => (b.rataRata === null ? -1 : (a.rataRata === null ? 1 : b.rataRata - a.rataRata)));
    const dataSiswaDenganRanking = dataSiswaDenganNilai.map((siswa, index) => ({
      ...siswa,
      ranking: siswa.rataRata !== null ? index + 1 : '-'
    }));

    let tableRowsHTML = '';
    dataSiswaDenganRanking.forEach((siswa, index) => {
      tableRowsHTML += `
        <tr class="border-t">
          <td class="py-4 px-6">${index + 1}</td>
          <td class="py-4 px-6">${siswa.nisn}</td>
          <td class="py-4 px-6">${siswa.nama}</td>
          <td class="py-4 px-6">${siswa.jenisKelamin === 'L' ? 'L' : 'P'}</td>
      `;
      mapelKelasIni.forEach(m => {
        tableRowsHTML += `<td class="py-4 px-6">${siswa[m.label] !== undefined && siswa[m.label] !== null ? parseFloat(siswa[m.label]).toFixed(2) : '-'}</td>`;
      });
      tableRowsHTML += `
          <td class="py-4 px-6">${siswa.rataRata !== null ? siswa.rataRata.toFixed(2) : '-'}</td>
          <td class="py-4 px-6">${siswa.ranking}</td>
        </tr>
      `;
    });

    dataNilaiSiswaBody.innerHTML = tableRowsHTML;
  },
};

export default KelolaNilaiAkhir;