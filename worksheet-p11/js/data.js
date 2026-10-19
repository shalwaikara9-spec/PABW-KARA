
export const profil = {
  nama: "Shalwa Ikara Putri",
  peran: "Mahasiswa Informatika",
  keahlian: ["HTML", "CSS", "JavaScript", "Canva"]
};

export function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar) =>
  daftar.join(" · ");

export function saring(daftar, kategori) {
  return daftar.filter(
    (proyek) =>
      kategori === "semua" ||
      proyek.kategori === kategori
  );
}
