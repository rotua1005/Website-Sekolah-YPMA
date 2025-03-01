//routes.js
import Dashboard from '../view/dashboard/dashboard';
import Beranda from '../view/pages/beranda';
import Berita from '../view/pages/berita';
import Login from '../view/pages/login';
import Tentang from '../view/pages/tentang';

const routes = {
  '/': Beranda, // Halaman default
  '/beranda': Beranda,
  '/tentang': Tentang,
  '/berita': Berita,
  '/login': Login,
  '/dashboard': Dashboard,
};

export default routes;
