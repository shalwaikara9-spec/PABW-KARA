
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
      wadah.append(
        buatKartu(proyek, state.favorit)
      );
    });
  }

  barisFilter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle(
      "aktif",
      tombol.dataset.kategori === state.kategoriAktif
    );
  });
}

export function buatKartu(proyek, favorit) {
  const item = document.createElement("li");
  item.className = "kartu";

  const judul = document.createElement("h3");
  judul.textContent = proyek.judul;

  const tahun = document.createElement("p");
  tahun.textContent = `Tahun: ${proyek.tahun}`;

  const kategori = document.createElement("p");
  kategori.textContent = `Kategori: ${proyek.kategori}`;

  const tombol = document.createElement("button");
  tombol.className = "favorit";
  tombol.dataset.id = proyek.id;
  tombol.textContent = favorit.includes(proyek.id) ? "★" : "☆";
  tombol.setAttribute("aria-label", "Tandai favorit");

  item.append(judul, tahun, kategori, tombol);

  return item;
}

export function aturMemuat(aktif) {
  muatEl.hidden = !aktif;
}

export function tampilkanGalat(pesan) {
  wadah.replaceChildren();
  kosong.textContent = pesan;
  kosong.hidden = false;
}
