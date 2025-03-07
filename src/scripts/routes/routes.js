//routes.js
import Dashboard from '../view/dashboard/dashboard';
import Dashboard_Berita from '../view/dashboard/upload data/dashboard_berita';
import Dashboard_Prestasi from '../view/dashboard/upload data/dashboard_prestasi';
import Dashboard_EkstraKurikuler from '../view/dashboard/upload data/dashboard_kurikuler';
import Dashboard_Profile from '../view/dashboard/upload data/dashboard_profile';
import Beranda from '../view/pages/beranda';
import Berita from '../view/pages/berita';
import Ekstrakulikuler from '../view/pages/ekstrakurikuler';
import Login from '../view/pages/login';
import Tentang from '../view/pages/tentang';

const routes = {
  '/': Beranda, // Halaman default
  '/beranda': Beranda,
  '/tentang': Tentang,
  '/berita': Berita,
  '/ekstrakurikuler': Ekstrakulikuler,
  '/login': Login,
  '/dashboard': Dashboard,
  '/dashboard_berita': Dashboard_Berita,
  '/dashboard_prestasi': Dashboard_Prestasi,
  '/dashboard_kurikuler': Dashboard_EkstraKurikuler,
  '/dashboard_profile': Dashboard_Profile,
};


export default routes;
