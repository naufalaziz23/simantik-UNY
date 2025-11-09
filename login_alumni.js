// Menunggu sampai seluruh konten halaman dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Memilih Elemen yang Dibutuhkan ---
    const regForm = document.querySelector('form');
    const createBtn = document.querySelector('.create-btn');
    
    // Input fields
    const namaInput = document.getElementById('nama');
    const nimInput = document.getElementById('nim');
    const prodiInput = document.getElementById('prodi');
    const tahunLulusInput = document.getElementById('tahun-lulus');
    
    // Kumpulan semua input untuk validasi
    const allInputs = [namaInput, nimInput, prodiInput, tahunLulusInput];

    // Tombol/link lain
    const googleBtn = document.querySelector('.google-btn');
    const emailBtn = document.querySelector('.email-btn');
    const loginLink = document.querySelector('.login-link a');

    
    // --- 2. Fungsi Utama: Validasi Form ---
    regForm.addEventListener('submit', function(event) {
        // Mencegah form terkirim ke server secara default
        event.preventDefault(); 
        
        let isValid = true;
        
        // Hapus semua error class sebelumnya
        allInputs.forEach(input => {
            input.classList.remove('error');
        });

        // Periksa setiap input
        allInputs.forEach(input => {
            if (input.value.trim() === '') {
                // Jika kosong, tambahkan class error dan tandai form tidak valid
                input.classList.add('error');
                isValid = false;
            }
        });

        // --- 3. Proses Jika Form Valid (Menggunakan SweetAlert2) ---
        if (isValid) {
            // Ubah tombol menjadi loading state
            createBtn.textContent = 'Menciptakan... ⏳';
            createBtn.disabled = true;

            // Simulasikan proses ke server (2 detik)
            // Waktu loading sebelum notifikasi muncul
            setTimeout(() => {
                
                // NOTIFIKASI BARU (SweetAlert2)
                Swal.fire({
                    title: 'Akun Berhasil Dibuat!',
                    text: 'Anda akan diarahkan ke halaman berikutnya.',
                    icon: 'success',           // Ikon checklist hijau
                    timer: 2000,               // Notif tampil selama 2 detik
                    showConfirmButton: false,  // Sembunyikan tombol "OK"
                    timerProgressBar: true     // Tampilkan bar loading
                }).then(() => {
                    
                    
                    window.location.href = "login_alumni_2.html";
                    
                
                });

            }, 2000); // 2 detik loading

        } else {
            // Jika form tidak valid, beri tahu pengguna
            alert('Harap isi semua field yang ditandai merah.');
        }
    }); // <-- Penutup untuk regForm.addEventListener

    
    // --- 4. Interaksi Tombol Lainnya (Opsional) ---
    
    googleBtn.addEventListener('click', () => {
        alert('Fitur "Login With Google" sedang dalam pengembangan.');
    });

    emailBtn.addEventListener('click', () => {
        alert('Fitur "Login With Email" sedang dalam pengembangan.');
    });

    // Ini adalah fungsionalitas untuk link "Login Now"
    loginLink.addEventListener('click', (e) => {
        e.preventDefault(); // Mencegah link berpindah halaman

        Swal.fire({
            title: 'Menuju Halaman Login',
            text: 'Mengarahkan Anda...',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true
        }).then(() => {
            // Arahkan ke halaman login utama Anda
            // (Saya asumsikan file login_alumni_2.html adalah halaman login)
            window.location.href = "login_alumni_2.html"; 
        });
    });

}); // <-- Penutup untuk document.addEventListener