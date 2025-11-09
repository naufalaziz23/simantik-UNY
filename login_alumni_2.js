// Menunggu sampai seluruh konten halaman dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Memilih Elemen yang Dibutuhkan ---
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');

    // --- 2. Fungsi Validasi Form Saat Submit ---
    loginForm.addEventListener('submit', function(event) {
        // Mencegah form terkirim ke server secara default
        event.preventDefault(); 
        
        let isValid = true;
        
        // Hapus semua error class sebelumnya
        usernameInput.classList.remove('error');
        passwordInput.classList.remove('error');

        // --- 3. Pengecekan Input ---
        
        // Cek Username
        if (usernameInput.value.trim() === '') {
            usernameInput.classList.add('error'); // Tambah bingkai merah
            isValid = false;
        }

        // Cek Password
        if (passwordInput.value.trim() === '') {
            passwordInput.classList.add('error'); // Tambah bingkai merah
            isValid = false;
        }

        // --- 4. Proses Jika Form Valid ("JS Terasa") ---
        if (isValid) {
            // Ubah tombol menjadi loading state
            loginBtn.textContent = 'Logging in... ⏳';
            loginBtn.disabled = true;

            // Simulasikan proses login ke server (2 detik)
            setTimeout(() => {
                
                // NOTIFIKASI SUKSES (SweetAlert)
                Swal.fire({
                    title: 'Login Berhasil!',
                    text: 'Selamat datang, ' + usernameInput.value,
                    icon: 'success',
                    timer: 2000, // Notif tampil 2 detik
                    showConfirmButton: false,
                    timerProgressBar: true
                }).then(() => {
                    // PINDAH KE HALAMAN DASHBOARD
                    window.location.href = "dashboard_alumni.html";
                });

            }, 2000); // 2000 milidetik = 2 detik

        } else {
            // Jika form tidak valid, beri getaran kecil (jika browser support)
            if (window.navigator.vibrate) {
                window.navigator.vibrate(100); // Getar selama 100ms
            }
        }
    });

    // --- 5. Menghapus Error saat mulai mengetik ---
    // Ini membuat validasi terasa lebih responsif
    
    usernameInput.addEventListener('input', () => {
        if (usernameInput.value.trim() !== '') {
            usernameInput.classList.remove('error');
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.trim() !== '') {
            passwordInput.classList.remove('error');
        }
    });

});