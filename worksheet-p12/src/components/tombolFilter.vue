
<script setup>
defineProps({
  kategoriAktif: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['pilih-kategori', 'atur-ulang'])
</script>

<template>
  <div id="filter">
    <button
      v-for="kategori in ['semua', 'web', 'desain']"
      :key="kategori"
      type="button"
      :class="{ aktif: kategoriAktif === kategori }"
      @click="emit('pilih-kategori', kategori)"
    >
      {{ kategori.charAt(0).toUpperCase() + kategori.slice(1) }}
    </button>
  </div>

  <button
    type="button"
    id="atur-ulang"
    @click="emit('atur-ulang')"
  >
    Atur ulang
  </button>
</template>
