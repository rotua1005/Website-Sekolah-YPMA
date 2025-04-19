import MenuDashboard from '../../menu/menu_dashboard';

const Dashboard_Akun = {
    render() {
        const username = localStorage.getItem("username") || "Tidak Diketahui";
        const email = localStorage.getItem("email") || "Tidak Diketahui";
        const role = localStorage.getItem("userRole") || "Tidak Diketahui";
        const fotoProfil = localStorage.getItem("fotoProfil");
        const roleDisplay = role === "admin" ? "Administrator" : "Kepala Sekolah";

        return `
            <div class="dashboard-container bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen flex font-sans animate-fade-in">
                ${MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8 animate-slide-up">
                    <header class="bg-white shadow-xl rounded-2xl p-6 flex justify-between items-center mb-8 transition-all duration-500">
                        <h2 class="text-3xl font-extrabold text-gray-800 hover:text-blue-700 transition duration-300 tracking-tight">Profil ${roleDisplay}</h2>
                        <button class="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 active:scale-95 transform transition duration-300">
                            Logout
                        </button>
                    </header>

                    <div class="bg-white rounded-2xl shadow-lg p-10 max-w-5xl mx-auto transition-all duration-500 hover:shadow-xl">
                        <h3 class="text-2xl font-bold mb-10 text-blue-800 tracking-wide border-b pb-3">📄 Profil Saya</h3>
                        
                        <div class="flex flex-col md:flex-row items-center md:items-start gap-10">
                            <div class="relative w-48 h-48 rounded-full overflow-hidden bg-gray-100 shadow-md group transition-all duration-500 ring-4 ring-blue-200">
                                <img id="profile-image-preview" src="${fotoProfil || ''}" alt="Foto Profil" 
                                     class="w-full h-full object-cover ${fotoProfil ? '' : 'hidden'} transition duration-500 rounded-full">
                                <svg id="default-profile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     class="w-20 h-20 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${fotoProfil ? 'hidden' : ''} transition duration-500">
                                    <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a.75.75 0 00.75.75h10.5a.75.75 0 00.75-.75V12a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5z" clip-rule="evenodd" />
                                    <path d="M12 4.5a3 3 0 100 6 3 3 0 000-6z" />
                                </svg>
                                <input type="file" id="upload-foto-input" class="absolute inset-0 opacity-0 cursor-pointer" accept="image/*">
                                <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-center py-2 text-sm transition-all group-hover:bg-opacity-60 font-medium tracking-wide">
                                    📷 Ganti Foto
                                </div>
                            </div>

                            <div class="flex-1 grid grid-cols-1 gap-6 text-gray-800 text-lg">
                                <div>
                                    <span class="block text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Username</span>
                                    <span class="text-xl font-semibold text-blue-900">${username}</span>
                                </div>
                                <div>
                                    <span class="block text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Email</span>
                                    <span class="text-xl font-semibold text-blue-900">${email}</span>
                                </div>
                                <div>
                                    <span class="block text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Role</span>
                                    <span class="text-xl font-semibold text-blue-900">${roleDisplay}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(40px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .animate-fade-in {
                    animation: fadeIn 0.6s ease-out;
                }

                .animate-slide-up {
                    animation: slideUp 0.6s ease-out;
                }
            </style>
        `;
    },

    afterRender() {
        MenuDashboard.afterRender();

        const uploadFotoInput = document.getElementById('upload-foto-input');
        const profileImagePreview = document.getElementById('profile-image-preview');
        const defaultProfileIcon = document.getElementById('default-profile-icon');

        const previewImage = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const dataUrl = e.target.result;
                    profileImagePreview.src = dataUrl;
                    profileImagePreview.classList.remove('hidden');
                    defaultProfileIcon.classList.add('hidden');
                    localStorage.setItem("fotoProfil", dataUrl); // simpan foto
                };
                reader.readAsDataURL(file);
            }
        };

        if (uploadFotoInput) {
            uploadFotoInput.addEventListener('change', previewImage);
        }
    },
};

export default Dashboard_Akun;
