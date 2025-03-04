//routes.js
import Beranda from '../view/pages/beranda';
import Login from '../view/pages/login';
import Register from '../view/pages/register';
import Tentang from '../view/pages/tentang';
import Pesan_tiket from '../view/pages/pesan_tiket';
import Artikel from '../view/pages/artikel';
import Profile from '../view/pages/profile';
import BerandaKedua from '../view/pages/beranda2';
import Pembayaran from '../view/pages/pembayaran';


const routes = {
  '/': Beranda, // default page
  '/beranda': Beranda,
  '/berandakedua': BerandaKedua,
  '/login': Login,
  '/tentang': Tentang,
  '/register' : Register,
  '/pesan_tiket' : Pesan_tiket,
  '/artikel' : Artikel,
  '/profile' : Profile,
  '/pembayaran' : Pembayaran
};
 
export default routes;