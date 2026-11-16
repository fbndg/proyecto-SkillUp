import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-base-200 mt-8">
            <div className="max-w-6xl mx-auto px-6 py-8 text-center">
                <p className="font-bold text-lg">SkillUp Campus</p>
                <p className="opacity-80 text-sm mt-1">
                    Aprendé a tu ritmo, con cursos claros y acompañamiento real.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
                    <Link to="/" className="link link-hover">Inicio</Link>
                    <Link to="/catalogo" className="link link-hover">Cursos</Link>
                    <Link to="/login" className="link link-hover">Entrar</Link>
                    <Link to="/register" className="link link-hover">Crear cuenta</Link>
                </div>

                <p className="text-sm opacity-70 mt-4">
                    SkillUp Campus © 2026
                </p>
            </div>
        </footer>
    );
}

export default Footer;