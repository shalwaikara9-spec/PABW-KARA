
<script setup>
defineProps({
  proyekTampil: {
    type: Array,
    required: true,
  },
  state: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['tambah-favorit'])
</script>

<template>
  <p v-if="state.memuat">Memuat data...</p>
  <p v-else-if="state.galat">{{ state.galat }}</p>
  <p v-else-if="proyekTampil.length === 0">
    Belum ada data.
  </p>

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
        :aria-label="
          state.favorit.includes(proyek.id)
            ? 'Hapus dari favorit'
            : 'Tandai favorit'
        "
        @click="emit('tambah-favorit', proyek.id)"
      >
        {{ state.favorit.includes(proyek.id) ? '★' : '☆' }}
      </button>
    </li>
  </ul>
</template>
