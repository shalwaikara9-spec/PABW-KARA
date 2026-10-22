
import { reactive } from 'vue'

const KUNCI = 'pabw-p11'
const VERSI = 2

export const state = reactive({
  kategoriAktif: 'semua',
  daftarProyek: [],
  favorit: [],
  memuat: true,
  galat: '',
})

export function simpan(nilai = state) {
  const isi = {
    versi: VERSI,
    kategoriAktif: nilai.kategoriAktif,
    favorit: nilai.favorit,
  }

  localStorage.setItem(KUNCI, JSON.stringify(isi))
}

export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI))

    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI)
      return null
    }

    return isi
  } catch {
    localStorage.removeItem(KUNCI)
    return null
  }
}


export function pulihkan(isi) {
  if (!isi) return

  if (['semua', 'web', 'desain'].includes(isi.kategoriAktif)) {
    state.kategoriAktif = isi.kategoriAktif
  }

  if (Array.isArray(isi.favorit)) {
    state.favorit = isi.favorit
  }
}


export function pilihKategori(nilai) {
  state.kategoriAktif = nilai
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) {
    state.favorit = state.favorit.filter(item => item !== id)
  } else {
    state.favorit.push(id)
  }
}

export function aturUlang() {
  state.kategoriAktif = 'semua'
  state.favorit = []
}

export function isiProyek(daftar) {
  state.daftarProyek = daftar
}
