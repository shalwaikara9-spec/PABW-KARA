
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


const form = document.querySelector("#form-penghargaan");
const namaInput = document.querySelector("#nama-lomba");
const tahunInput = document.querySelector("#tahun-lomba");
const penghargaanInput = document.querySelector("#penghargaan");
const tombolSimpan = document.querySelector("#tombol-simpan");

const kolomForm = [
  {
    input: namaInput,
    pesan: document.querySelector("#galat-nama"),
    teks: "Nama lomba wajib diisi."
  },
  {
    input: tahunInput,
    pesan: document.querySelector("#galat-tahun"),
    teks: "Tahun lomba wajib diisi dengan angka yang valid."
  },
  {
    input: penghargaanInput,
    pesan: document.querySelector("#galat-penghargaan"),
    teks: "Penghargaan wajib diisi."
  }
];

function periksaKolom(kolom) {
  const nilai = kolom.input.value.trim();
  const sah = nilai !== "" && kolom.input.validity.valid;

  kolom.input.setAttribute("aria-invalid", String(!sah));
  kolom.pesan.textContent = sah ? "" : kolom.teks;

  return sah;
}

function periksaForm() {
  const semuaSah = kolomForm.every(periksaKolom);
  tombolSimpan.disabled = !semuaSah;
  return semuaSah;
}

kolomForm.forEach((kolom) => {
  kolom.input.addEventListener("input", () => {
    periksaKolom(kolom);
    periksaForm();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const semuaSah = periksaForm();

  if (!semuaSah) {
    const kolomSalah = kolomForm.find(
      (kolom) => !periksaKolom(kolom)
    );

    kolomSalah.input.focus();
    return;
  }

  alert("Form valid! Data penghargaan siap diproses.");
});

