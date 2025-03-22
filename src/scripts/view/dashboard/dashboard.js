import MenuDashboard from '.././menu/menu_dashboard';

const Dashboard = {
    async render() {
        return `
        <div class="dashboard-container bg-gray-100 min-h-screen flex">
            ${MenuDashboard.render()}
            <div class="dashboard-main flex-1 p-8">
                <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                    <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                </header>

                <main class="bg-white shadow-lg rounded-lg p-6">
                    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Selamat Datang di Dashboard Admin</h1>
                    <p class="text-gray-700 text-center">Silakan pilih menu di sidebar untuk melanjutkan.</p>
                </main>
            </div>
        </div>
        `;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        // Add event listener for the logout button
        document.querySelector('.bg-red-500').addEventListener('click', () => {
            window.location.hash = '/'; // Redirect to home page
        });
    }
};

export default Dashboard;