import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            style={{
                backgroundColor: "var(--color-primary)",
                padding: "1rem",
            }}
        >
            <Link to="/">Home</Link> |{" "}
            <Link to="/login">Login</Link> |{" "}
            <Link to="/catalogo">Catálogo</Link> |{" "}
            <Link to="/admin">Admin</Link>
			<Link to="/register">Registro</Link>
        </nav>
    );
}

export default Navbar;