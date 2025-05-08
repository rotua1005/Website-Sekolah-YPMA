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
import Nav_Dashboard from '../view/dashboard/upload data/nav_dashboard';
import DetailUpload from '../view/dashboard/upload data/detail_upload';
import DataSiswa from '../view/dashboard/biodata/data_siswa';
import MenuDashboard from '../view/menu/menu_dashboard';
import DataWaliKelas from '../view/dashboard/biodata/data_walikelas';
import DataGuru from '../view/dashboard/biodata/data_guru';
import DataAdmin from '../view/dashboard/biodata/data_admin';
import DataKelas from '../view/dashboard/akademik/data_kelas';
import DataMataPelajaran from '../view/dashboard/akademik/data_mapel';
import TahunAkademik from '../view/dashboard/akademik/tahun_akademik';
import DataSekolah from '../view/dashboard/akademik/data_sekolah';
import Absensi1 from '../view/dashboard/absensi/absensi1';
import InputNilai from '../view/dashboard/nilai/input_nilai';
import KelolaNilai from '../view/dashboard/nilai/kelola_nilai';
import KelolaAbsensi from '../view/dashboard/absensi/kelola_absensi';
import InputAbsensi from '../view/dashboard/absensi/input_absensi';
import Kehadiran from '../view/dashboard/absensi/kehadiran';
import RekapAbsensi from '../view/dashboard/absensi/rekap_absensi';
import Dashboard_Akun from '../view/dashboard/profile/akun';
import NilaiGuru from '../view/dashboard/nilai/nilai_guru';
import NilaiAkhir from '../view/dashboard/nilai/nilai_akhir';
import KelolaNilaiAkhir from '../view/dashboard/nilai/kelola_nilaiakhir';
import HasilInputNilai from '../view/dashboard/nilai/hasil_inputnilai';
import Rekap2Absensi from '../view/dashboard/absensi/rekap2_absensi';
import Feedback from '../view/dashboard/feedback/feedback';
import RekapNilai from '../view/dashboard/nilai/rekap_nilai';
import UploadBerita from '../view/dashboard/upload data/upload_berita';
import UploadEkstraKurikuler from '../view/dashboard/upload data/upload_eskul';
import UploadPrestasi from '../view/dashboard/upload data/upload_prestasi';
import Upload_Profile from '../view/dashboard/upload data/upload_profile';
import FeedbackPage from '../view/pages/page_feedback';


const routes = {
  '/': Beranda, // Halaman default
  '/beranda': Beranda,
  '/tentang': Tentang,
  '/berita': Berita,
  '/ekstrakurikuler': Ekstrakulikuler,
  '/login': Login,
  '/dashboard': Dashboard,
  './nav_dashboard':Nav_Dashboard,
  '/dashboard_berita': Dashboard_Berita,
  '/upload_berita': UploadBerita,
  '/dashboard_prestasi': Dashboard_Prestasi,
  '/dashboard_kurikuler': Dashboard_EkstraKurikuler,
  '/upload_eskul' :UploadEkstraKurikuler,
  '/dashboard_profile': Dashboard_Profile,
  '/upload_profile': Upload_Profile,
  '/upload_prestasi' : UploadPrestasi,
  '/detail_upload':DetailUpload,
  '/data_siswa':DataSiswa,
  '/data_walikelas':DataWaliKelas,
  '/menu_dashboard':MenuDashboard,
  '/data_guru':DataGuru,
  '/data_admin':DataAdmin,
  '/data_kelas':DataKelas,
  '/data_mapel':DataMataPelajaran,
  '/data_sekolah':DataSekolah,
  '/tahun_akademik':TahunAkademik,
  '/absensi1':Absensi1,
  '/input_nilai': InputNilai,
  '/nilai_guru' :NilaiGuru,
  '/kelola_nilai': KelolaNilai,
  '/nilai_akhir': NilaiAkhir,
  '/kelola_nilaiakhir': KelolaNilaiAkhir,
  '/hasil_inputnilai': HasilInputNilai,
  '/rekap_nilai': RekapNilai,
  '/kelola_absensi': KelolaAbsensi,
  '/input_absensi': InputAbsensi,
  '/kehadiran': Kehadiran,
  '/rekap_absensi': RekapAbsensi,
  '/rekap2_absensi': Rekap2Absensi,
  '/dashboard_akun': Dashboard_Akun,
  '/feedback': Feedback,
  '/feedbackpage' : FeedbackPage,

};


export default routes;
