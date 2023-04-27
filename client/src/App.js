import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import CartMenu from "./scenes/global/CartMenu";
import Navbar from "./scenes/global/Navbar";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Footer from "./scenes/global/Footer";
import Appointments from "./scenes/appointments/Appointments";
import Events from "./scenes/events/Events";
import Gallery from "./scenes/gallery/Gallery";
import Thankyou from "./scenes/events/Thankyou";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

  }, [pathname])

  return null;
}

function App() {
  return (
    <div className="app">
      {/* <HashRouter> */}
      <BrowserRouter basename='/react-ecommerce'>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="shop" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="events" element={<Events />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="thankyou" element={<Thankyou />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
      {/* </HashRouter> */}
    </div>
  );
}

export default App;

//TODO: sort by price
//modular: multiple vs singular items
//color correct photos?
//TODO: add video landing