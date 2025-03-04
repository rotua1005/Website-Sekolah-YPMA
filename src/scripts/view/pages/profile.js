import Swal from 'sweetalert2';

const Profile = {
  async render() {
    return `
      <div class="main-container">
        <img src="./walpaper.png" alt="Wallpaper Image" class="walpaper">
        <div class="container3">
          <div class="image-container slide-left">
            <img src="./image1.png" alt="Wayang Image" class="wayang1">
          </div>
          <div class="profile-info">
            <div class="profile-circle">
              <img src="./icon.png" alt="Edit Profile" class="edit-icon" id="edit-icon"> 
              <input type="file" id="file-input" class="file-input" accept="image/*" style="display: none;">
              <div class="profile-image-wrapper">  
                <img src="https://i.imgur.com/JgYD2nQ.jpg" alt="Profile Image" class="profile-image" id="profile-image">
              </div>
            </div>
            <div class="profile-details">
              <p><strong>Username :</strong> Butet</p>
              <p><strong>Nama Lengkap :</strong> ButetYani</p>
              <p><strong>Email :</strong> example@example.com</p>
              <p><strong>Password :</strong> ****</p>
              <p><strong>No Hp :</strong> +627583799</p>
            </div>
            <button id="logout-button" class="log-out-button">Logout</button>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    document.getElementById('edit-icon').addEventListener('click', () => {
      document.getElementById('file-input').click();
    });

    document.getElementById('file-input').addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const profileImageElement = document.getElementById('profile-image');
          profileImageElement.src = e.target.result;
        }
        reader.readAsDataURL(file);
      }
    });

    document.getElementById('logout-button').addEventListener('click', () => {
      Swal.fire({
        title: 'Yakin mau keluar?',
        text: "Anda akan keluar dari akun anda!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, keluar!',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('isLoggedIn');
          window.location.href = '#/berandakedua';
        }
      });
    });
  }
}

export default Profile;
