import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    // Demo Semana 4: leemos el usuario guardado en Login
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user") || "null");
    } catch { user = null; }
    const isAdmin = user?.role === "ADMIN";
    const isLogged = !!user;

    const handleLogout = () => {
      localStorage.removeItem("user");
      navigate("/");
      window.location.reload();
    };

    return (
        <nav className="navbar bg-primary text-primary-content px-6">
            <div className="flex-1">
                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    <img
                        src="/logo_icono.svg"
                        alt="SkillUp Campus"
                        className="h-10"
                    />

                    <span className="text-xl font-bold">
                        SkillUp Campus
                    </span>
                </Link>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 items-center gap-1">
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>

                    <li>
                        <Link to="/catalogo">Cursos</Link>
                    </li>

                    {isLogged ? (
                      <>
                        {isAdmin ? (
                          <li><Link to="/admin-dashboard">Administración</Link></li>
                        ) : (
                          <li><Link to="/dashboard">Mi campus</Link></li>
                        )}
                        <li>
                          <span className="opacity-90">Hola, {user?.name || "Estudiante"}</span>
                        </li>
                        <li>
                          <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                            Salir
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                            <Link
                                to="/login"
                                className="btn btn-ghost btn-sm"
                            >
                                Entrar
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/register"
                                className="btn btn-secondary btn-sm"
                            >
                                Crear cuenta
                            </Link>
                        </li>
                      </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;