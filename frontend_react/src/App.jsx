import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Admin from "./pages/Admin";

import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main
        style={{
          padding: "var(--spacing-lg)",
          minHeight: "80vh"
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
	    </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;