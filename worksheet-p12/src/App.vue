

<script setup>
import { computed, onMounted, watch } from 'vue'

import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

import {
  state,
  simpan,
  muat,
  pulihkan,
  pilihKategori,
  tambahFavorit,
  aturUlang,
  isiProyek,
} from './state.js'

import { ambilProyek } from './api.js'

const profil = {
  nama: 'Shalwa Ikara Putri',
  nim: '25523004',
  peran: 'Mahasiswa Informatika'
}

const proyekTampil = computed(() => {
  const daftar = state.daftarProyek

  if (state.kategoriAktif === 'semua') {
    return daftar
  }

  return daftar.filter(
    proyek => proyek.kategori === state.kategoriAktif
  )
})



onMounted(async () => {
  pulihkan(muat())

  try {
    const data = await ambilProyek()
    console.log('Data proyek:', data)
    isiProyek(data)

console.log('Isi state:', state.daftarProyek)
console.log('Kategori aktif:', state.kategoriAktif)
console.log('Proyek tampil:', proyekTampil.value)


  } catch (galat) {
    state.galat = 'Data gagal dimuat. Periksa koneksi internet.'
    console.error(galat)
  } finally {
    state.memuat = false
  }
})


watch(state, nilai => simpan(nilai), { deep: true })

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
  :kategori-aktif="state.kategoriAktif"
  @pilih-kategori="pilihKategori"
  @atur-ulang="aturUlang"
/>

        
<DaftarProyek
  :proyek-tampil="proyekTampil"
  :state="state"
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
