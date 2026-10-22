
<script setup>
defineProps({
  proyekTampil: {
    type: Array,
    required: true,
  },
  sedangMemuat: {
    type: Boolean,
    required: true,
  },
  pesanGalat: {
    type: String,
    required: true,
  },
  favorit: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['tambah-favorit'])
</script>

<template>
  <p v-if="sedangMemuat">Memuat data...</p>
  <p v-else-if="pesanGalat">{{ pesanGalat }}</p>
  <p v-else-if="proyekTampil.length === 0">Belum ada data.</p>

  <ul id="daftar">
    <li
      v-for="proyek in proyekTampil"
      :key="proyek.id"
      class="kartu"
    >
      <h3>{{ proyek.judul }}</h3>
      <p>Tahun: {{ proyek.tahun }}</p>
      <p>Kategori: {{ proyek.kategori }}</p>

      <button
        type="button"
        class="favorit"
        :aria-label="favorit.includes(proyek.id) ? 'Hapus dari favorit' : 'Tandai favorit'"
        @click="emit('tambah-favorit', proyek.id)"
      >
        {{ favorit.includes(proyek.id) ? '★' : '☆' }}
      </button>
    </li>
  </ul>
</template>
