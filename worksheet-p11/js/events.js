
import { state } from './state.js';
import { render } from './dom.js';

export function pasangPendengar() {
  const barisFilter = document.querySelector("#filter");

  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button[data-kategori]");
    if (!tombol) return;

    state.kategoriAktif = tombol.dataset.kategori;
    render(state);
  });

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

    if (!periksaForm()) {
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

    state.daftarProyek.push(proyekBaru);
    state.kategoriAktif = "semua";

    render(state);
    form.reset();
    periksaForm();
  });

  periksaForm();
}
