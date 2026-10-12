
import { daftarProyek, pilihanAktif } from "./app.js";

const daftar = document.querySelector("#daftar");
const filter = document.querySelector("#filter");
const pesanKosong = document.querySelector("#kosong");

function tampilkanProyek(kategori = pilihanAktif) {
  if (!daftar || !pesanKosong) return;

  const proyekTampil = daftarProyek.filter((proyek) => {
    if (kategori === "semua") return true;
    if (kategori === "web") return proyek.kategori === "web";
    if (kategori === "desain") return proyek.kategori === "desain";
    return false;
  });

  daftar.replaceChildren();

  proyekTampil.forEach((proyek) => {
    const item = document.createElement("li");
    const judul = document.createElement("h3");
    const tahun = document.createElement("p");
    const penghargaan = document.createElement("p");

    judul.textContent = proyek.judul;
    tahun.textContent = `Tahun: ${proyek.tahun}`;
    penghargaan.textContent = `Penghargaan: ${proyek.penghargaan}`;

    item.append(judul, tahun, penghargaan);
    daftar.append(item);
  });

  pesanKosong.hidden = proyekTampil.length > 0;
}


if (filter) {
  filter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button[data-kategori]");

    if (!tombol || !filter.contains(tombol)) return;

    const kategori = tombol.dataset.kategori;

    tampilkanProyek(kategori);

    filter.querySelectorAll("button").forEach((item) => {
      item.classList.toggle("aktif", item === tombol);
    });
  });
}


tampilkanProyek();
