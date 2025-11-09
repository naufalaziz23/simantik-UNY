// Menunggu semua konten HTML dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Ambil elemen-elemen yang diperlukan
    const form = document.getElementById('register-form');
    const namaInput = document.getElementById('nama');
    const ptInput = document.getElementById('pt');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('password-confirm');
    const deskripsiInput = document.getElementById('deskripsi');

    // Ambil elemen modal
    const modalOverlay = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Listener utama: saat form di-submit
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form terkirim (agar validasi dulu)
        
        // Jalankan validasi
        if (validateAllInputs()) {
            // Jika semua valid
            console.log('Validasi Berhasil! Menampilkan modal...');
            showSuccessModal();
            
            // (Opsional) Reset form setelah sukses
            form.reset();
        } else {
            // Jika ada yang tidak valid
            console.log('Validasi Gagal. Cek error.');
        }
    });

    // --- FUNGSI VALIDASI UTAMA ---
    function validateAllInputs() {
        // Reset semua error sebelum cek ulang
        resetAllErrors();
        
        let isValid = true; // Anggap valid, lalu cari yang tidak valid

        // 1. Cek Nama PIC
        if (isEmpty(namaInput.value)) {
            isValid = false;
            showError(namaInput, 'Nama PIC tidak boleh kosong.');
        }

        // 2. Cek Nama PT
        if (isEmpty(ptInput.value)) {
            isValid = false;
            showError(ptInput, 'Nama perusahaan tidak boleh kosong.');
        }

        // 3. Cek Email
        if (isEmpty(emailInput.value)) {
            isValid = false;
            showError(emailInput, 'Email tidak boleh kosong.');
        } else if (!isValidEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, 'Format email tidak valid.');
        }

        // 4. Cek Password
        if (isEmpty(passwordInput.value)) {
            isValid = false;
            showError(passwordInput, 'Password tidak boleh kosong.');
        } else if (passwordInput.value.length < 8) {
            isValid = false;
            showError(passwordInput, 'Password minimal 8 karakter.');
        }

        // 5. Cek Konfirmasi Password
        if (isEmpty(passwordConfirmInput.value)) {
            isValid = false;
            showError(passwordConfirmInput, 'Konfirmasi password tidak boleh kosong.');
        } else if (passwordInput.value !== passwordConfirmInput.value) {
            isValid = false;
            showError(passwordConfirmInput, 'Password tidak cocok.');
        }

        // 6. Cek Deskripsi
        if (isEmpty(deskripsiInput.value)) {
            isValid = false;
            showError(deskripsiInput, 'Deskripsi tidak boleh kosong.');
        }

        return isValid;
    }

    // --- FUNGSI HELPER (PEMBANTU) ---

    // Menampilkan error
    function showError(inputElement, message) {
        const inputGroup = inputElement.closest('.input-group');
        const errorDisplay = inputGroup.querySelector('.error-message');
        
        inputGroup.classList.add('error');
        errorDisplay.innerText = message;
    }

    // Mereset semua error
    function resetAllErrors() {
        const errorGroups = document.querySelectorAll('.input-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
        });
        
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.innerText = '';
        });
    }

    // Cek jika string kosong (setelah di-trim)
    function isEmpty(value) {
        return value.trim() === '';
    }

    // Cek format email (Regex sederhana)
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // --- FUNGSI MODAL (NOTIFIKASI) ---

    // Tampilkan modal
    function showSuccessModal() {
        modalOverlay.classList.add('show');
    }

    // Tutup modal DAN PINDAH HALAMAN
    function closeSuccessModal() {
        modalOverlay.classList.remove('show');
        
        // BARIS INI AKAN PINDAH KE HALAMAN BARU
        window.location.href = 'portal_perushaan_2.html';
    }

    // Listener untuk tombol tutup modal
    closeModalBtn.addEventListener('click', closeSuccessModal);

    // Listener untuk tutup modal jika klik di luar area (overlay)
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeSuccessModal();
        }
    });

});