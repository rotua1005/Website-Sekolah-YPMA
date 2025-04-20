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
              <table class="min-w-full bg-white border border-gray-300">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="py-2 px-4 border-b">#</th>
                    <th class="py-2 px-4 border-b">NIS</th>
                    <th class="py-2 px-4 border-b">Nama Siswa</th>
                    <th class="py-2 px-4 border-b">Nilai Harian</th>
                    <th class="py-2 px-4 border-b">Nilai Tengah Semester</th>
                    <th class="py-2 px-4 border-b">Nilai Semester</th>
                    <th class="py-2 px-4 border-b">Rata-Rata</th>
                    <th class="py-2 px-4 border-b">Capaian TP Optimal</th>
                    <th class="py-2 px-4 border-b">Capaian TP Perlu Peningkatan</th>
                  </tr>
                </thead>
                <tbody id="nilaiSiswaTableBody">
                  </tbody>
              </table>
              <div class="mt-4 flex items-center justify-end">
                <input type="checkbox" id="konfirmasiUbah" class="mr-2">
                <label for="konfirmasiUbah" class="text-gray-700">Saya yakin akan mengubah data tersebut</label>
                <button id="simpanNilaiBtn" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ml-4" disabled>Simpan</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  },

  async afterRender() {
    MenuDashboard.afterRender();
    await this.loadDetailNilaiInfo();
    await this.loadDataSiswa();
    this.setupEventListeners();
  },

  async loadDetailNilaiInfo() {
    console.log('KelolaNilai - Memuat detail informasi nilai...');
    const detailNilaiContainer = document.getElementById('detailNilai');
    const guruData = JSON.parse(localStorage.getItem('guruUntukKelola'));
    console.log('KelolaNilai - Data guru yang dibaca dari localStorage (loadDetailNilaiInfo):', guruData);
    const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];

    if (guruData) {
      const tahunAkademik = tahunAkademikData.length > 0 ? tahunAkademikData[0].tahun : 'N/A';
      const semester = tahunAkademikData.length > 0 ? `Semester ${tahunAkademikData[0].semester}` : 'N/A';
      const kkm = 75;

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

  async loadDataSiswa() {
    console.log('KelolaNilai - Memuat data siswa...');
    const guruData = JSON.parse(localStorage.getItem('guruUntukKelola'));
    console.log('KelolaNilai - Data guru yang diterima (loadDataSiswa):', guruData);
    const allSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
    const kelasGuru = guruData ? guruData.kelas : '';

    const siswaKelasIni = allSiswa.filter(siswa => siswa.kelas === kelasGuru);
    console.log('KelolaNilai - Data siswa yang difilter berdasarkan kelas:', siswaKelasIni);
    this.renderTableSiswa(siswaKelasIni);
  },

  renderTableSiswa(dataSiswa) {
    const tableBody = document.getElementById('nilaiSiswaTableBody');
    tableBody.innerHTML = dataSiswa.map((siswa, index) => `
      <tr>
        <td class="py-2 px-4 border-b">${index + 1}</td>
        <td class="py-2 px-4 border-b">${siswa.nis}</td>
        <td class="py-2 px-4 border-b">${siswa.nama}</td>
        <td class="py-2 px-4 border-b"><input type="number" class="w-20 border rounded py-1 px-2 nilai-input" data-row="${index}" data-type="harian" value=""></td>
        <td class="py-2 px-4 border-b"><input type="number" class="w-20 border rounded py-1 px-2 nilai-input" data-row="${index}" data-type="tengah_semester" value=""></td>
        <td class="py-2 px-4 border-b"><input type="number" class="w-20 border rounded py-1 px-2 nilai-input" data-row="${index}" data-type="semester" value=""></td>
        <td class="py-2 px-4 border-b rata-rata" data-row="${index}"></td>
        <td class="py-2 px-4 border-b capaian-optimal" data-row="${index}"></td>
        <td class="py-2 px-4 border-b capaian-perlu-peningkatan" data-row="${index}"></td>
      </tr>
    `).join('');

    this.setupEventListenersOnRows();
  },

  setupEventListeners() {
    const konfirmasiUbah = document.getElementById('konfirmasiUbah');
    const simpanNilaiBtn = document.getElementById('simpanNilaiBtn');

    if (konfirmasiUbah && simpanNilaiBtn) {
      konfirmasiUbah.addEventListener('change', function() {
        simpanNilaiBtn.disabled = !this.checked;
      });

      simpanNilaiBtn.addEventListener('click', this.simpanDataNilai);
    }

    this.setupEventListenersOnRows();
  },

  setupEventListenersOnRows() {
    const nilaiInputs = document.querySelectorAll('.nilai-input');
    nilaiInputs.forEach(input => {
      input.addEventListener('input', this.updateRataRata);
    });
  },

  updateRataRata(event) {
    const input = event.target;
    const row = parseInt(input.dataset.row);
    const tableBody = document.getElementById('nilaiSiswaTableBody');
    const rowElement = tableBody.querySelectorAll('tr')[row];
    const nilaiInputsInRow = rowElement.querySelectorAll('.nilai-input');
    const rataRataCell = rowElement.querySelector('.rata-rata');
    const capaianOptimalCell = rowElement.querySelector('.capaian-optimal');
    const capaianPerluPeningkatanCell = rowElement.querySelector('.capaian-perlu-peningkatan');
    let nilaiHarian = parseFloat(nilaiInputsInRow[0]?.value) || 0;
    let nilaiTengahSemester = parseFloat(nilaiInputsInRow[1]?.value) || 0;
    let nilaiSemester = parseFloat(nilaiInputsInRow[2]?.value) || 0;
    let jumlahNilaiValid = 0;
    let totalNilai = 0;

    if (!isNaN(nilaiHarian)) {
      totalNilai += nilaiHarian;
      jumlahNilaiValid++;
    }
    if (!isNaN(nilaiTengahSemester)) {
      totalNilai += nilaiTengahSemester;
      jumlahNilaiValid++;
    }
    if (!isNaN(nilaiSemester)) {
      totalNilai += nilaiSemester * 2; // Nilai semester bobotnya 2
      jumlahNilaiValid++;
    }

    let rataRata = '';
    let capaianOptimal = '';
    let capaianPerluPeningkatan = '';

    if (jumlahNilaiValid > 0) {
      rataRata = totalNilai / (jumlahNilaiValid + (isNaN(parseFloat(nilaiInputsInRow[2]?.value)) ? 0 : 1)); // Sesuaikan pembagi karena nilai semester bobot 2
      rataRataCell.textContent = rataRata.toFixed(2);

      if (rataRata >= 85) {
        capaianOptimal = 'Baik';
      } else {
        capaianPerluPeningkatan = 'Kurang Baik';
      }
    } else {
      rataRataCell.textContent = '';
    }

    capaianOptimalCell.textContent = capaianOptimal;
    capaianPerluPeningkatanCell.textContent = capaianPerluPeningkatan;
  },

  async simpanDataNilai() {
    const tableBody = document.getElementById('nilaiSiswaTableBody');
    const rows = tableBody.querySelectorAll('tr');
    const dataNilai = [];
    const infoMapel = JSON.parse(localStorage.getItem('nilaiUntukDikelola'));
    const allSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
    const guruData = JSON.parse(localStorage.getItem('guruUntukKelola'));
    const kelasGuru = guruData ? guruData.kelas : '';
    const siswaKelasIni = allSiswa.filter(siswa => siswa.kelas === kelasGuru);
    const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
    const semester = tahunAkademikData.length > 0 ? tahunAkademikData[0].semester : 'Ganjil'; // Ambil semester

    rows.forEach((row, index) => {
      const cells = row.querySelectorAll('td');
      const siswa = siswaKelasIni[index];
      if (cells.length > 0 && siswa && infoMapel) {
        const nilaiHarian = cells[3].querySelector('input').value;
        const nilaiTengahSemester = cells[4].querySelector('input').value;
        const nilaiSemester = cells[5].querySelector('input').value;
        const rataRata = cells[6].textContent; // Ambil nilai rata-rata dari tabel

        dataNilai.push({
          nis: siswa.nis,
          nama: siswa.nama,
          kelas: infoMapel.kelas,
          mapel: infoMapel.mapel,
          semester: semester,
          nilai_harian: nilaiHarian,
          nilai_tengah_semester: nilaiTengahSemester,
          nilai_semester: nilaiSemester,
          rata_rata: rataRata, // Simpan nilai rata-rata
        });
      }
    });

    // Simpan atau perbarui data nilai siswa berdasarkan NIS, Kelas, Mapel, dan Semester
    const existingDataNilaiSiswa = JSON.parse(localStorage.getItem('dataNilaiSiswa')) || [];
    dataNilai.forEach(nilaiBaru => {
      const index = existingDataNilaiSiswa.findIndex(nilaiLama =>
        nilaiLama.nis === nilaiBaru.nis &&
        nilaiLama.kelas === nilaiBaru.kelas &&
        nilaiLama.mapel === nilaiBaru.mapel &&
        nilaiLama.semester === nilaiBaru.semester
      );

      if (index !== -1) {
        existingDataNilaiSiswa[index] = nilaiBaru; // Perbarui jika sudah ada
      } else {
        existingDataNilaiSiswa.push(nilaiBaru); // Tambah jika belum ada
      }
    });

    localStorage.setItem('dataNilaiSiswa', JSON.stringify(existingDataNilaiSiswa));

    console.log('KelolaNilai - Data nilai berhasil disimpan/diperbarui:', dataNilai);
    alert('Data nilai berhasil disimpan/diperbarui dan akan tersedia di Kelola Nilai Akhir.');
  },
};

export default KelolaNilai;