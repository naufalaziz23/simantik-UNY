/**
 * File: script_portal.js
 * Mengelola logika interaksi pada halaman pilih login.
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginBtn');
    const inputGroups = document.querySelectorAll('.input-group');

    // --- 1. Logika Navigasi Saat Tombol Diklik ---
    loginButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        // Cari radio button yang sedang dipilih
        const selectedRadio = document.querySelector('input[name="user_type"]:checked');

        if (!selectedRadio) {
            // Feedback kuat jika tidak ada yang dipilih
            alert("⚠️ Mohon pilih jenis pengguna (Admin, Perusahaan, atau Alumni) untuk masuk.");
            return; 
        }

        const userType = selectedRadio.value;
        let targetPage = '';

        // Menggunakan Switch Case untuk navigasi yang rapi
        switch (userType) {
            case 'admin':
                targetPage = 'login_admin.html';
                break;
            case 'perusahaan':
                targetPage = 'login_perusahaan.html';
                break;
            case 'alumni':
                targetPage = 'login_alumni.html';
                break;
            default:
                targetPage = 'index.html'; 
                break;
        }

        console.log(`Navigasi ke: ${targetPage}`);
        window.location.href = targetPage;
    });

    // --- 2. Logika Penambahan Kelas "Active" (Highlight CSS) ---
    inputGroups.forEach(group => {
        group.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');

            // Hapus kelas 'active' dari semua input group
            inputGroups.forEach(g => g.classList.remove('active'));

            // Tambahkan kelas 'active' ke input group yang sedang diklik
            this.classList.add('active');
            
            // Aktifkan radio button
            if (radio) {
                radio.checked = true;
            }
        });
    });

    // Opsional: Jika halaman dimuat ulang dan ada input yang sudah ter-check, beri highlight
    document.querySelector('input[name="user_type"]:checked')?.closest('.input-group')?.classList.add('active');
});