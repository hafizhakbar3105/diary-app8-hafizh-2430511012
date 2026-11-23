# Diary App – React Redux Toolkit

## Modul Praktikum 08 – Mobile Programming

### Identitas Mahasiswa

| Keterangan      | Identitas                |
| --------------- | ------------------------ |
| **Nama**        | Muhammad Hafizh Akbar S  |
| **NIM**         | 2430511012               |
| **Kelas**       | 5A                       |
| **Mata Kuliah** | Pemograman Mobile Native |

---

### 1. Deskripsi Aplikasi

Diary App merupakan aplikasi buku harian berbasis React Native dan Expo Router yang menggunakan Redux Toolkit sebagai sistem pengelolaan state global.

Aplikasi ini memungkinkan pengguna untuk menambahkan, melihat, mengedit, dan menghapus catatan harian, serta mengelola daftar favorit, melakukan filter berdasarkan suasana hati (_mood_), dan menampilkan statistik diary.

### 2. Teknologi yang Digunakan

- React Native
- Expo
- Expo Router
- TypeScript
- Redux Toolkit
- React-Redux

### 3. Fitur Aplikasi

1. Menampilkan daftar diary pada halaman Home.
2. Menambahkan diary baru.
3. Melihat detail catatan diary.
4. Mengedit judul, isi, dan mood diary.
5. Menghapus diary.
6. Menambahkan atau menghapus diary dari daftar favorit.
7. Menghapus seluruh status favorit sekaligus.
8. Melakukan filter diary berdasarkan mood 😊 🎯 😌 🥰.
9. Menampilkan statistik Total Diary dan Total Favorite.
10. Memvalidasi judul minimal 3 karakter.
11. Menampilkan informasi ketika daftar diary kosong atau filter tidak menemukan data.

### 4. Struktur Project

```text
diary-app8/
├── app/
│   ├── _layout.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── create.tsx
│   │   └── favorites.tsx
│   ├── detail/
│   │   └── [id].tsx
│   └── edit/
│       └── [id].tsx
├── src/
│   ├── redux/
│   │   ├── store.ts
│   │   └── hooks.ts
│   ├── features/
│   │   └── diary/
│   │       └── diarySlice.ts
│   ├── components/
│   │   └── DiaryCard.tsx
│   └── styles/
│       └── tokens.ts
└── package.json
```

### 5. Cara Menjalankan Aplikasi

Pastikan Node.js dan npm telah terpasang.

Masuk ke direktori project:

```bash
cd diary-app8
```

Instal dependencies:

```bash
npm install
```

Jalankan aplikasi:

```bash
npx expo start
```

Buka aplikasi melalui Expo Go pada Android atau emulator yang tersedia.

### 6. Konsep State Management

#### A. Local State

Local State merupakan data yang dikelola dan digunakan oleh suatu komponen menggunakan React Hooks seperti `useState`.

Pada Diary App, Local State digunakan untuk menyimpan sementara input judul, isi diary, mood yang dipilih pada form, serta pilihan filter mood pada Home.

Contoh:

```tsx
const [title, setTitle] = useState("");
const [body, setBody] = useState("");
const [mood, setMood] = useState("😊");
```

Local State cocok digunakan untuk data yang hanya dibutuhkan oleh satu komponen.

#### B. Global Redux State

Global Redux State merupakan data yang dikelola secara terpusat menggunakan Redux Store sehingga dapat diakses oleh berbagai halaman atau komponen.

Pada Diary App, Redux digunakan untuk menyimpan daftar diary dan status favorit.

Redux Store dibuat menggunakan `configureStore()`, sedangkan pengelolaan data diary dilakukan melalui `createSlice()`.

Contoh:

```tsx
const entries = useAppSelector((state) => state.diary.entries);
```

Untuk menambahkan diary, aplikasi menggunakan `dispatch(addDiary())` dengan data diary baru.

Reducer yang digunakan meliputi:

- `addDiary`: menambahkan diary.
- `toggleFavorite`: mengubah status favorit.
- `deleteDiary`: menghapus diary.
- `setFilter`: mengatur nilai filter pada Redux.
- `editDiary`: memperbarui diary.
- `clearAllFavorites`: menghapus semua status favorit.

Keunggulan Redux adalah data dapat digunakan secara konsisten oleh berbagai halaman tanpa harus diteruskan melalui props secara berulang.

#### C. Persistent Database

Persistent Database merupakan sistem penyimpanan data yang dapat mempertahankan informasi meskipun aplikasi ditutup atau dijalankan kembali.

Contoh database yang dapat digunakan adalah SQLite, MySQL, dan PostgreSQL.

Berbeda dengan Local State dan Redux Store biasa, database digunakan untuk menyimpan data secara persisten.

Pada Modul Praktikum 08, Diary App belum menggunakan database, backend, atau REST API.

Data diary hanya disimpan di dalam Redux Store selama aplikasi berjalan. Perubahan data dapat hilang ketika aplikasi dimulai ulang atau Redux Store diinisialisasi kembali.

### 7. Perbedaan Local State, Redux State, dan Persistent Database

| Aspek                    | Local State       | Redux State                       | Persistent Database          |
| ------------------------ | ----------------- | --------------------------------- | ---------------------------- |
| Penyimpanan              | Memori komponen   | Redux Store                       | Penyimpanan persisten        |
| Cakupan                  | Komponen tertentu | Seluruh aplikasi                  | Aplikasi atau sistem terkait |
| Pengelolaan              | `useState`        | Redux Toolkit                     | Sistem database              |
| Bertahan setelah restart | Tidak             | Tidak, tanpa persistensi tambahan | Ya                           |
| Contoh penggunaan        | Input form        | Diary dan favorit                 | Riwayat diary permanen       |

### 8. Alur Kerja Redux

1. Pengguna melakukan tindakan melalui antarmuka aplikasi.
2. Komponen memanggil `dispatch()` untuk mengirim action.
3. Redux Store meneruskan action kepada reducer.
4. Reducer memproses perubahan state.
5. Redux Store menyimpan hasil perubahan.
6. `useAppSelector()` membaca state terbaru.
7. Komponen yang menggunakan state tersebut melakukan render ulang.

Dengan mekanisme ini, data pada Home, Detail, dan Favorite dapat diperbarui secara konsisten.

### 9. Pengujian Aplikasi

| Pengujian                    | Hasil yang Diharapkan                                       |
| ---------------------------- | ----------------------------------------------------------- |
| Menambahkan diary            | Diary baru tampil pada Home                                 |
| Mengedit diary               | Judul, isi, dan mood diperbarui                             |
| Menghapus diary              | Diary terhapus dari daftar                                  |
| Menekan tombol favorit       | Status favorit berubah                                      |
| Menghapus semua favorit      | Total Favorite menjadi 0                                    |
| Menggunakan filter mood      | Hanya diary dengan mood terkait yang tampil                 |
| Melihat statistik            | Jumlah diary dan favorit sesuai Redux Store                 |
| Judul kurang dari 3 karakter | Data ditolak oleh validasi                                  |
| Filter tidak menemukan data  | Pesan empty state dan tombol pilih mood lainnya ditampilkan |

### 10. Kesimpulan

Melalui praktikum ini, penggunaan Redux Toolkit dapat dipahami sebagai metode untuk mengelola global state secara terpusat pada aplikasi React Native.

Local State digunakan untuk kebutuhan sementara pada satu komponen, sedangkan Redux State digunakan untuk data yang dibutuhkan oleh banyak halaman.

Persistent Database memiliki fungsi yang berbeda karena menyimpan data secara berkelanjutan, termasuk setelah aplikasi dimulai ulang.

Dengan penerapan Redux Toolkit, Diary App dapat mengelola operasi penambahan, pembacaan, pengeditan, penghapusan, favorit, dan statistik secara terstruktur.
