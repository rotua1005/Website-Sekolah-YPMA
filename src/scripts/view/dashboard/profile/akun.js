import MenuDashboard from '../../menu/menu_dashboard';

const Dashboard_Akun = {
    render() {
        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>
                    <div class="flex-1 p-6">
                        <div class="w-full bg-white shadow-md rounded-md p-6">
                            <div class="text-3xl font-semibold mb-8 text-left">Profil Saya</div>
                            <div id="alert-container" class="mb-4 hidden">
                                <div class="bg-green-200 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                    <strong class="font-bold">Berhasil!</strong>
                                    <span class="block sm:inline">Data profil berhasil diperbarui.</span>
                                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                                        <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6 text-green-500" onclick="this.parentNode.parentNode.classList.add('hidden')">
                                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div class="flex flex-col md:flex-row gap-8">
                                <div class="w-full md:w-1/3 p-6 border rounded-md">
                                    <div class="flex justify-center mb-6">
                                        <div class="relative w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                            <img id="profile-image-preview" src="" alt="Foto Profil" class="w-full h-full object-cover hidden">
                                            <svg id="default-profile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-20 h-20 text-gray-500">
                                                <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a.75.75 0 00.75.75h10.5a.75.75 0 00.75-.75V12a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zM11.25 14.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V14.25z" clip-rule="evenodd" />
                                                <path d="M12 4.5a3 3 0 100 6 3 3 0 000-6z" />
                                            </svg>
                                            <input type="file" id="upload-foto-input" class="absolute inset-0 opacity-0 cursor-pointer" accept="image/*">
                                            <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 cursor-pointer" id="edit-foto-button">
                                                Edit Foto
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center mb-6">
                                        <div class="font-semibold text-xl">Nama Admin, S.T</div>
                                        <div class="text-gray-700 text-lg">Admin</div>
                                    </div>
                                    <div>
                                        <div class="mb-4">
                                            <div class="text-gray-700 font-semibold text-lg">Username</div>
                                            <div class="text-gray-800 text-lg">admin</div>
                                        </div>
                                        <div class="mb-4">
                                            <div class="text-gray-700 font-semibold text-lg">Email</div>
                                            <div class="text-gray-800 text-lg">elfinadmin@gmail.com</div>
                                        </div>
                                        <div class="mb-4">
                                            <div class="text-gray-700 font-semibold text-lg">Role</div>
                                            <div class="text-gray-800 text-lg">Administrator</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full md:w-2/3 p-6 border rounded-md">
                                    <div class="flex justify-start border-b mb-6">
                                        <button class="px-6 py-3 text-blue-600 border-b-2 border-blue-600 font-semibold text-lg focus:outline-none" id="edit-profil-button">Edit Profil</button>
                                        <button class="px-6 py-3 text-gray-700 text-lg focus:outline-none" id="edit-akun-button">Edit Akun</button>
                                    </div>
                                    <div>
                                        <div class="mb-6">
                                            <label for="nama" class="block text-gray-700 text-lg font-bold mb-2">Nama</label>
                                            <input type="text" id="nama" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg" value="Nama Admin">
                                        </div>
                                        <div class="mb-6">
                                            <label for="gelar" class="block text-gray-700 text-lg font-bold mb-2">Gelar</label>
                                            <input type="text" id="gelar" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg" value="S.T">
                                        </div>
                                        <div class="mb-6">
                                            <label for="jenis-kelamin" class="block text-gray-700 text-lg font-bold mb-2">Jenis Kelamin</label>
                                            <select id="jenis-kelamin" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg">
                                                <option value="Laki-laki" selected>Laki-laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                        <div class="mb-6">
                                            <label for="nip" class="block text-gray-700 text-lg font-bold mb-2">NIP</label>
                                            <input type="text" id="nip" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg" value="431203674356980765">
                                        </div>
                                        <div class="mb-6">
                                            <label for="nuptk" class="block text-gray-700 text-lg font-bold mb-2">NUPTK</label>
                                            <input type="text" id="nuptk" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg" value="9621476053629418">
                                        </div>
                                        <div class="mb-6">
                                            <label for="tempat-lahir" class="block text-gray-700 text-lg font-bold mb-2">Tempat Lahir</label>
                                            <input type="text" id="tempat-lahir" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg" value="Banjar">
                                        </div>
                                        <div class="mb-6">
                                            <label for="tanggal-lahir" class="block text-gray-700 text-lg font-bold mb-2">Tanggal Lahir</label>
                                            <input type="text" id="tanggal-lahir" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg" value="01/09/199 8" placeholder="DD/MM/YYYY">
                                        </div>
                                        <div class="mb-6">
                                            <label for="telepon" class="block text-gray-700 text-lg font-bold mb-2">Telepon</label>
                                            <input type="text" id="telepon" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg" value="082480143489">
                                        </div>
                                        <div class="mb-6">
                                            <label for="alamat" class="block text-gray-700 text-lg font-bold mb-2">Alamat</label>
                                            <textarea id="alamat" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg" rows="5">Lokbok, Ciamis</textarea>
                                        </div>
                                        <div class="flex items-center mb-6">
                                            <input type="checkbox" id="yakin" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                                            <label for="yakin" class="ml-3 text-lg font-medium text-gray-900">Saya yakin akan mengubah data tersebut</label>
                                        </div>
                                        <button id="simpan-profil" class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-lg" type="button">
                                            Simpan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender() {
        MenuDashboard.afterRender();
        const simpanProfilButton = document.getElementById('simpan-profil');
        const alertContainer = document.getElementById('alert-container');
        const uploadFotoInput = document.getElementById('upload-foto-input');
        const profileImagePreview = document.getElementById('profile-image-preview');
        const defaultProfileIcon = document.getElementById('default-profile-icon');
        const editFotoButton = document.getElementById('edit-foto-button');
        const editAkunButton = document.getElementById('edit-akun-button');

        if (simpanProfilButton) {
            simpanProfilButton.addEventListener('click', () => {
                // Add logic to save profile data here
                alertContainer.classList.remove('hidden');
                setTimeout(() => {
                    alertContainer.classList.add('hidden');
                }, 5000);
            });
        }

        // Fungsi untuk menampilkan pratinjau gambar yang diunggah
        const previewImage = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImagePreview.src = e.target.result;
                    profileImagePreview.classList.remove('hidden');
                    defaultProfileIcon.classList.add('hidden');
                }
                reader.readAsDataURL(file);
            } else {
                profileImagePreview.src = '';
                profileImagePreview.classList.add('hidden');
                defaultProfileIcon.classList.remove('hidden');
            }
        };

        // Event listener untuk input file upload foto
        if (uploadFotoInput) {
            uploadFotoInput.addEventListener('change', previewImage);
        }

        // Event listener untuk tombol "Edit Foto" (memicu input file)
        if (editFotoButton) {
            editFotoButton.addEventListener('click', () => {
                uploadFotoInput.click();
            });
        }

        if (editAkunButton) {
            editAkunButton.addEventListener('click', () => {
                alert('Fitur Edit Akun belum diimplementasikan.');
            });
        }
    },
};

export default Dashboard_Akun;