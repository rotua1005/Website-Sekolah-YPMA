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
import RekapNilai2 from '../view/dashboard/nilai/rekap_nilai2';
import MenuKepsek from '../../kepalaSekolah/menu/menu_kepsek';
import DashboardKepsek from '../../kepalaSekolah/dashboard/dashboard_kepsek';
import DataKepsekGuru from '../../kepalaSekolah/biodata/data_guru';
import DataKepsekSiswa from '../../kepalaSekolah/biodata/data_siswa';
import DataWaliKelasKepsek from '../../kepalaSekolah/biodata/data_walikelas';
import TahunAkademikKepsek from '../../kepalaSekolah/akademik/tahun_akademik';
import DataKelasKepsek from '../../kepalaSekolah/akademik/data_kelas';
import DataMataPelajaranKepsek from '../../kepalaSekolah/akademik/data_mapel';
import Absensi1Kepsek from '../../kepalaSekolah/absensi/absensi1';
import KelolaAbsensiKepsek from '../../kepalaSekolah/absensi/kelola_absensi';
import KehadiranKepsek from '../../kepalaSekolah/absensi/kehadiran';
import RekapAbsensiKepsek from '../../kepalaSekolah/absensi/rekap_absensi';
import Rekap2AbsensiKepsek from '../../kepalaSekolah/absensi/rekap2_absensi';
import NilaiAkhirKepsek from '../../kepalaSekolah/nilai/nilai_akhir';
import KelolaNilaiAkhirKepsek from '../../kepalaSekolah/nilai/kelola_nilaiakhir';
import RekapNilaiKepsek from '../../kepalaSekolah/nilai/rekap_nilai';
import RekapNilai2Kepsek from '../../kepalaSekolah/nilai/rekap_nilai2';
import Dashboard_BeritaKepsek from '../../kepalaSekolah/upload data/dashboard_berita';
import Dashboard_EkstraKurikulerKepsek from '../../kepalaSekolah/upload data/dashboard_kurikuler';
import Dashboard_PrestasiKepsek from '../../kepalaSekolah/upload data/dashboard_prestasi';
import Dashboard_ProfileKepsek from '../../kepalaSekolah/upload data/dashboard_profile';
import Dashboard_AkunKepsek from '../../kepalaSekolah/profile/akun';
import DetailEkstrakurikuler from '../view/pages/detail/ekstrakurikuler';
import FeedbackKepsek from '../../kepalaSekolah/feedback/feedback';
import DetailBerita from '../view/pages/detail/berita';
import VisiMisi from '../view/pages/visiMisi';
import Fasilitas from '../view/pages/fasilitas';
import ProfileGuru from '../view/pages/profileGuru';
import Prestasi from '../view/pages/prestasi';
import DetailPrestasi from '../view/pages/detail/prestasi';
import Galery from '../view/pages/galery';
import DataAkun from '../view/dashboard/biodata/data_akun';
import MenuWaliKelas from '../../waliKelas/menu/menu_walikelas';
import DashboardWaliKelas from '../../waliKelas/dashboard/dashboard_walikelas';
import DataSiswaWaliKelas from '../../waliKelas/biodata/dataSiswa';
import KelolaAbsensiWaliKelas from '../../waliKelas/absensi/kelolaAbsensi';
import KehadiranWaliKelas from '../../waliKelas/absensi/kehadiran';
import RekapAbsensiWaliKelas from '../../waliKelas/absensi/rekapAbensi';
import DashboardAkun_WaliKelas from '../../waliKelas/profil/akun';
import InputAbsensiWaliKelas from '../../waliKelas/absensi/inputAbsensi';


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
  '/data_kelas':DataKelas,
  '/data_mapel':DataMataPelajaran,
  '/data_sekolah':DataSekolah,
  '/data_akun' : DataAkun,
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
  '/rekap2_nilai': RekapNilai2,
  '/detail_berita/:id': DetailBerita,
  '/detail_prestasi/:id': DetailPrestasi,
  '/detail_ekstrakurikuler/:id': DetailEkstrakurikuler,
  '/visimisi': VisiMisi,
  '/fasilitas' : Fasilitas,
  '/profilguru' : ProfileGuru,
  '/prestasi':Prestasi,
  '/galery': Galery, 


  // Kepala Sekolah
  '/menu_kepsek' : MenuKepsek,
  '/dashboard_kepsek' : DashboardKepsek,
  '/data_guru_kepsek' : DataKepsekGuru,
  '/data_siswa_kepsek' : DataKepsekSiswa,
  '/data_walikelas_kepsek' : DataWaliKelasKepsek,

  '/tahun_akademik_kepsek' : TahunAkademikKepsek,
  '/data_kelas_kepsek' : DataKelasKepsek,
  '/data_mapel_kepsek' : DataMataPelajaranKepsek,

  '/absensi1_kepsek' : Absensi1Kepsek, 
  '/kelola_absensi_kepsek': KelolaAbsensiKepsek,
  '/kehadiran_kepsek' : KehadiranKepsek,
  '/rekap_absensi_kepsek' : RekapAbsensiKepsek,
  '/rekap2_absensi_kepsek' : Rekap2AbsensiKepsek,

  '/nilai_akhir_kepsek' : NilaiAkhirKepsek,
  '/kelola_nilaiakhir_kepsek' : KelolaNilaiAkhirKepsek,
  '/rekap_nilai_kepsek' : RekapNilaiKepsek,
  '/rekap2_nilai_kepsek' : RekapNilai2Kepsek,

  '/dashboard_berita_kepsek' : Dashboard_BeritaKepsek,
  '/dashboard_kurikuler_kepsek' : Dashboard_EkstraKurikulerKepsek,
  '/dashboard_prestasi_kepsek' : Dashboard_PrestasiKepsek,
  '/dashboard_profile_kepsek' : Dashboard_ProfileKepsek,
  '/dashboard_akun_kepsek' : Dashboard_AkunKepsek,

  '/feedback_kepsek' : FeedbackKepsek,


     // New: Wali Kelas routes
     '/menu_walikelas': MenuWaliKelas,
     '/dashboard_walikelas': DashboardWaliKelas,
     '/data_siswa_walikelas': DataSiswaWaliKelas,
     '/absensi_walikelas': InputAbsensiWaliKelas,
     '/kelola_absensi_walikelas': KelolaAbsensiWaliKelas,
     '/kehadiran_walikelas': KehadiranWaliKelas,
     '/rekap_absensi_walikelas': RekapAbsensiWaliKelas,
     '/dashboard_akun_walikelas': DashboardAkun_WaliKelas, 
     

};


export default routes;
