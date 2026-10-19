
import { saring } from './data.js';

const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#kosong");
const muatEl = document.querySelector("#muat");
const barisFilter = document.querySelector("#filter");

export function render(state) {
  wadah.replaceChildren();

  const daftar = saring(
    state.daftarProyek,
    state.kategoriAktif
  );

  if (daftar.length === 0) {
    kosong.textContent = "Belum ada data.";
    kosong.hidden = false;
  } else {
    kosong.hidden = true;

    daftar.forEach((proyek) => {
      const item = document.createElement("li");
      const judul = document.createElement("h3");
      const tahun = document.createElement("p");
      const kategori = document.createElement("p");

      judul.textContent = proyek.judul;
      tahun.textContent = `Tahun: ${proyek.tahun}`;
      kategori.textContent = `Kategori: ${proyek.kategori}`;

      item.append(judul, tahun, kategori);
      wadah.append(item);
    });
  }

  barisFilter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle(
      "aktif",
      tombol.dataset.kategori === state.kategoriAktif
    );
  });
}

export function aturMemuat(aktif) {
  muatEl.hidden = !aktif;
}

export function tampilkanGalat(pesan) {
  wadah.replaceChildren();
  kosong.textContent = pesan;
  kosong.hidden = false;
}
