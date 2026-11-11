import { Link } from "react-router-dom";

function Navbar() {
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
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>

                    <li>
                        <Link to="/catalogo">Cursos</Link>
                    </li>

                    <li>
                        <Link
                            to="/login"
                            className="btn btn-ghost btn-sm"
                        >
                            Login
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/register"
                            className="btn btn-secondary btn-sm"
                        >
                            Registro
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;