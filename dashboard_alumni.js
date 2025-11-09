// Menunggu sampai seluruh konten halaman dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- 0. DATA UNTUK HALAMAN ---

    const allJobs = [
        { title: 'Backend Engineer (Go)', company: 'Gojek', location: 'Jakarta', logo: 'img/gojek-logo.png', type: 'Full Time', tags: ['Tech', 'Remote'] },
        { title: 'UI/UX Designer', company: 'Shopee', location: 'Singapore', logo: 'img/shopee-logo.png', type: 'Contract', tags: ['Design'] },
        { title: 'Cybersecurity Analyst', company: 'Tokopedia', location: 'Remote', logo: 'img/tokopedia-logo.png', type: 'Full Time', tags: ['Security', 'Remote'] },
        { title: 'Data Analyst', company: 'Shopee', location: 'Yogyakarta', logo: 'img/shopee-logo.png', type: 'Full Time', tags: ['Data', 'Yogyakarta'] },
        { title: 'Frontend Developer', company: 'Gojek', location: 'Yogyakarta', logo: 'img/gojek-logo.png', type: 'Internship', tags: ['Tech', 'Intern'] }
    ];

    const allEvents = [
        { title: 'Webinar Karir: "Menuju Industri 4.0"', date: '15 NOV', time: '19:00 WIB', location: 'Online via Zoom', type: 'Webinar' },
        { title: 'Alumni Meetup & Networking', date: '30 NOV', time: '13:00 WIB', location: 'Auditorium UNY', type: 'Meetup' },
        { title: 'Workshop Python untuk Data Science', date: '05 DES', time: '09:00 WIB', location: 'Lab Komputer TI', type: 'Workshop' }
    ];

    const allAlumni = [
        { name: 'Arief Budiman', angkatan: 2018, perusahaan: 'Gojek', posisi: 'Backend Engineer', foto: 'https://via.placeholder.com/60x60/3498db/ffffff?text=AB' },
        { name: 'Siti Lestari', angkatan: 2019, perusahaan: 'Shopee', posisi: 'Data Analyst', foto: 'https://via.placeholder.com/60x60/e74c3c/ffffff?text=SL' },
        { name: 'Joko Susilo', angkatan: 2018, perusahaan: 'Tokopedia', posisi: 'Frontend Developer', foto: 'https://via.placeholder.com/60x60/2ecc71/ffffff?text=JS' },
        { name: 'Dewi Anggraini', angkatan: 2020, perusahaan: 'PT. Telkom', posisi: 'UI/UX Designer', foto: 'https://via.placeholder.com/60x60/f1c40f/ffffff?text=DA' },
        { name: 'Bambang Subekti', angkatan: 2017, perusahaan: 'Startup XYZ', posisi: 'Wirausaha', foto: 'https://via.placeholder.com/60x60/9b59b6/ffffff?text=BS' },
        { name: 'Citra Kirana', angkatan: 2021, perusahaan: 'Shopee', posisi: 'Product Manager', foto: 'https://via.placeholder.com/60x60/e67e22/ffffff?text=CK' },
        { name: 'Eko Handoko', angkatan: 2020, perusahaan: 'Gojek', posisi: 'Backend Engineer', foto: 'https://via.placeholder.com/60x60/2c3e50/ffffff?text=EH' }
    ];

    // --- 1. PILIH SEMUA ELEMEN INTERAKTIF ---
    const sidebarNavItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const logoutButton = document.querySelector('.nav-item-logout');
    const promoButton = document.querySelector('.btn-promo');
    const editProfileButton = document.querySelector('.btn-edit-profile');
    const bellIcon = document.getElementById('bell-icon');
    const envelopeIcon = document.getElementById('envelope-icon');
    const mainGreeting = document.getElementById('main-greeting');
    const mainSubgreeting = document.getElementById('main-subgreeting');
    const dashboardWidgets = document.querySelector('.dashboard-widgets');
    const pageContent = document.getElementById('page-content'); 

    const defaultGreeting = mainGreeting.textContent;
    const defaultSubgreeting = mainSubgreeting.textContent;

    // --- 2. MENU NAVIGASI ---
    sidebarNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const clickedItem = e.currentTarget;
            if (clickedItem.classList.contains('active')) return;
            sidebarNavItems.forEach(nav => nav.classList.remove('active'));
            clickedItem.classList.add('active');
            updateMainContent(clickedItem.dataset.page);
        });
    });

    // --- FUNGSI RENDER DASHBOARD BARU (Bukan Grafik) ---
    function renderDashboardWidgets() {
        // --- 1. Top Alumni (3 terbaru / angkatan tertinggi)
        // Urutkan berdasarkan angkatan (descending) dan ambil 3 teratas
        const topAlumni = allAlumni.sort((a, b) => b.angkatan - a.angkatan).slice(0, 3);
        
        const alumniListHTML = topAlumni.map(a => `
            <div class="mini-alumni-card">
                <img src="${a.foto}" alt="${a.name}">
                <div class="mini-alumni-info">
                    <h4>${a.name}</h4>
                    <span>${a.posisi} di <strong>${a.perusahaan}</strong></span>
                    <span class="text-secondary">Angkatan ${a.angkatan}</span>
                </div>
                <a href="#" class="btn-connect btn-small"><i class='bx bx-user-plus'></i></a>
            </div>
        `).join('');

        // --- 2. Lowongan Unggulan (Ambil 3 Lowongan pertama)
        const featuredJobs = allJobs.slice(0, 3);

        const jobListHTML = featuredJobs.map(j => `
            <div class="mini-job-card">
                <img src="${j.logo}" alt="${j.company}">
                <div class="mini-job-info">
                    <h5>${j.title}</h5>
                    <span>${j.company} | ${j.location}</span>
                    <div class="tags">
                        <span class="tag tag-primary">${j.type}</span>
                        ${j.tags.slice(0, 1).map(t => `<span class="tag tag-secondary">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');


        return `
            <div class="dashboard-bottom-container">
                
                <div class="widget large-widget half-width">
                    <h3><i class='bx bxs-group'></i> Top Alumni Terbaru</h3>
                    <div class="alumni-list-container">
                        ${alumniListHTML}
                    </div>
                    <a href="#" class="btn-link-bottom" data-page="Alumni">Lihat Semua Direktori &rarr;</a>
                </div>

                <div class="widget large-widget half-width">
                    <h3><i class='bx bx-briefcase-alt-2'></i> Lowongan Unggulan</h3>
                    <div class="job-list-container">
                        ${jobListHTML}
                    </div>
                    <a href="#" class="btn-link-bottom" data-page="JOBS">Lihat Semua Lowongan &rarr;</a>
                </div>

            </div>
            `;
    }
    // --- AKHIR FUNGSI RENDER DASHBOARD BARU ---


    // --- 3. UPDATE KONTEN DINAMIS (MODIFIKASI PADA 'Dashboard') ---
    function updateMainContent(pageName) {
        dashboardWidgets.classList.remove('fade-in');
        pageContent.classList.remove('fade-in');
        pageContent.style.display = "none";
        pageContent.innerHTML = "";
        dashboardWidgets.style.display = "none";

        switch (pageName) {
            case 'Profile':
                mainGreeting.textContent = defaultGreeting;
                mainSubgreeting.textContent = defaultSubgreeting;
                dashboardWidgets.style.display = "grid"; 
                dashboardWidgets.classList.add('fade-in');
                break;

            case 'Dashboard':
                mainGreeting.textContent = 'Dashboard Statistik';
                mainSubgreeting.textContent = 'Ringkasan data jaringan alumni UNY.';
                pageContent.style.display = "block";
                pageContent.innerHTML = `
                    <div class="stat-card-container">
                        <div class="stat-card"><i class='bx bxs-graduation'></i><div class="stat-info"><h3>1,200+</h3><span>Total Alumni</span></div></div>
                        <div class="stat-card"><i class='bx bx-briefcase'></i><div class="stat-info"><h3>75</h3><span>Lowongan Aktif</span></div></div>
                        <div class="stat-card"><i class='bx bx-buildings'></i><div class="stat-info"><h3>150+</h3><span>Perusahaan Mitra</span></div></div>
                        <div class="stat-card"><i class='bx bx-calendar-event'></i><div class="stat-info"><h3>3</h3><span>Event Mendatang</span></div></div>
                    </div>
                    
                    ${renderDashboardWidgets()}
                    
                `;
                pageContent.classList.add('fade-in');
                break;

            case 'JOBS':
                mainGreeting.textContent = 'Portal Lowongan (JOBS)';
                mainSubgreeting.textContent = 'Temukan karir impian Anda di sini.';
                pageContent.style.display = "block";
                pageContent.innerHTML = `
                    <div class="widget large-widget job-portal">
                        <div class="job-filter-bar">
                            <div class="filter-group"><label>Posisi</label>
                                <select id="filter-posisi">
                                    <option value="">Semua Posisi</option>
                                    <option value="Backend Engineer">Backend Engineer</option>
                                    <option value="UI/UX Designer">UI/UX Designer</option>
                                    <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                                    <option value="Data Analyst">Data Analyst</option>
                                    <option value="Frontend Developer">Frontend Developer</option>
                                </select>
                            </div>
                            <div class="filter-group"><label>Lokasi</label>
                                <select id="filter-lokasi">
                                    <option value="">Semua Lokasi</option>
                                    <option value="Jakarta">Jakarta</option>
                                    <option value="Yogyakarta">Yogyakarta</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </div>
                            <button id="btn-apply-filter" class="btn-primary">Filter</button>
                            <button id="btn-reset-filter" class="btn-secondary">Reset</button>
                        </div>
                        <div class="job-listings-container" id="job-listings-container"></div>
                    </div>
                `;
                renderJobs(allJobs);
                pageContent.classList.add('fade-in');
                break;

            case 'EVENT':
                mainGreeting.textContent = 'Halaman Acara (EVENT)';
                mainSubgreeting.textContent = 'Ikuti acara dan webinar terbaru.';
                pageContent.style.display = "block";
                pageContent.innerHTML = `<div class="widget large-widget event-portal"><h3>Acara Mendatang</h3><div id="event-listings-container"></div></div>`;
                renderEvents(allEvents);
                pageContent.classList.add('fade-in');
                break;

            case 'Alumni':
                mainGreeting.textContent = 'Halaman Direktori Alumni';
                mainSubgreeting.textContent = 'Temukan dan terhubung dengan rekan alumni.';
                pageContent.style.display = "block";
                pageContent.innerHTML = `
                    <div class="widget large-widget alumni-portal">
                        <div class="job-search-bar"><i class='bx bx-search'></i>
                            <input type="text" id="alumni-search-input" placeholder="Cari nama, angkatan, atau perusahaan...">
                            <button id="btn-search-alumni" class="btn-primary">Cari</button>
                        </div>
                        <div class="alumni-listings-container" id="alumni-listings-container"></div>
                    </div>
                `;
                renderAlumni(allAlumni);
                pageContent.classList.add('fade-in');
                break;

            default:
                mainGreeting.textContent = defaultGreeting;
                mainSubgreeting.textContent = defaultSubgreeting;
                dashboardWidgets.style.display = "grid";
                dashboardWidgets.classList.add('fade-in');
        }
    }
    // --- AKHIR UPDATE KONTEN DINAMIS ---


    // --- 3B. FUNGSI RENDER DATA (DIPERLUKAN UNTUK LAMAN LAIN) ---
    function renderJobs(jobs) {
        const c = document.getElementById('job-listings-container');
        if (!c) return;
        c.innerHTML = jobs.length ? jobs.map(j => `
            <div class="job-card">
                <img src="${j.logo}" alt="${j.company}">
                <div class="job-card-info">
                    <h4>${j.title}</h4>
                    <span><i class='bx bx-buildings'></i> ${j.company}</span>
                    <span><i class='bx bx-map'></i> ${j.location}</span>
                </div>
                <div class="job-card-apply">
                    <span>${j.type}</span>
                    <a href="#" class="btn-apply-job">Apply Now</a>
                </div>
            </div>`).join('') : "<p>Tidak ada lowongan yang cocok.</p>";
    }

    function performJobFilter() {
        const p = document.getElementById('filter-posisi').value;
        const l = document.getElementById('filter-lokasi').value;
        renderJobs(allJobs.filter(j => (!p || j.title.includes(p)) && (!l || j.location === l)));
    }
    function resetJobFilter() {
        document.getElementById('filter-posisi').value = "";
        document.getElementById('filter-lokasi').value = "";
        renderJobs(allJobs);
    }

    function renderEvents(evs) {
        const c = document.getElementById('event-listings-container');
        if (!c) return;
        c.innerHTML = evs.length ? evs.map(ev => `
            <div class="event-card">
                <div class="event-card-date"><strong>${ev.date.split(' ')[0]}</strong><span>${ev.date.split(' ')[1]}</span></div>
                <div class="event-card-info"><h4>${ev.title}</h4><span><i class='bx bx-time-five'></i> ${ev.time}</span><span><i class='bx bx-map-pin'></i> ${ev.location}</span></div>
                <div class="event-card-action"><span class="event-type">${ev.type}</span><a href="#" class="btn-daftar-event" data-title="${ev.title}">Daftar</a></div>
            </div>`).join('') : "<p>Tidak ada acara.</p>";
    }

    function renderAlumni(alumni) {
        const c = document.getElementById('alumni-listings-container');
        if (!c) return;
        c.innerHTML = alumni.length ? alumni.map(a => `
            <div class="alumni-card">
                <img src="${a.foto}" alt="${a.name}">
                <div class="alumni-card-info">
                    <h4>${a.name}</h4>
                    <span><i class='bx bx-briefcase'></i> ${a.posisi} di <strong>${a.perusahaan}</strong></span>
                    <span><i class='bx bx-calendar'></i> Angkatan ${a.angkatan}</span>
                </div>
                <div class="alumni-card-action"><a href="#" class="btn-connect"><i class='bx bx-user-plus'></i> Hubungi</a></div>
            </div>`).join('') : "<p>Alumni tidak ditemukan.</p>";
    }

    function performAlumniSearch() {
        const s = document.getElementById('alumni-search-input').value.toLowerCase();
        renderAlumni(allAlumni.filter(a =>
            a.name.toLowerCase().includes(s) ||
            a.angkatan.toString().includes(s) ||
            a.perusahaan.toLowerCase().includes(s)
        ));
    }

    // --- 4. FITUR LOGOUT MENUJU PORTAL_LOGIN ---
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Anda yakin ingin Log Out?',
            text: "Anda akan dikembalikan ke halaman login.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0052cc',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Log Out!',
            cancelButtonText: 'Batal'
        }).then((r) => {
            if (r.isConfirmed) {
                Swal.fire({
                    title: 'Logged Out!',
                    text: 'Anda berhasil log out. Mengarahkan...',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    // PASTIKAN NAMA FILE DAN HURUF KAPITAL SUDAH BENAR
                    window.location.href = "portal_Login.html"; 
                });
            }
        });
    });

    // --- 5. INTERAKSI TAMBAHAN ---
    promoButton.addEventListener('click', (e) => {
        e.preventDefault();
        Swal.fire({ title: 'Menuju Halaman Profile', text: 'Mengarahkan Anda...', icon: 'info', timer: 1500, showConfirmButton: false })
            .then(() => window.location.href = promoButton.href);
    });

    editProfileButton.addEventListener('click', (e) => {
        e.preventDefault();
        Swal.fire({ title: 'Menuju Halaman Profile', text: 'Mengarahkan Anda...', icon: 'info', timer: 1500, showConfirmButton: false })
            .then(() => window.location.href = editProfileButton.href);
    });

    bellIcon.addEventListener('click', () => Swal.fire({ title: 'Notifikasi', text: 'Tidak ada notifikasi baru.', icon: 'info', confirmButtonColor: '#0052cc' }));
    envelopeIcon.addEventListener('click', () => Swal.fire({ title: 'Pesan', text: 'Tidak ada pesan baru.', icon: 'info', confirmButtonColor: '#0052cc' }));

    // --- 6. EVENT LISTENERS DINAMIS ---
    pageContent.addEventListener('click', (e) => {
        if (e.target.id === 'btn-apply-filter') performJobFilter();
        if (e.target.id === 'btn-reset-filter') resetJobFilter();
        if (e.target.classList.contains('btn-apply-job')) Swal.fire('Fitur Segera Hadir', 'Fitur "Apply Now" sedang dalam pengembangan.', 'info');
        if (e.target.classList.contains('btn-daftar-event')) {
            e.preventDefault();
            const t = e.target.dataset.title;
            Swal.fire({
                title: `Pendaftaran: ${t}`,
                html: `<p>Silakan isi data diri Anda.</p>
                       <input id="swal-nama" class="swal2-input" placeholder="Nama Lengkap">
                       <input id="swal-email" class="swal2-input" placeholder="Email Kontak">
                       <input id="swal-nim" class="swal2-input" placeholder="NIM (Opsional)">`,
                confirmButtonText: 'Konfirmasi',
                showCancelButton: true,
                preConfirm: () => {
                    const n = document.getElementById('swal-nama').value;
                    const e = document.getElementById('swal-email').value;
                    if (!n || !e) Swal.showValidationMessage('Nama dan Email wajib diisi!');
                    return { n, e };
                }
            }).then((r) => {
                if (r.isConfirmed) Swal.fire('Pendaftaran Berhasil!', `Terima kasih, ${r.value.n}. Anda telah terdaftar.`, 'success');
            });
        }
        if (e.target.id === 'btn-search-alumni') performAlumniSearch();
        if (e.target.closest('.btn-connect')) Swal.fire('Fitur Segera Hadir', 'Simulasi mengirim permintaan koneksi...', 'info');
        
        // Handle klik tombol link di dashboard
        if (e.target.classList.contains('btn-link-bottom')) {
            e.preventDefault();
            const targetPage = e.target.dataset.page;
            // Temukan item navigasi yang sesuai dan simulasikan klik
            const navItem = document.querySelector(`.sidebar-nav .nav-item[data-page="${targetPage}"]`);
            if (navItem) navItem.click();
        }
    });

    pageContent.addEventListener('keyup', (e) => {
        if (e.target.id === 'alumni-search-input' && e.key === 'Enter') performAlumniSearch();
    });

});