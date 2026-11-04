# SATRIA TAPUT

Sistem Aplikasi Terpadu SATRIA TAPUT.

### Instansi
- Satpol PP
- Pemadam Kebakaran (Damkar)
- Linmas

### Fitur
- Portal publik masyarakat dengan pelaporan, tiket acak unik, pelacakan status Diterima/Diverifikasi/Didisposisikan/Dalam Penanganan/Selesai, kategori layanan, dan tombol telepon Call Center 0633 21113 (`tel:063321113`)
- UI login responsif, registrasi akun Masyarakat, reset password, dan profil pengguna dengan validasi, indikator kekuatan password, konfirmasi logout, serta dukungan prefers-reduced-motion
- Form registrasi publik tidak menyediakan pemilihan role; role petugas harus ditetapkan administrator melalui backend yang berwenang
- Form laporan internal tetap tersedia bagi pengguna masuk
- Dokumentasi foto dan video
- Pusat komando dengan filter laporan, statistik, peta sebaran indikatif, ekspor CSV, dan cetak
- Peta sebaran indikatif lokal berbasis SVG; marker hanya memakai koordinat GPS laporan yang diisi dan valid, tanpa tile server eksternal atau batas geografis resmi
- Manajemen personel dan regu lintas instansi
- Jadwal piket dan pencatatan kehadiran
- Dokumentasi apel pagi/sore dan serah terima piket
- Penugasan petugas pada laporan dan riwayat tindak lanjut
- Dashboard petugas berdasarkan peran
- Struktur organisasi digital yang memakai data personel/regu tersimpan; jabatan tanpa personel menampilkan "Belum ditetapkan"
- Ruang koordinasi pimpinan untuk disposisi, rapat, agenda, pengumuman, serta pemantauan laporan dan operasional
- Disposisi laporan memperbarui status menjadi Didisposisikan, Dalam Penanganan, dan Selesai sesuai tindak lanjut; perubahan tercatat pada riwayat/audit laporan
- Unit khusus PTI — Petugas Tindak Internal (Provost): personel, penugasan, kegiatan, foto dokumentasi, dan laporan internal dengan status serta riwayat
- Notifikasi laporan baru, penugasan, dan perubahan status
- Rekap harian/bulanan/tahunan, arsip, ekspor CSV, dan backup/pemulihan JSON
- Sistem koordinasi dan respons

### Penyimpanan dan batasan
- Aplikasi saat ini menggunakan `localStorage` browser; data tidak tersinkron ke server dan hanya tersedia pada browser/perangkat yang menyimpannya.
- Portal publik menyimpan laporan ke `localStorage` pada perangkat yang mengirimkan. Laporan tidak otomatis terkirim atau terlihat pada perangkat dashboard petugas lain; jangan gunakan untuk layanan operasional nyata sampai backend terpusat tersedia.
- Pelacakan publik memerlukan tiket dan empat digit akhir telepon serta hanya menampilkan status/tanggal, bukan nama, nomor telepon lengkap, lokasi, deskripsi, atau lampiran. Tiket ditampilkan pada halaman konfirmasi. Ini mengurangi paparan pada UI, tetapi bukan pengendalian akses server karena data tetap berada di browser yang sama.
- Foto dokumentasi dan lampiran laporan juga disimpan lokal, dengan batas ukuran yang diterapkan pada formulir.
- Backup JSON mencakup data laporan, personel, regu, jadwal piket, dokumentasi, notifikasi, struktur organisasi, koordinasi, dan catatan PTI, tetapi tidak mencakup akun maupun sesi. Foto/video lokal ikut membuat berkas backup lebih besar. Foto kegiatan PTI dibatasi maksimal tiga foto berukuran 500 KB per foto.
- Backup lama yang tidak memiliki kunci data PTI tetap dapat dipulihkan bila personel terkait ada di dalam backup; jika tidak, pemulihan dibatalkan agar catatan PTI lokal tidak kehilangan relasi personelnya.
- Login bawaan tetap merupakan akun demo lokal. Kredensial demo tidak ditampilkan pada halaman login; hash password dan sesi demo masih dikelola di browser dan dapat dimanipulasi melalui DevTools/storage. Opsi “Ingat Saya” menyimpan sesi demo di localStorage, sedangkan sesi tanpa opsi tersebut memakai sessionStorage. Ini bukan autentikasi atau otorisasi aman dan tidak boleh dipakai untuk data operasional sensitif.
- Registrasi demo Masyarakat berfungsi secara lokal: memvalidasi nama/email/nomor HP/password/konfirmasi, menolak email duplikat, dan menyimpan hash PBKDF2 beserta salt tanpa password plaintext. Akun diberi role tetap `Masyarakat` dan diarahkan ke portal masyarakat; akun ini belum diverifikasi melalui email. Karena data dan autentikasi tetap berada di browser serta dapat dimanipulasi, fitur ini hanya untuk demo dan bukan penggunaan operasional.
- Permintaan reset, verifikasi email, perubahan password akun, riwayat login, dan daftar tiket berdasarkan pemilik masih memerlukan API backend. Password formulir dan token reset tidak disimpan di localStorage; permintaan API menggunakan cookie same-origin dan belum memiliki endpoint aktif.
- Profil demo terhubung ke akun sesi lokal, menampilkan ID, jenis akun, role, status, tanggal pendaftaran, dan penempatan personel yang tersimpan. Pemilik dapat mengubah nama, nomor HP, email, serta avatar; perubahan email menandai email belum terverifikasi. Ubah password memverifikasi password saat ini dan menyimpan PBKDF2 hash/salt, bukan plaintext. Seluruh data profil/password tetap lokal dan dapat dimanipulasi; perubahan email tidak mengirim verifikasi dan autentikasi ini tidak aman untuk operasional.
- Menu avatar petugas menyediakan Profil Saya, Pengaturan Akun, dan Logout dengan konfirmasi. Masyarakat diarahkan ke portal publik serta hanya dapat membuka profilnya sendiri; tiket publik lama tidak tertaut ke akun. Riwayat aktivitas login tepercaya dan tiket berdasarkan pemilik memerlukan backend.
- Hak akses struktur, koordinasi, dan dokumentasi mengikuti peran, penempatan personel, regu, dan cakupan instansi di sisi browser; administrator perlu menautkan akun petugas ke personel/struktur yang sesuai. Ini bukan jaminan RBAC untuk penggunaan multi-user atau data sensitif.
- Akses ruang PTI disediakan untuk Super Admin, Admin Satpol PP, personel yang ditetapkan pada struktur/unit PTI, dan pimpinan/bidang yang ditautkan pada struktur. Data personel PTI hanya mengambil personel tersimpan; unit PTI kosong sampai personel nyata ditetapkan.
- Grafik memakai Chart.js dari CDN. Jika koneksi tidak tersedia, fitur laporan lainnya tetap dapat digunakan dan area grafik menampilkan pemberitahuan.
- Peta sebaran indikatif dirender lokal dengan SVG tanpa koneksi internet atau layanan tile eksternal. Posisi marker hanya memakai koordinat GPS laporan yang valid dan ditampilkan relatif; tanpa koordinat GPS tidak ada marker yang dibuat dan lokasi kejadian tidak ditebak. Visualisasi ini bukan batas geografis resmi.
- Fitur cetak menggunakan dialog cetak browser. Untuk menghasilkan PDF, pilih “Simpan sebagai PDF”; pop-up harus diizinkan.

### Migrasi sebelum penggunaan multi-user
- Arsitektur saat ini adalah prototipe satu file HTML tanpa API/backend/database. RBAC dan sesi masih client-side, sehingga tidak dapat menjamin kerahasiaan atau otorisasi operasional.
- Tahap produksi yang disarankan: backend API terautentikasi (OIDC/SSO atau sesi server dengan cookie `HttpOnly`, `Secure`, `SameSite`), database relasional terpusat dengan migrasi skema dan audit log append-only, RBAC diperiksa di server untuk setiap operasi, serta penyimpanan lampiran privat dengan validasi tipe/ukuran dan URL bertanda tangan.
- Backend same-origin yang diperlukan untuk mengaktifkan seluruh UI meliputi: `POST /api/auth/register` (server menetapkan role Masyarakat dan status menunggu verifikasi), `POST /api/auth/login` (cookie sesi aman), `POST /api/auth/password/forgot` (respons generik yang tidak mengungkap keberadaan email), `POST /api/auth/password/reset` (token sekali pakai/berkedaluwarsa), `POST /api/auth/email/verify`, `POST /api/auth/email/verification`, `POST /api/auth/password/change`, `GET/PATCH /api/auth/me`, `POST /api/auth/me/photo`, `GET /api/auth/me/activity`, dan `GET /api/me/reports`. Seluruh akses dan kepemilikan laporan wajib diperiksa server; endpoint tidak boleh menerima perubahan role dari klien.
- Form login yang ada masih menjalankan autentikasi demo lokal agar prototipe lama tetap dapat dibuka. Menghubungkannya ke backend memerlukan migrasi terencana pada pembacaan user, sesi, penyimpanan laporan, dan pemeriksaan peran di aplikasi satu-file ini; sampai migrasi itu selesai, jangan publikasikan sebagai layanan autentikasi produksi.
- Migrasi dapat dilakukan bertahap melalui API laporan terlebih dahulu: ekspor backup JSON lokal, validasi dan impor terkontrol ke endpoint migrasi admin, rekonsiliasi nomor tiket/ID, lalu jadikan API sebagai sumber data utama. Tambahkan sinkronisasi multi-perangkat, backup terjadwal, retensi, dan pengujian pemulihan setelah layanan tersebut tersedia. Fitur server, real-time, dan sinkronisasi belum aktif pada prototipe ini.
