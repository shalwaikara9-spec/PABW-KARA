
import { ambilProyek } from './api.js';
import {
  render,
  pasangFilter,
  aturMemuat,
  tampilkanGalat
} from './dom.js';

async function muat() {
  aturMemuat(true);

  try {
    const daftar = await ambilProyek();
    pasangFilter(daftar);
    render(daftar);
  } catch (galat) {
    tampilkanGalat(
      'Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.'
    );
    console.error(galat.message);
  } finally {
    aturMemuat(false);
  }
}

muat();