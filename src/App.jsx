import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Contacto from "./pages/Contacto.jsx";
import NotFound from "./pages/NotFound.jsx";
import Reservas from "./pages/Reservas.jsx";

function App() {
  return (
    <>
    <Header/>

    <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/producto/:id" element={ <ProductDetail/>} />
          <Route path="/contacto" element={ <Contacto/>} />
          <Route path="/reservas" element={ <Reservas/>} />
          <Route path="*" element={ <NotFound/>} />
    </Routes>
    
    <Footer/>
   </>
   )
}

export default App;
