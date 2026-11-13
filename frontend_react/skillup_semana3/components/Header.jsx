import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="hero min-h-[70vh] bg-base-200 rounded-2xl">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold leading-tight">
            Aprendé algo que puedas usar
          </h1>
          <p className="py-6 text-lg">
            Herramientas para la oficina, tus primeros programas y proyectos con IA.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/catalogo" className="btn btn-secondary text-white">
              Ver cursos
            </Link>
            <Link to="/login" className="btn btn-primary">
              Entrar al campus
            </Link>
          </div>
          <p className="mt-4 text-sm font-semibold">
            Ayuda de IA las 24 horas y respaldo humano.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
