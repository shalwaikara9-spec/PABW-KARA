
<script setup>
const props = defineProps({
  profil: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <header>
    <input type="checkbox" id="tema" class="pengalih-tema" />
    <label for="tema" class="tombol-tema">Tema gelap</label>

    <div class="header-baris">
      <h1>{{ props.profil.nama }}</h1>
      <p>{{ props.profil.peran }}</p>

      <nav class="navbar" aria-label="Navigasi utama">
        <ul>
          <li><a href="#daftar-lomba">Daftar Lomba</a></li>
          <li><a href="#tambah-penghargaan">Tambah Penghargaan</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
