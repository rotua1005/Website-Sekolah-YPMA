const Pembayaran = {
    async render() {
      return `
      <div class="register-wrapper">
        <div class="Pesan-container">
          <div class="containerr">
            <h3 class="barcode">Scan Barcode Qris untuk membayar</h3>
            <img src="./barcode.png" alt="Logo" class="barcode-img"></img>
            <p id="timingLabel" class="timing-label">Barcode ini berlaku hingga:</p>
            <p id="timing" class="timing"></p> 
          </div>
        </div>
      </div>
      `;
    },
    async afterRender() {
      console.log('afterRender executed');
  
      const endTimeKey = 'paymentEndTime';
      let endTime = localStorage.getItem(endTimeKey);
  
      if (!endTime) {
        // Jika tidak ada waktu akhir di localStorage, set waktu akhir ke 24 jam dari waktu sekarang
        endTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        localStorage.setItem(endTimeKey, endTime);
      }
  
      function updateTime() {
        const timingElement = document.getElementById('timing');
        if (timingElement) {
          const now = new Date();
          const remainingTime = new Date(endTime) - now;
  
          if (remainingTime > 0) {
            const hours = String(Math.floor((remainingTime / (1000 * 60 * 60)) % 24)).padStart(2, '0');
            const minutes = String(Math.floor((remainingTime / (1000 * 60)) % 60)).padStart(2, '0');
            const seconds = String(Math.floor((remainingTime / 1000) % 60)).padStart(2, '0');
            timingElement.textContent = `${hours}:${minutes}:${seconds}`;
          } else {
            timingElement.textContent = 'Waktu telah berakhir';
            localStorage.removeItem(endTimeKey); 
          }
        } else {
          console.error('Timing element not found');
        }
      }
  
      setInterval(updateTime, 1000);
      updateTime();
    },
  };
  
  export default Pembayaran;
  