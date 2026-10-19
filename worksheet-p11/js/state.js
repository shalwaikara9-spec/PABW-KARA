
import { render } from './dom.js';

export const state = {
  daftarProyek: [],
  kategoriAktif: "semua",
  favorit: []
};

export function isiProyek(daftar) {
  state.daftarProyek = daftar;
  render(state);
}

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
  render(state);
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) {
    state.favorit = state.favorit.filter(
      (favoritId) => favoritId !== id
    );
  } else {
    state.favorit = [...state.favorit, id];
  }

  render(state);
}
