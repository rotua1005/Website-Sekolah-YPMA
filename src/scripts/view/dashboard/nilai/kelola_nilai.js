import MenuDashboard from '../../menu/menu_dashboard';

const KelolaNilai = {
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
              <h1 class="text-center text-4xl font-bold mb-6">Kelola Nilai</h1>

              <div class="shadow-xl rounded-lg p-6 overflow-x-auto mb-6">
                <h2 class="text-xl font-semibold mb-4">Detail Informasi Mata Pelajaran</h2>
                <div id="detailNilai" class="mb-4">
                  </div>
              </div>

              <div class="bg-white shadow-xl rounded-lg p-6 overflow-x-auto">
                <h2 class="text-xl font-semibold mb-4">Input Nilai Siswa</h2>
                <table class="w-full border shadow-lg rounded-lg text-lg">
                  <thead class="bg-gray-800 text-white">
                    <tr>
                      <th class="py-4 px-6">#</th>
                      <th class="py-4 px-6">NIS</th>
                      <th class="py-4 px-6">Nama</th>
                      <th class="py-4 px-6">Nilai Harian</th>
                      <th class="py-4 px-6">Nilai Tengah Semester</th>
                      <th class="py-4 px-6">Nilai Semester</th>
                      <th class="py-4 px-6">Rata-rata</th>
                    </tr>
                  </thead>
                  <tbody id="inputNilaiSiswa" class="text-gray-700">
                    </tbody>
                </table>
                <div class="mt-6 text-right">
                  <button id="simpanSemuaNilaiBtn" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Simpan Semua Nilai</button>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  },

  async afterRender() {
    MenuDashboard.afterRender();
    this.loadDetailNilaiInfo();
    await this.loadInputNilaiForm(); // Tambahkan await di sini
    this.setupEventListeners();
  },

  loadDetailNilaiInfo() {
    const detailNilaiContainer = document.getElementById('detailNilai');
    const guruData = JSON.parse(localStorage.getItem('guruUntukKelola'));
    const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];

    if (guruData) {
      const tahunAkademik = tahunAkademikData.length > 0 ? tahunAkademikData[0].tahun : 'N/A';
      const semester = tahunAkademikData.length > 0 ? `Semester ${tahunAkademikData[0].semester}` : 'N/A';
      const kkm = 75; // KKM default

      localStorage.setItem('nilaiUntukDikelola', JSON.stringify({
        mapel: guruData.mapel,
        kelas: guruData.kelas,
        guru: guruData.nama,
        tahunAkademik: tahunAkademik,
        semester: tahunAkademikData.length > 0 ? tahunAkademikData[0].semester : 'N/A',
        kkm: kkm,
        statusGuru: guruData.statusGuru || 'Guru Mapel'
      }));

      detailNilaiContainer.innerHTML = `
        <p><strong>Guru:</strong> ${guruData.nama}</p>
        <p><strong>Kelas:</strong> ${guruData.kelas}</p>
        <p><strong>Mata Pelajaran:</strong> ${guruData.mapel}</p>
        <p><strong>Tahun Akademik:</strong> ${tahunAkademik}</p>
        <p><strong>Semester:</strong> ${semester}</p>
        <p><strong>KKM:</strong> ${kkm}</p>
      `;
    } else {
      detailNilaiContainer.innerHTML = '<p>Tidak ada data guru yang dipilih untuk dikelola.</p>';
    }
  },

  async loadInputNilaiForm() {
    const inputNilaiSiswaBody = document.getElementById('inputNilaiSiswa');
    const nilaiDikelola = JSON.parse(localStorage.getItem('nilaiUntukDikelola'));
    const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
    const kelasYangDipilih = nilaiDikelola ? nilaiDikelola.kelas : null;

    if (kelasYangDipilih) {
      const siswaSatuKelas = dataSiswa.filter(siswa => siswa.kelas === kelasYangDipilih);
      let tableRowsHTML = '';
      siswaSatuKelas.forEach((siswa, index) => {
        tableRowsHTML += `
          <tr class="border-t">
            <td class="py-4 px-6">${index + 1}</td>
            <td class="py-4 px-6">${siswa.nis}</td>
            <td class="py-4 px-6">${siswa.nama}</td>
            <td class="py-4 px-6"><input type="number" class="shadow appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline nilai-harian" id="nilai-harian-${siswa.nis}" placeholder="0-100"></td>
            <td class="py-4 px-6"><input type="number" class="shadow appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline nilai-tengah-semester" id="nilai-tengah-semester-${siswa.nis}" placeholder="0-100"></td>
            <td class="py-4 px-6"><input type="number" class="shadow appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline nilai-semester" id="nilai-semester-${siswa.nis}" placeholder="0-100"></td>
            <td class="py-4 px-6" id="rata-rata-${siswa.nis}">-</td>
          </tr>
        `;
      });
      inputNilaiSiswaBody.innerHTML = tableRowsHTML;
      
      // Hitung rata-rata awal jika ada nilai yang sudah diinput
      siswaSatuKelas.forEach(siswa => {
        this.updateRataRata(siswa.nis);
      });
    } else {
      inputNilaiSiswaBody.innerHTML = '<tr><td colspan="7" class="py-4 px-6 text-center">Data kelas tidak ditemukan.</td></tr>';
    }
  },

  setupEventListeners() {
    const simpanSemuaNilaiBtn = document.getElementById('simpanSemuaNilaiBtn');
    simpanSemuaNilaiBtn.addEventListener('click', () => {
      if (this.validateInputs()) {
        this.simpanDataNilaiSiswa();
      }
    });
  
    const inputs = document.querySelectorAll('.nilai-harian, .nilai-tengah-semester, .nilai-semester');
    inputs.forEach(input => {
      input.addEventListener('input', (event) => {
        const nis = event.target.id.split('-').pop();
        this.updateRataRata(nis);
      });
    });
  
    // Ensure inputs are initialized with default values to trigger updateRataRata
    inputs.forEach(input => {
      const nis = input.id.split('-').pop();
      this.updateRataRata(nis);
    });
  },

  updateRataRata(nis) {
    const nilaiHarian = parseFloat(document.getElementById(`nilai-harian-${nis}`).value) || 0;
    const nilaiTengahSemester = parseFloat(document.getElementById(`nilai-tengah-semester-${nis}`).value) || 0;
    const nilaiSemester = parseFloat(document.getElementById(`nilai-semester-${nis}`).value) || 0;

    const rataRata = ((nilaiHarian + nilaiTengahSemester + (nilaiSemester * 2)) / 4).toFixed(2);
    document.getElementById(`rata-rata-${nis}`).textContent = rataRata;
  },

  validateInputs() {
    const inputs = document.querySelectorAll('.nilai-harian, .nilai-tengah-semester, .nilai-semester');
    for (const input of inputs) {
      if (!input.value || isNaN(input.value)) {
        alert('Harap isi semua nilai dengan benar sebelum menyimpan.');
        return false;
      }
    }
    return true;
  },

  simpanDataNilaiSiswa() {
    const nilaiDikelola = JSON.parse(localStorage.getItem('nilaiUntukDikelola'));
    const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
    const allDataNilaiSiswa = JSON.parse(localStorage.getItem('dataNilaiSiswa')) || [];
    const kelasYangDipilih = nilaiDikelola ? nilaiDikelola.kelas : null;
    const mataPelajaran = nilaiDikelola ? nilaiDikelola.mapel : null;
    const tahunAkademik = nilaiDikelola ? nilaiDikelola.tahunAkademik : null;
    const semester = nilaiDikelola ? nilaiDikelola.semester : null;

    if (!kelasYangDipilih || !mataPelajaran || !tahunAkademik || !semester) {
      alert('Informasi mata pelajaran atau kelas tidak lengkap.');
      return;
    }

    const siswaSatuKelas = dataSiswa.filter(siswa => siswa.kelas === kelasYangDipilih);
    const nilaiSiswaBaru = [];
    let hasError = false;

    siswaSatuKelas.forEach(siswa => {
      const nilaiHarianInput = document.getElementById(`nilai-harian-${siswa.nis}`);
      const nilaiTengahSemesterInput = document.getElementById(`nilai-tengah-semester-${siswa.nis}`);
      const nilaiSemesterInput = document.getElementById(`nilai-semester-${siswa.nis}`);

      const nilaiHarian = parseInt(nilaiHarianInput.value) || null;
      const nilaiTengahSemester = parseInt(nilaiTengahSemesterInput.value) || null;
      const nilaiSemester = parseInt(nilaiSemesterInput.value) || null;

      if (nilaiHarian === null || nilaiTengahSemester === null || nilaiSemester === null || isNaN(nilaiHarian) || isNaN(nilaiTengahSemester) || isNaN(nilaiSemester)) {
        alert(`Harap isi semua nilai untuk siswa ${siswa.nama}.`);
        hasError = true;
        return;
      }

      const hasilSemesterDikali2 = nilaiSemester * 2;
      const nilaiAkhir = Math.round((nilaiHarian + nilaiTengahSemester + hasilSemesterDikali2) / 4);

      nilaiSiswaBaru.push({
        nis: siswa.nis,
        namaSiswa: siswa.nama,
        mataPelajaran: mataPelajaran,
        kelas: kelasYangDipilih,
        tahunAkademik: tahunAkademik,
        semester: semester,
        nilaiHarian: nilaiHarian,
        nilaiTengahSemester: nilaiTengahSemester,
        nilaiSemester: nilaiSemester,
        hasilSemesterDikali2: hasilSemesterDikali2,
        nilaiAkhir: nilaiAkhir
      });
    });

    if (!hasError && nilaiSiswaBaru.length > 0) {
      const updatedDataNilaiSiswa = allDataNilaiSiswa.filter(
        item => !(item.nis && item.mataPelajaran === mataPelajaran && item.kelas === kelasYangDipilih && item.semester === semester)
      );
      updatedDataNilaiSiswa.push(...nilaiSiswaBaru);
      localStorage.setItem('dataNilaiSiswa', JSON.stringify(updatedDataNilaiSiswa));
      alert('Data nilai siswa berhasil disimpan.');
      window.location.hash = '#/hasil_inputnilai';
    } else if (!hasError && siswaSatuKelas.length === 0) {
      alert('Tidak ada siswa di kelas ini.');
    }
  },
};

export default KelolaNilai;
