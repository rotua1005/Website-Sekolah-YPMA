import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parsaer';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });

    this._renderNavbar();
  }

  _renderNavbar() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const nav = document.getElementById('navigationDrawer');
    if (isLoggedIn) {
      nav.innerHTML = `
        <ul>
          <li><a href="#/beranda">Beranda</a></li>
          <li><a href="#/artikel">Sejarah</a></li>
          <li><a href="#/pesan_tiket">Pesan Tiket</a></li>
          <li><a href="#/tentang">Tentang Kita</a></li>
          <li><a href="#/profile">Profile</a></li>
        </ul>
      `;
    } else {
      nav.innerHTML = `
        <ul>
          <li><a href="#/beranda">Beranda</a></li>
          <li><a href="#/artikel">Sejarah</a></li>
          <li><a href="#/pesan_tiket">Pesan Tiket</a></li>
          <li><a href="#/tentang">Tentang Kita</a></li>
          <li><a href="#/login">Login</a></li>
        </ul>
      `;
    }
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const header = document.getElementById('appBar');
    const footer = document.getElementById('appFooter');

    // Ensure header and footer elements are present before accessing classList
    if (header && footer) {
      if (url === '/login' || url === '/register') {
        header.classList.add('hidden');
        footer.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
        footer.classList.remove('hidden');
      }
    }

    this._renderNavbar();
  }
}

export default App;
