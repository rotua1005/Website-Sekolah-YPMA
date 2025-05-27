// pages/dashboard_walikelas.js
import MenuWaliKelas from '../menu/menu_walikelas'; 

const DashboardAkun_WaliKelas = {
    render() {
        const username = localStorage.getItem("username") || "Tidak Diketahui";
        const email = localStorage.getItem("email") || "Tidak Diketahui";
        const role = localStorage.getItem("userRole") || "Tidak Diketahui";
        const fotoProfil = localStorage.getItem("fotoProfil");

        // Ensure the role displayed is "Wali Kelas"
        const roleDisplay = "Wali Kelas";

        return `
            <div class="dashboard-container bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen flex font-sans animate-fade-in">
                ${MenuWaliKelas.render()}
                <div class="dashboard-main flex-1 p-8 animate-slide-up">
                    <header class="bg-white shadow-xl rounded-2xl p-6 flex justify-between items-center mb-8 transition-all duration-500">
                        <h2 class="text-3xl font-extrabold text-gray-800 hover:text-blue-700 transition duration-300 tracking-tight">Profil ${roleDisplay}</h2>
                        <button id="logoutBtn" class="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 active:scale-95 transform transition duration-300">
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
                                    <span id="displayUsername" class="text-xl font-semibold text-blue-900 ${username === 'Tidak Diketahui' ? 'italic text-gray-400' : ''}">${username}</span>
                                </div>

                                <div class="flex items-center gap-2">
                                    <div class="flex-1">
                                        <span class="block text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Email</span>
                                        <span id="displayEmail" class="text-xl font-semibold text-blue-900 ${email === 'Tidak Diketahui' ? 'italic text-gray-400' : ''}">${email}</span>
                                        <input type="email" id="editEmailInput" class="w-full border border-gray-300 p-2 rounded-lg text-lg hidden" value="${email}">
                                    </div>
                                    <button class="edit-field-btn p-2 rounded-full hover:bg-gray-200" data-field="email">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-600">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14.25v4.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18V7.5a2.25 2.25 0 0 1 2.25-2.25H12" />
                                        </svg>
                                    </button>
                                </div>

                                <div class="flex items-center gap-2">
                                    <div class="flex-1">
                                        <span class="block text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Password</span>
                                        <span id="displayPassword" class="text-xl font-semibold text-blue-900">********</span>
                                        <input type="password" id="editPasswordInput" class="w-full border border-gray-300 p-2 rounded-lg text-lg hidden" placeholder="Enter new password">
                                    </div>
                                    <button class="edit-field-btn p-2 rounded-full hover:bg-gray-200" data-field="password">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-600">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14.25v4.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18V7.5a2.25 2.25 0 0 1 2.25-2.25H12" />
                                        </svg>
                                    </button>
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
                /* Toast Notification Styles */
                .toast-notification {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #4CAF50;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                    z-index: 1000;
                    font-size: 1rem;
                }
                .toast-notification.show {
                    opacity: 1;
                }
            </style>
        `;
    },

    afterRender() {
        MenuWaliKelas.afterRender();

        const uploadFotoInput = document.getElementById('upload-foto-input');
        const profileImagePreview = document.getElementById('profile-image-preview');
        const defaultProfileIcon = document.getElementById('default-profile-icon');
        const logoutBtn = document.getElementById('logoutBtn');

        const displayEmail = document.getElementById('displayEmail');
        const editEmailInput = document.getElementById('editEmailInput');
        const displayPassword = document.getElementById('displayPassword');
        const editPasswordInput = document.getElementById('editPasswordInput');
        // Removed displayKelasMengajar and editKelasMengajarInput

        // Select only the relevant edit buttons (email and password)
        const editFieldButtons = document.querySelectorAll('.edit-field-btn[data-field="email"], .edit-field-btn[data-field="password"]');

        const savedFoto = localStorage.getItem("fotoProfil");
        if (savedFoto) {
            profileImagePreview.src = savedFoto;
            profileImagePreview.classList.remove('hidden');
            defaultProfileIcon.classList.add('hidden');
        }

        const showToast = (message) => {
            let toast = document.getElementById('toastNotification');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'toastNotification';
                toast.classList.add('toast-notification');
                document.body.appendChild(toast);
            }
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000); // Hide after 2 seconds
        };

        const previewImage = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const dataUrl = e.target.result;
                    profileImagePreview.src = dataUrl;
                    profileImagePreview.classList.remove('hidden');
                    defaultProfileIcon.classList.add('hidden');
                    localStorage.setItem("fotoProfil", dataUrl); // save photo to localStorage
                    showToast('Foto profil berhasil diperbarui!');
                };
                reader.readAsDataURL(file);
            }
        };

        if (uploadFotoInput) {
            uploadFotoInput.addEventListener('change', previewImage);
        }

        editFieldButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const field = button.dataset.field;
                let displayElement;
                let inputElement;
                let localStorageKey;

                if (field === 'email') {
                    displayElement = displayEmail;
                    inputElement = editEmailInput;
                    localStorageKey = "email";
                } else if (field === 'password') {
                    displayElement = displayPassword;
                    inputElement = editPasswordInput;
                    localStorageKey = "password";
                }
                // Removed 'kelasMengajar' case

                if (!displayElement || !inputElement) {
                    console.error("Invalid field or elements not found.");
                    return;
                }

                if (inputElement.classList.contains('hidden')) {
                    displayElement.classList.add('hidden');
                    inputElement.classList.remove('hidden');
                    inputElement.focus();
                    button.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-green-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    `;
                } else {
                    const newValue = inputElement.value;
                    const currentEmail = localStorage.getItem("email"); 

                    if (newValue.trim() === '') {
                        showToast(`Mohon masukkan ${field} baru.`);
                        return;
                    }

                    localStorage.setItem(localStorageKey, newValue);

                    const akunData = JSON.parse(localStorage.getItem('dataAkun')) || [];
                    const updatedAkunData = akunData.map(akun => {
                        if (akun.email === currentEmail) { // Use currentEmail to find the user
                            return { ...akun, [field]: newValue };
                        }
                        return akun;
                    });
                    localStorage.setItem('dataAkun', JSON.stringify(updatedAkunData));

                    if (field === 'password') {
                        displayElement.textContent = '********';
                    } else {
                        displayElement.textContent = newValue;
                    }
                    displayElement.classList.remove('hidden');
                    inputElement.classList.add('hidden');

                    button.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14.25v4.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18V7.5a2.25 2.25 0 0 1 2.25-2.25H12" />
                        </svg>
                    `;
                    showToast(`Perubahan ${field} berhasil disimpan!`);
                }
            });
        });

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userRole");
                localStorage.removeItem("username");
                localStorage.removeItem("email");
                localStorage.removeItem("fotoProfil");
                localStorage.removeItem("password");
                localStorage.removeItem("kelasMengajar"); // Still good to clear on logout if it was ever set
                window.location.href = "/#/";
            });
        }
    },
};

export default DashboardAkun_WaliKelas;