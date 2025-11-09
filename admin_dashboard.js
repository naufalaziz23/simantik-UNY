document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(".nav-menu a");

    // Efek fade-in saat halaman dibuka
    document.body.classList.add("fade-in");

    menuLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // hentikan pindah default
            const url = this.getAttribute("href");

            // Tambahkan efek fade-out
            document.body.classList.remove("fade-in");
            document.body.classList.add("fade-out");

            // Pindah halaman setelah 300ms
            setTimeout(() => {
                window.location.href = url;
            }, 300);
        });
    });
});



