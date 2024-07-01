import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import Spinner from './Components/Spinner';

// Lazy-loaded components
const Shop = lazy(() => import('./Pages/Shop'));
const ShopCategory = lazy(() => import('./Pages/ShopCategory'));
const Product = lazy(() => import('./Pages/Product'));
const Cart = lazy(() => import('./Pages/Cart'));
const LoginSignUP = lazy(() => import('./Pages/LoginSignUP'));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kids" />} />
            <Route path="/product" element={<Product />}>
              <Route path=':productId' element={<Product />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<LoginSignUP />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

