//app.js
import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
    constructor({ button, drawer, content, appBar, footer, topBar }) { // Tambahkan topBar ke parameter
        this._button = button;
        this._drawer = drawer;
        this._content = content;
        this._appBar = appBar;
        this._footer = footer;
        this._topBar = topBar; // Simpan elemen topBar
        this._scrollToTopButton = document.createElement('button');
        this._scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        this._scrollToTopButton.classList.add('scroll-to-top');
        document.body.appendChild(this._scrollToTopButton);
        this._scrollToTopButton.addEventListener('click', this._scrollToTop);
        window.addEventListener('scroll', this._toggleScrollToTopButton.bind(this)); // Bind 'this'

        this._initialAppShell();
    }

    _initialAppShell() {
        DrawerInitiator.init({
            button: this._button,
            drawer: this._drawer,
        });
    }

    _toggleVisibility(element, isVisible) {
        element.style.display = isVisible ? 'flex' : 'none';
    }

    _scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    _toggleScrollToTopButton() {
        if (this._scrollToTopButton) { // Check if the button exists
            if (window.scrollY > 200) {
                this._scrollToTopButton.classList.add('show');
            } else {
                this._scrollToTopButton.classList.remove('show');
            }
        }
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner();
        const page = routes[url];

        // Halaman yang menampilkan App Bar, Top Bar & Footer
        const allowedPages = ['/', '/beranda', '/tentang', '/berita', '/ekstrakurikuler', '/feedbackpage'];
        const dashboardPages = [
            '/dashboard', '/dashboard_berita', '/dashboard_kurikuler',
            '/dashboard_prestasi', '/dashboard_profile', '/dashboard_kelas',
            '/dashboard_mapel', '/dashboard_settings', '/data_siswa','/data_walikelas','/menu_dashboard','/data_guru',
            '/data_admin','/data_kelas','/data_sekolah','/data_mapel','/tahun_akademik','/absensi1','/kelola_absensi','/input_nilai','/kelola_nilai','/input_absensi','/kehadiran',
            '/rekap_absensi','/dashboard_akun','/login','/nilai_guru','/nilai_akhir','/kelola_nilaiakhir','/feedback','/rekap_nilai','/upload_berita','/upload_eskul','/upload_prestasi',
            '/rekap_nilai2'
        ];

        // Tampilkan Top Bar hanya di halaman umum (non-dashboard)
        this._toggleVisibility(this._topBar, allowedPages.includes(url) && !dashboardPages.includes(url));

        // Tampilkan App Bar & Footer hanya di halaman umum (non-dashboard)
        this._toggleVisibility(this._appBar, allowedPages.includes(url) && !dashboardPages.includes(url));
        this._toggleVisibility(this._footer, allowedPages.includes(url) && !dashboardPages.includes(url));

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