
const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#kosong");
const muatEl = document.querySelector("#muat");
const barisFilter = document.querySelector("#filter");

export function render(daftar) {
  wadah.replaceChildren();

  if (daftar.length === 0) {
    kosong.textContent = "Belum ada data.";
    kosong.hidden = false;
    return;
  }

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

export function aturMemuat(aktif) {
  muatEl.hidden = !aktif;
}

export function tampilkanGalat(pesan) {
  wadah.replaceChildren();
  kosong.textContent = pesan;
  kosong.hidden = false;
}

export function pasangFilter(daftar) {
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button[data-kategori]");
    if (!tombol) return;

    const kategori = tombol.dataset.kategori;

    const hasil = daftar.filter((proyek) =>
      kategori === "semua" || proyek.kategori === kategori
    );

    render(hasil);

    barisFilter.querySelectorAll("button").forEach((item) => {
      item.classList.toggle("aktif", item === tombol);
    });
  });
}

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

  const proyekBaru = {
    judul: namaInput.value.trim(),
    tahun: Number(tahunInput.value),
    kategori: "desain",
    penghargaan: penghargaanInput.value.trim()
  };

  const item = document.createElement("li");
  const judul = document.createElement("h3");
  const tahun = document.createElement("p");
  const kategori = document.createElement("p");
  const penghargaan = document.createElement("p");

  judul.textContent = proyekBaru.judul;
  tahun.textContent = `Tahun: ${proyekBaru.tahun}`;
  kategori.textContent = `Kategori: ${proyekBaru.kategori}`;
  penghargaan.textContent =
    `Penghargaan: ${proyekBaru.penghargaan}`;

  item.append(judul, tahun, kategori, penghargaan);
  wadah.append(item);

  kosong.hidden = true;
  form.reset();
  periksaForm();
});

