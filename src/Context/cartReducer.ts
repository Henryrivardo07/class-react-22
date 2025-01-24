// Tipe data untuk item di keranjang
export interface CartItem {
  id: number; // ID unik untuk setiap produk
  title: string; // Nama produk
  price: number; // Harga produk
  image: string; // URL gambar produk
  quantity: number; // Jumlah produk di keranjang
}

// Tipe data untuk state keranjang yang berisi daftar item
export interface CartState {
  items: CartItem[]; // Array dari produk yang ada di keranjang
}

// Tipe data untuk aksi yang akan dilakukan pada state keranjang
export type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem } // Aksi untuk menambah produk ke keranjang
  | { type: "REMOVE_FROM_CART"; payload: number } // Aksi untuk menghapus produk berdasarkan ID
  | { type: "CLEAR_CART" } // Aksi untuk mengosongkan keranjang
  | { type: "INCREASE_QUANTITY"; payload: number } // Aksi untuk menambah jumlah produk di keranjang
  | { type: "DECREASE_QUANTITY"; payload: number }; // Aksi untuk mengurangi jumlah produk di keranjang

// Reducer untuk mengelola state keranjang berdasarkan aksi yang diterima
export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      // Mencari apakah produk sudah ada di keranjang
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      // Jika sudah ada, tambahkan jumlah quantity-nya
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 } // Update jumlah produk
              : item
          ),
        };
      }

      // Jika produk belum ada, tambahkan produk baru dengan quantity 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART": {
      // Hapus produk berdasarkan id yang diterima
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload), // Filter produk berdasarkan id
      };
    }

    case "CLEAR_CART": {
      // Kosongkan keranjang dengan mengembalikan state yang berisi array kosong
      return { items: [] };
    }

    case "INCREASE_QUANTITY": {
      // Tambah jumlah produk berdasarkan id
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 } // Tambah 1 ke quantity produk
            : item
        ),
      };
    }

    case "DECREASE_QUANTITY": {
      // Kurangi jumlah produk, pastikan quantity tidak kurang dari 1
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 } // Kurangi 1 jika quantity > 1
              : item
          )
          .filter((item) => item.quantity > 0), // Pastikan tidak ada item dengan quantity <= 0
      };
    }

    // Kalau aksi yang diterima tidak ada dalam daftar, kembalikan state yang tidak berubah
    default:
      return state;
  }
};


/*
Penjelasan:
CartItem: Definisi untuk produk di keranjang. Selain informasi produk seperti id, title, dan price, juga ada field quantity untuk menyimpan jumlah produk yang ditambahkan ke keranjang.

CartState: Menyimpan array items yang berisi semua produk yang ada di keranjang.

CartAction: Tipe data untuk aksi-aksi yang bisa dilakukan pada keranjang. Setiap aksi memiliki type untuk mengidentifikasi jenis aksi dan payload untuk membawa data yang diperlukan.

cartReducer: Fungsi yang menerima state saat ini dan aksi, lalu mengembalikan state baru berdasarkan jenis aksi yang dilakukan:

ADD_TO_CART: Menambah produk ke keranjang. Jika produk sudah ada, akan meningkatkan jumlah (quantity). Jika belum ada, akan menambah produk dengan quantity 1.
REMOVE_FROM_CART: Menghapus produk dari keranjang berdasarkan id.
CLEAR_CART: Mengosongkan keranjang.
INCREASE_QUANTITY: Meningkatkan jumlah produk di keranjang.
DECREASE_QUANTITY: Mengurangi jumlah produk di keranjang, tapi tidak akan mengurangi jumlah ke bawah 1.
Cara Kerja:
Ketika produk ditambahkan ke keranjang (ADD_TO_CART), jika produk sudah ada, jumlahnya akan bertambah. Kalau belum ada, produk baru ditambahkan.
Produk bisa dihapus dengan mengirimkan REMOVE_FROM_CART dengan ID produk yang ingin dihapus.
Fitur untuk meningkatkan atau mengurangi jumlah produk di keranjang menggunakan INCREASE_QUANTITY dan DECREASE_QUANTITY.
Keranjang bisa dikosongkan dengan CLEAR_CART.

*/