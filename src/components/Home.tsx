// src/Home.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage } from '@/pages/HomePage/HomePage';
import { Checkout } from '@/pages/Checkout/Checkout';
import { SearchPage } from '@/pages/SearchPage/SearchPage'; // Import SearchPage
import { CartProvider } from '@/Context/cartContext';
import { SearchProvider } from '@/Context/searchContext'; // Import SearchProvider

export const Home: React.FC = () => {
  return (
    <CartProvider>
      <SearchProvider> {/* Bungkus seluruh aplikasi dengan SearchProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/search" element={<SearchPage />} /> {/* Route untuk halaman pencarian */}
          </Routes>
        </Router>
      </SearchProvider>
    </CartProvider>
  );
};



//  {/* <h1 style={{ color: 'red' }}>TUTORIAL REACT JS</h1> */}
//       {/* <LemariAndBook/> */}
//       {/* <DataFetcher/> */}
//       {/* <StateWithMap/> */}
//       {/* <MapState/> */}
//       {/* <CounterDisplay/> */}