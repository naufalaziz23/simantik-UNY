// ==== NAVIGASI ANTAR SECTION ====
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    // reset active menu
    document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');

    // sembunyikan semua section
    document.querySelectorAll('main section').forEach(sec => {
      sec.classList.remove('active-section');
      sec.classList.add('hidden-section');
    });

    // tampilkan section sesuai klik
    const sectionId = link.getAttribute('data-section');
    document.getElementById(sectionId).classList.remove('hidden-section');
    document.getElementById(sectionId).classList.add('active-section');
  });
});


// ==== DATA LOWONGAN ====
const tabelLowongan = document.getElementById("tabelLowongan").querySelector("tbody");
document.getElementById("btnTambah").addEventListener("click", () => {
  const posisi = document.getElementById("posisiInput").value.trim();
  const status = document.getElementById("statusInput").value;
  if (posisi === "") return alert("Isi nama posisi dulu!");

  const tanggal = new Date().toLocaleDateString('id-ID');
  const newRow = `
    <tr>
      <td>${posisi}</td>
      <td>${status}</td>
      <td>${tanggal}</td>
    </tr>`;
  tabelLowongan.insertAdjacentHTML("beforeend", newRow);

  document.getElementById("posisiInput").value = "";
  document.getElementById("statusInput").value = "Aktif";
});


// ==== DATA ALUMNI ====
const alumniData = [
  { nama: 'Budi Santoso', angkatan: '2019', skill: 'Data Analyst', foto: 'img/alumni1.jpg', posisi: 'Data Scientist - Tokopedia' },
  { nama: 'Rina Putri', angkatan: '2020', skill: 'Web Developer', foto: 'img/alumni2.jpg', posisi: 'Frontend Dev - Gojek' },
  { nama: 'Dewi Lestari', angkatan: '2018', skill: 'Marketing', foto: 'img/alumni3.jpg', posisi: 'Brand Executive - Shopee' },
  { nama: 'Agus Pratama', angkatan: '2019', skill: 'UI/UX Designer', foto: 'img/alumni4.jpg', posisi: 'Product Designer - Traveloka' },
  { nama: 'Intan Wijaya', angkatan: '2021', skill: 'Project Management', foto: 'img/alumni5.jpg', posisi: 'PM Associate - Telkomsel' },
  { nama: 'Eko Prasetyo', angkatan: '2018', skill: 'Database Engineer', foto: 'img/alumni6.jpg', posisi: 'SQL Developer - BRI Digital' },
  { nama: 'Siti Rahma', angkatan: '2020', skill: 'Cyber Security', foto: 'img/alumni7.jpg', posisi: 'Security Analyst - Bank Mandiri' },
];

function renderAlumni(data) {
  const list = document.getElementById('alumniList');
  list.innerHTML = data.map(a => `
    <div class="alumni-card">
      <img src="${a.foto}" alt="${a.nama}" class="alumni-avatar">
      <div class="alumni-info">
        <h4>${a.nama}</h4>
        <p>${a.posisi}</p>
        <span class="skill-tag">${a.skill}</span>
        <p>Angkatan ${a.angkatan}</p>
      </div>
    </div>
  `).join('');
}
renderAlumni(alumniData);


// ==== FILTER & SEARCH ALUMNI ====
const searchInput = document.getElementById('searchInput');
const filterAngkatan = document.getElementById('filterAngkatan');
const filterSkill = document.getElementById('filterSkill');

function filterAlumni() {
  const keyword = searchInput.value.toLowerCase();
  const angkatan = filterAngkatan.value;
  const skill = filterSkill.value;

  const filtered = alumniData.filter(a => {
    const cocokNama = a.nama.toLowerCase().includes(keyword);
    const cocokAngkatan = !angkatan || a.angkatan === angkatan;
    const cocokSkill = !skill || a.skill === skill;
    return cocokNama && cocokAngkatan && cocokSkill;
  });
  renderAlumni(filtered);
}

searchInput.addEventListener('input', filterAlumni);
filterAngkatan.addEventListener('change', filterAlumni);
filterSkill.addEventListener('change', filterAlumni);

// ==== FUNGSI LOGOUT DITAMBAHKAN ====
document.getElementById('logoutBtn').addEventListener('click', function(e) {
  e.preventDefault(); // Mencegah link default (#) bekerja

  // Konfirmasi sebelum logout
  const konfirmasi = confirm('Apakah Anda yakin ingin logout?');
  
  if (konfirmasi) {
    // 1. Hapus data sesi/login (jika menggunakan localStorage)
    localStorage.removeItem('userLogin');
    
    // 2. Arahkan ke halaman login
    // PENTING: Gunakan nama file yang benar (portal_Login.html)
    window.location.href = '/portal_Login.html'; // Menggunakan slash di depan untuk memastikan path dari root folder
  }
});