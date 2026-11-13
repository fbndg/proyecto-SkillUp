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
function App(){
 return (<BrowserRouter><Navbar/><main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]"><Routes><Route path="/" element={<Home/>}/><Route path="/login" element={<Login/>}/><Route path="/catalogo" element={<Catalogo/>}/><Route path="/admin" element={<Admin/>}/><Route path="/register" element={<Register/>}/><Route path="/dashboard" element={<DashboardUsuario/>}/><Route path="/curso/:id" element={<CursoDetalle/>}/><Route path="/admin-dashboard" element={<DashboardAdmin/>}/></Routes></main><Footer/></BrowserRouter>);
}
export default App;
