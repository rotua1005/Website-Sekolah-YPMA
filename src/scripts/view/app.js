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

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    // Halaman yang menampilkan App Bar dan Footer
    const allowedPages = ['/', '/beranda', '/tentang', '/berita'];
    if (allowedPages.includes(url)) {
      this._appBar.style.visibility = 'visible';
      this._appBar.style.opacity = '1';
      this._appBar.style.height = 'auto';
      this._footer.style.visibility = 'visible';
      this._footer.style.opacity = '1';
      this._footer.style.height = 'auto';
    } else {
      this._appBar.style.visibility = 'hidden';
      this._appBar.style.opacity = '0';
      this._appBar.style.height = '0';
      this._footer.style.visibility = 'hidden';
      this._footer.style.opacity = '0';
      this._footer.style.height = '0';
    }

    if (page) {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    }
  }
}

export default App;
