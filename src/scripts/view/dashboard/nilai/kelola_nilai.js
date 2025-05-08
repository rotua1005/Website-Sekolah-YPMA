import MenuDashboard from '../../menu/menu_dashboard';

const KelolaNilai = {
  async render() {
    return /*html*/ `
      <div class="dashboard-container bg-gray-100 min-h-screen flex">
        ${await MenuDashboard.render()}
        <div class="dashboard-main flex-1 p-8">
          <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
          </header>

          <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
            <h1 class="text-center text-4xl font-bold mb-6">Kelola Nilai</h1>

            <div class="shadow-xl rounded-lg p-6 overflow-x-auto mb-6">
              <h2 class="text-xl font-semibold mb-4">Detail Informasi Mata Pelajaran</h2>
              <div id="detailNilai" class="mb-4"></div>
            </div>

            <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
              <h2 class="text-xl font-semibold mb-4">Input Nilai Siswa</h2>
              <table class="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 px-4 py-2">No</th>
                    <th class="border border-gray-300 px-4 py-2">NISN</th>
                    <th class="border border-gray-300 px-4 py-2">Nama</th>
                    <th class="border border-gray-300 px-4 py-2">Nilai Harian</th>
                    <th class="border border-gray-300 px-4 py-2">Tengah Semester</th>
                    <th class="border border-gray-300 px-4 py-2">Semester</th>
                    <th class="border border-gray-300 px-4 py-2">Rata-rata</th>
                  </tr>
                </thead>
                <tbody id="inputNilaiSiswa">
                  ${this.renderInputNilaiRows()}
                </tbody>
              </table>
              <div class="text-right mt-4">
                <button id="editSemuaButton" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">Edit Semua</button>
                <button id="simpanSemuaButton" class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition hidden">Simpan Semua</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    await MenuDashboard.afterRender();
    await this.loadDetailNilaiInfo();
    this.setupInputEventListeners();
    this.setupEditSemuaButton();
    this.setupSimpanSemuaButton();
    this.loadNilaiFromLocalStorage();
  },

  renderInputNilaiRows() {
    const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
    const guruData = JSON.parse(localStorage.getItem('guruUntukKelola')) || {};
    const siswaFiltered = dataSiswa.filter(siswa => siswa.kelas === guruData.kelas);

    return siswaFiltered
      .map(
        (siswa, index) => /*html*/ `
          <tr>
            <td class="border border-gray-300 px-4 py-2">${index + 1}</td>
            <td class="border border-gray-300 px-4 py-2">${siswa.nisn}</td>
            <td class="border border-gray-300 px-4 py-2">${siswa.nama}</td>
            <td class="border border-gray-300 px-4 py-2"><input type="number" class="w-full border rounded px-2 py-1 nilai-harian" value="" placeholder="Nilai Harian"></td>
            <td class="border border-gray-300 px-4 py-2"><input type="number" class="w-full border rounded px-2 py-1 nilai-tengah-semester" value="" placeholder="Tengah Semester"></td>
            <td class="border border-gray-300 px-4 py-2"><input type="number" class="w-full border rounded px-2 py-1 nilai-semester" value="" placeholder="Semester"></td>
            <td class="border border-gray-300 px-4 py-2 rata-rata">-</td>
          </tr>
        `
      )
      .join('');
  },

  setupInputEventListeners() {
    document.addEventListener('input', (event) => {
      if (
        event.target.classList.contains('nilai-harian') ||
        event.target.classList.contains('nilai-tengah-semester') ||
        event.target.classList.contains('nilai-semester')
      ) {
        const row = event.target.closest('tr');
        this.updateRataRata(row);
      }
    });
  },

  setupEditSemuaButton() {
    const editSemuaButton = document.getElementById('editSemuaButton');
    const simpanSemuaButton = document.getElementById('simpanSemuaButton');
    const inputNilaiSiswa = document.getElementById('inputNilaiSiswa');

    editSemuaButton.addEventListener('click', () => {
      const inputFields = inputNilaiSiswa.querySelectorAll('input[type="number"]');
      inputFields.forEach(input => {
        input.disabled = false;
      });
      editSemuaButton.classList.add('hidden');
      simpanSemuaButton.classList.remove('hidden');
    });
  },

  setupSimpanSemuaButton() {
    const simpanSemuaButton = document.getElementById('simpanSemuaButton');
    if (simpanSemuaButton) {
      simpanSemuaButton.addEventListener('click', () => {
        this.saveNilaiToLocalStorage();
        alert('Semua nilai siswa berhasil disimpan!');
        const inputFields = document.querySelectorAll('#inputNilaiSiswa input[type="number"]');
        inputFields.forEach(input => {
          input.disabled = true;
        });
        simpanSemuaButton.classList.add('hidden');
        const editSemuaButton = document.getElementById('editSemuaButton');
        if (editSemuaButton) {
          editSemuaButton.classList.remove('hidden');
        }
      });
    }
  },

  updateRataRata(row) {
    const nilaiHarian = parseFloat(row.querySelector('.nilai-harian').value) || 0;
    const nilaiTengah = parseFloat(row.querySelector('.nilai-tengah-semester').value) || 0;
    const nilaiSemester = parseFloat(row.querySelector('.nilai-semester').value) || 0;
    const rataRata = ((nilaiHarian + nilaiTengah + nilaiSemester * 2) / 4).toFixed(2);
    row.querySelector('.rata-rata').textContent = rataRata;
  },

  saveNilaiToLocalStorage() {
    const rows = document.querySelectorAll('#inputNilaiSiswa tr');
    const nilaiData = [];

    rows.forEach((row) => {
      const nisn = row.children[1].textContent;
      const nama = row.children[2].textContent;
      const nilaiHarian = parseFloat(row.querySelector('.nilai-harian').value);
      const nilaiTengahSemester = parseFloat(row.querySelector('.nilai-tengah-semester').value);
      const nilaiSemester = parseFloat(row.querySelector('.nilai-semester').value);
      const rataRata = parseFloat(row.querySelector('.rata-rata').textContent);

      if (!isNaN(nilaiHarian) || !isNaN(nilaiTengahSemester) || !isNaN(nilaiSemester)) {
        nilaiData.push({ nisn, nama, nilaiHarian, nilaiTengahSemester, nilaiSemester, rataRata });
      }
    });

    const guruData = JSON.parse(localStorage.getItem('guruUntukKelola'));
    const key = `nilaiSiswa_${guruData.kelas}_${guruData.mapel}`;
    localStorage.setItem(key, JSON.stringify(nilaiData));
  },

  loadNilaiFromLocalStorage() {
    const guruData = JSON.parse(localStorage.getItem('guruUntukKelola'));
    const key = `nilaiSiswa_${guruData.kelas}_${guruData.mapel}`;
    const nilaiData = JSON.parse(localStorage.getItem(key)) || [];
    const tbody = document.getElementById('inputNilaiSiswa');
    const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
    const siswaFiltered = dataSiswa.filter(siswa => siswa.kelas === guruData.kelas);

    if (tbody.children.length !== siswaFiltered.length) {
      tbody.innerHTML = this.renderInputNilaiRows();
      this.setupInputEventListeners();
    }

    nilaiData.forEach((data, index) => {
      const row = tbody.children[index];
      if (!row) return;

      row.querySelector('.nilai-harian').value = data.nilaiHarian ?? '';
      row.querySelector('.nilai-tengah-semester').value = data.nilaiTengahSemester ?? '';
      row.querySelector('.nilai-semester').value = data.nilaiSemester ?? '';
      row.querySelector('.rata-rata').textContent = data.rataRata ?? '-';
    });

    const inputFields = document.querySelectorAll('#inputNilaiSiswa input[type="number"]');
    inputFields.forEach(input => {
      input.disabled = true;
    });
  },

  async loadDetailNilaiInfo() {
    const detailNilaiContainer = document.getElementById('detailNilai');
    const guruData = JSON.parse(localStorage.getItem('guruUntukKelola'));
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
        statusGuru: guruData.statusGuru || 'Guru Mapel',
      }));

      detailNilaiContainer.innerHTML = /*html*/ `
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
};

export default KelolaNilai;
