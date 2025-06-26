import MenuDashboard from '../../menu/menu_dashboard';

const KelolaNilaiAkhir = {
  async render() {
    let mapelList = [];
    const kelasUntukNilaiAkhir = JSON.parse(localStorage.getItem('kelasUntukNilaiAkhir'));
    if (kelasUntukNilaiAkhir && kelasUntukNilaiAkhir.kelas && kelasUntukNilaiAkhir.tahunAkademik) {
      try {
        const res = await fetch(
          `http://localhost:5000/api/datamatapelajaran?kelas=${encodeURIComponent(kelasUntukNilaiAkhir.kelas)}&tahunAkademik=${encodeURIComponent(kelasUntukNilaiAkhir.tahunAkademik)}`
        );
        if (res.ok) {
          mapelList = await res.json();
        }
      } catch (e) {
        console.error("Error fetching mapel list for render:", e);
        mapelList = [];
      }
    }

    // Example: Fetch nilai values for a specific mapel and kelas
    // You can use this in afterRender or loadDataNilaiSiswa as needed
    // const nilaiResponse = await fetch('http://localhost:5000/api/nilai/values?mataPelajaran=IPS&kelas=1');
    // const nilaiData = await nilaiResponse.json();
    // console.log(nilaiData);

    // Build dynamic mapel columns
    const mapelHeaders = mapelList.length
      ? mapelList.map((m) => `<th class="py-4 px-6">${m.mapel}</th>`).join('')
      : '';

    return `
      <div class="dashboard-container bg-gray-100 min-h-screen flex">
        ${await MenuDashboard.render()}
        <div class="dashboard-main flex-1 p-8">
          <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
            <button id="logoutButton" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
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
                    ${mapelHeaders}
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
    await this.loadDetailNilaiInfo();
    await this.loadDataNilaiSiswa();

    // Example: Fetch nilai values for IPS kelas 1
    // You can use this as needed in your logic
    // const nilaiRes = await fetch('http://localhost:5000/api/nilai/values?mataPelajaran=IPS&kelas=1');
    // const nilaiJson = await nilaiRes.json();
    // console.log(nilaiJson);

    // Logout button listener
    const logoutButton = document.querySelector('#logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userRole");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("justLoggedIn");
        localStorage.removeItem("fotoProfil");
        window.location.hash = '/';
      });
    }
  },

  async loadDetailNilaiInfo() {
    const detailNilaiContainer = document.getElementById('detailNilai');
    const kelasUntukNilaiAkhir = JSON.parse(localStorage.getItem('kelasUntukNilaiAkhir'));
    if (kelasUntukNilaiAkhir) {
      detailNilaiContainer.innerHTML = `
        <p><strong>Wali Kelas:</strong> ${kelasUntukNilaiAkhir.wali || '-'}</p>
        <p><strong>Kelas:</strong> ${kelasUntukNilaiAkhir.kelas || '-'}</p>
        <p><strong>Tahun Akademik:</strong> ${kelasUntukNilaiAkhir.tahunAkademik || '-'}</p>
      `;
    } else {
      detailNilaiContainer.innerHTML = '<p>Data kelas belum dipilih. Silakan pilih kelas dari Dashboard Utama.</p>';
    }
  },

  async loadDataNilaiSiswa() {
    const dataNilaiSiswaBody = document.getElementById('dataNilaiSiswa');
    const tableHead = document.querySelector('thead tr');
    const kelasUntukNilaiAkhir = JSON.parse(localStorage.getItem('kelasUntukNilaiAkhir'));

    if (!kelasUntukNilaiAkhir || !kelasUntukNilaiAkhir.kelas || !kelasUntukNilaiAkhir.tahunAkademik) {
      dataNilaiSiswaBody.innerHTML = '<tr><td colspan="3" class="py-4 px-6 text-center">Data kelas atau tahun akademik belum dipilih.</td></tr>';
      return;
    }

    const { kelas, tahunAkademik } = kelasUntukNilaiAkhir;

    // Fetch siswa for this class from API
    let siswaSatuKelas = [];
    try {
      const siswaRes = await fetch(`http://localhost:5000/api/datasiswa?kelas=${encodeURIComponent(kelas)}&tahunAkademik=${encodeURIComponent(tahunAkademik)}`);
      if (siswaRes.ok) {
        siswaSatuKelas = await siswaRes.json();
      }
    } catch (err) {
      console.error('Error fetching student data:', err);
      siswaSatuKelas = [];
    }

    // Fetch all mapel for this class & academic year
    let mapelList = [];
    try {
      const mapelRes = await fetch(
        `http://localhost:5000/api/datamatapelajaran?kelas=${encodeURIComponent(kelas)}&tahunAkademik=${encodeURIComponent(tahunAkademik)}`
      );
      if (mapelRes.ok) {
        mapelList = await mapelRes.json();
      }
    } catch (e) {
      console.error('Error fetching subject data:', e);
      mapelList = [];
    }

    // Fetch nilai values for each mapel for this kelas
    // This will be a map: { [mapel]: { nilaiValues: [...], ... } }
    const nilaiMapelData = {};
    for (const mapel of mapelList) {
      try {
        const nilaiRes = await fetch(
          `http://localhost:5000/api/nilai/values?mataPelajaran=${encodeURIComponent(mapel.mapel)}&kelas=${encodeURIComponent(kelas)}`
        );
        if (nilaiRes.ok) {
          const nilaiJson = await nilaiRes.json();
          if (nilaiJson.success) {
            nilaiMapelData[mapel.mapel] = nilaiJson.data;
          }
        }
      } catch (e) {
        console.error(`Error fetching nilai for mapel ${mapel.mapel}:`, e);
      }
    }

    // Build table header dynamically based on fetched mapelList
    let headerHTML = `
      <th class="py-4 px-6">#</th>
      <th class="py-4 px-6">NIS</th>
      <th class="py-4 px-6">Nama</th>
      ${mapelList.map(m => `<th class="py-4 px-6">${m.mapel}</th>`).join('')}
    `;
    tableHead.innerHTML = headerHTML;

    const baseColumns = 3;
    const totalColumns = baseColumns + mapelList.length;

    let tableRowsHTML = '';
    if (siswaSatuKelas.length === 0) {
      tableRowsHTML = `<tr><td colspan="${totalColumns}" class="py-4 px-6 text-center">Tidak ada data siswa ditemukan untuk kelas ini.</td></tr>`;
    } else {
      siswaSatuKelas.forEach((siswa, index) => {
        tableRowsHTML += `
          <tr class="border-t">
            <td class="py-4 px-6">${index + 1}</td>
            <td class="py-4 px-6">${siswa.nisn || '-'}</td>
            <td class="py-4 px-6">${siswa.nama || '-'}</td>
            ${mapelList
              .map(m => {
                // Find nilai for this siswa and mapel
                const nilaiData = nilaiMapelData[m.mapel];
                let nilai = '-';
                if (nilaiData && Array.isArray(nilaiData.nilaiValues)) {
                  // Try to find by NIS, fallback to index order
                  const idx = siswaSatuKelas.findIndex(s => s.nisn === siswa.nisn);
                  if (idx !== -1 && nilaiData.nilaiValues[idx] !== undefined) {
                    nilai = nilaiData.nilaiValues[idx];
                  }
                }
                return `<td class="py-4 px-6">${nilai !== undefined ? nilai : '-'}</td>`;
              })
              .join('')}
          </tr>
        `;
      });
    }
    dataNilaiSiswaBody.innerHTML = tableRowsHTML;
  },
};

export default KelolaNilaiAkhir;
