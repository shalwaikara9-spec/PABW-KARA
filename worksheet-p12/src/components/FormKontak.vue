
<script setup>
import { ref, computed } from 'vue'

const namaLomba = ref('')
const tahunLomba = ref('')
const penghargaan = ref('')

const galatNama = ref('')
const galatTahun = ref('')
const galatPenghargaan = ref('')

const formValid = computed(() => {
  return (
    namaLomba.value.trim() !== '' &&
    tahunLomba.value !== '' &&
    Number(tahunLomba.value) > 0 &&
    Number.isInteger(Number(tahunLomba.value)) &&
    penghargaan.value.trim() !== ''
  )
})

function periksaForm() {
  galatNama.value = namaLomba.value.trim()
    ? ''
    : 'Nama lomba wajib diisi.'

  galatTahun.value =
    tahunLomba.value !== '' &&
    Number.isInteger(Number(tahunLomba.value)) &&
    Number(tahunLomba.value) > 0
      ? ''
      : 'Tahun lomba wajib diisi dengan angka yang valid.'

  galatPenghargaan.value = penghargaan.value.trim()
    ? ''
    : 'Penghargaan wajib diisi.'
}

function simpanPenghargaan() {
  periksaForm()

  if (!formValid.value) return

  alert('Formulir valid! Fitur menyimpan ke daftar akan kita sambungkan berikutnya.')

  namaLomba.value = ''
  tahunLomba.value = ''
  penghargaan.value = ''
  galatNama.value = ''
  galatTahun.value = ''
  galatPenghargaan.value = ''
}
</script>

<template>
  <section class="utama" id="tambah-penghargaan">
    <h2>Tambah Penghargaan</h2>

    <form @submit.prevent="simpanPenghargaan">
      <label for="nama-lomba">Nama Lomba</label>
      <input
        id="nama-lomba"
        v-model="namaLomba"
        type="text"
        :aria-invalid="!!galatNama"
        @input="periksaForm"
      />
      <small v-if="galatNama" class="galat">{{ galatNama }}</small>

      <label for="tahun-lomba">Tahun Lomba</label>
      <input
        id="tahun-lomba"
        v-model="tahunLomba"
        type="number"
        min="1"
        :aria-invalid="!!galatTahun"
        @input="periksaForm"
      />
      <small v-if="galatTahun" class="galat">{{ galatTahun }}</small>

      <label for="penghargaan">Penghargaan</label>
      <input
        id="penghargaan"
        v-model="penghargaan"
        type="text"
        :aria-invalid="!!galatPenghargaan"
        @input="periksaForm"
      />
      <small v-if="galatPenghargaan" class="galat">
        {{ galatPenghargaan }}
      </small>

      <button type="submit" :disabled="!formValid">
        Simpan
      </button>
    </form>
  </section>
</template>
