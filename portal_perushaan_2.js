// Menunggu semua konten HTML dimuat
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Ambil elemen-elemen yang diperlukan
    const form = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Listener utama: saat form di-submit
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form terkirim
        
        if (validateInputs()) {
            // Jika validasi lolos
            // Redirect ke halaman dashboard_perusahaan.html
            window.location.href = 'dashboard_perusahaan.html';
        } else {
            console.log('Validasi gagal. Periksa form.');
        }
    });

    // --- FUNGSI VALIDASI ---
    function validateInputs() {
        // Reset dulu semua error
        resetErrors();
        let isValid = true;

        // Cek Username
        if (isEmpty(usernameInput.value)) {
            isValid = false;
            showError(usernameInput, 'Username tidak boleh kosong.');
        }

        // Cek Password
        if (isEmpty(passwordInput.value)) {
            isValid = false;
            showError(passwordInput, 'Password tidak boleh kosong.');
        }

        return isValid;
    }

    // --- FUNGSI HELPER (PEMBANTU) ---

    // Menampilkan pesan error
    function showError(inputElement, message) {
        const inputGroup = inputElement.closest('.input-group');
        const errorDisplay = inputGroup.querySelector('.error-message');
        
        inputGroup.classList.add('error');
        errorDisplay.innerText = message;
    }

    // Menghilangkan semua pesan error
    function resetErrors() {
        const errorGroups = document.querySelectorAll('.input-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
            const errorDisplay = group.querySelector('.error-message');
            errorDisplay.innerText = '';
        });
    }

    // Cek jika string kosong
    function isEmpty(value) {
        return value.trim() === '';
    }
});
