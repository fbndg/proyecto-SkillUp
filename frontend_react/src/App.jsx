import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Admin from "./pages/Admin";

import Register from "./pages/Register";

import DashboardUsuario from "./pages/DashboardUsuario";
import DashboardAdmin from "./pages/DashboardAdmin";
import CursoDetalle from "./pages/CursoDetalle";

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
          <Route path="/dashboard" element={<DashboardUsuario />} />
          <Route path="/curso/:id" element={<CursoDetalle />}
          />

          <Route
            path="/admin-dashboard"
            element={<DashboardAdmin />}
          />

          <Route
            path="/curso/:id"
            element={<CursoDetalle />}
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;