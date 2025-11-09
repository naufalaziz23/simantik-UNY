const form = document.getElementById('loginForm');
const btn = document.getElementById('loginBtn');
const msg = document.getElementById('message');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email');
  const username = document.getElementById('username');
  const password = document.getElementById('password');

  // Hapus pesan lama
  msg.textContent = '';
  email.classList.remove('error');
  username.classList.remove('error');
  password.classList.remove('error');

  // Cek input
  if (!email.value || !username.value || !password.value) {
    msg.textContent = '⚠️ Harap isi semua kolom!';
    msg.style.color = '#ff3333';

    // Efek getar
    [email, username, password].forEach(input => {
      if (!input.value) {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 500);
      }
    });
    return;
  }

  // Ubah tombol jadi loading
  btn.classList.add('loading');
  btn.textContent = 'Loading...';

  // Simulasi proses login
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.textContent = 'Create';

    // Simulasi berhasil login
    msg.textContent = `✅ Selamat datang, ${username.value}!`;
    msg.classList.add('success');

    // Contoh redirect (aktifkan kalau sudah siap)
    // window.location.href = 'dashboard.html';
  }, 2000);
});
