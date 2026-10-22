
<script setup>
import { ref, computed, onMounted } from 'vue'
import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

const profil = {
  nama: 'Shalwa Ikara Putri',
  nim: '25523004',
  peran: 'Mahasiswa Informatika'
}

const daftarProyek = ref([])
const kategoriAktif = ref('semua')
const favorit = ref([])
const sedangMemuat = ref(true)
const pesanGalat = ref('')

const proyekTampil = computed(() => {
  if (kategoriAktif.value === 'semua') {
    return daftarProyek.value
  }

  return daftarProyek.value.filter(
    proyek => proyek.kategori === kategoriAktif.value
  )
})

onMounted(async () => {
  try {
    const respons = await fetch('/data/proyek.json')
    if (!respons.ok) throw new Error('Data proyek gagal dimuat')
    daftarProyek.value = await respons.json()
  } catch (galat) {
    pesanGalat.value = 'Data gagal dimuat. Periksa lokasi berkas proyek.json.'
    console.error(galat)
  } finally {
    sedangMemuat.value = false
  }
})

function pilihKategori(kategori) {
  kategoriAktif.value = kategori
}

function tambahFavorit(id) {
  if (favorit.value.includes(id)) {
    favorit.value = favorit.value.filter(item => item !== id)
  } else {
    favorit.value.push(id)
  }
}

function aturUlang() {
  kategoriAktif.value = 'semua'
  favorit.value = []
}
</script>

<template>
  <div class="page">
    <KepalaProfil :profil="profil" />

    <main class="isi">
      <section class="sisi" id="daftar-lomba">
        <h2>Daftar Lomba</h2>

        <div class="table-wrap">
          <table class="tabel-penghargaan">
            <caption>Daftar Lomba dan Penghargaan Saya</caption>
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Lomba</th>
                <th scope="col">Tahun Lomba</th>
                <th scope="col">Penghargaan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <th scope="row">Lomba Festival Kaligrafi Kategori Kitabah (Umum)</th>
                <td>2026</td>
                <td>Juara Harapan 2</td>
              </tr>
              <tr>
                <td>2</td>
                <th scope="row">Lomba Literasi Aksara Jawa Kategori Pelajar</th>
                <td>2025</td>
                <td>Juara 3</td>
              </tr>
              <tr>
                <td>3</td>
                <th scope="row">Lomba Festival Kaligrafi Kategori Kitabah (Umum)</th>
                <td>2024</td>
                <td>Juara Harapan 2</td>
              </tr>
              <tr>
                <td>4</td>
                <th scope="row">Lomba Kaligrafi Event Parade Hari Santri</th>
                <td>2023</td>
                <td>Juara 2</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="galeri-penghargaan">
          <figure class="kartu-penghargaan">
            <img src="/penghargaan-1.jpeg" alt="Lomba Kaligrafi Event Parade Hari Santri" />
            <figcaption>Lomba Kaligrafi Event Parade Hari Santri</figcaption>
          </figure>
          <figure class="kartu-penghargaan">
            <img src="/penghargaan-2.jpeg" alt="Lomba Literasi Aksara Jawa Kategori Pelajar" />
            <figcaption>Lomba Literasi Aksara Jawa Kategori Pelajar</figcaption>
          </figure>
          <figure class="kartu-penghargaan">
            <img src="/penghargaan-3.jpeg" alt="Lomba Festival Kaligrafi Kategori Kitabah 2024" />
            <figcaption>Lomba Festival Kaligrafi Kategori Kitabah (Umum) 2024</figcaption>
          </figure>
          <figure class="kartu-penghargaan">
            <img src="/penghargaan-4.jpeg" alt="MTQ Kaligrafi cabang dekorasi" />
            <figcaption>MTQ Kaligrafi cabang dekorasi</figcaption>
          </figure>
          <figure class="kartu-penghargaan">
            <img src="/penghargaan-5.jpeg" alt="Lomba Festival Kaligrafi Kategori Kitabah 2023" />
            <figcaption>Lomba Festival Kaligrafi Kategori Kitabah (Umum) 2023</figcaption>
          </figure>
          <figure class="kartu-penghargaan">
            <img src="/penghargaan-6.jpeg" alt="Lomba Festival Kaligrafi Kategori Kitabah 2026" />
            <figcaption>Lomba Festival Kaligrafi Kategori Kitabah (Umum) 2026</figcaption>
          </figure>
        </div>
      </section>

      <section class="sisi" id="proyek">
        <h2>Daftar Proyek</h2>

        <TombolFilter
          :kategori-aktif="kategoriAktif"
          @pilih-kategori="pilihKategori"
          @atur-ulang="aturUlang"
        />

        <DaftarProyek
          :proyek-tampil="proyekTampil"
          :sedang-memuat="sedangMemuat"
          :pesan-galat="pesanGalat"
          :favorit="favorit"
          @tambah-favorit="tambahFavorit"
        />
      </section>

      <FormKontak />
    </main>

    <footer>
      <p>Shalwa Ikara Putri · 25523004 · 2026</p>
    </footer>
  </div>
</template>
