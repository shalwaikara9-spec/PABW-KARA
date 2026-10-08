const nama = "Shalwa Ikara Putri";
const peran = "Mahasiswa Informatika";

const keahlian = [
  "HTML",
  "CSS",
  "JavaScript",
  "Canva"
];

const jumlahPenghargaan = 4;

let pilihanAktif = "semua";

console.log(typeof nama);
console.log(typeof jumlahPenghargaan);
console.log(typeof pilihanAktif);

console.log(nama);
console.log(jumlahPenghargaan);
console.log(pilihanAktif);

const kalimat = `Nama saya ${nama}, dan saya adalah ${peran}.`;

console.log(kalimat);

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}
const formatKeahlian = (daftar) => daftar.join(" · ");
console.log(buatPerkenalan({ nama, peran }));
console.log(formatKeahlian(keahlian));

const profil = {
  nama,
  peran,
  keahlian
};

const daftarProyek = [
  {
    judul: "Lomba Festival Kaligrafi Kategori Kitabah (Umum)",
    tahun: 2026,
    penghargaan: "Juara Harapan 2",
    selesai: true
  },
  {
    judul: "Lomba Literasi Aksara Jawa Kategori Pelajar",
    tahun: 2025,
    penghargaan: "Juara 3",
    selesai: true
  },
  {
    judul: "Lomba Festival Kaligrafi Kategori Kitabah (Umum)",
    tahun: 2024,
    penghargaan: "Juara Harapan 2",
    selesai: true
  },
  {
    judul: "Lomba Kaligrafi Event Parade Hari Santri",
    tahun: 2023,
    penghargaan: "Juara 2",
    selesai: true
  }
];

console.table(profil.keahlian);
console.table(daftarProyek);

const selesai = daftarProyek.filter(
  (proyek) => proyek.selesai
);

console.table(selesai);

const katalog = daftarProyek.find(
  (proyek) =>
    proyek.judul === "Lomba Literasi Aksara Jawa Kategori Pelajar"
);

console.log(katalog);

const judulProyek = daftarProyek.map(
  (proyek) => proyek.judul
);

console.table(judulProyek);

const urut = [...daftarProyek].sort(
  (a, b) => a.tahun - b.tahun
);

console.table(urut);
console.table(daftarProyek);