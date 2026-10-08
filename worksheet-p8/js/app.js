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