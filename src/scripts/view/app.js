//app.js
import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content, appBar, footer }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._appBar = appBar;
    this._footer = footer;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
    });
  }

  /**
   * Fungsi untuk menampilkan atau menyembunyikan elemen
   * @param {HTMLElement} element - Elemen yang akan diubah
   * @param {boolean} isVisible - True jika ingin ditampilkan, False jika disembunyikan
   */
  _toggleVisibility(element, isVisible) {
    element.style.display = isVisible ? 'flex' : 'none';
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    // Halaman yang menampilkan App Bar & Footer
    const allowedPages = ['/', '/beranda', '/tentang', '/berita', '/ekstrakurikuler', '/login'];
    const dashboardPages = [
      '/dashboard', '/dashboard_berita', '/dashboard_kurikuler',
      '/dashboard_prestasi', '/dashboard_profile', '/dashboard_kelas',
      '/dashboard_mapel', '/dashboard_settings', '/data_siswa', '/data_akun','/data_walikelas','/menu_dashboard','/data_guru',
      '/data_admin','/data_kelas','/data_sekolah'

    ];

    // Tampilkan App Bar & Footer hanya di halaman umum
    this._toggleVisibility(this._appBar, allowedPages.includes(url));
    this._toggleVisibility(this._footer, allowedPages.includes(url));

    // Konfigurasi tampilan khusus Dashboard
    if (dashboardPages.includes(url)) {
      this._content.style.display = 'flex';
      this._content.style.flexDirection = 'column';
      this._content.style.minHeight = '100vh'; // Fullscreen
      this._content.style.justifyContent = 'flex-start'; // Agar konten langsung ke atas
      this._content.style.padding = '0';
      this._content.style.margin = '0'; // Hapus margin atas
      this._content.style.overflow = 'auto';
    } else {
      this._content.style.display = '';
      this._content.style.flexDirection = '';
      this._content.style.minHeight = '';
      this._content.style.justifyContent = '';
      this._content.style.padding = '';
      this._content.style.margin = ''; // Reset margin jika bukan dashboard
      this._content.style.overflow = '';
    }

    // Render halaman
    if (page) {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    }
  }
}

export default App;
